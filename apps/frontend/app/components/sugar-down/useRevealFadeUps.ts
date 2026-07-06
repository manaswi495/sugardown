import {useLayoutEffect, useRef} from 'react';

/**
 * Adds `.visible` to `.fade-up` descendants when they enter the viewport (or
 * immediately if already on-screen). Respects `prefers-reduced-motion`.
 */
export function useRevealFadeUps() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || typeof window === 'undefined') return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = (el: Element) => {
      el.classList.add('visible');
    };

    if (reduced) {
      root.querySelectorAll('.fade-up').forEach(reveal);
      return;
    }

    function inInitialView(el: Element) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return r.top < vh * 0.9 && r.bottom > vh * 0.06;
    }

    const els = root.querySelectorAll('.fade-up');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      {root: null, rootMargin: '0px 0px -7% 0px', threshold: 0.06},
    );

    els.forEach((el) => {
      if (inInitialView(el)) {
        reveal(el);
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return ref;
}
