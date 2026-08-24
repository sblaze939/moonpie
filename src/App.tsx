import { useTheme } from './hooks/useTheme'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Memories from './components/Memories'
import Reasons from './components/Reasons'
import Letter from './components/Letter'
import Footer from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'

export default function App() {
  const { themeName, setTheme } = useTheme()

  return (
    <>
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
