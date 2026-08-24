import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
  "The way you laugh — genuinely, fully, like nothing else matters in that moment.",
  "How you remember the small things I said months ago and bring them up when I least expect it.",
  "Your stubbornness. It drives me insane. I wouldn't change it.",
  "The way you can make any ordinary evening feel like a story worth telling.",
  "That you never let a fight end without fixing it.",
  "You made me believe that someone could actually know me — the difficult, quiet, overthinking version — and still choose to stay.",
  "Late nights with you feel shorter than they are. I never want them to end.",
  "You're my Monica. I didn't know I needed a Monica until I had you.",
]

function ReasonCard({ text, index }: { text: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 8px 32px var(--accent-soft)' }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '28px 24px',
        cursor: 'default',
        transition: 'border-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: 'var(--accent)',
          opacity: 0.25,
          lineHeight: 1,
          marginBottom: '12px',
          fontStyle: 'italic',
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <p style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.75 }}>
        {text}
      </p>
    </motion.div>
  )
}

export default function Reasons() {
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-eyebrow">For You</p>
          <h2 className="section-title">Things About You</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            A very incomplete list.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {reasons.map((reason, i) => (
            <ReasonCard key={i} text={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
