"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
} from "framer-motion";
import {
  Mail,
  Download,
  ArrowUpRight,
  Circle,
  Send,
} from "lucide-react";

/* =========================================================
   FLUID BACKGROUND
========================================================= */
function FluidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute top-[-20vh] left-[-10vw] h-[60vh] w-[60vh] rounded-full bg-[#1a1a1a] blur-[120px] opacity-60 blob-1" />
      <div className="absolute top-[30vh] right-[-15vw] h-[55vh] w-[55vh] rounded-full bg-[#FF5A00]/15 blur-[140px] opacity-80 blob-2" />
      <div className="absolute bottom-[-20vh] left-[20vw] h-[70vh] w-[70vh] rounded-full bg-[#FF5A00]/8 blur-[160px] opacity-70 blob-3" />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_80%)]" />
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}

/* =========================================================
   BRAND LOGO — Hexagonal DCK Monogram
========================================================= */
function BrandLogo({ size = 44 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" className="w-full h-full">
        {/* Hexagonal outer frame with gradient */}
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5A00" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>
        {/* Hexagon outline */}
        <polygon
          points="24,3 43,14 43,34 24,45 5,34 5,14"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="2"
        />
        {/* Inner hexagon filled */}
        <polygon
          points="24,8 39,16 39,32 24,40 9,32 9,16"
          fill="#0a0a0a"
          stroke="url(#logoGrad)"
          strokeWidth="0.5"
          opacity="0.95"
        />
        {/* Bold "D" center letter */}
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fill="white"
          fontFamily="Syne, system-ui, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="-1"
        >
          D
        </text>
        {/* Kinetic orange corner accent */}
        <circle cx="40" cy="14" r="3" fill="#FF5A00">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* =========================================================
   NAVIGATION MATRIX — Dynamic Floating Glass
========================================================= */
function NavMatrix() {
  const [active, setActive] = useState("HERO");
  const [scrolled, setScrolled] = useState(false);
  const items = [
    { label: "STATS", href: "#stats" },
    { label: "ARSENAL", href: "#arsenal" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONNECTION", href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);

      const sections = ["hero", "stats", "arsenal", "projects", "contact"];
      const y = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - 100;
        const bottom = top + el.offsetHeight - 100;
        if (y >= top && y < bottom) {
          setActive(id.toUpperCase());
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "top-4 left-4 right-4 md:left-[10%] md:right-[10%] lg:left-[16%] lg:right-[16%]"
          : "top-0 left-0 right-0"
      }`}
    >
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "rounded-full border border-white/15 bg-black/30 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "border-b border-white/10 bg-black/40 backdrop-blur-xl"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "px-4 md:px-6 py-3"
              : "max-w-[1600px] mx-auto px-6 md:px-10 py-5"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex-shrink-0 hover:scale-105 transition-transform duration-300"
            aria-label="Scroll to top"
          >
            <BrandLogo size={42} />
          </button>

          {/* Anchor Links */}
          <div className="hidden md:flex items-center gap-1 border border-white/10 rounded-full px-2 py-1.5 bg-black/30">
            {items.map((it) => (
              <button
                key={it.label}
                onClick={() => scrollTo(it.href)}
                className={`font-mono-tech text-[11px] uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                  active === it.label
                    ? "bg-[#FF5A00] text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>

          {/* Download Button */}
          <a
            href="/resume.pdf"
            download
            className="group relative inline-flex items-center gap-2 bg-[#FF5A00] text-black font-mono-tech text-[11px] md:text-xs font-semibold uppercase tracking-widest px-5 md:px-6 py-3 rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,90,0,0.3)]"
          >
            <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            <span className="hidden sm:inline">Download Resume</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </motion.nav>
    </div>
  );
}

/* =========================================================
   3D TILT CARD
========================================================= */
function TiltCard({
  children,
  className = "",
  intensity = 14,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  });
  const mouseY = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  });

  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: mouseY,
        rotateY: mouseX,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {/* Orange radial illumination follow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(420px circle at ${gx as string} ${gy as string}, rgba(255,90,0,0.25), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   SECTION REVEAL WRAPPER
========================================================= */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 8 }}
      transition={{
        type: "spring",
        damping: 24,
        stiffness: 110,
        delay,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   BRAND SVGs
========================================================= */
function GithubIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.19 1.85 1.19 3.11 0 4.45-2.7 5.42-5.27 5.71.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.74 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* =========================================================
   AUTHENTIC COLORFUL TECH LOGOS (Actual brand colors)
========================================================= */
function TechLogo({ name }: { name: string }) {
  const size = 32;
  const common = { width: size, height: size, className: "flex-shrink-0" };

  switch (name.toLowerCase()) {
    case "python":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M11.95 1.5c-3.15 0-5.87.27-5.87 2.91v2.12h5.95v.85H4.15C1.65 7.38 1.5 9.7 1.5 12.02c0 2.25.26 4.38 2.65 4.38h1.86v-2.61c0-2.52 2.14-4.57 4.74-4.57h4.84v-2.5c0-2.52-1.95-5.22-3.64-5.22zm-2.4 1.65a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB" />
          <path d="M20.25 7.6c-2.39 0-2.65 2.13-2.65 4.38v2.61c0 2.52-2.14 4.57-4.74 4.57H8.02v2.5c0 2.52 1.95 5.22 3.64 5.22 3.15 0 5.87-.27 5.87-2.91v-2.12h-5.95v-.85h7.88c2.5 0 2.65-2.32 2.65-4.64 0-2.25-.26-4.38-2.65-4.38h-1.86v2.61zm2.4 13a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#FFD43B" />
        </svg>
      );
    case "javascript":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
          <path d="M14 16.5c.5.8 1.4 1.3 2.5 1.3 1.2 0 2-.6 2-1.5 0-1-.8-1.4-2.1-1.9l-.7-.3c-2-.8-3.3-1.8-3.3-3.8 0-1.8 1.5-3.3 3.6-3.3 1.6 0 2.8.6 3.5 1.8l-1.6 1c-.4-.7-1-.9-1.8-.9-1 0-1.6.6-1.6 1.3 0 .8.7 1.2 1.9 1.7l.8.3c2.2.9 3.5 2 3.5 4 0 2.1-1.7 3.5-4.1 3.5-2.2 0-3.8-1-4.4-2.4l1.8-1.2zm-6.5.3c0 .8.6 1.1 1.4 1.1.9 0 1.5-.4 1.5-1.7v-9.2h2.2v9.3c0 2.4-1.5 3.5-3.7 3.5-1.9 0-3.1-.9-3.5-2.1l2.1-1.1z" fill="#323330" />
        </svg>
      );
    case "java":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M8.85 18.5s-.92.54.65.72c1.9.22 2.87.19 4.96-.21 0 0 .55.35 1.33.65-4.7 2.02-10.63-.12-6.94-1.16zM8.28 15.96s-1.04.77.54.93c2.04.21 3.65.23 6.43-.31 0 0 .39.39.99.6-5.69 1.66-12.03.13-7.96-1.22z" fill="#E76F00" />
          <path d="M13.12 11.34c1.16 1.34-.31 2.54-.31 2.54s2.95-1.52 1.59-3.43c-1.27-1.78-2.24-2.66 3.03-5.72 0 .01-8.25 2.05-4.31 6.61z" fill="#E76F00" />
          <path d="M19.27 20.43s.68.56-.75.99c-2.71.82-11.3 1.07-13.7.03-.86-.37.76-.89 1.27-1 .53-.11.83-.09.83-.09-.96-.68-6.18 1.32-2.66 1.89 9.6 1.56 17.51-.7 15.01-1.82zM9.28 13.33s-4.38 1.04-1.55 1.42c1.2.16 3.58.12 5.81-.06 1.82-.15 3.64-.48 3.64-.48s-.64.28-1.11.59c-4.48 1.18-13.12.63-10.63-.57 2.1-1.01 3.84-.9 3.84-.9zM17.22 17.76c4.55-2.36 2.44-4.63.98-4.33-.36.07-.52.14-.52.14s.13-.21.39-.3c2.89-1.02 5.13 3-.95 4.62 0-.01.39-.09.6-.13z" fill="#5382A1" />
          <path d="M14.36 1.5s2.51 2.51-2.38 6.37c-3.92 3.09-.89 4.86 0 6.88-2.29-2.06-3.97-3.88-2.85-5.56C10.78 6.89 15.35 5.69 14.36 1.5z" fill="#E76F00" />
          <path d="M9.5 22.5c4.34.28 11-.15 11.16-2.21 0 0-.3.79-3.58 1.41-3.7.69-8.25.61-10.98.17 0 .01.56.46 3.4.63z" fill="#5382A1" />
        </svg>
      );
    case "c":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#A8B9CC" />
          <path d="M15.5 8.5C14.5 7.5 13.3 7 12 7 9.2 7 7 9.2 7 12s2.2 5 5 5c1.3 0 2.5-.5 3.5-1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "c++":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#00599C" />
          <path d="M15.5 8.5C14.5 7.5 13.3 7 12 7 9.2 7 7 9.2 7 12s2.2 5 5 5c1.3 0 2.5-.5 3.5-1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M13.5 12h3M15 10.5v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "react":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
          <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        </svg>
      );
    case "next.js":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="black" stroke="white" strokeWidth="1.5" />
          <path d="M8 8v8l8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 8v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tailwind css":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-.7 2-.8 3-.5.6.2 1 .6 1.5 1.1 1 1 2.2 2.4 5.5 2.4 2.7 0 4.3-1.3 5-4-1 .7-2 .8-3 .5-.6-.2-1-.6-1.5-1.1-1-1-2.2-2.4-5.5-2.4zm-7 6c-2.7 0-4.3 1.3-5 4 1-.7 2-.8 3-.5.6.2 1 .6 1.5 1.1 1 1 2.2 2.4 5.5 2.4 2.7 0 4.3-1.3 5-4-1 .7-2 .8-3 .5-.6-.2-1-.6-1.5-1.1-1-1-2.2-2.4-5.5-2.4z" fill="#06B6D4" />
        </svg>
      );
    case "figma":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M8.5 2a3.5 3.5 0 0 0 0 7h3.5V2H8.5z" fill="#F24E1E" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262" />
          <path d="M12 9H8.5a3.5 3.5 0 1 0 0 7H12V9z" fill="#A259FF" />
          <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
          <path d="M8.5 16A3.5 3.5 0 1 0 12 19.5V16H8.5z" fill="#0ACF83" />
        </svg>
      );
    case "node.js":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="#339933" />
          <path d="M12 12l8.5-5M12 12v10M12 12L3.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "express.js":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="3" fill="#3C873A" />
          <path d="M7 9l4 6M11 9l-4 6M14 9h3M14 12h2.5M14 15h3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "mongodb":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M12 2c0 0-6 4.5-6 10.5 0 3.6 2.4 6.6 5.6 7.3V2h.8v17.8c3.2-.7 5.6-3.7 5.6-7.3C18 6.5 12 2 12 2z" fill="#47A248" />
        </svg>
      );
    case "postgresql":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#4169E1" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#4169E1" strokeWidth="2" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#4169E1" strokeWidth="2" />
        </svg>
      );
    case "mysql":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7v10c0 2 3.5 3 8 3s8-1 8-3V7" stroke="#00758F" strokeWidth="2" />
          <ellipse cx="12" cy="7" rx="8" ry="3" fill="#F29111" />
          <path d="M10 12l2 3 2-3" stroke="#00758F" strokeWidth="2" />
        </svg>
      );
    case "firebase":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M4.5 17.5L6.5 3l3.5 6 3-4.5L19.5 17.5 12 21.5 4.5 17.5z" fill="#FFA000" />
          <path d="M6.5 3L10 9l-3.5 8.5L4.5 17.5 6.5 3z" fill="#F57C00" />
          <path d="M13 4.5l3 13L12 21.5l-5.5-4 6.5-13z" fill="#FFCA28" />
        </svg>
      );
    case "pytorch":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#EE4C2C" />
          <path d="M12 7v10M8.5 10l7 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="1.5" fill="white" />
          <circle cx="15.5" cy="14" r="1.5" fill="white" />
        </svg>
      );
    case "scikit-learn":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" fill="#F7931E" opacity="0.15" />
          <circle cx="6" cy="18" r="2" fill="#F7931E" />
          <circle cx="12" cy="10" r="2" fill="#F7931E" />
          <circle cx="18" cy="6" r="2" fill="#F7931E" />
          <circle cx="18" cy="16" r="2" fill="#F7931E" />
          <path d="M7.5 16.5l3-4.5M13.5 9l3-2M13.5 11l3 3" stroke="#F7931E" strokeWidth="2" />
        </svg>
      );
    case "opencv":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <path d="M12 9a4 4 0 1 1-3.5 2" stroke="#FF0000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M7 16a4 4 0 1 1 3.5-2" stroke="#00FF00" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 16a4 4 0 1 1-3.5-2" stroke="#0000FF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "numpy":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinejoin="round">
          <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" fill="#013243" />
          <path d="M12 12v10M12 12L4 7.5M12 12l8-4.5" stroke="#4DABCF" strokeWidth="2" />
        </svg>
      );
    case "aws":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#FF9900" />
          <path d="M6 16c3.5 2.5 8.5 2.5 12 0" stroke="black" strokeWidth="2.5" />
          <path d="M16 14l2 2-2 2" stroke="black" strokeWidth="2" />
        </svg>
      );
    case "google cloud":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinejoin="round">
          <path d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3z" fill="#4285F4" />
          <path d="M12 3L4 7.5v9l8 4.5" fill="#34A853" />
          <path d="M12 3l8 4.5v9L12 21" fill="#FBBC04" />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      );
    case "docker":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinejoin="round">
          <path d="M2 13h19c.5 0 1-.4 1-.9 0-3.3-2.7-6.1-6-6.1-.6 0-1.2.1-1.7.3C13.5 4.5 11.5 3 9.2 3c-.7 0-1.4.1-2 .4V9H2v4z" fill="#2496ED" />
          <rect x="5" y="10" width="2.5" height="2" fill="white" />
          <rect x="8.5" y="10" width="2.5" height="2" fill="white" />
          <rect x="12" y="10" width="2.5" height="2" fill="white" />
          <rect x="8.5" y="7" width="2.5" height="2" fill="white" />
          <path d="M3 16c0 2.2 3.6 4 9 4s9-1.8 9-4H3z" fill="#1D63ED" />
        </svg>
      );
    case "github actions":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" fill="#2088FF" />
          <polygon points="10 8 16 12 10 16 10 8" fill="white" />
        </svg>
      );
    case "vercel":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none">
          <polygon points="12 3 22 20 2 20 12 3" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "git":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" transform="rotate(45 12 12)" fill="#F05032" />
          <circle cx="12" cy="9" r="1.5" fill="white" />
          <circle cx="12" cy="15" r="1.5" fill="white" />
          <circle cx="16" cy="12" r="1.5" fill="white" />
          <path d="M12 10.5v3M12 12h2.5" stroke="white" strokeWidth="1.5" />
        </svg>
      );
    case "postman":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" fill="#FF6C37" />
          <path d="M12 12l6-4M12 12v6M12 12L6 8" stroke="white" strokeWidth="2.5" />
          <circle cx="18" cy="8" r="1.5" fill="white" />
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

/* =========================================================
   HERO SECTION
========================================================= */
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const marqueeText = "FULL-STACK ARCHITECT • UI/UX SPECIALIST • AI/ML INTEGRATION • ";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 overflow-hidden"
    >
      {/* Top status strip */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-10 flex items-center justify-between font-mono-tech text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50">
        <div className="flex items-center gap-2">
          <Circle size={8} className="fill-[#FF5A00] text-[#FF5A00] pulse-dot" />
          <span>AVAILABLE FOR OPPORTUNITIES</span>
        </div>
        <div className="hidden md:block">
          <span className="text-white/30">LAT</span> 12.9716° N{" "}
          <span className="text-white/30 mx-2">/</span>
          <span className="text-white/30">LNG</span> 77.5946° E
        </div>
        <div className="hidden md:block">PORTFOLIO.v2026</div>
      </div>

      {/* Main name */}
      <motion.div style={{ y, opacity }} className="max-w-[1600px] w-full mx-auto px-6 md:px-10 py-10 md:py-14">
        {/* DHANUSH in White, C K in Black with White stroke/outline. Fixed leading to prevent overlap */}
        <h1 className="font-display font-extrabold uppercase leading-[0.96] md:leading-[0.96] tracking-tight text-[12vw] md:text-[9.5vw] lg:text-[9rem] xl:text-[10.5rem] select-none">
          <span className="block text-white">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="inline-block"
            >
              DHANUSH
            </motion.span>
          </span>
          <span className="block mt-2 md:mt-4">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="inline-block text-black"
              style={{
                WebkitTextStroke: "3.5px #FFFFFF",
              }}
            >
              C&nbsp;K
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="inline-block align-top font-mono-tech text-[#FF5A00] text-[3vw] md:text-[2vw] mt-6 ml-4 md:ml-8"
            >
              [◉]
            </motion.span>
          </span>
        </h1>

        {/* Clean Summary (Removed [01] Professional Summary block) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 md:mt-14 max-w-5xl"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-grotesk leading-snug md:leading-[1.3] text-white/90 border-t border-white/10 pt-6">
            <span className="text-[#FF5A00] font-semibold">Builder.</span>{" "}
            <span className="text-[#FF5A00] font-semibold">Designer.</span>{" "}
            <span className="text-[#FF5A00] font-semibold">Engineer.</span>{" "}
            <span className="text-white/40 mx-2">|</span> 7th Semester Computer Science student at{" "}
            <span className="text-white font-semibold">
              JSS Academy of Technical Education, Bengaluru
            </span>
            . Specialize in architecting high-performance digital experiences that bridge the gap
            between human-centric UI/UX design and complex AI/ML backend implementations.
          </p>
        </motion.div>
      </motion.div>

      {/* Kinetic Marquee (Increased speed) */}
      <div className="relative border-y border-white/10 bg-black/40 py-5 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter px-4"
            >
              {marqueeText.split("•").map((chunk, idx) => (
                <span key={idx}>
                  <span className="text-white">{chunk}</span>
                  {idx < marqueeText.split("•").length - 1 && (
                    <span className="text-[#FF5A00] mx-3">•</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STATS SECTION
========================================================= */
function StatCard({
  value,
  label,
  detail,
  index,
}: {
  value: string;
  label: string;
  detail: string;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <TiltCard
        className="group relative h-full border border-white/10 bg-gradient-to-br from-[#0a0a0a] to-[#040404] rounded-2xl p-8 md:p-10 hover:border-[#FF5A00]/60 transition-colors duration-500 overflow-hidden"
        intensity={10}
      >
        {/* Large faded stat value background */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-10 font-display text-[11rem] md:text-[13rem] font-extrabold leading-none tracking-tighter text-white/[0.035] select-none transition-colors duration-500 group-hover:text-[#FF5A00]/[0.06]"
        >
          {value}
        </div>

        {/* Orange radial gradient glow (top-right) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,90,0,0.12),transparent_55%)] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Subtle grid pattern overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagonal accent line */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,90,0,0.25), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <div className="font-display text-7xl md:text-8xl font-extrabold uppercase tracking-tighter text-white text-glow mb-4">
            {value}
          </div>
          <div className="font-mono-tech text-sm uppercase tracking-[0.2em] text-[#FF5A00] mb-3 font-bold">
            {label}
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{detail}</p>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function Stats() {
  const stats = [
    {
      value: "8.44",
      label: "CGPA",
      detail: "Maintained consistently across all 6 semesters.",
    },
    {
      value: "4+",
      label: "Production-Ready Platforms Shipped",
      detail: "Full-stack applications deployed to production environments with real users and traffic.",
    },
    {
      value: "2",
      label: "Active AI/ML & Computer Vision Integrations",
      detail: "Live production pipelines leveraging PyTorch, OpenCV, and custom model inference.",
    },
  ];

  return (
    <section id="stats" className="relative py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="mb-12 border-b border-white/10 pb-8 flex items-center justify-between font-mono-tech text-xs tracking-[0.3em] text-white/40">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#FF5A00]" />
              <span>// SYSTEM METRICS · RUNTIME ANALYTICS</span>
            </div>
            <div className="hidden sm:block text-[#FF5A00]">[LIVE DATA]</div>
          </div>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter">
                PERFORMANCE <span className="text-[#FF5A00]">READOUT.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} index={i} {...s} />
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-20 md:mt-28 border-y border-white/10 py-10 md:py-12 px-0 md:px-1 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5A00]/60 to-transparent" />
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-4">
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-[#FF5A00]">
                  BUILD SIGNAL
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tighter leading-[0.9]">
                  ENGINEERING<br />
                  <span className="text-white/30">MODE ACTIVE.</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mt-2 lg:mt-0">
                {["DESIGN SYSTEMS", "FULL-STACK LOGIC", "AI/ML PIPELINES"].map((item) => (
                  <div
                    key={item}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 min-h-[88px] flex items-end"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#FF5A00]" />
                    <div className="font-mono-tech text-[11px] md:text-sm uppercase tracking-[0.22em] text-white/80 leading-tight pr-2">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   ARSENAL SECTION
========================================================= */
function Arsenal() {
  const categories = [
    {
      title: "Languages",
      items: ["C", "C++", "Python", "JavaScript", "Java"],
    },
    {
      title: "Frontend & UI/UX",
      items: ["React", "Next.js", "Tailwind CSS", "Figma"],
    },
    {
      title: "Backend Architecture",
      items: ["Node.js", "Express.js"],
    },
    {
      title: "Databases",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    },
    {
      title: "AI / ML Ecosystem",
      items: ["PyTorch", "Scikit-learn", "OpenCV", "NumPy"],
    },
    {
      title: "Cloud & Infrastructure",
      items: ["AWS", "Google Cloud", "Docker", "GitHub Actions", "Vercel", "Git", "Postman"],
    },
  ];

  return (
    <section id="arsenal" className="relative py-16 md:py-24 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="mb-16 border-b border-white/10 pb-12">
            <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9]">
              TECHNICAL<br />
              ARSENAL <span className="text-[#FF5A00]">STACK.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08}>
              <div className="group relative bg-gradient-to-br from-[#0c0c0c] to-[#040404] border border-white/15 hover:border-[#FF5A00] p-8 md:p-10 rounded-3xl transition-all duration-500 min-h-[auto] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
                      {cat.title}
                    </h3>
                    <ArrowUpRight
                      size={24}
                      className="text-white/30 group-hover:text-[#FF5A00] group-hover:rotate-45 transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3.5 py-2">
                    {cat.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-white/[0.05] border border-white/15 hover:border-[#FF5A00] px-5 py-3 rounded-2xl transition-all duration-300 hover:bg-[#FF5A00]/15"
                      >
                        <TechLogo name={item} />
                        <span className="font-mono-tech text-base md:text-lg font-bold tracking-wider text-white">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BRIDGE BETWEEN ARSENAL AND PROJECTS
========================================================= */
function ArsenalProjectsBridge() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="relative overflow-hidden border border-white/10 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#040404] p-10 md:p-16">
            {/* Orange glow corner */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#FF5A00]/20 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#FF5A00]/10 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 space-y-10 md:space-y-12">
              <div className="space-y-4 md:space-y-5">
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-[#FF5A00] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A00] pulse-dot" />
                  OPEN FOR COLLABORATION
                </div>
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter leading-[0.95]">
                  LET'S BUILD<br />
                  <span className="text-[#FF5A00]">SOMETHING</span><br />
                  MEMORABLE.
                </h3>
                <p className="font-grotesk text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
                  Every project is a chance to craft something meaningful — from ambitious
                  startups to enterprise-grade systems, I'm ready to collaborate on the
                  next chapter.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: "INTERNSHIPS", desc: "Eager to learn, contribute, and grow." },
                  { title: "FREELANCE", desc: "End-to-end product design & engineering." },
                  { title: "FULL-TIME", desc: "Long-term impact, ownership, and craft." },
                ].map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="group flex flex-col items-start gap-3 border border-white/10 rounded-2xl bg-black/40 p-5 hover:border-[#FF5A00]/60 hover:bg-[#FF5A00]/5 transition-all duration-300 text-left w-full cursor-pointer"
                  >
                    <div className="font-mono-tech text-xs text-[#FF5A00] font-bold">
                      [0{i + 1}]
                    </div>
                    <div className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
                      {item.title}
                    </div>
                    <div className="font-grotesk text-sm text-white/70 leading-relaxed">
                      {item.desc}
                    </div>
                    <div className="font-mono-tech text-[10px] text-white/40 uppercase tracking-wider mt-2 group-hover:text-[#FF5A00] transition-colors">
                      HIRE →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS SECTION
========================================================= */
function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string;
    tags: string[];
    desc: string;
    role: string;
    image: string;
  };
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <TiltCard
        className="group relative border border-white/15 rounded-3xl overflow-hidden hover:border-[#FF5A00] transition-colors duration-500 min-h-[460px] flex flex-col justify-end"
        intensity={6}
      >
        {/* Slightly more Background Image Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-55"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/40 group-hover:via-black/90 transition-colors duration-500" />

        <div className="relative p-8 md:p-14 z-10">
          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#FF5A00]" />
          <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-[#FF5A00]" />
          <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#FF5A00]" />
          <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#FF5A00]" />

          <div className="flex items-start justify-end mb-4">
            <ArrowUpRight
              size={28}
              className="text-white/60 group-hover:text-[#FF5A00] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
            />
          </div>

          <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter mb-6 text-white group-hover:text-glow">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2.5 mb-6">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-mono-tech text-[11px] uppercase tracking-widest px-3.5 py-1.5 border border-[#FF5A00]/50 text-[#FF5A00] rounded-md bg-[#FF5A00]/10 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-white/85 text-base md:text-xl leading-relaxed mb-10 max-w-4xl font-grotesk">
            {project.desc}
          </p>

          <div className="pt-6 border-t border-white/15 grid md:grid-cols-2 gap-4 items-end">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                MY ROLE
              </div>
              <div className="font-grotesk font-semibold text-white text-base md:text-lg">
                {project.role}
              </div>
            </div>
            <div className="md:text-right">
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                STATUS
              </div>
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#FF5A00] font-bold">
                <Circle size={8} className="fill-[#FF5A00] text-[#FF5A00] pulse-dot" />
                DEPLOYED
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function Projects() {
  const projects = [
    {
      title: "HEALOCK",
      tags: ["FULL-STACK", "HEALTH-TECH", "AI INTEGRATION"],
      desc:
        "Mobile-first family health ecosystem organizing medical data via AI symptom analysis, document parsing, hospital mapping, and generating secure offline QR-based emergency medical cards.",
      role: "Full-Stack Engineering (React, Base44)",
      image: "/images/healock.jpg",
    },
    {
      title: "MACROSYNC",
      tags: ["FULL-STACK", "UI/UX DESIGN", "MERN"],
      desc:
        "Feature-dense fitness dashboard engineered with an intuitive Bento Box interface layout. Integrates biometric onboarding, macro/calorie logging, workout tracking, and an AI-driven coaching engine for form correction.",
      role: "Lead UI/UX & Full-Stack Architecture",
      image: "/images/macrosync.jpg",
    },
    {
      title: "OZARK SENTINEL",
      tags: ["FRONTEND", "BLOCKCHAIN", "AML"],
      desc:
        "Decentralized Anti-Money Laundering protocol developed during a hackathon using Algorand. Employs graph AI models to cross-examine and flag fraudulent asset movements.",
      role: "Frontend Interface Architecture & UI Engineering",
      image: "/images/ozark-sentinel.jpg",
    },
    {
      title: "VISION MATE",
      tags: ["FRONTEND", "EDGE COMPUTING", "COMPUTER VISION"],
      desc:
        "Assistive computer-vision system deployed via a Raspberry Pi client. Integrates an internal real-time object identification pipeline, InsightFace processing, and optimized audio priority feedback alerts for caretakers.",
      role: "Client Application UI & Frontend Interface",
      image: "/images/vision-mate.jpg",
    },
  ];

  return (
    <section id="projects" className="relative py-16 md:py-24 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter">
              PRODUCTION<br />
              <span className="text-[#FF5A00]">PROJECTS.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMPACT BRIDGE BETWEEN PROJECTS AND CONTACT
========================================================= */
function ContactBridge() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 border border-white/10 rounded-2xl bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a] to-[#FF5A00]/5 px-6 md:px-10 py-8 md:py-10 overflow-hidden">
            {/* Decorative orange blur */}
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF5A00]/15 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 flex items-center gap-4 md:gap-5">
              <div className="flex-shrink-0 h-12 w-12 rounded-full border border-[#FF5A00]/50 bg-[#FF5A00]/10 flex items-center justify-center">
                <Send size={18} className="text-[#FF5A00]" />
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-[#FF5A00] mb-1">
                  MORE IN THE PIPELINE
                </div>
                <p className="font-grotesk text-base md:text-lg text-white/80 leading-snug">
                  The next build is always around the corner — let's collaborate on it.
                </p>
              </div>
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="relative z-10 inline-flex items-center gap-2 bg-[#FF5A00] text-black font-mono-tech text-[11px] font-semibold uppercase tracking-widest px-5 md:px-6 py-3 rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,90,0,0.3)]"
            >
              Say Hello
              <ArrowUpRight size={14} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT & FOOTER
========================================================= */
function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ckdhanush520@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const links = [
    {
      label: "EMAIL",
      value: "ckdhanush520@gmail.com",
      desc: copied ? "Copied to clipboard ✓" : "Click to copy email address.",
      action: "copy" as const,
      icon: <Mail size={32} className="text-[#FF5A00] group-hover:text-black transition-colors" />,
    },
    {
      label: "GITHUB",
      value: "github.com/Dhanush022",
      desc: "Explore open-source architectures & code repositories.",
      action: "link" as const,
      href: "https://github.com/Dhanush022",
      icon: <GithubIcon size={32} />,
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/dhanush-c-k",
      desc: "Connect professionally & view career trajectory.",
      action: "link" as const,
      href: "https://www.linkedin.com/in/dhanush-c-k/",
      icon: <LinkedinIcon size={32} />,
    },
  ];

  return (
    <section id="contact" className="relative pt-16 md:pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] font-extrabold uppercase tracking-tighter leading-[0.88] mb-10">
            INITIATE<br />
            <span className="text-[#FF5A00]">CONNECTION.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="max-w-4xl mb-16 border-t border-white/10 pt-6">
            <p className="text-xl md:text-2xl lg:text-3xl font-grotesk leading-snug text-white/85">
              Currently vetting applications for{" "}
              <span className="text-[#FF5A00] font-semibold">internships</span>,{" "}
              <span className="text-[#FF5A00] font-semibold">freelance contracts</span>, and{" "}
              <span className="text-[#FF5A00] font-semibold">full-time software engineering</span> opportunities.
            </p>
          </div>
        </Reveal>

        {/* Spacious Connection Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {links.map((l, i) => {
            const cardClass = "group relative flex flex-col justify-between bg-[#080808] border border-white/15 p-8 md:p-12 rounded-3xl h-full hover:bg-[#FF5A00] transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(255,90,0,0.25)] cursor-pointer";

            const inner = (
              <>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl border border-[#FF5A00]/40 bg-[#FF5A00]/10 flex items-center justify-center text-[#FF5A00] group-hover:border-black/30 group-hover:bg-black/15 group-hover:text-black transition-all">
                      {l.icon}
                    </div>
                    <ArrowUpRight
                      size={28}
                      className="text-white/30 group-hover:text-black group-hover:rotate-45 transition-all"
                    />
                  </div>

                  <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-white/40 group-hover:text-black/70 transition-colors mb-2 font-bold">
                    [0{i + 1}] {l.label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-extrabold text-white group-hover:text-black transition-colors break-all mb-4">
                    {l.value}
                  </div>
                </div>

                <p className={`font-mono-tech text-xs transition-colors pt-6 border-t group-hover:border-black/20 ${
                  l.action === "copy" && copied
                    ? "text-[#FF5A00] group-hover:text-black font-bold border-[#FF5A00]/30"
                    : "text-white/60 group-hover:text-black/85 border-white/10"
                }`}>
                  {l.desc}
                </p>
              </>
            );

            return (
              <Reveal key={l.label} delay={i * 0.08}>
                {l.action === "copy" ? (
                  <button onClick={copyEmail} className={`${cardClass} w-full text-left`}>
                    {inner}
                  </button>
                ) : (
                  <button
                    onClick={() => window.open(l.href, "_blank", "noopener,noreferrer")}
                    className={`${cardClass} w-full text-left`}
                  >
                    {inner}
                  </button>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Footer strip */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-white/40">
          <div className="flex items-center gap-4">
            <span>© 2026 DHANUSH C K</span>
            <span className="hidden md:inline">/</span>
            <span className="hidden md:inline">ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle size={6} className="fill-[#FF5A00] text-[#FF5A00] pulse-dot" />
            <span>BUILT WITH NEXT.JS · FRAMER MOTION · TAILWIND</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CURSOR GLOW
========================================================= */
function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[60] h-[320px] w-[320px] rounded-full mix-blend-screen opacity-40 hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(255,90,0,0.18) 0%, rgba(255,90,0,0.06) 35%, transparent 70%)",
      }}
    />
  );
}

/* =========================================================
   PAGE
========================================================= */
export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <FluidBackground />
      <CursorGlow />
      <NavMatrix />
      <div className="relative z-10">
        <Hero />
        <Stats />
        <Arsenal />
        <ArsenalProjectsBridge />
        <Projects />
        <ContactBridge />
        <Contact />
      </div>
    </main>
  );
}
