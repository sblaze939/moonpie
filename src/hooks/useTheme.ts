import { useState, useEffect, useCallback } from 'react'
import { type ThemeName, type Theme, themes } from '../themes'

const STORAGE_KEY = 'moonpie-theme'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.style.setProperty('--bg', theme.bg)
  root.style.setProperty('--surface', theme.surface)
  root.style.setProperty('--text', theme.text)
  root.style.setProperty('--text-muted', theme.textMuted)
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-soft', theme.accentSoft)
  root.style.setProperty('--border', theme.border)
  root.style.setProperty('--font-display', theme.fontDisplay)
  root.style.setProperty('--font-body', theme.fontBody)
}

export function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && stored in themes) return stored as ThemeName
    } catch {
      // localStorage unavailable
    }
    return 'rose'
  })

  useEffect(() => {
    applyTheme(themes[themeName])
    try {
      localStorage.setItem(STORAGE_KEY, themeName)
    } catch {
      // ignore
    }
  }, [themeName])

  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name)
  }, [])

  return { themeName, theme: themes[themeName], setTheme }
}
