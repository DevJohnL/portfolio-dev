export default function TechTag({ children, className = '' }) {
  return (
    <span
      data-cursor-hover
      className={`rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-soft transition-all duration-300 hover:border-accent/60 hover:text-accent hover:shadow-[0_0_18px_var(--glow)] ${className}`}
    >
      {children}
    </span>
  )
}
