import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Letter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-eyebrow">From Me</p>
          <h2 className="section-title">A Letter I Should Have Written Sooner</h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: 'clamp(28px, 6vw, 56px)',
            position: 'relative',
          }}
        >
          {/* Decorative quote mark */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20px',
              left: '28px',
              fontFamily: 'var(--font-display)',
              fontSize: '6rem',
              lineHeight: 1,
              color: 'var(--accent)',
              opacity: 0.08,
              userSelect: 'none',
            }}
          >
            "
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              lineHeight: 2,
              color: 'var(--text)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p style={{ marginBottom: '28px', fontStyle: 'italic', fontSize: '1.1em' }}>
              Moonpie,
            </p>

            <p style={{ marginBottom: '20px' }}>
              I know I'm not great at this. Saying things out loud, expressing what I feel, letting you
              know when something's wrong instead of just going quiet. I carry things silently and I
              know that's not fair to you.
            </p>

            <p style={{ marginBottom: '20px' }}>
              But I need you to know — even when I'm distant, even when I'm not saying enough, even
              when life gets loud and I go quiet — I love you. Genuinely, completely, in a way I didn't
              know I was capable of before you.
            </p>

            <p style={{ marginBottom: '20px' }}>
              You are the person I want to tell things to first. The person I think about on my commute,
              on calls, in the middle of work when something funny happens and I have no one else I want
              to share it with. You're not a part of my life, Mansi — you are the best part of it.
            </p>

            <p style={{ marginBottom: '32px' }}>
              I know I'm not always expressive. I've probably gotten on your nerves without meaning to,
              and I've hurt you in ways I didn't intend — and each time that happened, it broke something
              in me too. When you cry and I don't know what to say or do, that helplessness is one of the
              worst feelings I know. But I'm not giving up on figuring it out. On becoming someone who's
              better at this. For you.
            </p>

            <p style={{ marginBottom: '12px' }}>Happy Birthday, my Moonpie.</p>

            <p style={{ marginBottom: '32px' }}>
              You deserve every good thing. I hope you know that.
            </p>

            <p style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
              — Your Chandler Bing 🫶
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
