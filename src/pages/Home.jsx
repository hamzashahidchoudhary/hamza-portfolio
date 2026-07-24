import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'
import ScrambleText from '../components/ScrambleText.jsx'
import CountUp from '../components/CountUp.jsx'
import TiltCard from '../components/TiltCard.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import RevealText from '../components/RevealText.jsx'

const techStack = ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Flutter', 'Firebase', 'JavaScript', 'Git', 'MongoDB', 'Laravel', 'Redis']

const projects = [
  {
    title: 'Whispr — Real-Time Chat',
    category: 'Full-Stack · Web',
    desc: 'Production-ready chat app with WebSockets, emoji reactions, reply threading, file sharing & push notifications.',
    stack: ['Laravel 12', 'React 19', 'MySQL', 'Redis', 'Reverb'],
    color: '#6366f1',
  },
  {
    title: 'Wayfare — Property Booking',
    category: 'Full-Stack · Web',
    desc: 'Airbnb-style platform with 3 user roles, geospatial map search, and real Stripe payment integration.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: '#0ea5e9',
  },
  {
    title: 'Maison — E-Commerce',
    category: 'Full-Stack · Web',
    desc: 'Complete shopping experience with admin panel, JWT auth, PostgreSQL + Prisma, and Cloudinary CDN.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    color: '#f59e0b',
  },
  {
    title: 'Lost & Found App',
    category: 'Mobile · Flutter',
    desc: 'Campus-wide lost item platform with role-based auth, live chat, push notifications & admin analytics.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    color: '#10b981',
  },
]

function TypeWriter({ words }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    const delay = deleting ? 60 : text === word ? 1800 : 90

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      } else {
        setText(prev => deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx, words])

  return (
    <span style={{ color: 'var(--accent)' }}>
      {text}
      <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
    </span>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <PageWrapper>
      <AnimatedBg />
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .hero-badge { animation: float 3s ease-in-out infinite; }
        .orbit-ring { animation: spin-slow 12s linear infinite; }
      `}</style>

      <motion.section
        ref={heroRef}
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '5rem 0 4rem', y: heroY, opacity: heroOpacity }}
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>
            <div>
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: 99, background: 'var(--green-lt)', border: '1px solid rgba(22,163,74,0.25)' }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 8px var(--green)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.1em' }}>AVAILABLE FOR WORK</span>
              </motion.div>

              <div style={{ marginBottom: '1.25rem' }}>
                <RevealText delay={0.15}>
                  <h1 className="display" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 1 }}>
                    Hi, I'm <ScrambleText text="Hamza" trigger delay={600} style={{ color: 'var(--accent)', fontStyle: 'italic' }} />
                  </h1>
                </RevealText>
                <RevealText delay={0.3}>
                  <h1 className="display" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.1, marginTop: '0.3rem' }}>
                    <TypeWriter words={['Full Stack Developer', 'React Developer', 'Flutter Developer', 'Node.js Engineer']} />
                  </h1>
                </RevealText>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                style={{ fontSize: '1.05rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.8, maxWidth: 520, marginBottom: '2.5rem' }}
              >
                Based in Pakistan. I craft high-performance web & mobile apps — from pixel-perfect frontends to scalable backend systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
              >
                <MagneticButton href="/projects" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', borderRadius: 10, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500, textDecoration: 'none' }}>
                  View Projects →
                </MagneticButton>
                <MagneticButton href="mailto:muhammad.hamza.dev@outlook.com" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', borderRadius: 10, background: 'transparent', color: 'var(--ink2)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500, textDecoration: 'none' }}>
                  Get in Touch
                </MagneticButton>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.14em', marginBottom: '0.75rem' }}>STACK</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {techStack.map((t, i) => (
                    <motion.span
                      key={t}
                      className="tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.04 }}
                      whileHover={{ scale: 1.08, borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-lt)' }}
                      style={{ cursor: 'default' }}
                    >{t}</motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hero-orbit"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: 260, height: 260, flexShrink: 0 }}
            >
              <style>{`.hero-orbit { display: none; } @media(min-width: 900px){ .hero-orbit { display: flex !important; } }`}</style>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: '#fff', fontWeight: 600, zIndex: 2, boxShadow: '0 0 40px rgba(37,99,235,0.35)', position: 'relative' }}>
                MH
              </div>
              {[130, 200].map((r, ri) => (
                <div key={r} className="orbit-ring" style={{
                  position: 'absolute', width: r * 2, height: r * 2,
                  border: '1px solid var(--border)', borderRadius: '50%',
                  animationDuration: `${10 + ri * 6}s`,
                  animationDirection: ri % 2 === 0 ? 'normal' : 'reverse',
                }}>
                  <div style={{
                    width: ri === 0 ? 10 : 8, height: ri === 0 ? 10 : 8,
                    borderRadius: '50%',
                    background: ri === 0 ? '#10b981' : '#f59e0b',
                    position: 'absolute', top: -5, left: '50%',
                    boxShadow: `0 0 10px ${ri === 0 ? '#10b981' : '#f59e0b'}`,
                  }} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}
          >
            {[['8', '+', 'Months Exp.'], ['6', '', 'Projects Built'], ['2', '', 'Degrees'], ['20', '+', 'Technologies']].map(([n, suf, l]) => (
              <motion.div
                key={l}
                whileHover={{ background: 'var(--accent-lt)' }}
                style={{ padding: '2rem 1.25rem', background: 'var(--bg2)', textAlign: 'center', transition: 'background 0.25s' }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>
                  <CountUp to={parseInt(n)} suffix={suf} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>{l.toUpperCase()}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '2rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <RevealText>
                <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>Featured Work</div>
              </RevealText>
              <RevealText delay={0.1}>
                <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>Projects I've built</h2>
              </RevealText>
            </div>
            <motion.div whileHover={{ x: 5 }}>
              <Link to="/projects" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
                All projects →
              </Link>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="card" style={{ padding: '1.75rem', height: '100%', cursor: 'default' }}>
                  <div style={{ width: 36, height: 4, borderRadius: 2, background: p.color, marginBottom: '1.25rem' }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{p.category}</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{p.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.87rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.25rem' }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '0.18rem 0.55rem', borderRadius: 4, border: `1px solid ${p.color}40`, color: p.color, background: `${p.color}10` }}>{s}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Open to Opportunities</div>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1.25rem' }}>
              Let's build something<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>together.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontWeight: 300, maxWidth: 400, margin: '0 auto 2.5rem', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Actively looking for full-stack developer roles. Open to remote and local opportunities.
            </p>
            <MagneticButton
              href="/contact"
              style={{ padding: '0.9rem 2.5rem', fontSize: '0.95rem', borderRadius: 10, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500, textDecoration: 'none', boxShadow: '0 8px 30px rgba(37,99,235,0.3)' }}
            >
              Start a Conversation →
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}