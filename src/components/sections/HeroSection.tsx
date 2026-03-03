"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Sparkles, Star, Cloud, ShieldCheck, PenLine, ChevronDown,
} from "lucide-react";

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 8,
}));

const badges = [
  { icon: Star,        label: "100% Client Satisfaction", id: "top"    },
  { icon: PenLine,     label: "An Author",                id: "right"  },
  { icon: Cloud,       label: "Cloud Fanatic",            id: "left"   },
  { icon: ShieldCheck, label: "SRE Practitioner",         id: "bottom" },
];

// Read screen size synchronously — no useEffect needed
const getScreenSize = () => {
  if (typeof window === "undefined") return { isMobile: false, isTablet: false };
  const w = window.innerWidth;
  return {
    isMobile: w < 640,
    isTablet: w >= 640 && w < 1024,
  };
};

/* ── Floating badge (desktop only) ── */
const FloatingBadge = ({ icon: Icon, label, delay, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 8 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.0 + delay * 0.12, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.05, y: -2 }}
    style={{
      position: "absolute",
      display: "flex", alignItems: "center", gap: 8,
      padding: "8px 14px", borderRadius: 16,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(99,130,255,0.18)",
      boxShadow: "0 4px 24px rgba(99,130,255,0.1), 0 1px 0 rgba(255,255,255,0.95) inset",
      color: "#2d3a6b",
      whiteSpace: "nowrap",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
      zIndex: 20, cursor: "default", userSelect: "none",
      ...style,
    }}
  >
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: 7,
      background: "linear-gradient(135deg, #e8edff, #d4dcff)", flexShrink: 0,
    }}>
      <Icon size={11} style={{ color: "#5070e8" }} />
    </span>
    {label}
  </motion.div>
);

/* ── Inline chip (mobile/tablet) ── */
const InlineChip = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.6 + delay * 0.08, ease: [0.22, 1, 0.36, 1] }}
    style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "7px 12px", borderRadius: 12,
      background: "rgba(255,255,255,0.85)",
      border: "1px solid rgba(99,130,255,0.15)",
      boxShadow: "0 2px 10px rgba(99,130,255,0.07)",
      color: "#2d3a6b",
      fontSize: 11.5, fontWeight: 600,
      whiteSpace: "nowrap",
      cursor: "default", userSelect: "none",
    }}
  >
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 20, height: 20, borderRadius: 6,
      background: "linear-gradient(135deg, #e8edff, #d4dcff)", flexShrink: 0,
    }}>
      <Icon size={10} style={{ color: "#5070e8" }} />
    </span>
    {label}
  </motion.div>
);

const HeroSection = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ✅ Read window synchronously on first render — no flash, no jump
  const [screenSize, setScreenSize] = useState(() => getScreenSize());
  const { isMobile, isTablet } = screenSize;
  const isDesktop = !isMobile && !isTablet;

  useEffect(() => {
    const onResize = () => setScreenSize(getScreenSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isDesktop) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const imgW = isMobile ? 190 : isTablet ? 220 : 270;
  const imgH = isMobile ? 240 : isTablet ? 275 : 330;

  const desktopBadgePositions = {
    top:    { top: -48, left: "50%", transform: "translateX(-50%)" },
    right:  { top: 24,  right: -120 },
    left:   { top: "38%", left: -130, transform: "translateY(-50%)" },
    bottom: { bottom: -48, left: "10%" },
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: isMobile ? 72 : 80,
        paddingBottom: isMobile ? 56 : 48,
        background: "#f7f8ff",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@700;800;900&display=swap');
        .hero-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900; line-height: 1.08;
          letter-spacing: -0.01em; color: #1a2260; margin: 0 0 20px 0;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #2a3cad 0%, #5070e8 55%, #7b8fff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,130,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,130,255,0.055) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 80%);
          pointer-events: none;
        }
        .hero-line-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(80,112,232,0.35), transparent);
        }
        .availability-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4CAF50;
          animation: pulse-dot 2s infinite; flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 2px rgba(76,175,80,0.2); }
          50%       { box-shadow: 0 0 0 5px rgba(76,175,80,0.08); }
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 13px;
          font-size: 14px; font-weight: 600; cursor: pointer; border: none;
          background: linear-gradient(135deg, #4a6df0, #6c8fff); color: white;
          box-shadow: 0 4px 20px rgba(74,109,240,0.35);
          transition: all 0.22s ease; font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(74,109,240,0.45); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 13px;
          font-size: 14px; font-weight: 500; cursor: pointer;
          background: rgba(255,255,255,0.8); color: #4a5a9a;
          border: 1px solid rgba(99,130,255,0.2); backdrop-filter: blur(12px);
          transition: all 0.22s ease; font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .btn-ghost:hover { background: white; border-color: rgba(99,130,255,0.35); color: #3050c0; transform: translateY(-1px); }
        .stat-card {
          background: rgba(255,255,255,0.82); border: 1px solid rgba(99,130,255,0.13);
          border-radius: 14px; display: flex; flex-direction: column; gap: 3px;
          backdrop-filter: blur(12px); box-shadow: 0 2px 14px rgba(99,130,255,0.07);
          transition: all 0.28s ease; cursor: default; flex: 1;
        }
        .stat-card:hover { border-color: rgba(99,130,255,0.28); transform: translateY(-2px); }
        .chip-avail {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 100px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(135deg, rgba(99,130,255,0.1), rgba(99,130,255,0.05));
          border: 1px solid rgba(99,130,255,0.22); color: #4a6df0; width: fit-content;
        }
        .scroll-hint {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          color: rgba(60,80,160,0.3); font-size: 9px; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
        }
        .image-frame {
          border-radius: 24px; overflow: hidden;
          border: 1px solid rgba(99,130,255,0.14);
          box-shadow: 0 24px 60px rgba(60,80,180,0.12), 0 6px 20px rgba(60,80,180,0.08);
          position: relative;
        }
        .badge-strip {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; margin-top: 20px;
        }
        @media (max-width: 639px) {
          .hero-text-col { text-align: center; align-items: center; }
          .hero-btns     { justify-content: center !important; }
          .hero-stats    { justify-content: center !important; }
        }
      `}</style>

      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 65% 40%, rgba(99,130,255,0.1) 0%, transparent 68%), radial-gradient(ellipse 50% 55% at 15% 72%, rgba(130,100,255,0.06) 0%, transparent 65%), #f7f8ff",
      }} />
      <div className="hero-grid-bg" />

      {isDesktop && [600, 380].map((size, i) => (
        <div key={i} style={{
          position: "absolute", width: size, height: size, borderRadius: "50%",
          border: "1px dashed rgba(99,130,255,0.12)",
          top: "50%", right: `${-8 - i * 7}%`, transform: "translateY(-50%)",
          pointerEvents: "none",
        }} />
      ))}

      {isDesktop && <>
        <div style={{ position: "absolute", top: "10%", right: "15%", width: 380, height: 380, background: "radial-gradient(circle, rgba(99,130,255,0.1) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "10%", width: 280, height: 280, background: "radial-gradient(circle, rgba(120,100,255,0.07) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      </>}

      {PARTICLES.map((p) => (
        <motion.div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(80,112,232,0.2)", pointerEvents: "none",
        }}
          animate={{ y: [0, -16, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── MAIN CONTENT ── */}
      <div style={{
        maxWidth: 1160, width: "100%", margin: "0 auto",
        padding: isMobile ? "0 20px" : isTablet ? "0 32px" : "0 48px",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 40 : isTablet ? 40 : 80,
        }}>

          {/* ── TEXT COL ── */}
          <div className="hero-text-col" style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 16 }}>
              <div className="chip-avail" style={{ margin: isMobile ? "0 auto 0" : undefined }}>
                <div className="availability-dot" />
                <Sparkles size={10} />
                Available for Projects
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(60,80,160,0.38)", marginBottom: 12 }}
            >
              Designer & Developer
            </motion.p>

            <motion.h1
              className="hero-h1"
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: isMobile ? 36 : isTablet ? 46 : "clamp(40px,5vw,64px)" }}
            >
              Hi, I'm{" "}
              <span className="hero-gradient-text">
                {isMobile ? "Uchit Vyas" : <>Uchit<br />Vyas</>}
              </span>
            </motion.h1>

            <motion.div
              className="hero-line-rule"
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: isMobile ? "80%" : 260, maxWidth: 260, marginBottom: 20,
                transformOrigin: isMobile ? "center" : "left",
                alignSelf: isMobile ? "center" : "flex-start",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{
                fontSize: isMobile ? 14.5 : 16, lineHeight: 1.8, color: "#6b7ab0",
                maxWidth: 440, marginBottom: 32, fontWeight: 300,
                alignSelf: isMobile ? "center" : "flex-start",
              }}
            >
              A passionate designer and developer crafting beautiful digital
              experiences that connect brands with their audience - with precision, taste, and purpose.
            </motion.p>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}
            >
              <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                View My Work <ArrowRight size={14} />
              </motion.button>
              <motion.button className="btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                Get In Touch
              </motion.button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{ display: "flex", gap: 10, flexWrap: isMobile ? "wrap" : "nowrap" }}
            >
              {[
                { num: "5+",   label: "Years Experience"   },
                { num: "60+",  label: "Projects Delivered" },
                { num: "100%", label: "Satisfaction Rate"  },
              ].map((stat, i) => (
                <div key={i} className="stat-card" style={{ padding: isMobile ? "11px 14px" : "14px 18px" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 17 : 22, fontWeight: 700, color: "#4a6df0", lineHeight: 1 }}>
                    {stat.num}
                  </span>
                  <span style={{ fontSize: isMobile ? 9.5 : 11, color: "#8a9bc8", fontWeight: 500, letterSpacing: "0.04em", marginTop: 2, lineHeight: 1.3 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── IMAGE COL ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, x: isDesktop ? 36 : 0, y: isMobile ? -16 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                perspective: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: isDesktop ? "60px 90px" : "0",
              }}
            >
              {/* Outer ring */}
              <motion.div
                style={{
                  position: "absolute",
                  width: imgW + (isDesktop ? 32 : 12),
                  height: imgH + (isDesktop ? 32 : 12),
                  borderRadius: 32,
                  border: "1px solid rgba(99,130,255,0.16)",
                  boxShadow: "0 0 50px rgba(99,130,255,0.08)",
                  rotateX: isDesktop ? rotateX : 0,
                  rotateY: isDesktop ? rotateY : 0,
                }}
                animate={{ scale: [1, 1.015, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Soft bg blur */}
              <div style={{
                position: "absolute", width: imgW, height: imgH, borderRadius: 24,
                background: "linear-gradient(135deg, rgba(99,130,255,0.07), rgba(120,100,255,0.04))",
                filter: "blur(20px)",
              }} />

              {/* Image */}
              <motion.div style={{
                rotateX: isDesktop ? rotateX : 0,
                rotateY: isDesktop ? rotateY : 0,
                transformStyle: "preserve-3d",
                position: "relative", zIndex: 10,
              }}>
                <div className="image-frame" style={{ width: imgW, height: imgH }}>
                  <img
                    src="/images/hero.png"
                    alt="Uchit Vyas"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 65%, rgba(60,80,180,0.06) 100%)" }} />
                </div>
              </motion.div>

              {/* Floating badges — desktop only */}
              {isDesktop && badges.map((b, i) => (
                <FloatingBadge
                  key={b.id}
                  icon={b.icon}
                  label={b.label}
                  delay={i}
                  style={desktopBadgePositions[b.id]}
                />
              ))}

              {/* Corner brackets — desktop only */}
              {isDesktop && [
                { top: 8,    left: 8,  borderTop:    "2px solid rgba(80,112,232,0.28)", borderLeft:   "2px solid rgba(80,112,232,0.28)", borderRadius: "10px 0 0 0"  },
                { top: 8,    right: 8, borderTop:    "2px solid rgba(80,112,232,0.28)", borderRight:  "2px solid rgba(80,112,232,0.28)", borderRadius: "0 10px 0 0"  },
                { bottom: 8, left: 8,  borderBottom: "2px solid rgba(80,112,232,0.28)", borderLeft:   "2px solid rgba(80,112,232,0.28)", borderRadius: "0 0 0 10px"  },
                { bottom: 8, right: 8, borderBottom: "2px solid rgba(80,112,232,0.28)", borderRight:  "2px solid rgba(80,112,232,0.28)", borderRadius: "0 0 10px 0"  },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 22, height: 22, ...s }} />
              ))}
            </motion.div>

            {/* Badge strip — mobile & tablet only */}
            {!isDesktop && (
              <div className="badge-strip">
                {badges.map((b, i) => (
                  <InlineChip key={b.id} icon={b.icon} label={b.label} delay={i} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={14} style={{ color: "rgba(60,80,160,0.25)" }} />
        </motion.div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;