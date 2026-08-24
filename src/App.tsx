import { useTheme } from './hooks/useTheme'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Memories from './components/Memories'
import Reasons from './components/Reasons'
import Letter from './components/Letter'
import Footer from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'
import BirthdayIntro from './components/BirthdayIntro'
import MusicPlayer from './components/MusicPlayer'

function RoseSvg({ size, opacity, style }: { size: number; opacity: number; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 0, ...style }}
    >
      {/* Outer petals — 6 */}
      {[0,60,120,180,240,300].map(deg => (
        <ellipse key={`op${deg}`}
          cx="100" cy="42" rx="24" ry="62"
          fill="var(--accent)" opacity={opacity}
          transform={`rotate(${deg},100,100)`}
        />
      ))}
      {/* Mid petals — 6, offset 30° */}
      {[30,90,150,210,270,330].map(deg => (
        <ellipse key={`mp${deg}`}
          cx="100" cy="54" rx="18" ry="50"
          fill="var(--accent)" opacity={opacity * 1.3}
          transform={`rotate(${deg},100,100)`}
        />
      ))}
      {/* Inner petals — 5 */}
      {[0,72,144,216,288].map(deg => (
        <ellipse key={`ip${deg}`}
          cx="100" cy="68" rx="13" ry="34"
          fill="var(--accent)" opacity={opacity * 1.6}
          transform={`rotate(${deg},100,100)`}
        />
      ))}
      {/* Centre */}
      <circle cx="100" cy="100" r="16" fill="var(--accent)" opacity={opacity * 2.2} />
      <circle cx="100" cy="100" r="9"  fill="var(--accent)" opacity={opacity * 2.8} />
    </svg>
  )
}

const ROSES = [
  { size: 340, opacity: 0.07, style: { top: '-80px',   left: '-90px',   transform: 'rotate(-22deg)' } },
  { size: 280, opacity: 0.06, style: { top: '12%',     right: '-60px',  transform: 'rotate(14deg)'  } },
  { size: 380, opacity: 0.05, style: { top: '42%',     left: '-110px',  transform: 'rotate(8deg)'   } },
  { size: 260, opacity: 0.07, style: { top: '60%',     right: '-50px',  transform: 'rotate(-30deg)' } },
  { size: 320, opacity: 0.055,style: { bottom: '5%',   left: '-80px',   transform: 'rotate(18deg)'  } },
  { size: 240, opacity: 0.065,style: { bottom: '-60px',right: '-60px',  transform: 'rotate(-12deg)' } },
  { size: 200, opacity: 0.05, style: { top: '28%',     left: '44%',     transform: 'rotate(35deg)'  } },
]

export default function App() {
  const { themeName, setTheme } = useTheme()

  return (
    <>
      {ROSES.map((r, i) => <RoseSvg key={i} {...r} />)}
      <MusicPlayer />
      <BirthdayIntro />
      <ThemeSwitcher themeName={themeName} onSelect={setTheme} />
      <Hero />
      <Timeline />
      <Memories />
      <Reasons />
      <Letter />
      <Footer />
    </>
  )
}
