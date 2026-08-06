import CustomCursor from './components/CustomCursor.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ProjectsGrid from './components/ProjectsGrid.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <ThemeToggle />
      <Hero />
      <div className="layer-divider" />
      <About />
      <div className="layer-divider" />
      <ProjectsGrid />
      <Footer />
    </>
  )
}
