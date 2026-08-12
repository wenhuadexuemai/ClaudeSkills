#!/usr/bin/env python3
"""Validate the source, production build, and publication contract for the website."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


RELEASE_VERSION = "1.0.1"
RELEASE_URL = f"https://github.com/staruhub/ClaudeSkills/releases/tag/{RELEASE_VERSION}"
EXPECTED_SITE_URL = "https://staruhub.github.io/ClaudeSkills/"
REPOSITORY_URL = "https://github.com/staruhub/ClaudeSkills"

REQUIRED_SOURCE_FILES = (
    "index.html",
    "package.json",
    "package-lock.json",
    "vite.config.ts",
    "src/main.tsx",
    "src/pages/Home.tsx",
    "src/content.ts",
    "src/sections/Header.tsx",
    "src/sections/Hero.tsx",
    "src/sections/Tracks.tsx",
    "src/sections/Install.tsx",
    "src/sections/Evidence.tsx",
    "src/sections/AllSkills.tsx",
    "src/sections/Closing.tsx",
)
REQUIRED_PUBLIC_ASSETS = (
    "panel-gray.jpg",
    "panel-purple.jpg",
    "panel-red.jpg",
    "track-blue.jpg",
    "track-pink.jpg",
    "track-violet.jpg",
)
REQUIRED_REPOSITORY_LINKS = (
    REPOSITORY_URL,
    RELEASE_URL,
    f"{REPOSITORY_URL}/blob/main/SECURITY.md",
    f"{REPOSITORY_URL}/blob/main/CONTRIBUTING.md",
    f"{REPOSITORY_URL}/blob/main/LICENSE",
    f"{REPOSITORY_URL}/issues",
)
REQUIRED_WORKFLOW_MARKERS = (
    "actions/checkout@v6",
    "actions/setup-node@v6",
    "actions/setup-python@v6",
    "npm ci",
    "npm run lint",
    "npm run build",
    "python3 scripts/validate_site.py",
    "actions/configure-pages@v5",
    "actions/upload-pages-artifact@v4",
    "actions/deploy-pages@v4",
    "path: ./website/dist",
    "contents: read",
    "pages: write",
    "id-token: write",
    "name: github-pages",
    "needs: build",
    "workflow_dispatch:",
)


class BuiltHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.lang = ""
        self.title_count = 0
        self.meta: dict[str, str] = {}
        self.resources: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.lang = attributes.get("lang", "")
        if tag == "title":
            self.title_count += 1
        if tag == "meta" and attributes.get("name"):
            self.meta[attributes["name"]] = attributes.get("content", "")
        for attribute in ("href", "src"):
            value = attributes.get(attribute)
            if value:
                self.resources.append(value)


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def validate_release(repo_root: Path) -> list[str]:
    errors: list[str] = []
    version = repo_root / "VERSION"
    if not version.is_file() or _read(version).strip() != RELEASE_VERSION:
        errors.append(f"VERSION: expected '{RELEASE_VERSION}'")

    changelog = repo_root / "CHANGELOG.md"
    if not changelog.is_file() or f"## [{RELEASE_VERSION}]" not in _read(changelog):
        errors.append(f"CHANGELOG.md: missing release heading for {RELEASE_VERSION}")

    for filename in ("README.md", "README.zh-CN.md"):
        path = repo_root / filename
        if not path.is_file():
            errors.append(f"{filename}: missing README")
            continue
        text = _read(path)
        if text.count(EXPECTED_SITE_URL) != 1:
            errors.append(f"{filename}: expected one canonical website link")
        if RELEASE_URL not in text:
            errors.append(f"{filename}: missing release {RELEASE_VERSION} link")
        for marker in ("Agent Skills", ".agents/skills", "--client claude-code"):
            if marker not in text:
                errors.append(f"{filename}: missing cross-client marker: {marker}")
    return errors


def validate_source(repo_root: Path) -> list[str]:
    errors: list[str] = []
    website = repo_root / "website"
    for relative in REQUIRED_SOURCE_FILES:
        if not (website / relative).is_file():
            errors.append(f"website/{relative}: missing source file")
    if errors:
        return errors

    package = json.loads(_read(website / "package.json"))
    if package.get("version") != RELEASE_VERSION:
        errors.append(f"website/package.json: version must be {RELEASE_VERSION}")
    if set(package.get("dependencies", {})) != {"react", "react-dom"}:
        errors.append("website/package.json: runtime dependencies must stay minimal")
    for script in ("build", "lint", "dev"):
        if script not in package.get("scripts", {}):
            errors.append(f"website/package.json: missing {script} script")

    lock = _read(website / "package-lock.json")
    if "npm.mirrors.msh.team" in lock:
        errors.append("website/package-lock.json: private mirror URL remains")
    for banned in ("kimi-plugin-inspect-react", "react-router", "@radix-ui"):
        if banned in lock:
            errors.append(f"website/package-lock.json: unused template dependency remains: {banned}")

    index = _read(website / "index.html")
    for marker in (
        "<!doctype html>",
        '<html lang="zh-CN">',
        f'<meta name="version" content="{RELEASE_VERSION}"',
        '<meta name="description"',
        "ClaudeSkills｜为你的 Agent 注入一套工作方法",
    ):
        if marker not in index:
            errors.append(f"website/index.html: missing {marker}")

    source = "\n".join(
        _read(website / relative)
        for relative in REQUIRED_SOURCE_FILES
        if relative.endswith((".ts", ".tsx"))
    )
    for marker in (
        "Agent Skills 开放规范",
        ".agents/skills",
        "main-content",
        "aria-label",
        "prefers-reduced-motion",
    ):
        if marker not in source and marker not in _read(website / "src/index.css"):
            errors.append(f"website source: missing product or accessibility marker: {marker}")
    for link in REQUIRED_REPOSITORY_LINKS:
        if link not in source:
            errors.append(f"website source: missing repository link: {link}")
    if "SKILL 2.0" in source:
        errors.append("website source: unsupported SKILL 2.0 claim remains")
    if re.search(r"(?:src|href)=['\"]/(?!src/)", source):
        errors.append("website source: root-relative project asset or link remains")
    if "import.meta.env.BASE_URL" not in source:
        errors.append("website source: GitHub Pages base path handling is missing")

    for filename in REQUIRED_PUBLIC_ASSETS:
        if not (website / "public" / filename).is_file():
            errors.append(f"website/public/{filename}: missing visual asset")
    return errors


def validate_built_site(repo_root: Path) -> list[str]:
    errors: list[str] = []
    dist = repo_root / "website" / "dist"
    index_path = dist / "index.html"
    if not index_path.is_file():
        return ["website/dist/index.html: run npm run build before validation"]

    text = _read(index_path)
    parser = BuiltHTMLParser()
    parser.feed(text)
    if parser.lang != "zh-CN":
        errors.append("website/dist/index.html: default language must be zh-CN")
    if parser.title_count != 1:
        errors.append("website/dist/index.html: expected one title")
    if parser.meta.get("version") != RELEASE_VERSION:
        errors.append("website/dist/index.html: release version metadata is stale")
    if not parser.meta.get("description"):
        errors.append("website/dist/index.html: description metadata is missing")

    for value in parser.resources:
        if value.startswith(("http://", "https://", "data:")):
            continue
        if value.startswith("/"):
            errors.append(f"website/dist/index.html: root-relative resource: {value}")
            continue
        target = (dist / value.split("?", 1)[0].lstrip("./")).resolve()
        if not target.is_file():
            errors.append(f"website/dist/index.html: missing built resource: {value}")
    for filename in REQUIRED_PUBLIC_ASSETS:
        if not (dist / filename).is_file():
            errors.append(f"website/dist/{filename}: public asset was not copied")
    return errors


def validate_workflow(repo_root: Path) -> list[str]:
    workflow = repo_root / ".github" / "workflows" / "pages.yml"
    if not workflow.is_file():
        return [".github/workflows/pages.yml: missing Pages workflow"]
    text = _read(workflow)
    errors = [
        f".github/workflows/pages.yml: missing '{marker}'"
        for marker in REQUIRED_WORKFLOW_MARKERS
        if marker not in text
    ]
    if not re.search(r"branches:\s*\[\s*main\s*\]", text):
        errors.append(".github/workflows/pages.yml: push branch must be main")
    return errors


def validate_repo(repo_root: Path) -> list[str]:
    root = repo_root.resolve()
    return [
        *validate_release(root),
        *validate_source(root),
        *validate_built_site(root),
        *validate_workflow(root),
    ]


def main() -> int:
    errors = validate_repo(Path(__file__).resolve().parents[1])
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"SITE VALIDATION FAIL ({len(errors)} errors)")
        return 1
    print("validated Kimi source, production build, release 1.0.1, and Pages workflow")
    print("SITE VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
