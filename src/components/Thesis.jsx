import { profile } from '@/data/profile';
import { Section } from '@/components/Section';
import { BalanceBar } from '@/components/BalanceBar';

/**
 * Opens on the most characteristic true sentence about the work rather than on
 * a name and a job title. The name is already in the masthead; repeating it
 * here would spend the largest type on the least interesting fact.
 */
export function Thesis() {
  return (
    <Section
      id="thesis"
      label="thesis"
      labelAs="p"
      className="pt-16 pb-20 md:pt-28 md:pb-28"
    >
      <p className="font-data text-[11px] text-bone-dim">
        {profile.name} · {profile.title} · {profile.location}
      </p>

      <h1 className="font-display mt-7 max-w-[16ch] text-thesis font-semibold text-bone">
        {profile.thesis}
      </h1>

      <p className="mt-8 max-w-measure text-lg leading-relaxed text-bone-dim">
        {profile.lede}
      </p>

      <BalanceBar />
    </Section>
  );
}
