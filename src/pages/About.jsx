import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'

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

export default function About() {
  return (
    <PageWrapper>
      <AnimatedBg />
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>About Me</div>
            <h1 className="display" style={{ marginBottom: '1.25rem' }}>
              Code is my craft,<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>people are my purpose.</span>
            </h1>
          </motion.div>

          <div className="about-grid" style={{ marginTop: '3rem' }}>
            <style>{`
              .about-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
              .interests-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
              @media (max-width: 768px) {
                .about-grid { grid-template-columns: 1fr; gap: 2rem; }
                .interests-grid { grid-template-columns: 1fr 1fr; }
              }
            `}</style>

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="about-avatar" style={{ background: 'linear-gradient(135deg, #e8f0fe 0%, #ede9fe 100%)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', marginBottom: '1.5rem' }}>
                <img src="/photo.jpeg" alt="Muhammad Hamza" style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', marginBottom: '0.75rem', border: '3px solid var(--accent)' }} />
                <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ink)' }}>Muhammad Hamza</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.2rem' }}>Full Stack Developer</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.1rem' }}>Rahim Yar Khan, Pakistan</p>
              </div>
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

            {/* Right */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.25rem' }}>
                I'm a <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Full Stack Developer</strong> with hands-on professional experience in web and mobile app development. I love turning complex problems into clean, performant solutions.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.8, marginBottom: '2rem' }}>
                I currently work as an Junior Full Stack Developer at Hello Future Technologies in Lahore, building full-stack web applications with React.js, Node.js, PostgreSQL, and MongoDB. I'm also pursuing my BS in CS and open to new full-stack developer opportunities.
              </p>
              <div style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius)', background: 'var(--accent-lt)', border: '1px solid rgba(37,99,235,0.15)', marginBottom: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>CAREER OBJECTIVE</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.7 }}>
                  To grow as a Full Stack Developer by contributing to impactful real-world systems, applying my skills across the entire web stack, and continuously learning in a collaborative environment.
                </p>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: '1rem' }}>INTERESTS & HOBBIES</p>
              <div className="interests-grid">
                {interests.map(item => (
                  <div key={item.label} style={{ padding: '0.9rem 1rem', borderRadius: 'var(--radius)', background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--ink)' }}>{item.label}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '3rem 0 5rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Experience & Education</div>
          <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '3rem' }}>My Journey</h2>
          {timeline.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <style>{`
                .timeline-row { display: grid; grid-template-columns: 130px 1fr; gap: 2rem; padding: 2rem 0; border-top: 1px solid var(--border); }
                @media (max-width: 600px) { .timeline-row { grid-template-columns: 1fr; gap: 0.75rem; } }
              `}</style>
              <div className="timeline-row">
                <div>
                  <span className={`tag ${item.type === 'work' ? 'blue' : ''}`} style={{ display: 'inline-block', marginBottom: '0.4rem' }}>{item.type === 'work' ? 'Work' : 'Education'}</span>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item.year}</p>
                </div>
                <div>
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
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </section>

      {/* CERTS */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Certifications</div>
          <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '2.5rem' }}>Credentials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {certs.map((c, i) => (
              <motion.div key={i} className="card" style={{ padding: '1.25rem' }}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>UNIVERSITY OF MICHIGAN · COURSERA</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.35 }}>{c}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}