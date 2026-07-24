import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import Preloader from './components/Preloader.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('mh_visited'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleTheme = () => setDark(d => !d)

  const handlePreloaderDone = () => {
    sessionStorage.setItem('mh_visited', '1')
    setLoading(false)
  }

  return (
    <>
      {loading && <Preloader onDone={handlePreloaderDone} />}
      {!loading && (
        <SmoothScroll>
          {!isMobile && <CursorTrail />}
          <Navbar onToggleTheme={toggleTheme} isDark={dark} />
          <CommandPalette toggleTheme={toggleTheme} />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}