import { motion } from 'framer-motion'
import TechTag from './TechTag.jsx'
import { profile, stackCategories } from '../data/projects.js'

export default function About() {
  return (
    <section id="sobre" className="relative z-10 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-2 font-mono text-sm tracking-widest text-accent"
        >
          // SOBRE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-10 text-3xl font-bold text-ink"
        >
          Quem eu sou
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl border-l-2 border-l-accent/60 px-8 py-8 text-left shadow-[0_0_50px_var(--accent-soft)]"
        >
          {profile.about.map((paragraph, i) => (
            <p
              key={i}
              className="mt-5 text-base leading-relaxed text-ink-soft first:mt-0 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 mt-16 text-2xl font-bold text-ink"
        >
          Principais Stacks e Competências
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {stackCategories.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h3 className="mb-3 font-mono text-xs tracking-wide text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechTag key={item} className="px-3 py-1 text-xs">
                    {item}
                  </TechTag>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
