import { profile } from '../data/projects.js'

const links = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: '✉' },
  { label: 'GitHub', href: profile.github, icon: '⌥' },
  { label: 'LinkedIn', href: profile.linkedin, icon: 'in' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 bg-surface/60">
      <div className="layer-divider" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* identidade */}
          <div className="text-center md:text-left">
            <p className="text-gradient text-2xl font-bold">{profile.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-soft">
              {profile.role}
            </p>
          </div>

          {/* contato */}
          <div className="text-center md:text-right">
            <p className="mb-4 font-mono text-xs tracking-widest text-accent">
              // VAMOS CONVERSAR?
            </p>
            <div className="flex justify-center gap-3 md:justify-end">
              {links.map((l) => (
                <a
                  key={l.label}
                  data-cursor-hover
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-accent hover:shadow-[0_0_18px_var(--glow)]"
                >
                  <span className="font-mono text-accent">{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-center">
          <p className="font-mono text-xs text-soft">
            © {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
