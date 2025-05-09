// src/components/HeroAnimations.tsx
"use client";

import { useEffect } from "react";

export const HeroAnimations = () => {
  useEffect(() => {
    const container = document.querySelector(".hero-beans-container");
    if (!container) return;

    const createBean = () => {
      const bean = document.createElement("div");
      bean.className =
        "absolute w-3 h-5 bg-coffee-accent rounded-full opacity-70 animate-float";
      bean.style.left = `${Math.random() * 100}%`;
      bean.style.top = `${Math.random() * 100}%`;
      bean.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(bean);

      setTimeout(() => {
        bean.remove();
      }, 15000);
    };

    for (let i = 0; i < 15; i++) {
      setTimeout(createBean, i * 300);
    }

    const interval = setInterval(createBean, 800);
    return () => clearInterval(interval);
  }, []);

  return null;
};
