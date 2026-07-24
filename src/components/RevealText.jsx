import { motion } from 'framer-motion'

export default function RevealText({ children, delay = 0, style, className }) {
  return (
    <div style={{ overflow: 'hidden', ...style }} className={className}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}