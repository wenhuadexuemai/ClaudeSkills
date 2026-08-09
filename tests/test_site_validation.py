from pathlib import Path
import json
import sys
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import validate_site  # noqa: E402


class SiteValidationTests(unittest.TestCase):
    def test_repository_site_passes(self) -> None:
        self.assertEqual(validate_site.validate_repo(REPO_ROOT), [])

    def test_release_version_is_synchronized(self) -> None:
        self.assertEqual((REPO_ROOT / "VERSION").read_text().strip(), "1.0.0")
        package = json.loads((REPO_ROOT / "website" / "package.json").read_text())
        self.assertEqual(package["version"], "1.0.0")
        self.assertIn(
            '<meta name="version" content="1.0.0"',
            (REPO_ROOT / "website" / "index.html").read_text(encoding="utf-8"),
        )

    def test_site_is_cross_client_and_not_claude_code_only(self) -> None:
        source = "\n".join(
            path.read_text(encoding="utf-8")
            for path in (REPO_ROOT / "website" / "src").rglob("*.tsx")
        )
        self.assertIn("Agent Skills 开放规范", source)
        self.assertIn("any compatible agent", source)
        self.assertNotIn("SKILL 2.0", source)

    def test_runtime_dependencies_stay_minimal(self) -> None:
        package = json.loads(
            (REPO_ROOT / "website" / "package.json").read_text(encoding="utf-8")
        )
        self.assertEqual(set(package["dependencies"]), {"react", "react-dom"})
        lock = (REPO_ROOT / "website" / "package-lock.json").read_text(
            encoding="utf-8"
        )
        self.assertNotIn("kimi-plugin-inspect-react", lock)
        self.assertNotIn("react-router", lock)
        self.assertNotIn("npm.mirrors.msh.team", lock)

    def test_project_site_assets_are_base_path_safe(self) -> None:
        tracks = (REPO_ROOT / "website" / "src" / "sections" / "Tracks.tsx").read_text(
            encoding="utf-8"
        )
        showcase = (
            REPO_ROOT / "website" / "src" / "sections" / "Showcase.tsx"
        ).read_text(encoding="utf-8")
        self.assertIn("import.meta.env.BASE_URL", tracks)
        self.assertIn("import.meta.env.BASE_URL", showcase)
        self.assertNotIn('src="/panel-', showcase)

    def test_mobile_and_accessibility_guards_are_present(self) -> None:
        home = (REPO_ROOT / "website" / "src" / "pages" / "Home.tsx").read_text(
            encoding="utf-8"
        )
        header = (
            REPO_ROOT / "website" / "src" / "sections" / "Header.tsx"
        ).read_text(encoding="utf-8")
        install = (
            REPO_ROOT / "website" / "src" / "sections" / "Install.tsx"
        ).read_text(encoding="utf-8")
        closing = (
            REPO_ROOT / "website" / "src" / "sections" / "Closing.tsx"
        ).read_text(encoding="utf-8")
        css = (REPO_ROOT / "website" / "src" / "index.css").read_text(
            encoding="utf-8"
        )
        self.assertIn('id="main-content"', home)
        self.assertIn("document.documentElement.lang", home)
        self.assertIn("hidden sm:flex", header)
        self.assertIn("min-w-0", install)
        self.assertIn("break-all", install)
        self.assertIn("flex flex-wrap", closing)
        self.assertIn("prefers-reduced-motion", css)
        self.assertIn("focus-visible", css)

    def test_pull_request_validation_builds_the_site_first(self) -> None:
        workflow = (REPO_ROOT / ".github" / "workflows" / "validate.yml").read_text(
            encoding="utf-8"
        )
        build_index = workflow.index("npm run build")
        validation_index = workflow.index("python3 scripts/validate_site.py")
        self.assertIn("actions/setup-node@v6", workflow)
        self.assertIn("npm ci", workflow)
        self.assertLess(build_index, validation_index)


if __name__ == "__main__":
    unittest.main()
