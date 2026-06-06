import { useEffect, useState } from 'react'

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      data-cursor-hover
      aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="glass fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_var(--glow)]"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
