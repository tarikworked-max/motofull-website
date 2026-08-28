"use client";

import { motion, useInView, useMotionValue, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sayfanin en ustunde okuma ilerleme cubugu.
 *
 * Uzun bir tek-sayfa sitede ziyaretci "bu daha ne kadar surecek"
 * bilmez; bilmedigi icin de erken birakir. Cubuk hem o soruyu
 * yanitlar hem sayfaya surekli bir hareket katar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-accent via-accent-soft to-electric"
    />
  );
}

/**
 * MotoFull logosu — gercek marka gorseli.
 *
 * ONCEDEN elle cizilmis bir SVG placeholder kullaniliyordu (stilize
 * "M" + turuncu nokta); gercek marka bu DEGILDI. Kaynak dosya panel
 * ve mobil uygulamayla AYNI: frontend/src/assets/brand/motofull-wordmark.png.
 */
export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="MotoFull"
        width={640}
        height={114}
        className="h-full w-auto object-contain"
        priority
      />
    </span>
  );
}

/* Scroll-reveal wrapper */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignCls}`}>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-soft">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-frost sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-mist sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

/* Animated counter */
export function Counter({
  value,
  suffix = "",
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("tr-TR") + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* Magnetic hover button wrapper */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * 0.18);
        y.set((e.clientY - r.top - r.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
