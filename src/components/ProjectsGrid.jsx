import { useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects } from '../data/projects.js'

export default function ProjectsGrid() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projetos" className="relative z-10 bg-elevated/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 font-mono text-sm tracking-widest text-accent">// PROJETOS</h2>
        <p className="mb-12 text-3xl font-bold text-ink">Coisas que eu construí</p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
