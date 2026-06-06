import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Card com tilt 3D e glow que seguem a posição do mouse.
export default function ProjectCard({ project, onClick }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--gx', `${x}px`)
    ref.current.style.setProperty('--gy', `${y}px`)
    setTilt({
      rx: ((y / rect.height) - 0.5) * -10,
      ry: ((x / rect.width) - 0.5) * 10,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        data-cursor-hover
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        className="glass group relative overflow-hidden rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_0_40px_var(--glow)]"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* glow seguindo o cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(350px circle at var(--gx, 50%) var(--gy, 50%), var(--glow), transparent 70%)',
          }}
        />

        {project.images?.[0] && (
          <div className="mb-5 -mx-1 overflow-hidden rounded-xl border border-line">
            <img
              src={project.images[0]}
              alt={`Preview de ${project.title}`}
              loading="lazy"
              className="h-44 w-full object-cover object-top opacity-90 transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
            />
          </div>
        )}

        <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-soft">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techs.map((t) => (
            <span
              key={t}
              className="rounded-md border border-accent-2/20 bg-accent-2/5 px-2.5 py-1 font-mono text-xs text-accent-2"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-accent opacity-60 transition-opacity group-hover:opacity-100">
          ver detalhes →
        </p>
      </div>
    </motion.div>
  )
}
