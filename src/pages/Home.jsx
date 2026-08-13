import { Thesis } from '@/components/Thesis';
import { Builds } from '@/components/Builds';
import { Readouts } from '@/components/Readouts';
import { Record } from '@/components/Record';
import { Contact } from '@/components/Contact';

/**
 * Evidence first: the thesis states what the work guarantees, then the work
 * itself, then the figures behind it. There is no "about" section — the bio is
 * a margin note beside the builds.
 */
export function Home() {
  return (
    <>
      <Thesis />
      <Builds />
      <Readouts />
      <Record />
      <Contact />
    </>
  );
}
