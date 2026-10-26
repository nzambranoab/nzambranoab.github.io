import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const media = () => window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return media().matches ? 'dark' : 'light';
}

/** Light/dark theme that follows the system until the visitor picks one. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const mq = media();
    const onChange = () => setTheme(currentTheme());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage can be blocked; the theme still applies for this visit */
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
