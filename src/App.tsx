import { useEffect } from 'react';
import { navLinks } from './data/siteConfig';
import { useActiveSection } from './lib/hooks';
import { applySeo } from './lib/seo';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/about/Skills';
import Approach from './components/about/Approach';
import Brands from './components/about/Brands';
import Education from './components/about/Education';
import Portfolio from './components/portfolio/Portfolio';
import ExperienceTimeline from './components/timeline/ExperienceTimeline';
import Contact from './components/contact/Contact';

const sectionIds = navLinks.map((l) => l.id);

export default function App() {
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    applySeo();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-champagne focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main">
        <Hero />
        <About />
        <Brands />
        <Skills />
        <Portfolio />
        <ExperienceTimeline />
        <Approach />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
