import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const entries = [
  {
    date: 'Aug 9, 2022',
    title: 'The Mall, Before Everything',
    description:
      "The whole group was there. Just another evening out — except I couldn't stop noticing you. We'd been on the same Teams calls for months. But this was the first time I saw you in a way I couldn't explain.",
    emoji: '✨',
  },
  {
    date: 'Aug 10, 2022',
    title: 'The Town Hall',
    description:
      "We shared a plate at dinner. You had a Breezer. You were a little too cheerful by the end of the night and I thought — yeah, I'm completely done for.",
    emoji: '🍹',
  },
  {
    date: 'Sep 3, 2022',
    title: 'Agra — I Came for You',
    description:
      "I came to your hometown. Just like that. We went to the Taj Mahal — the greatest monument to love ever built — and somehow I wasn't thinking about the marble or the history. I was just thinking about you standing right next to me.",
    emoji: '🕌',
  },
  {
    date: 'Oct 2022',
    title: 'Jaipur',
    description:
      "Our first proper trip together. Pink city, blue skies, and you. I think somewhere between the havelis and the chaos, I stopped pretending this was just a feeling.",
    emoji: '🌅',
  },
  {
    date: 'Oct 16, 2022',
    title: 'Skyfall — The First Date',
    description:
      "The night it became official. A restaurant, terrible nervousness, the best conversation, and the easiest decision I ever made.",
    emoji: '🕯️',
  },
  {
    date: 'Every Month Since',
    title: 'Inseparable',
    description:
      "We decided without deciding that we'd see each other every month. And somehow, missing even one month made life feel still. Like the world forgot to move without you.",
    emoji: '🌙',
  },
  {
    date: 'Gurgaon',
    title: 'Movie Dates & Café Runs',
    description:
      "Every WFO week became an excuse. A movie in the theatre here, a café in Cyber Hub there. We turned ordinary Gurgaon evenings into the kind of nights I never want to forget.",
    emoji: '🎬',
  },
  {
    date: '2023',
    title: 'Udaipur — The City of Lakes',
    description:
      "We found ourselves in the most romantic city in India and still managed to make it feel completely ours. Boat rides, rooftop dinners, golden light everywhere.",
    emoji: '🏰',
  },
  {
    date: '2023',
    title: 'Indore & Ujjain',
    description:
      "Street food at 11pm, chai at temples at dawn. We don't just travel together — we live in each moment until it's over.",
    emoji: '🛕',
  },
  {
    date: '2023',
    title: 'McLeodganj',
    description:
      "Mountains, monasteries, momo breaks, and you in a jacket looking like the whole trip was made for you. It kind of was.",
    emoji: '🏔️',
  },
  {
    date: '2024',
    title: 'Vaishno Devi',
    description:
      "The trek, the cold, the exhaustion — all of it worth it because you were next to me. Some journeys are more than just getting somewhere.",
    emoji: '🙏',
  },
  {
    date: '2024',
    title: 'Chandigarh & Jallianwala Bagh',
    description:
      "History, gardens, and long drives. We managed to find something beautiful in every single place we went.",
    emoji: '🌿',
  },
  {
    date: 'Jan 2026',
    title: 'Jaisalmer & Jodhpur',
    description:
      "The desert at night, sand dunes, royal forts and chaotic bazaars. You made the Golden City feel golden.",
    emoji: '🏜️',
  },
  {
    date: 'Apr 2026',
    title: 'Mussoorie — Our Best Trip',
    description:
      "Mountain walks, tiny cafes, a scooty on winding pine roads, and you laughing at absolutely everything. If I had to pick one memory to keep forever, it would be this one. Our best trip. So far.",
    emoji: '⛰️',
  },
]

function TimelineEntry({ entry, index }: { entry: typeof entries[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isRight = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: isRight ? 90 : -90, perspective: 1200 }}
      animate={inView ? { opacity: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      style={{
        display: 'flex',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        marginBottom: '48px',
        position: 'relative',
        perspective: '1200px',
      }}
    >
      {/* Breathing dot + pulse ring */}
      <div style={{ position: 'absolute', left: '50%', top: '20px', transform: 'translateX(-50%)', zIndex: 2, width: 12, height: 12 }}>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.18 }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid var(--accent)', pointerEvents: 'none' }}
        />
        {/* Second ring offset */}
        <motion.div
          animate={{ scale: [1, 2.1], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.18 + 0.5 }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--accent)', pointerEvents: 'none' }}
        />
        {/* Core dot — breathes */}
        <motion.div
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
          style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          width: '44%',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '24px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Border trace — 4 lines drawing clockwise */}
        {inView && (<>
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.2 }}
            style={{ position: 'absolute', top: 0, left: 0, height: '1.5px', background: 'var(--accent)', zIndex: 3 }} />
          <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.55 }}
            style={{ position: 'absolute', top: 0, right: 0, width: '1.5px', background: 'var(--accent)', zIndex: 3 }} />
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.9 }}
            style={{ position: 'absolute', bottom: 0, right: 0, height: '1.5px', background: 'var(--accent)', zIndex: 3, transformOrigin: 'right' }} />
          <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.35, ease: 'easeInOut', delay: 1.25 }}
            style={{ position: 'absolute', bottom: 0, left: 0, width: '1.5px', background: 'var(--accent)', zIndex: 3, transformOrigin: 'bottom' }} />
        </>)}
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
