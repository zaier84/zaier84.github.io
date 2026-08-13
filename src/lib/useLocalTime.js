import { useEffect, useMemo, useState } from 'react';

/**
 * Ticking wall-clock for a given IANA timezone. Updates once per second.
 * Defaults to Lahore (Zaier's location).
 *
 * @param {string} timeZone  IANA tz, e.g. 'Asia/Karachi'.
 * @returns {string} e.g. "21:47:03"
 */
export function useLocalTime(timeZone = 'Asia/Karachi') {
  // Building the formatter is the expensive part; it only depends on the zone,
  // so it must not be rebuilt on every one-second tick.
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone,
      }),
    [timeZone]
  );

  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [formatter]);

  return time;
}
