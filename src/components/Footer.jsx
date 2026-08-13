import { profile } from '@/data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-plate flex-col gap-3 px-6 py-8 font-data text-[11px] text-bone-dim sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p>
          © {year} {profile.name}
        </p>
        <p>
          Set in Archivo, Instrument Sans and Spline Sans Mono.
        </p>
      </div>
    </footer>
  );
}
