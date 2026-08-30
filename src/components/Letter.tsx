import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Ambient particle canvas ─────────────────────────────────────────────────
function LetterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    type Particle = { x: number; y: number; r: number; speed: number; opacity: number; drift: number; phase: number }
    let pts: Particle[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function spawn() {
      if (!canvas) return
      pts = Array.from({ length: 35 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        speed: Math.random() * 0.18 + 0.05,
        opacity: Math.random() * 0.28 + 0.04,
        drift: (Math.random() - 0.5) * 0.18,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function draw(t: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#C9607A'
      pts.forEach(p => {
        const pulse = Math.sin(t * 0.0008 + p.phase) * 0.12
        const a = Math.max(0, Math.min(1, p.opacity + pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = accent + Math.round(a * 255).toString(16).padStart(2, '0')
        ctx.fill()
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    spawn()
    const ro = new ResizeObserver(() => { resize(); spawn() })
    ro.observe(canvas)
    animId = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

// ── Slow-drifting rose petals ────────────────────────────────────────────────
const PETALS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: 4 + i * 11 + (i % 3) * 2,
  size: 9 + (i % 4) * 3,
  delay: i * 1.4,
  duration: 12 + (i % 5) * 3,
  drift: ((i % 2 === 0 ? 1 : -1) * (40 + i * 12)),
  rot: (i % 2 === 0 ? 1 : -1) * (180 + i * 60),
  opacity: 0.07 + (i % 3) * 0.04,
}))

function FloatingPetals() {
  return (
    <>
      <style>{`
        @keyframes letterPetal {
          0%   { transform: translateY(-60px) translateX(0) rotate(0deg) scale(1); opacity: 0; }
          6%   { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(110%) translateX(var(--pdrift)) rotate(var(--prot)) scale(0.7); opacity: 0; }
        }
      `}</style>
      {PETALS.map(p => (
        <svg
          key={p.id}
          width={p.size} height={p.size * 1.6}
          viewBox="0 0 30 48"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.left}%`,
            animation: `letterPetal ${p.duration}s ${p.delay}s linear infinite`,
            '--pdrift': `${p.drift}px`,
            '--prot': `${p.rot}deg`,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: p.opacity,
          } as React.CSSProperties}
        >
          <path
            d="M 15 1 C 26 6, 30 18, 24 32 C 20 41, 15 47, 15 47 C 15 47, 10 41, 6 32 C 0 18, 4 6, 15 1 Z"
            fill="var(--accent)"
          />
          <path
            d="M 15 4 C 15 4, 22 14, 20 30"
            stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none" strokeLinecap="round"
          />
        </svg>
      ))}
    </>
  )
}

// ── Floating hearts ──────────────────────────────────────────────────────────
// 180 hearts generated deterministically — dense left (2–20%) + right (80–98%) strips
function sr(seed: number) { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x) }
const HEARTS = Array.from({ length: 180 }, (_, i) => {
  const isLeft = i % 2 === 0
  const leftPct = isLeft
    ? (sr(i * 5 + 0) * 16 + 2)
    : (sr(i * 5 + 0) * 16 + 82)
  return {
    left:   `${leftPct.toFixed(1)}%`,
    bottom: `${(sr(i * 5 + 1) * 90 + 3).toFixed(1)}%`,
    size:   Math.floor(sr(i * 5 + 2) * 10) + 7,
    delay:  parseFloat((sr(i * 5 + 3) * 15).toFixed(2)),
    dur:    Math.floor(sr(i * 5 + 4) * 6) + 7,
  }
})

function FloatingHearts() {
  return (
    <>
      <style>{`
        @keyframes heartFloat {
          0%   { transform: translateY(0) scale(1);    opacity: 0; }
          15%  { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-80px) scale(0.6); opacity: 0; }
        }
      `}</style>
      {HEARTS.map((h, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: h.left,
            bottom: h.bottom,
            animation: `heartFloat ${h.dur}s ${h.delay}s ease-out infinite`,
            pointerEvents: 'none',
            zIndex: 1,
            fontSize: `${h.size}px`,
            color: 'var(--accent)',
            opacity: 0,
          }}
        >
          ♡
        </div>
      ))}
    </>
  )
}

// ── Typewriter cursive title ──────────────────────────────────────────────────
const LINE1 = 'A Letter I Should Have'
const LINE2 = 'Written Sooner'
const CHAR_DELAY = 72 // ms per character
const LINE_PAUSE = 320 // ms gap between lines

function CursiveTitle() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  const [revealed, setRevealed] = useState(0)
  const [, setDone] = useState(false)
  const [shimmer, setShimmer] = useState(false)

  const totalChars = LINE1.length + LINE2.length

  // Typewriter ticker
  useEffect(() => {
    if (!inView) return
    let i = 0
    let tid: ReturnType<typeof setTimeout>
    function tick() {
      i++
      setRevealed(i)
      if (i >= totalChars) {
        setDone(true)
        setTimeout(() => setShimmer(true), 400)
        return
      }
      const pause = i === LINE1.length ? LINE_PAUSE : CHAR_DELAY
      tid = setTimeout(tick, pause)
    }
    tid = setTimeout(tick, 300)
    return () => clearTimeout(tid)
  }, [inView])

  const l1Chars = LINE1.split('')
  const l2Chars = LINE2.split('')

  return (
    <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}>
      <style>{`
        @keyframes ctCharIn {
          from { opacity: 0; filter: blur(3px); transform: translateY(8px); }
          to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
        }
        @keyframes ctShimmer {
          0%   { left: -30%; opacity: 0; }
          6%   { opacity: 1; }
          44%  { opacity: 1; }
          50%  { left: 130%; opacity: 0; }
          56%  { opacity: 1; }
          94%  { opacity: 1; }
          100% { left: -30%; opacity: 0; }
        }
      `}</style>

      <p className="section-eyebrow">From Me</p>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{
          fontFamily: "'Pinyon Script', cursive",
          fontSize: 'clamp(44px, 8vw, 72px)',
          lineHeight: 1.35,
          color: 'var(--text)',
          userSelect: 'none',
          textAlign: 'center',
        }}>
          {/* Line 1 */}
          <div>
            {l1Chars.map((ch, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: revealed > i ? 1 : 0,
                  animation: revealed > i ? 'ctCharIn 0.2s ease forwards' : 'none',
                  whiteSpace: ch === ' ' ? 'pre' : 'normal',
                }}
              >{ch}</span>
            ))}
          </div>
          {/* Line 2 */}
          <div>
            {l2Chars.map((ch, i) => {
              const g = LINE1.length + i
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: revealed > g ? 1 : 0,
                    animation: revealed > g ? 'ctCharIn 0.2s ease forwards' : 'none',
                    whiteSpace: ch === ' ' ? 'pre' : 'normal',
                  }}
                >{ch}</span>
              )
            })}
          </div>
        </div>

        {/* Shimmer sweep after typing completes */}
        {shimmer && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, bottom: 0,
              width: '25%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
              pointerEvents: 'none',
              animation: 'ctShimmer 2.2s ease-in-out forwards',
            }}
          />
        )}
      </div>

      {/* Accessible label */}
      <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        {LINE1} {LINE2}
      </span>
    </div>
  )
}

// ── Shared sub-components ────────────────────────────────────────────────────
function Sher({ lines }: { lines: string[] }) {
  return (
    <div style={{
      margin: '28px 0',
      padding: '20px 24px',
      borderLeft: '2px solid var(--accent)',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '0 8px 8px 0',
    }}>
      {lines.map((line, i) => (
        <p key={i} style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
          color: 'var(--accent)',
          lineHeight: 1.9,
          margin: 0,
        }}>
          {line}
        </p>
      ))}
    </div>
  )
}

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ marginBottom: '20px', ...style }}>{children}</p>
}

// ── Card border decorations ───────────────────────────────────────────────────
function _sr(s: number) { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

type BElem = { pos: React.CSSProperties; kind: 'filled'|'hollow'|'petal'|'rose'; size: number; delay: number; dur: number; rot: number }

function makeBorderElems(): BElem[] {
  const kinds: BElem['kind'][] = ['filled','hollow','petal','rose']
  const out: BElem[] = []
  let s = 0
  const push = (pos: React.CSSProperties) => {
    out.push({
      pos,
      kind:  kinds[Math.floor(_sr(s+0) * 4)],
      size:  Math.floor(_sr(s+1) * 13) + 11,
      delay: parseFloat((_sr(s+2) * 13).toFixed(2)),
      dur:   parseFloat((_sr(s+3) * 2.2 + 2.6).toFixed(1)),
      rot:   Math.floor(_sr(s+4) * 80) - 40,
    })
    s += 5
  }
  // Top — 16 elements, deliberately uneven gaps
  const tl = [3,9,16,21,28,35,41,48,53,61,67,73,79,84,89,95]
  tl.forEach(p => push({ top:  `${-(Math.floor(_sr(s)*6)+7)}px`, left: `${p}%` }))
  // Bottom — 14 elements
  const bl = [2,8,15,22,30,38,46,54,62,69,76,82,88,94]
  bl.forEach(p => push({ bottom: `${-(Math.floor(_sr(s)*6)+7)}px`, left: `${p}%` }))
  // Left — 11 elements
  const ll = [4,12,21,30,39,48,57,66,74,82,91]
  ll.forEach(p => push({ left: `${-(Math.floor(_sr(s)*6)+8)}px`, top: `${p}%` }))
  // Right — 12 elements
  const rl = [5,13,22,31,40,49,58,67,75,82,88,94]
  rl.forEach(p => push({ right: `${-(Math.floor(_sr(s)*6)+8)}px`, top: `${p}%` }))
  return out
}
const BORDER_ELEMS = makeBorderElems()

function CardBorderDecor() {
  return (
    <>
      <style>{`
        @keyframes bdPulse  { 0%,100%{transform:scale(1);opacity:.45} 50%{transform:scale(1.3);opacity:.88} }
        @keyframes bdSway   { 0%,100%{opacity:.38;scale:1}            50%{opacity:.7;scale:1.14}             }
        @keyframes bdGlow   { 0%,100%{opacity:.35;scale:1}            50%{opacity:.72;scale:1.18}            }
      `}</style>

      {BORDER_ELEMS.map((e, i) => {
        const base: React.CSSProperties = {
          position: 'absolute', ...e.pos,
          pointerEvents: 'none', zIndex: 10,
          userSelect: 'none',
        }

        if (e.kind === 'filled') return (
          <div key={i} aria-hidden="true" style={{ ...base, fontSize: `${e.size}px`, color: 'var(--accent)', lineHeight: 1, animation: `bdPulse ${e.dur}s ${e.delay}s ease-in-out infinite` }}>♥</div>
        )

        if (e.kind === 'hollow') return (
          <div key={i} aria-hidden="true" style={{ ...base, fontSize: `${e.size}px`, color: 'var(--accent)', lineHeight: 1, animation: `bdPulse ${e.dur + 0.4}s ${e.delay}s ease-in-out infinite`, opacity: 0.55 }}>♡</div>
        )

        if (e.kind === 'petal') return (
          <svg key={i} width={e.size} height={Math.round(e.size * 1.6)} viewBox="0 0 30 48" aria-hidden="true"
            style={{ ...base, transform: `rotate(${e.rot}deg)`, animation: `bdSway ${e.dur + 0.6}s ${e.delay}s ease-in-out infinite` }}>
            <path d="M15 1C26 6,30 18,24 32C20 41,15 47,15 47C15 47,10 41,6 32C0 18,4 6,15 1Z" fill="var(--accent)" opacity="0.55"/>
            <path d="M15 4C15 4,22 14,20 30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
        )

        // rose
        const rs = e.size
        return (
          <svg key={i} width={rs} height={rs} viewBox="0 0 200 200" aria-hidden="true"
            style={{ ...base, transform: `rotate(${e.rot}deg)`, animation: `bdGlow ${e.dur}s ${e.delay}s ease-in-out infinite` }}>
            {[0,60,120,180,240,300].map(d => (
              <ellipse key={d} cx="100" cy="46" rx="22" ry="56" fill="var(--accent)" opacity="0.38" transform={`rotate(${d},100,100)`}/>
            ))}
            {[30,90,150,210,270,330].map(d => (
              <ellipse key={d} cx="100" cy="58" rx="16" ry="44" fill="var(--accent)" opacity="0.5" transform={`rotate(${d},100,100)`}/>
            ))}
            <circle cx="100" cy="100" r="14" fill="var(--accent)" opacity="0.8"/>
          </svg>
        )
      })}
    </>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Letter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ padding: '100px 24px', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>

      {/* Live background elements */}
      <LetterCanvas />
      <FloatingPetals />
      <FloatingHearts />

      {/* Soft radial glow in center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'glowPulse 6s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <CursiveTitle />

        {/* Card with pulsing glow */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? {
            opacity: 1,
            y: 0,
            boxShadow: [
              '0 0 0px rgba(201,96,122,0)',
              '0 0 48px rgba(201,96,122,0.18)',
              '0 0 0px rgba(201,96,122,0)',
            ],
          } : {}}
          transition={{
            opacity: { duration: 0.9, ease: 'easeOut' },
            y: { duration: 0.9, ease: 'easeOut' },
            boxShadow: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: 'clamp(28px, 6vw, 56px)',
            position: 'relative',
            backdropFilter: 'blur(2px)',
            overflow: 'visible',
          }}
        >
          <CardBorderDecor />

          {/* Decorative quote mark */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '20px', left: '28px',
            fontFamily: 'var(--font-display)', fontSize: '6rem', lineHeight: 1,
            color: 'var(--accent)', opacity: 0.08, userSelect: 'none',
          }}>
            "
          </div>

          {/* Animated corner accent */}
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
            style={{
              position: 'absolute', bottom: '20px', right: '24px',
              fontFamily: 'var(--font-display)', fontSize: '4rem', lineHeight: 1,
              color: 'var(--accent)', opacity: 0.3, userSelect: 'none', fontStyle: 'italic',
            }}
          >
            🌙
          </motion.div>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            lineHeight: 2,
            color: 'var(--text)',
            position: 'relative',
            zIndex: 1,
          }}>
            <P style={{ marginBottom: '28px', fontStyle: 'italic', fontSize: '1.1em' }}>Moonpie,</P>

            {/* Oscar Wilde hook */}
            <div style={{
              margin: '0 0 20px 0', padding: '18px 24px',
              background: 'rgba(255,255,255,0.04)', borderRadius: '8px',
              borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            }}>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Oscar Wilde
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--accent)', margin: '0 0 8px 0', lineHeight: 1.7 }}>
                "A man can be happy with any woman, as long as he does not love her."
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95em', margin: 0, lineHeight: 1.7 }}>
                Ek aadmi kisi bhi aurat ke saath khush reh sakta hai — jab tak vo usse mohabbat nahi karta.
              </p>
            </div>

            <P>Pehli baar suna toh laga — kya bakwaas hai. Doosri baar socha toh ruk gaya.</P>

            <P>Ye kaisa virodhaabhas hai — ki usse mohabbat kaisi, jiski saath aap khush nahi reh sakte?</P>

            <P>
              Darasal baat yeh hai ki jab tak ek mard ek aurat se mohabbat nahi karta — use nazar andaz kar deta hai.
              Jab vo usse badalne ki koshish kare, use nazar andaz kar dega. Kyunki use khona afford kar sakta hai.
              Use naraaz karna afford kar sakta hai.
            </P>

            <P>
              Lekin jis roz use ek aurat se mohabbat ho jaati hai{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>(jaise mujhse tumse hui)</span>{' '}
              — uski saari cheezein sir aankhon par rakhne lagta hai. Kyunki uske andar ek dar aa jaata hai —
              use khone ka{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>(jaise mujhse hai tumhe khone ka)</span>.
              Aur vo aisa koi mauka dena nahi chahta ki vo usse chhodke chali jaaye. Vo uski har ek baat maanne lagta hai.
              Andar hi andar har cheez ki paribhashaein badalne lagti hain. Apne jawaab uske jawaab se milaane lagta hai.
            </P>

            <P>Aur yeh process bht mushkil hota hai — mere liye bhi tha. Jispe maine likha:</P>

            <Sher lines={[
              'Waise toh mushkil hai tere saath guzara karna,',
              'Par mere bas mein nahi hai tujhse kinara karna.',
              'Ek hi shakhs se kai baar mohabbat ki hai —',
              'Isko kehte hain meri jaan khasaara karna.',
              '',
              'Main hi sahra bhi hoon, darya bhi hoon, jungle bhi hoon,',
              'Ab teri marzi hai jis naam se pukaara karna.',
            ]} />

            <P>
              Ki jo tu chahe waisa hoga — teri marzi se hai. Tere saath lekin yeh aasaan nahi, mushkil hai.
              Lekin main tujhse door nahi hona chahta, tujhse kinara nahi kar sakta — isliye sab accept karta hoon.
            </P>

            <Sher lines={[
              'Tu mujhe chhodke na chali jaaye — isliye tere hak mein har ek baat kehta hoon,',
              'Tu din ko raat kehti hai, toh raat keh deta hoon.',
              'Khwaab mein milne ko bhi mulaaqaat keh deta hoon.',
              'Chaaro taraf tujhe khuda samajhke ghoomta hoon.',
              'Tere talve choom leta hoon.',
            ]} />

            <P>Self-respect ki koi baat nahi aati. Ego ki koi baat hi nahi aati.</P>

            <P>
              Maine khud ko ekdam badal liya — aur yeh badalna kisi pressure se nahi kiya. Yeh mohabbat se kiya hai.
            </P>

            <P>
              Tum bolte ho na ki tumhe nahi lagta main tumse pyar karta hoon — lekin agar yeh pyar nahi hai toh yeh
              badlaav kabhi nahi aata. Ek mard apna wajood sirf apni mashooka ke liye badal sakta hai.
              Bina pyar ke mard khud ko khud ke liye bhi nahi badal paata.
            </P>

            {/* Quote block */}
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.97 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                margin: '28px 0', padding: '20px 24px',
                textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
              }}
            >
              <p style={{ fontStyle: 'italic', color: 'var(--accent)', marginBottom: '10px', fontSize: '1.05em', lineHeight: 1.7 }}>
                "If you are the same person before and after you loved, you haven't loved enough."
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', margin: 0, lineHeight: 1.7 }}>
                Agar pyar karne se pehle aur pyar karne ke baad aap same hi insaan hain — toh aapne pyar sahi dhang se nahi kiya.
              </p>
            </motion.div>

            <P>
              Kuch logon ko pitrisatta itne mazboot dhang se pakdi hoti hai ki vo uska saath hi nahi chhodte —
              kitna bhi pyar mil jaaye. Isiliye kabhi kabhi jab tum samjhaati ho ya mujhe badalna chahti ho,
              kabhi kabhi main vaisa chahke bhi nahi kar paata. Par jab jab aisa hota hai — main andar hi andar
              toot jaata hoon. Iska matlab yeh nahi ki main tumse pyar nahi karta. Ya tum mujhe sirf badalna hi chahti ho.
            </P>

            <P>Isko agar soft tarike se boloon toh:</P>

            <Sher lines={[
              'Log toh log hain, ji bharke khasaara karte hain,',
              'Lekin tum mohabbat ho meri, isiliye na nuksaan hamaara karte ho.',
              'Khush bahut hoon, aur nahi karna padta tere saath sirf guzaara —',
              'Kyunki ab tere saath bhi pade agar guzaara karna, toh kya khak tum mujhe mohabbat karte ho.',
            ]} />

            <P>Kyunki —</P>

            <Sher lines={[
              'Tu vo ek shakhs jo mujhe taana-e-jaan deta hai,',
              'Marna chahoon toh marne bhi kahaan deta hai.',
              'Teri sharton pe hi karna hai mujhko tujhe qubool —',
              'Chahe shah ki daulat mujhe saara jahaan deta hai.',
            ]} />

            <P>
              Aadmi ko khud ko badalna bahut mushkil hai. Lekin pyar mein vo badalta hai. Apni mashooka ke rang-roop
              mein dhalta hai. Kyunki usse mohabbat hai — uski zaroorat hai. Aur isme mujhe koi harzana nahi hai.
            </P>

            <P>Par samaaj ke hisaab se isi ko "unhappiness" kehte hain.</P>

            <P>
              But mere liye happiness ki paribhashaein hi badal gayi hain. Ab mere liye happiness hai —
              tera haath pakadkar chandni raat mein tehalna. Baatein karna. Friday nights ko movie night plan karna.
              Office aane ke liye wait karna. Tere liye momos thande karke rakhna. Tumhara mazaak udaana.
              Chhoti chhoti cheezein jo pehle kuch nahi lagti thi — ab sab kuch hain.
            </P>

            {/* Closing */}
            <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
              <P>
                Main nahi kar paata apni feelings achhe se express — shayad yakeen bhi na dila pau kabhi ki how much I love
                you aur how much I care for you. Kyunki mere paas aise koi shabd hi nahi hain jisse main apni feeling
                tujhe bayan kar pau — ki main kya feel karta hoon, kis had tak feel karta hoon.
              </P>
              <P>
                Maybe today, on your special day — shayad 1% feel kara pau apne shabdon se.
                Kuch khaas nahi hai mere paas dene ko. Nahi hoon main utna perfect banda jitna tum deserve karti ho.
                Gift sab dete hain — sharing my feelings would be a little better gift. I hope so.
              </P>
              <P style={{ marginBottom: '12px' }}>Again — Happy Birthday, my love.</P>
              <P style={{ marginBottom: '28px' }}>
                Tried to make something memorable for you with the help of this site, which will be alive till eternity.
                Senti mat hona — kahi last time ki tarah is baar ka bhi birthday ruin na kar doon tumhara. 🌙
              </P>
              <p style={{ color: 'var(--accent)', fontStyle: 'italic', margin: 0 }}>
                — Your Imperfect Lover 🫶
                <br />Satvik
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
