import { useEffect, useRef } from 'react';

/**
 * Observes all `.ps-rv` elements inside the returned ref and adds `.ps-in`
 * when they scroll into view. Respects prefers-reduced-motion via CSS.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ps-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll('.ps-rv').forEach((el) => io.observe(el));

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('.ps-rv')) io.observe(node);
          node.querySelectorAll('.ps-rv').forEach((el) => io.observe(el));
        });
      });
    });
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return ref;
}
