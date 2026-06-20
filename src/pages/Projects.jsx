import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'

const projects = [
  { id: 1, title: 'Maison — E-Commerce Platform', category: 'Web', label: 'Full-Stack Project',
    desc: 'A full-stack e-commerce platform with a complete shopping experience — product catalog, persistent cart, and checkout — plus a secure admin panel for managing inventory and product imagery. Built with a React frontend, an Express REST API, and a PostgreSQL database, deployed across Vercel and Railway.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Cloudinary'],
    features: ['Product management & catalog', 'Shopping cart with persistence', 'Full checkout flow', 'JWT auth with protected routes', 'Admin dashboard', 'Cloudinary image uploads & CDN'],
  },
  { id: 2, title: 'Lost & Found Mobile App', category: 'Mobile', label: 'BSCS Final Year Project',
    desc: 'A real-time lost & found platform for campus use with role-based authentication for Students, Faculty, and Staff. Features live chat, push notifications, image uploads, and an admin panel with full moderation and analytics.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Firebase Auth', 'Cloud Messaging'],
    features: ['Role-based auth (Student / Faculty / Staff)', 'Real-time posts with search & filter', 'Image upload support', 'Live chat system', 'Push notifications', 'Admin moderation & analytics panel'],
  },
  { id: 3, title: 'Delicia Cafe Web System', category: 'Web', label: 'ADP Final Year Project',
    desc: 'A complete web-based cafe ordering system with cart and order management, user authentication, Google Maps API integration, and a modern animated UI with fully responsive design.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'Google Maps API'],
    features: ['Cart & order management', 'User authentication system', 'Google Maps API integration', 'Modern UI with animations', 'Fully responsive design'],
  },
  { id: 4, title: 'Wayfare — Property Booking Platform', category: 'Web', label: 'Full-Stack Project',
    desc: 'A full-stack Airbnb-style booking platform supporting three user roles — guests, hosts, and admins — with real Stripe Checkout payments, geospatial map search powered by MongoDB, and host/admin analytics dashboards. Includes a booking-conflict resolution system, policy-based cancellation refunds, and Cloudinary-backed image uploads.',
    stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Cloudinary', 'Leaflet'],
    features: ['Three-role auth (Guest / Host / Admin)', 'Geospatial search with interactive map', 'Real Stripe Checkout + webhook confirmation', 'Booking conflict & refund logic', 'Host listing management with photo uploads', 'Admin analytics dashboard'],
  },
]

const cats = ['All', 'Mobile', 'Web']

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <PageWrapper>
      <AnimatedBg />
      <style>{`
        .project-card-inner { display: grid; grid-template-columns: 1fr 1.1fr; gap: 2.5rem; align-items: start; }
        @media (max-width: 768px) { .project-card-inner { grid-template-columns: 1fr; gap: 1.5rem; } }
      `}</style>
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>My Work</div>
            <h1 className="display" style={{ marginBottom: '1rem' }}>
              Projects I've<br /><span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>built & shipped.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontWeight: 300, maxWidth: 500, lineHeight: 1.8, marginBottom: '3rem' }}>
              From final year university projects to internship work — each project taught me something new about building real software.
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.06em',
                padding: '0.45rem 1.1rem', borderRadius: 7, border: '1px solid',
                borderColor: active === c ? 'var(--accent)' : 'var(--border)',
                background: active === c ? 'var(--accent-lt)' : 'var(--bg2)',
                color: active === c ? 'var(--accent)' : 'var(--muted)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{c}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.07 }} className="card" style={{ padding: '2rem' }}
                >
                  <div className="project-card-inner">
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <span className={`tag ${p.category === 'Mobile' ? 'blue' : 'green'}`}>{p.category}</span>
                        <span className="tag">{p.label}</span>
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: 'var(--ink)', marginBottom: '1rem', lineHeight: 1.2 }}>{p.title}</h2>
                      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.75, marginBottom: '1.5rem' }}>{p.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {p.stack.map(s => <span key={s} className="tag blue">{s}</span>)}
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--border)' }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1rem' }}>KEY FEATURES</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {p.features.map((f, j) => (
                          <li key={j} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--ink2)', fontWeight: 300, alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>✓</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)', background: 'var(--bg2)' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>MORE COMING SOON</p>
            <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.88rem' }}>Currently working on new projects. Check back or get in touch!</p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
