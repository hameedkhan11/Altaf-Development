"use client";
import React, { useRef, useEffect, useCallback } from 'react';

interface BlogCardAnimationsProps {
  index: number;
}

export const BlogCardAnimations: React.FC<BlogCardAnimationsProps> = ({ index }) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const isInitialized = useRef(false);

  const animateCard = useCallback(() => {
    if (!cardRef.current || isInitialized.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'none';
      return;
    }

    isInitialized.current = true;
    const card = cardRef.current;
    const delay = Math.min(index * 80, 400);

    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      card.style.transition = `all 0.6s cubic-bezier(0.25, 0.25, 0, 1) ${delay}ms`;

      const childElements = card.querySelectorAll('.animate-child') as NodeListOf<HTMLElement>;
      childElements.forEach((el, i) => {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = `all 0.4s ease-out ${delay + 150 + i * 80}ms`;
        });
      });
    });
  }, [index]);

  const setupHoverEffects = useCallback(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseEnter = () => {
      card.style.transform = 'translateY(-8px) scale(1.01)';
      card.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.2)';
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.25, 0, 1)';
    };

    const handleMouseLeave = () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.25, 0, 1)';
    };

    if (!('ontouchstart' in window)) {
      card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const script = document.currentScript || document.querySelector(`script[data-index="${index}"]`);
    const card = script?.previousElementSibling as HTMLElement;

    if (card?.classList.contains('blog-card')) {
      cardRef.current = card;

      // Dynamically import the shared observer
      import('../blogs/animationObserver').then(({ getSharedObserver }) => {
        const observer = getSharedObserver();
        if (observer) {
          observer.observe(card, () => {
            animateCard();
            setupHoverEffects();
          });
        }
      });
    }

    return () => {
      if (cardRef.current) {
        import('../blogs/animationObserver').then(({ getSharedObserver }) => {
          const observer = getSharedObserver();
          if (observer) {
            observer.unobserve(cardRef.current!);
          }
        });
      }
    };
  }, [index, animateCard, setupHoverEffects]);

  return <script data-index={index} style={{ display: 'none' }} />;
};
