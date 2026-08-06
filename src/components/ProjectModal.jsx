import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Section({ title, children }) {
  return (
    <div className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h4 className="mb-3 font-mono text-sm tracking-widest text-accent">
        // {title}
      </h4>
      {children}
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl border border-line bg-surface p-6 shadow-2xl md:p-10"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Fechar"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-line text-soft transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>

            <h3 className="text-gradient pr-10 text-3xl font-bold">{project.title}</h3>
            <p className="mt-2 text-soft">{project.tagline}</p>

            <div className="mt-8">
              <Section title="problema resolvido">
                <p className="leading-relaxed text-ink-soft">{project.problem}</p>
              </Section>

              <Section title="tecnologias">
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-accent-2/20 bg-accent-2/5 px-3 py-1.5 font-mono text-sm text-accent-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="arquitetura">
                <p className="leading-relaxed text-ink-soft">{project.architecture}</p>
              </Section>

              <Section title="decisões técnicas">
                <ul className="space-y-2">
                  {project.decisions.map((d, i) => (
                    <li key={i} className="flex gap-3 text-ink-soft">
                      <span className="text-accent">▸</span>
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="estrutura de pastas">
                <pre className="overflow-x-auto rounded-xl border border-line bg-elevated p-5 font-mono text-sm leading-relaxed text-ink-soft">
                  {project.folderTree}
                </pre>
              </Section>

              {project.diagramUrl && (
                <Section title="diagrama de arquitetura">
                  <div className="overflow-hidden rounded-xl border border-line">
                    <div className="flex items-center gap-2 border-b border-line bg-elevated px-4 py-2.5">
                      <span className="h-3 w-3 rounded-full bg-red-400/80" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                      <span className="h-3 w-3 rounded-full bg-green-400/80" />
                      <span className="ml-3 flex-1 truncate rounded-md bg-base px-3 py-1 font-mono text-xs text-soft">
                        Miro — visualização apenas
                      </span>
                    </div>
                    <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                      <iframe
                        src={project.diagramUrl}
                        title={`Diagrama de arquitetura de ${project.title}`}
                        loading="lazy"
                        allow="fullscreen; clipboard-read; clipboard-write"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full bg-white"
                      />
                    </div>
                  </div>
                </Section>
              )}

              {project.images?.length > 0 && (
                <Section title="capturas de tela">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.images.map((src, i) => (
                      <a
                        key={src}
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className={`overflow-hidden rounded-xl border border-line transition-all hover:border-accent/50 hover:shadow-[0_0_25px_var(--glow)] ${
                          i === 0 && project.images.length % 2 !== 0 ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Captura de tela ${i + 1} de ${project.title}`}
                          loading="lazy"
                          className="w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                        />
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="repositório">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 rounded-lg border border-accent/40 px-4 py-2 text-accent transition-all hover:bg-accent/10 hover:shadow-[0_0_18px_var(--glow)]"
                  >
                    Ver no GitHub ↗
                  </a>
                ) : (
                  <p className="font-mono text-sm text-soft">
                    🔒 Repositório privado — projeto particular
                  </p>
                )}
              </Section>

              {project.liveUrl && (
                <Section title="projeto ao vivo">
                  {/* mockup de janela de browser com iframe */}
                  <div className="overflow-hidden rounded-xl border border-line">
                    <div className="flex items-center gap-2 border-b border-line bg-elevated px-4 py-2.5">
                      <span className="h-3 w-3 rounded-full bg-red-400/80" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                      <span className="h-3 w-3 rounded-full bg-green-400/80" />
                      <span className="ml-3 flex-1 truncate rounded-md bg-base px-3 py-1 font-mono text-xs text-soft">
                        {project.liveUrl}
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="ml-2 whitespace-nowrap text-xs text-accent hover:underline"
                      >
                        abrir ↗
                      </a>
                    </div>
                    <iframe
                      src={project.liveUrl}
                      title={`Demo de ${project.title}`}
                      loading="lazy"
                      className="h-[420px] w-full bg-white md:h-[500px]"
                    />
                  </div>
                </Section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
