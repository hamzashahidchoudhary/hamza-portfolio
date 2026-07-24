import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import PageWrapper from '../components/PageWrapper.jsx'
import AnimatedBg from '../components/AnimatedBg.jsx'
import TiltCard from '../components/TiltCard.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import RevealText from '../components/RevealText.jsx'

// ─────────────────────────────────────────────
//  EMAILJS CONFIG
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_9xmoc68'
const EMAILJS_TEMPLATE_ID = 'template_y5h9ous'
const EMAILJS_PUBLIC_KEY  = 'DYcOZCnGxQfxhvysn'

const contacts = [
  { label: 'Email',    value: 'muhammad.hamza.dev@outlook.com', href: 'mailto:muhammad.hamza.dev@outlook.com', desc: 'Best way to reach me' },
  { label: 'Phone',    value: '+92 323 2148369',                href: 'tel:+923232148369',                    desc: 'Call or WhatsApp' },
  { label: 'LinkedIn', value: 'hamzashahidchoudhary',           href: 'https://www.linkedin.com/in/hamzashahidchoudhary/', desc: 'Connect professionally' },
  { label: 'Location', value: 'Rahim Yar Khan, Punjab, Pakistan', desc: 'Open to remote worldwide' },
]

function SuccessBurst() {
  const particles = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div style={{ position: 'relative', width: 56, height: 56, margin: '0 auto 1.25rem' }}>
      {particles.map(i => {
        const angle = (i / particles.length) * Math.PI * 2
        const dist = 40 + Math.random() * 20
        const colors = ['#2563eb', '#16a34a', '#7c3aed', '#f59e0b']
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 6, height: 6, borderRadius: '50%',
              background: colors[i % colors.length],
            }}
          />
        )
      })}
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
        style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-lt)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', position: 'relative', zIndex: 1 }}
      >✓</motion.div>
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setErrorMsg('Something went wrong. Please try emailing me directly.')
    }
  }

  const inputBase = {
    width: '100%', display: 'block',
    fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 300,
    color: 'var(--ink)', background: 'var(--bg)',
    border: '1px solid var(--border)', borderRadius: 8,
    padding: '0.75rem 1rem', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <PageWrapper>
      <AnimatedBg />
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>

      <section className="section">
        <div className="container">
          <RevealText><div className="eyebrow" style={{ marginBottom: '0.75rem' }}>Get In Touch</div></RevealText>
          <RevealText delay={0.1}>
            <h1 className="display" style={{ marginBottom: '1rem' }}>
              Let's work<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>together.</span>
            </h1>
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: 'var(--muted)', fontWeight: 300, maxWidth: 480, lineHeight: 1.8, marginBottom: '4rem' }}
          >
            I'm actively looking for full-stack developer roles and open to freelance projects. Reach out — I reply within 24 hours.
          </motion.p>

          <div className="contact-grid">

            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {contacts.map((c, i) => (
                  <motion.div key={c.label}
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    whileHover={{ x: 4 }}
                    className="card"
                    style={{ padding: '1.1rem 1.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{c.label.toUpperCase()}</p>
                      {c.href
                        ? <a href={c.href} style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent)', wordBreak: 'break-all' }}>{c.value}</a>
                        : <p style={{ fontSize: '0.85rem', color: 'var(--ink2)' }}>{c.value}</p>
                      }
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', marginTop: '0.1rem' }}>{c.desc}</p>
                    </div>
                    {c.href && <span style={{ color: 'var(--accent)', flexShrink: 0 }}>↗</span>}
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{ boxShadow: ['0 0 0px rgba(22,163,74,0)', '0 0 16px rgba(22,163,74,0.15)', '0 0 0px rgba(22,163,74,0)'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ padding: '1.1rem 1.3rem', borderRadius: 'var(--radius-lg)', background: 'var(--green-lt)', border: '1px solid rgba(22,163,74,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--green)', letterSpacing: '0.1em' }}>AVAILABLE FOR WORK</span>
                </div>
                <p style={{ color: 'var(--ink2)', fontSize: '0.86rem', fontWeight: 300, lineHeight: 1.7 }}>
                  Open to full-time roles and freelance projects. Based in Pakistan, happy to work remotely worldwide.
                </p>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
              <TiltCard className="card" style={{ padding: '2rem' }}>

                {status === 'sent' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 0' }}
                  >
                    <SuccessBurst />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Message sent!</h3>
                    <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                      I'll get back to you within 24 hours.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Send a message</h2>
                      <p style={{ fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>
                        Fill out the form — it lands directly in my inbox.
                      </p>
                    </div>

                    <div className="form-row">
                      {[['from_name', 'text', 'Your Name', true], ['from_email', 'email', 'Email Address', true]].map(([n, t, ph, req]) => (
                        <div key={n}>
                          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.35rem' }}>
                            {ph.toUpperCase()}
                          </label>
                          <input name={n} type={t} placeholder={ph} required={req}
                            value={n === 'from_name' ? form.name : form.email}
                            onChange={e => setForm(f => ({ ...f, [n === 'from_name' ? 'name' : 'email']: e.target.value }))}
                            style={inputBase}
                            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.35rem' }}>SUBJECT</label>
                      <input name="subject" type="text" placeholder="What's this about?"
                        value={form.subject} onChange={handle}
                        style={inputBase}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.35rem' }}>MESSAGE</label>
                      <textarea name="message" rows={5} placeholder="Tell me about your project or opportunity..." required
                        value={form.message} onChange={handle}
                        style={{ ...inputBase, resize: 'vertical', minHeight: 120 }}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>

                    {status === 'error' && (
                      <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.85rem', color: '#dc2626' }}>
                        ⚠ {errorMsg}
                      </div>
                    )}

                    <MagneticButton
                      onClick={submit}
                      style={{
                        width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.9rem',
                        background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8,
                        fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'pointer',
                        opacity: status === 'sending' ? 0.7 : 1,
                      }}
                    >
                      {status === 'sending' ? '⏳ Sending...' : 'Send Message →'}
                    </MagneticButton>
                  </form>
                )}
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
