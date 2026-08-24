import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const captions = [
  'The Taj',
  'Jaipur Sunsets',
  'Late Nights',
  'Movie Dates',
  'That One Trip',
  'Every Ordinary Day',
]

function MemoryCard({ caption, index }: { caption: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        aspectRatio: '4/3',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* TODO: Replace with actual photo */}
      {/* Shimmer placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--accent-soft) 50%, var(--surface) 100%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 2.4s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 200%; }
          50%  { background-position: 0% 0%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>

      {/* Camera icon */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.4 }}>📷</div>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-body)',
          }}
        >
          {caption}
        </p>
      </div>
    </motion.div>
  )
}

export default function Memories() {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-eyebrow">Memories</p>
          <h2 className="section-title">Us, In Frames</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Photos coming soon — the best ones are still being lived.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {captions.map((caption, i) => (
            <MemoryCard key={caption} caption={caption} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
