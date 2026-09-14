'use client';
import { useEffect, useRef } from 'react';
import s from './Editorial.module.css';

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nodes = ref.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.removeAttribute('data-pending'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    nodes.forEach(node => {
      if (node.getBoundingClientRect().top > window.innerHeight) node.setAttribute('data-pending', '');
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={s.page}>{children}</div>;
}
