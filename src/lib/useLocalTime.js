import { useEffect, useState } from 'react';

/**
 * Ticking wall-clock for a given IANA timezone. Updates once per second.
 * Defaults to Lahore (Zaier's location).
 *
 * @param {string} timeZone  IANA tz, e.g. 'Asia/Karachi'.
 * @returns {string} e.g. "21:47:03"
 */
export function useLocalTime(timeZone = 'Asia/Karachi') {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
