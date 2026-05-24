import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';

export function Home() {
  return (
    <main>

      <Hero />

      <About />

      <Projects />

      <Experience />

      <Contact />

    </main>
  );
}
