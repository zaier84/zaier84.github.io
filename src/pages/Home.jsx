import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Stats } from '@/components/Stats';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Stats />
      <Experience />
      <Contact />
    </>
  );
}
