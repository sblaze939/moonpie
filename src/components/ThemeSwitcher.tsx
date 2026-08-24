import { themes, themeOrder, type ThemeName } from '../themes'

interface Props {
  themeName: ThemeName
  onSelect: (name: ThemeName) => void
}

export default function ThemeSwitcher({ themeName, onSelect }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        padding: '8px 10px',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        borderRadius: '30px',
        border: '1px solid var(--border)',
      }}
      aria-label="Theme switcher"
    >
      {themeOrder.map((name) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          title={themes[name].label}
          aria-label={`Switch to ${themes[name].label} theme`}
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: themes[name].swatch,
            border: themeName === name ? '2px solid #fff' : '2px solid transparent',
            outline: themeName === name ? '2px solid ' + themes[name].swatch : 'none',
            outlineOffset: '2px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  )
}
