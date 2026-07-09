import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'

const stagger = { animate: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const techStack = ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Flutter', 'Firebase', 'JavaScript', 'Git']

const projects = [
  {
    title: 'Wayfare — Property Booking Platform',
    category: 'Web · Full-Stack Project',
    desc: 'Full-stack Airbnb-style booking platform with three user roles, geospatial map search, and real Stripe payment integration. Features host/admin dashboards, JWT auth, Cloudinary image uploads, and a booking-conflict resolution system — deployed on Vercel with a MongoDB Atlas backend.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
  },
  {
    title: 'Maison — E-Commerce Platform',
    category: 'Web · Full-Stack Project',
    desc: 'Full-stack e-commerce platform with product management, shopping cart, checkout, and an admin panel. Secured with JWT auth, backed by PostgreSQL + Prisma, with Cloudinary image delivery — deployed on Vercel & Railway.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
  },
  {
    title: 'Lost & Found App',
    category: 'Mobile · BSCS Final Year Project',
    desc: 'Real-time lost & found platform with role-based auth, live chat, push notifications, and an admin analytics panel.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
  },
  {
    title: 'Delicia Cafe Web System',
    category: 'Web · ADP Final Year Project',
    desc: 'Full-featured cafe ordering system with cart management, Google Maps integration, and animated responsive UI.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
  },
  {
    title: 'Whispr — Real-Time Chat Application',
    category: 'Web · Full-Stack Project',
    desc: 'Production-ready real-time chat application with private messaging, emoji reactions, message editing and deletion, reply threading, file sharing, and browser notifications. Features a polished dark UI, mobile-responsive design, and is live-deployed on Railway.',
    stack: ['Laravel 12', 'React 19', 'MySQL', 'Redis', 'Reverb', 'Tailwind CSS'],
  },
]

export default function Home() {
  return (
    <PageWrapper>
      <AnimatedBg />

      <section style={{ minHeight: '93vh', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="initial" animate="animate" style={{ maxWidth: 720 }}>
            <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
              <span className="tag green" style={{ gap: '0.5rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                Available for work
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="display" style={{ marginBottom: '1.5rem' }}>
              Hi, I'm Hamza —<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Full Stack Developer</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: 'var(--ink2)', fontWeight: 300, lineHeight: 1.75, maxWidth: 560, marginBottom: '2.5rem' }}>
              Based in Rahim Yar Khan, Pakistan. I build responsive web and mobile applications using React.js, Flutter, Firebase, and modern backend stacks.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link to="/projects" className="btn btn-primary">View My Projects</Link>
              <a href="mailto:muhammad.hamza.dev@outlook.com" className="btn btn-outline">Get in Touch</a>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--muted)', marginBottom: '0.75rem' }}>TECH I WORK WITH</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {techStack.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}
          >
            {[['8+', 'Months Exp.'], ['5', 'Projects'], ['2', 'Degrees'], ['20+', 'Technologies']].map(([n, l]) => (
              <div key={l} style={{ padding: '1.75rem 1.25rem', background: 'var(--bg2)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>Featured Work</div>
              <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Projects I've built</h2>
            </div>
            <Link to="/projects" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.06em' }}>
              All projects →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {projects.map((p, i) => (
              <motion.div key={p.title} className="card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '1.75rem' }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{p.category}</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--ink)' }}>{p.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.25rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {p.stack.map(s => <span key={s} className="tag blue">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Open to Opportunities</div>
            <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              Let's build something<br /><span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>together.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontWeight: 300, maxWidth: 400, margin: '0 auto 2rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Actively looking for full-stack developer roles. Open to remote and local opportunities.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '0.8rem 2rem' }}>Start a Conversation</Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
