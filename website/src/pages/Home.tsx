import { useEffect, useState } from 'react'
import Header from '../sections/Header'
import Hero from '../sections/Hero'
import Showcase from '../sections/Showcase'
import Tracks from '../sections/Tracks'
import Install from '../sections/Install'
import Evidence from '../sections/Evidence'
import AllSkills from '../sections/AllSkills'
import { Access, Faq, Footer } from '../sections/Closing'
import type { Lang } from '../content'

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh')

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  return (
    <div className="min-h-screen bg-[#eaeaee] px-4 py-6 sm:px-8 sm:py-8">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-50 -translate-y-20 rounded-full bg-[#16161a] px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        {lang === 'zh' ? '跳到主要内容' : 'Skip to content'}
      </a>
      <div className="mx-auto w-full max-w-[1220px] rounded-[28px] bg-white px-6 py-7 sm:px-12 sm:py-9">
        <Header lang={lang} setLang={setLang} />
        <main id="main-content">
          <Hero lang={lang} />
          <Showcase lang={lang} />
          <Tracks lang={lang} />
          <Install lang={lang} />
          <Evidence lang={lang} />
          <AllSkills lang={lang} />
          <Access lang={lang} />
          <Faq lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  )
}
