import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'
import TiltCard from '../components/TiltCard.jsx'
import RevealText from '../components/RevealText.jsx'
import MagneticButton from '../components/MagneticButton.jsx'

const timeline = [
  { year: 'Jan 2026 – Jul 2026', role: 'Junior Full Stack Developer', place: 'Hello Future Technologies (Pvt) Ltd, Lahore', type: 'work',
    points: [
      'Collaborated with the Senior Web Developer to build and maintain full-stack web applications',
      'Developed responsive user interfaces using React.js, HTML5, CSS3, and JavaScript',
      'Built and integrated RESTful APIs using Node.js and Express.js',
      'Worked with MongoDB and PostgreSQL for database design, CRUD operations, query optimization, and data management',
      'Implemented secure authentication and authorization using JWT',
      'Debugged applications, fixed bugs, and optimized frontend, backend, and database performance',
      'Used Git and GitHub for version control, collaboration, and code reviews',
      'Participated in Agile development, sprint planning, testing, deployment, and production support',
    ] },
  { year: 'Jun 2024 – Aug 2024', role: 'Full Stack Web Developer Intern', place: 'Hello Future Technologies (Pvt) Ltd, Lahore', type: 'work',
    points: [
      'Developed responsive web interfaces using HTML, CSS, and JavaScript',
      'Integrated backend APIs and database systems',
      'Optimised application performance and resolved bugs',
      'Collaborated with team on real-world projects',
    ] },
  { year: '2024 – 2026', role: 'BS Computer Science', place: 'NCBA&E — Alhamra University, Rahim Yar Khan', type: 'edu',
    points: ['Completed degree in Computer Science', 'Focus: Full Stack Development, Mobile Apps, Databases'] },
  { year: '2022 – 2024', role: 'ADP Computer Science', place: 'NCBA&E — Alhamra University, Rahim Yar Khan', type: 'edu',
    points: ['Associate Degree in Computer Science', 'Final year project: Delicia Cafe Web System'] },
]

const certs = [
  'HTML5 & CSS3 Foundations', 'Advanced Styling with Responsive Design',
  'JavaScript Interactivity', 'Web Development Capstone Project',
]

const interests = [
  { emoji: '🏏', label: 'Cricket', sub: 'Teamwork & Strategy' },
  { emoji: '🎮', label: 'Video Gaming', sub: 'Focus & Decision Making' },
  { emoji: '✈️', label: 'Travelling', sub: 'Cultural Exploration' },
  { emoji: '🔬', label: 'New Technologies', sub: 'Always Exploring' },
]

function AnimatedTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.3'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 2, background: 'var(--border)' }}>
        <motion.div style={{ width: '100%', height: lineHeight, background: 'linear-gradient(180deg, var(--accent), #7c3aed)', borderRadius: 2 }} />
      </div>

      {timeline.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ delay: i * 0.1, duration: 0.6 }}
          style={{ position: 'relative', paddingLeft: '2.5rem' }}
        >
          <motion.span
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
            style={{
              position: 'absolute', left: -1, top: 8, width: 12, height: 12, borderRadius: '50%',
              background: item.type === 'work' ? 'var(--accent)' : '#7c3aed',
              boxShadow: `0 0 0 4px ${item.type === 'work' ? 'var(--accent-lt)' : 'rgba(124,58,237,0.12)'}`,
            }}
          />
          <style>{`
            .timeline-row { padding: 0 0 3rem 0; }
            @media (max-width: 600px) { .timeline-row { padding-bottom: 2rem; } }
          `}</style>
          <div className="timeline-row">
            <span className={`tag ${item.type === 'work' ? 'blue' : ''}`} style={{ display: 'inline-block', marginBottom: '0.5rem' }}>{item.type === 'work' ? 'Work' : 'Education'}</span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{item.year}</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>{item.role}</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '0.9rem' }}>{item.place}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {item.points.map((pt, j) => (
                <li key={j} style={{ display: 'flex', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 300 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem' }}>›</span>{pt}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <PageWrapper>
      <AnimatedBg />
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <RevealText>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>About Me</div>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="display" style={{ marginBottom: '1.25rem' }}>
              Code is my craft,<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>people are my purpose.</span>
            </h1>
          </RevealText>

          <div className="about-grid" style={{ marginTop: '3rem' }}>
            <style>{`
              .about-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
              .interests-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
              @media (max-width: 768px) {
                .about-grid { grid-template-columns: 1fr; gap: 2rem; }
                .interests-grid { grid-template-columns: 1fr 1fr; }
              }
            `}</style>

            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <TiltCard className="about-avatar" style={{ background: 'linear-gradient(135deg, #e8f0fe 0%, #ede9fe 100%)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', marginBottom: '1.5rem' }}>
                <img src="/photo.jpeg" alt="Muhammad Hamza" style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', marginBottom: '0.75rem', border: '3px solid var(--accent)' }} />
                <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ink)' }}>Muhammad Hamza</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.2rem' }}>Full Stack Developer</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.1rem' }}>Rahim Yar Khan, Pakistan</p>
              </TiltCard>
              <div className="card" style={{ padding: '1.25rem' }}>
                {[
                  { label: 'Email', val: 'muhammad.hamza.dev@outlook.com', href: 'mailto:muhammad.hamza.dev@outlook.com' },
                  { label: 'Phone', val: '+92 323 2148369', href: 'tel:+923232148369' },
                  { label: 'LinkedIn', val: 'hamzashahidchoudhary', href: 'https://linkedin.com/in/hamzashahidchoudhary' },
                  { label: 'Languages', val: 'English · Urdu' },
                ].map((row, i) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>{row.label.toUpperCase()}</span>
                    {row.href
                      ? <a href={row.href} style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500, wordBreak: 'break-all' }}>{row.val}</a>
                      : <span style={{ fontSize: '0.82rem', color: 'var(--ink2)' }}>{row.val}</span>}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.25rem' }}>
                I'm a <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Full Stack Developer</strong> with hands-on professional experience in web and mobile app development. I love turning complex problems into clean, performant solutions.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.8, marginBottom: '2rem' }}>
                I currently work as a Junior Full Stack Developer at Hello Future Technologies in Lahore, building full-stack web applications with React.js, Node.js, PostgreSQL, and MongoDB. I'm also pursuing my BS in CS and open to new full-stack developer opportunities.
              </p>
              <motion.div
                whileHover={{ scale: 1.01 }}
                style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius)', background: 'var(--accent-lt)', border: '1px solid rgba(37,99,235,0.15)', marginBottom: '2rem' }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>CAREER OBJECTIVE</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.7 }}>
                  To grow as a Full Stack Developer by contributing to impactful real-world systems, applying my skills across the entire web stack, and continuously learning in a collaborative environment.
                </p>
              </motion.div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: '1rem' }}>INTERESTS & HOBBIES</p>
              <div className="interests-grid">
                {interests.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -3, borderColor: 'var(--accent)' }}
                    style={{ padding: '0.9rem 1rem', borderRadius: 'var(--radius)', background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', gap: '0.6rem', alignItems: 'center', cursor: 'default' }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--ink)' }}>{item.label}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <MagneticButton href="/resume.pdf" target="_blank" rel="noreferrer" style={{ padding: '0.75rem 1.75rem', fontSize: '0.85rem', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 500, textDecoration: 'none' }}>
                  ↓ Download Resume
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 0 5rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <RevealText><div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Experience & Education</div></RevealText>
          <RevealText delay={0.1}><h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '3rem' }}>My Journey</h2></RevealText>
          <AnimatedTimeline />
        </div>
      </section>

      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          <RevealText><div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Certifications</div></RevealText>
          <RevealText delay={0.1}><h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '2.5rem' }}>Credentials</h2></RevealText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {certs.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <TiltCard className="card" style={{ padding: '1.25rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>UNIVERSITY OF MICHIGAN · COURSERA</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.35 }}>{c}</h3>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
