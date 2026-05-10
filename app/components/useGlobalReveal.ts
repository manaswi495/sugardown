import {useEffect} from 'react';

const REVEAL_SELECTOR = [
  'main section',
  'main article',
  'main .sd-page > *',
  'main .sd-catalog .products-grid .product-item',
  'main .sd-pdp-buy-card',
  'main .sd-pdp-details',
  'main .cart-line',
  'main .sd-cart-summary',
  'main .account > *',
  'main .account-addresses > *',
  'main .account-profile > *',
  'main .account-order > *',
  'main .sdp-legal-content > *',
].join(', ');

/**
 * Adds subtle staggered scroll-reveal animation to non-home routes.
 * Home already has its own reveal system and should remain untouched.
 */
export function useGlobalReveal(pathname: string) {
  useEffect(() => {
    if (pathname === '/') return;

    const main = document.querySelector('.sd-layout-stack > main');
    if (!main || main.querySelector('.sd-home-root')) return;

    const targets = Array.from(main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
      .filter((el) => !el.closest('.sd-home-root'))
      .slice(0, 120);

    if (!targets.length) return;

    targets.forEach((el, index) => {
      el.dataset.sdReveal = 'true';
      el.style.setProperty('--sd-reveal-delay', `${Math.min(index * 40, 380)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('sd-reveal-in');
            observer.unobserve(target);
          }
        }
      },
      {threshold: 0.12, rootMargin: '0px 0px -8% 0px'},
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      for (const el of targets) {
        el.classList.remove('sd-reveal-in');
        delete el.dataset.sdReveal;
        el.style.removeProperty('--sd-reveal-delay');
      }
    };
  }, [pathname]);
}
