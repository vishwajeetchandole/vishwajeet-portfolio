import React, { useEffect, useState, useRef } from 'react';

export default function StatCounter({ endValue, prefix = "", suffix = "", isStatic = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isStatic) return;

    let start = 0;
    const end = parseInt(endValue, 10);
    if (isNaN(end)) {
      setCount(endValue);
      return;
    }

    const duration = 1200; // 1.2s animation
    const steps = Math.min(end, 60);
    const stepDuration = duration / steps;
    const increment = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, endValue, isStatic]);

  return (
    <span ref={ref}>
      {isStatic ? (
        <span>{prefix}{endValue}{suffix}</span>
      ) : (
        <span>{prefix}{count}{suffix}</span>
      )}
    </span>
  );
}
