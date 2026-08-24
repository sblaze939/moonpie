import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG rose petal path — teardrop/petal shape
function RosePetal({ left, size, delay, duration, drift, rotate, color }: {
  left: number; size: number; delay: number; duration: number;
  drift: number; rotate: number; color: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 30 48"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: -60,
        left: `${left}%`,
        animation: `petalDrop ${duration}s ${delay}s linear infinite`,
        '--drift': `${drift}px`,
        '--rot': `${rotate}deg`,
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
      } as React.CSSProperties}
    >
      <path
        d="M 15 1 C 26 6, 30 18, 24 32 C 20 41, 15 47, 15 47 C 15 47, 10 41, 6 32 C 0 18, 4 6, 15 1 Z"
        fill={color}
        opacity={0.85}
      />
      <path
        d="M 15 4 C 15 4, 22 14, 20 30"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

const COLORS = ['#C9607A', '#E8708A', '#D4506A', '#B83060', '#F09090', '#E05070']
const PETAL_COUNT = 120

const petalData = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 115 - 7,
  size: Math.random() * 18 + 10,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 2,           // fast: 2–4s
  drift: (Math.random() - 0.5) * 140,
  rotate: Math.floor(Math.random() * 1080 - 540),
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
}))

export default function BirthdayIntro() {
  const [show, setShow] = useState(true)
  const [phase, setPhase] = useState<'petals' | 'text' | 'out'>('petals')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    // Always show on every render/reload — no localStorage gate
    setShow(true)
    setPhase('petals')
    const t1 = setTimeout(() => setPhase('text'), 600)
    const t2 = setTimeout(() => setPhase('out'), 5200)
    const t3 = setTimeout(() => setShow(false), 6000)
    timers.current = [t1, t2, t3]
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const dismiss = () => {
    timers.current.forEach(clearTimeout)
    setPhase('out')
    setTimeout(() => setShow(false), 500)
  }

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'out' ? 0 : 1 }}
        transition={{ duration: 0.7 }}
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'radial-gradient(ellipse at 50% 45%, #3A0B18 0%, #18030A 55%, #080104 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <style>{`
          @keyframes petalDrop {
            0%   { transform: translateY(-60px) translateX(0) rotate(0deg) scale(1); opacity: 0; }
            4%   { opacity: 1; }
            88%  { opacity: 0.9; }
            100% { transform: translateY(108vh) translateX(var(--drift)) rotate(var(--rot)) scale(0.6); opacity: 0; }
          }
          @keyframes glow {
            0%,100% { text-shadow: 0 0 40px rgba(201,96,122,0.4); }
            50%      { text-shadow: 0 0 80px rgba(201,96,122,0.9), 0 0 120px rgba(201,96,122,0.4); }
          }
          @keyframes flashBurst {
            0%   { opacity: 0.8; transform: scale(0); }
            60%  { opacity: 0.3; transform: scale(1.6); }
            100% { opacity: 0; transform: scale(2.4); }
          }
        `}</style>

        {/* Rose petals */}
        {petalData.map(p => <RosePetal key={p.id} {...p} />)}

        {/* Flash burst rings when text appears */}
        {phase !== 'petals' && [0, 0.15, 0.32].map((d, i) => (
          <div
            key={`burst-${i}`}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 80, height: 80,
              borderRadius: '50%',
              border: '2px solid rgba(201,96,122,0.7)',
              animation: `flashBurst 1.8s ${d}s ease-out infinite`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        ))}

        {/* Main text — explosive zoom from centre */}
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 16px' }}>

          <motion.p
            initial={{ opacity: 0, scale: 0.3 }}
            animate={phase !== 'petals' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1.6, 0.36, 1] }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(0.65rem, 1.8vw, 0.9rem)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C9607A',
              marginBottom: '18px',
            }}
          >
            02 September
          </motion.p>

          {/* "Happy Birthday" — explosive pop from dot */}
          <motion.h1
            initial={{ scale: 0, opacity: 0, filter: 'blur(20px)' }}
            animate={phase !== 'petals'
              ? { scale: [0, 1.35, 0.92, 1.06, 1], opacity: 1, filter: 'blur(0px)' }
              : { scale: 0, opacity: 0 }}
            transition={{
              scale: {
                duration: 0.9,
                ease: 'easeOut',
                times: [0, 0.45, 0.65, 0.82, 1],
              },
              opacity: { duration: 0.15 },
              filter: { duration: 0.5 },
            }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.8rem, 13vw, 8.5rem)',
              fontWeight: 400,
              color: '#EDD5D5',
              lineHeight: 1.05,
              marginBottom: '10px',
              animation: phase !== 'petals' ? 'glow 2.5s ease-in-out infinite 0.9s' : 'none',
            }}
          >
            Happy Birthday
          </motion.h1>

          {/* "Moonpie" — sharp pop after */}
          <motion.div
            initial={{ scale: 0, opacity: 0, filter: 'blur(16px)' }}
            animate={phase !== 'petals'
              ? { scale: [0, 1.4, 0.9, 1.08, 1], opacity: 1, filter: 'blur(0px)' }
              : { scale: 0, opacity: 0 }}
            transition={{
              scale: {
                duration: 0.85,
                ease: 'easeOut',
                times: [0, 0.42, 0.62, 0.8, 1],
                delay: 0.38,
              },
              opacity: { duration: 0.15, delay: 0.38 },
              filter: { duration: 0.4, delay: 0.38 },
            }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 8vw, 5.5rem)',
              color: '#C9607A',
              lineHeight: 1,
            }}
          >
            Moonpie 🌙
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === 'text' ? { opacity: 0.4 } : { opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              marginTop: '48px',
              fontSize: '0.68rem',
              color: '#C9607A',
              fontFamily: "'Lato', sans-serif",
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            tap to continue
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
