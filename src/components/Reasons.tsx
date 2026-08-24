import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
  "The way you laugh — genuinely, fully, like nothing else in the world matters in that moment.",
  "How you remember small things I said months ago and bring them up when I least expect it.",
  "Your stubbornness. It drives me insane and I wouldn't change a single thing about it.",
  "The way you turn any ordinary evening into a story worth telling, without even trying.",
  "That you never let a fight end without fixing it. Every single time, without fail, you fix it.",
  "You made me believe someone could know the real me — difficult, quiet, overthinking — and still stay.",
  "Late nights with you always feel shorter than they actually are. I never want them to end.",
  "You're my Monica. I didn't know I needed a Monica until I had you, and now I can't imagine not.",
  "The way you make every place we go feel like it was always ours, right from the very start.",
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
        minHeight: '168px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
      <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.72, margin: 0 }}>
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          <style>{`@media(max-width:720px){.reasons-grid{grid-template-columns:1fr!important}}.reasons-grid{grid-template-columns:repeat(3,1fr)}`}</style>
          {reasons.map((reason, i) => (
            <ReasonCard key={i} text={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
