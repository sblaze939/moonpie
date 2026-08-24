import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Photo { src: string; caption: string; alt: string }

const photos: Photo[] = [
  { src: '/photos/img4.jpg',       caption: 'Mussoorie — Us 🏔️',      alt: 'Together in Mussoorie' },
  { src: '/photos/img1.jpg',       caption: 'The Scooty Ride 🛵',      alt: 'Scooty ride in Mussoorie' },
  { src: '/photos/udaipur1.jpg',   caption: 'Udaipur 🏰',              alt: 'Udaipur trip' },
  { src: '/photos/udaipur2.jpg',   caption: 'City of Lakes 🌊',        alt: 'Udaipur lakes' },
  { src: '/photos/mcleodganj.jpg', caption: 'McLeodganj 🏔️',          alt: 'McLeodganj' },
  { src: '/photos/trek.jpg',       caption: 'The Trek 🥾',             alt: 'Trekking together' },
  { src: '/photos/vaishno.jpg',    caption: 'Vaishno Devi 🙏',        alt: 'Vaishno Devi' },
  { src: '/photos/chandigarh.jpg', caption: 'Chandigarh 🌿',          alt: 'Chandigarh' },
  { src: '/photos/amritsar.jpg',   caption: 'Amritsar 🕍',            alt: 'Amritsar' },
  { src: '/photos/jaisalmer.jpg',  caption: 'Jaisalmer 🏜️',          alt: 'Jaisalmer' },
  { src: '/photos/img5.jpg',       caption: 'Jodhpur 🌅',             alt: 'Jodhpur trip' },
  { src: '/photos/img6.jpg',       caption: 'That One Trip 🤍',       alt: 'Road trip' },
  { src: '/photos/indore.jpg',     caption: 'Indore & Ujjain 🛕',     alt: 'Indore Ujjain' },
  { src: '/photos/img2.jpg',       caption: 'Her Favourite View 🌿',  alt: 'Mussoorie viewpoint' },
  { src: '/photos/img3.jpg',       caption: 'Mussoorie Morning ☀️',   alt: 'Mussoorie morning' },
]

// ── shared image layer ──────────────────────────────────────────────────────
function PhotoImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

function Caption({ text }: { text: string }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '28px 14px 12px',
      background: 'linear-gradient(transparent, rgba(0,0,0,0.68))',
      color: '#fff', fontSize: '0.82rem', fontWeight: 500,
      letterSpacing: '0.04em', fontFamily: 'var(--font-body)',
      zIndex: 4,
    }}>{text}</div>
  )
}

// ── TYPE 1: Envelope card — click to unseal ─────────────────────────────────
function EnvelopeCard({ photo, index }: { photo: Photo; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onClick={() => setOpen(o => !o)}
      whileHover={{ y: -4 }}
      style={{ cursor: 'pointer', borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '4/5', border: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      {/* Photo */}
      <motion.div
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <PhotoImg src={photo.src} alt={photo.alt} />
        <Caption text={photo.caption} />
      </motion.div>
      {/* Envelope body */}
      <motion.div animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2, delay: open ? 0 : 0.35 }}
        style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(150deg, var(--surface), var(--accent-soft))' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 250" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} aria-hidden="true">
          <polyline points="0,0 100,110 200,0" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <polyline points="0,250 100,160 200,250" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
        <span style={{ fontSize: '2.2rem', position: 'relative' }}>💌</span>
        <p style={{ marginTop: 10, fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', position: 'relative' }}>tap to open</p>
      </motion.div>
      {/* Flap */}
      <motion.div
        animate={{ rotateX: open ? -170 : 0, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', background: 'var(--accent-soft)', clipPath: 'polygon(0 0,100% 0,50% 80%)', transformOrigin: 'top center', transformStyle: 'preserve-3d', zIndex: 3 }}
      />
    </motion.div>
  )
}

// ── TYPE 2: Butterfly card — wings flap, spread on hover ────────────────────
function ButterflyCard({ photo, index }: { photo: Photo; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'relative', aspectRatio: '4/5' }}
    >
      <style>{`
        @keyframes wingFlap { from { transform: scaleX(1); } to { transform: scaleX(0.22); } }
      `}</style>
      {/* Left wing */}
      <motion.div animate={{ x: hovered ? -28 : 0, scaleX: hovered ? 1 : undefined }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ position: 'absolute', left: -22, top: '15%', width: 44, height: 90, zIndex: 5, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 44 90" width="44" height="90">
          <ellipse cx="22" cy="38" rx="20" ry="36" fill="var(--accent)" opacity={hovered ? 0.75 : 0.5}
            style={{ transformOrigin: '44px 38px', animation: hovered ? 'none' : 'wingFlap 0.75s ease-in-out infinite alternate' }} />
          <ellipse cx="22" cy="70" rx="14" ry="18" fill="var(--accent)" opacity={hovered ? 0.6 : 0.35}
            style={{ transformOrigin: '44px 70px', animation: hovered ? 'none' : 'wingFlap 0.75s ease-in-out infinite alternate' }} />
        </svg>
      </motion.div>
      {/* Right wing */}
      <motion.div animate={{ x: hovered ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ position: 'absolute', right: -22, top: '15%', width: 44, height: 90, zIndex: 5, pointerEvents: 'none', transform: 'scaleX(-1)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 44 90" width="44" height="90">
          <ellipse cx="22" cy="38" rx="20" ry="36" fill="var(--accent)" opacity={hovered ? 0.75 : 0.5}
            style={{ transformOrigin: '44px 38px', animation: hovered ? 'none' : 'wingFlap 0.75s ease-in-out infinite alternate-reverse' }} />
          <ellipse cx="22" cy="70" rx="14" ry="18" fill="var(--accent)" opacity={hovered ? 0.6 : 0.35}
            style={{ transformOrigin: '44px 70px', animation: hovered ? 'none' : 'wingFlap 0.75s ease-in-out infinite alternate-reverse' }} />
        </svg>
      </motion.div>
      {/* Photo card */}
      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', height: '100%', position: 'relative' }}>
        <PhotoImg src={photo.src} alt={photo.alt} />
        <Caption text={photo.caption} />
      </div>
    </motion.div>
  )
}

// ── TYPE 3: Polaroid — rotated frame, wobbles on hover ──────────────────────
function PolaroidCard({ photo, index }: { photo: Photo; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const tilt = (index % 2 === 0 ? -1 : 1) * (1.5 + (index % 3) * 0.8)
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, rotate: tilt - 8, y: 30 }}
      animate={inView ? { opacity: 1, rotate: tilt, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22,1,0.36,1] }}
      whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
      style={{ background: '#fff', padding: '10px 10px 44px', borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', cursor: 'pointer', position: 'relative' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 2 }}>
        <PhotoImg src={photo.src} alt={photo.alt} />
      </div>
      <p style={{
        textAlign: 'center', marginTop: 10,
        fontFamily: "'Dancing Script', 'Playfair Display', cursive",
        fontSize: '0.95rem', color: '#444', letterSpacing: '0.02em',
      }}>{photo.caption}</p>
    </motion.div>
  )
}

// ── TYPE 4: Curtain — two panels slide apart on click ───────────────────────
function CurtainCard({ photo, index }: { photo: Photo; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06 }}
      onClick={() => setOpen(o => !o)}
      style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative', aspectRatio: '4/5', cursor: 'pointer' }}
    >
      {/* Photo always behind */}
      <PhotoImg src={photo.src} alt={photo.alt} />
      <Caption text={photo.caption} />
      {/* Left curtain */}
      <motion.div
        animate={{ x: open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', zIndex: 3,
          background: 'linear-gradient(to right, var(--surface), var(--accent-soft))',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}
        aria-hidden="true"
      >
        {!open && <span style={{ fontSize: '1.4rem', opacity: 0.6 }}>❯</span>}
      </motion.div>
      {/* Right curtain */}
      <motion.div
        animate={{ x: open ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 3,
          background: 'linear-gradient(to left, var(--surface), var(--accent-soft))',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 8 }}
        aria-hidden="true"
      >
        {!open && <span style={{ fontSize: '1.4rem', opacity: 0.6 }}>❮</span>}
      </motion.div>
      {/* Center hint */}
      {!open && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: '1.8rem' }}>🎬</span>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 8 }}>reveal</p>
        </div>
      )}
    </motion.div>
  )
}

// ── Card type rotation ───────────────────────────────────────────────────────
const CARD_TYPES = [EnvelopeCard, ButterflyCard, PolaroidCard, CurtainCard]

function MemoryCard({ photo, index }: { photo: Photo; index: number }) {
  const CardComponent = CARD_TYPES[index % CARD_TYPES.length]
  return <CardComponent photo={photo} index={index} />
}

// ── Floating butterfly decoration ───────────────────────────────────────────
function FloatingButterfly({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 5, animation: 'floatB 8s ease-in-out infinite', ...style }} aria-hidden="true">
      <svg width="42" height="30" viewBox="0 0 42 30" fill="none">
        <ellipse cx="10" cy="15" rx="10" ry="8" fill="var(--accent)" opacity="0.55" style={{ transformOrigin: '21px 15px', animation: 'wf 0.8s ease-in-out infinite alternate' }} />
        <ellipse cx="32" cy="15" rx="10" ry="8" fill="var(--accent)" opacity="0.45" style={{ transformOrigin: '21px 15px', animation: 'wf 0.8s ease-in-out infinite alternate-reverse' }} />
        <ellipse cx="21" cy="15" rx="2.5" ry="9" fill="var(--text)" opacity="0.6" />
        <line x1="20" y1="6" x2="16" y2="1" stroke="var(--text)" strokeWidth="1" opacity="0.4" />
        <line x1="22" y1="6" x2="26" y2="1" stroke="var(--text)" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="1" r="1.5" fill="var(--accent)" opacity="0.7" />
        <circle cx="26" cy="1" r="1.5" fill="var(--accent)" opacity="0.7" />
      </svg>
      <style>{`
        @keyframes wf { from { transform: scaleX(1); } to { transform: scaleX(0.2); } }
        @keyframes floatB {
          0%   { transform: translateY(0) translateX(0) rotate(-4deg); }
          33%  { transform: translateY(-20px) translateX(14px) rotate(4deg); }
          66%  { transform: translateY(-8px) translateX(-10px) rotate(-2deg); }
          100% { transform: translateY(0) translateX(0) rotate(-4deg); }
        }
      `}</style>
    </div>
  )
}

export default function Memories() {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--surface)', position: 'relative', overflow: 'visible' }}>
      <FloatingButterfly style={{ top: '10%', right: '5%' }} />
      <FloatingButterfly style={{ bottom: '15%', left: '3%', animationDelay: '3s', transform: 'scaleX(-1)' }} />

      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-eyebrow">Memories</p>
          <h2 className="section-title">Us, In Frames</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Each one opens differently — just like every moment we lived. 🌸
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '28px' }}>
          {photos.map((p, i) => <MemoryCard key={p.src} photo={p} index={i} />)}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ textAlign: 'center', marginTop: '56px', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}
        >
          The best ones are still being made. 🌹
        </motion.p>
      </div>
    </section>
  )
}
