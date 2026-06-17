import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'

const groups = [
  {
    label: 'Languages',
    color: '#2563eb',
    items: [
      { name: 'JavaScript', level: 85 },
      { name: 'HTML & CSS', level: 92 },
      { name: 'Dart', level: 80 },
      { name: 'PHP', level: 70 },
      { name: 'C++', level: 68 },
      { name: 'SQL / NoSQL', level: 78 },
    ],
  },
  {
    label: 'Frameworks & Tools',
    color: '#7c3aed',
    items: [
      { name: 'React.js', level: 82 },
      { name: 'Node.js & Express', level: 78 },
      { name: 'PostgreSQL & Prisma', level: 76 },
      { name: 'Flutter', level: 82 },
      { name: 'Firebase', level: 85 },
      { name: 'REST APIs', level: 80 },
      { name: 'Git & GitHub', level: 82 },
      { name: 'DBMS', level: 74 },
    ],
  },
  {
    label: 'Core Skills',
    color: '#16a34a',
    items: [
      { name: 'Full Stack Development', level: 82 },
      { name: 'Authentication & Security', level: 78 },
      { name: 'API Design & Integration', level: 80 },
      { name: 'Mobile App Development', level: 82 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Team Collaboration', level: 90 },
    ],
  },
]

function Bar({ name, level, color, i }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--ink2)', fontWeight: 400 }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', background: color, borderRadius: 2 }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <PageWrapper>
      <AnimatedBg />
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Expertise</div>
            <h1 className="display" style={{ marginBottom: '1rem' }}>
              Skills &<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Technologies.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontWeight: 300, maxWidth: 500, lineHeight: 1.8, marginBottom: '4rem' }}>
              My toolkit built through university, internship experience, and personal projects — covering the full web and mobile development stack.
            </p>
          </motion.div>

          {/* Skill bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
            {groups.map((g, gi) => (
              <motion.div
                key={g.label}
                className="card"
                style={{ padding: '2rem' }}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: g.color, flexShrink: 0 }} />
                  <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--ink2)' }}>{g.label.toUpperCase()}</h2>
                </div>
                {g.items.map((item, i) => (
                  <Bar key={item.name} name={item.name} level={item.level} color={g.color} i={i} />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Tech chips */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem', marginBottom: '3.5rem' }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>All Technologies</div>
            <h2 className="display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: '2rem' }}>Full Toolkit</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {['HTML5', 'CSS3', 'JavaScript', 'Dart', 'PHP', 'C++', 'SQL', 'NoSQL',
                'React.js', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT',
                'Flutter', 'Firebase', 'Firestore', 'REST APIs', 'Cloudinary',
                'Vercel', 'Railway', 'Git', 'GitHub', 'Google Maps API', 'DBMS',
                'UI/UX Design', 'Responsive Design'
              ].map((t, i) => (
                <motion.span
                  key={t}
                  className="tag"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'var(--accent-lt)', scale: 1.04 }}
                  style={{ cursor: 'default', fontSize: '0.75rem', padding: '0.3rem 0.85rem' }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3.5rem' }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Certifications</div>
            <h2 className="display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: '2rem' }}>Credentials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                'HTML5 & CSS3 Foundations',
                'Advanced Styling with Responsive Design',
                'JavaScript Interactivity',
                'Web Development Capstone Project',
              ].map((cert, i) => (
                <motion.div
                  key={cert}
                  className="card"
                  style={{ padding: '1.5rem' }}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                >
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                    UNIVERSITY OF MICHIGAN · COURSERA
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.35 }}>{cert}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
