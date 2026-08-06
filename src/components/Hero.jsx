import { useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/projects.js'

// Hero com spotlight radial que segue o mouse.
export default function Hero() {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-24 text-center"
      style={{
        background:
          'radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), var(--accent-soft), transparent 70%)',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-sm tracking-widest text-accent"
      >
        &lt;/&gt; OLÁ, EU SOU
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-gradient text-5xl font-bold tracking-tight md:text-7xl"
      >
        {profile.name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-3 text-xl text-soft md:text-2xl"
      >
        {profile.role}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-gradient mt-8 max-w-2xl text-xl font-semibold leading-snug md:text-2xl"
      >
        “{profile.aboutLead}”
      </motion.p>

      <motion.a
        href="#projetos"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="group mt-16 flex flex-col items-center gap-2 text-sm text-soft transition-colors hover:text-accent"
      >
        ver projetos
        <span className="animate-bounce text-lg">↓</span>
      </motion.a>
    </section>
  )
}
