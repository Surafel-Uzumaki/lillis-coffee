"use client";

import { useEffect } from "react";
import Navbar from "./Navbar";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    const container = document.querySelector(".hero-beans-container");
    if (!container) return;

    const createBean = () => {
      const bean = document.createElement("div");
      bean.className =
        "absolute w-2.5 h-4 bg-white/10 rounded-full animate-float backdrop-blur-[1px] border border-white/20";
      bean.style.left = `${Math.random() * 100}%`;
      bean.style.top = `${Math.random() * 100}%`;
      bean.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(bean);

      setTimeout(() => {
        bean.remove();
      }, 15000);
    };

    for (let i = 0; i < 20; i++) {
      setTimeout(createBean, i * 250);
    }

    const interval = setInterval(createBean, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Coffee beans background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Content container - right-center aligned */}
      <div className="relative h-full w-full flex items-center justify-end pt-16">
        {" "}
        {/* Added pt-16 to account for navbar height */}
        <div className="w-full max-w-2xl mx-6 sm:mx-12 lg:mx-24 xl:mr-32 py-24 z-10">
          {/* Decorative element */}
          <div className="flex justify-end items-center mb-6">
            <span className="text-xs font-medium tracking-widest text-white/80 uppercase mr-4">
              Since 2015
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-coffee-accent to-transparent"></div>
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight text-right">
            <span className="block font-serif italic text-coffee-light">
              Lilli&apos;s Coffee
            </span>
            <span className="block">Roasters</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 font-light leading-relaxed text-right">
            Crafting exceptional coffee experiences through passion and
            precision.
          </p>

          {/* Stylish buttons - right aligned */}
          <div className="flex justify-end gap-4">
            <Link
              href="/menu"
              className="relative px-8 py-3.5 bg-coffee-accent text-white font-medium rounded-sm group overflow-hidden transition-all duration-300 hover:bg-coffee-dark flex items-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Menu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

            <Link
              href="/about"
              className="relative px-8 py-3.5 border border-white/30 text-white font-medium rounded-sm group overflow-hidden transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              <span className="relative z-10">Our Story</span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Additional info - right aligned */}
          <div className="mt-16 flex justify-end gap-8">
            <div className="flex items-center gap-4">
              <div className="text-white font-medium text-right">
                Single Origin
                <div className="text-sm text-white/60">Premium Beans</div>
              </div>
              <div className="text-2xl text-coffee-accent">☕</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white font-medium text-right">
                Award Winning
                <div className="text-sm text-white/60">Since 2018</div>
              </div>
              <div className="text-2xl text-coffee-accent">🏆</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator - centered */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <div className="h-8 w-px bg-gradient-to-t from-white/40 to-transparent"></div>
          <span className="text-xs text-white/60 mt-2 tracking-widest">
            SCROLL
          </span>
        </div>
      </div>

      {/* Floating coffee beans container */}
      <div className="hero-beans-container absolute inset-0 z-0 pointer-events-none"></div>
    </section>
  );
}
