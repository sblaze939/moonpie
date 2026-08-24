export type ThemeName = 'rose' | 'midnight' | 'sage'

export interface Theme {
  name: ThemeName
  label: string
  swatch: string
  bg: string
  surface: string
  text: string
  textMuted: string
  accent: string
  accentSoft: string
  border: string
  fontDisplay: string
  fontBody: string
}

export const themes: Record<ThemeName, Theme> = {
  rose: {
    name: 'rose',
    label: 'Rose',
    swatch: '#C9607A',
    bg: '#1A0A0F',
    surface: '#261118',
    text: '#E8C5C5',
    textMuted: '#9E7A80',
    accent: '#C9607A',
    accentSoft: 'rgba(201,96,122,0.15)',
    border: 'rgba(201,96,122,0.2)',
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Lato', system-ui, sans-serif",
  },
  midnight: {
    name: 'midnight',
    label: 'Midnight',
    swatch: '#7BA7D4',
    bg: '#080C1A',
    surface: '#0F1528',
    text: '#C8D4E8',
    textMuted: '#6A7A96',
    accent: '#7BA7D4',
    accentSoft: 'rgba(123,167,212,0.15)',
    border: 'rgba(123,167,212,0.2)',
    fontDisplay: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
  sage: {
    name: 'sage',
    label: 'Sage',
    swatch: '#7DC47A',
    bg: '#0F1A10',
    surface: '#162318',
    text: '#D4E8C8',
    textMuted: '#7A9A76',
    accent: '#7DC47A',
    accentSoft: 'rgba(125,196,122,0.15)',
    border: 'rgba(125,196,122,0.2)',
    fontDisplay: "'DM Serif Display', Georgia, serif",
    fontBody: "'Nunito', system-ui, sans-serif",
  },
}

export const themeOrder: ThemeName[] = ['rose', 'midnight', 'sage']
