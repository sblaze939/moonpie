import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const entries = [
  {
    date: 'Aug 9, 2022',
    title: 'The Town Hall',
    description:
      "A company dinner where I first saw you in person. I'd been seeing you on Teams calls for months, but that evening something just clicked. I couldn't stop looking at you.",
    emoji: '✨',
  },
  {
    date: 'Sep 3, 2022',
    title: 'Agra & The Taj',
    description:
      'You took me to your hometown. We stood in front of the greatest monument to love ever built — and somehow all I could think about was you standing right next to me.',
    emoji: '🕌',
  },
  {
    date: 'Oct 2022',
    title: 'Jaipur',
    description:
      'Our first trip. Pink city, blue skies, and you. I think this is when I knew this wasn\'t just a feeling — it was something real.',
    emoji: '🌅',
  },
  {
    date: 'Oct 16, 2022',
    title: 'Skyfall — The First Date',
    description:
      'The night it became official. A restaurant, terrible nervousness, and the best decision I ever made.',
    emoji: '🕯️',
  },
  {
    date: 'Every Month Since',
    title: 'Inseparable',
    description:
      "We decided without deciding that we'd see each other every month. And somehow, missing even one month made life feel still. Like the world forgot to move without you.",
    emoji: '🌙',
  },
]

function TimelineEntry({ entry, index }: { entry: typeof entries[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isRight = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      style={{
        display: 'flex',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        marginBottom: '48px',
        position: 'relative',
      }}
    >
      {/* Centre dot */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '20px',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 12px var(--accent)',
          zIndex: 2,
        }}
      />

      {/* Card */}
      <div
        style={{
          width: '44%',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px 28px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '8px',
          }}
        >
          {entry.date}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            color: 'var(--text)',
            marginBottom: '12px',
          }}
        >
          {entry.emoji} {entry.title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
          {entry.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title">How We Happened</h2>
        </div>

        {/* Timeline track */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--border)',
              transform: 'translateX(-50%)',
            }}
            aria-hidden="true"
          />

          {/* Mobile: single column */}
          <style>{`
            @media (max-width: 680px) {
              .timeline-entry { justify-content: flex-start !important; }
              .timeline-entry > div:last-child { width: 90% !important; margin-left: 36px; }
              .timeline-line { left: 16px !important; }
              .timeline-dot { left: 12px !important; }
            }
          `}</style>

          {entries.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
