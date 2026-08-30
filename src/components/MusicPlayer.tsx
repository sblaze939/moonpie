import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/music/leberch-happy-birthday-581704.mp3')
    audio.loop = true
    audio.volume = 0.18
    audioRef.current = audio

    // Try autoplay; browsers block until user gesture — we catch silently
    audio.play().then(() => {
      setPlaying(true)
    }).catch(() => {
      // Will start on first user click anywhere
    })

    const startOnGesture = () => {
      if (!audioRef.current) return
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      document.removeEventListener('click', startOnGesture)
      document.removeEventListener('touchstart', startOnGesture)
    }
    document.addEventListener('click', startOnGesture)
    document.addEventListener('touchstart', startOnGesture)

    // Hide the hint after 4s
    const t = setTimeout(() => setShowHint(false), 4000)

    return () => {
      audio.pause()
      clearTimeout(t)
      document.removeEventListener('click', startOnGesture)
      document.removeEventListener('touchstart', startOnGesture)
    }
  }, [])

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return
    if (muted) {
      audioRef.current.play().catch(() => {})
      setMuted(false)
      setPlaying(true)
    } else {
      audioRef.current.pause()
      setMuted(true)
      setPlaying(false)
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '6px 12px',
              fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em',
              whiteSpace: 'nowrap', pointerEvents: 'none',
            }}
          >
            soft music playing 🎵
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        title={muted ? 'Unmute music' : 'Mute music'}
        style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'var(--surface)', border: '1px solid var(--border)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          outline: 'none',
        }}
      >
        {/* Bars animate when playing & unmuted */}
        {muted || !playing ? (
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>🔇</span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '18px' }}>
            {[0, 0.15, 0.3].map((d, i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                style={{
                  display: 'block', width: '3px', height: '14px', borderRadius: '2px',
                  background: 'var(--accent)', transformOrigin: 'bottom',
                }}
              />
            ))}
          </span>
        )}
      </motion.button>
    </div>
  )
}
