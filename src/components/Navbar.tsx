import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Zap, Gift, BookOpen,
  Mic2, GraduationCap, Mail, Handshake,
} from "lucide-react";

const NAV = [
  { label: "Home",         href: "#home",         Icon: Home          },
  { label: "About Me",     href: "#about",        Icon: User          },
  { label: "Expertise",    href: "#expertise",    Icon: Zap           },
  { label: "Offerings",    href: "#offerings",    Icon: Gift          },
  { label: "Publications", href: "#publications", Icon: BookOpen      },
  { label: "Global Talks", href: "#talks",        Icon: Mic2          },
  { label: "Training",     href: "#training",     Icon: GraduationCap },
  { label: "Contact",      href: "#contact",      Icon: Mail          },
  { label: "Meet Me",      href: "#meet",         Icon: Handshake     },
];

function FloatIcon({ item, index, activeIdx }) {
  const [hovered, setHovered] = useState(false);
  const isActive = activeIdx === index;

  const scrollTo = () => {
    const el = document.querySelector(item.href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
    >
      {/* Label tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.88 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              right: "calc(100% + 14px)",
              whiteSpace: "nowrap",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12, fontWeight: 600,
              color: isActive ? "#fff" : "rgba(255,255,255,0.82)",
              background: isActive
                ? "linear-gradient(135deg, rgba(42,60,173,0.96), rgba(74,109,240,0.96))"
                : "rgba(12,18,55,0.84)",
              backdropFilter: "blur(14px)",
              border: `1px solid ${isActive ? "rgba(92,124,250,0.5)" : "rgba(92,124,250,0.16)"}`,
              borderRadius: 9,
              padding: "5px 12px",
              pointerEvents: "none",
              boxShadow: isActive ? "0 4px 18px rgba(74,109,240,0.35)" : "0 4px 14px rgba(0,0,0,0.18)",
              letterSpacing: "0.01em",
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon button */}
      <motion.button
        onClick={scrollTo}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.2 : 1, y: hovered ? -2 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        whileTap={{ scale: 0.8 }}
        style={{
          width: 48, height: 48,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, position: "relative",
          background: isActive
            ? "linear-gradient(135deg, #3b5bdb, #5c7cfa)"
            : hovered ? "rgba(74,109,240,0.18)" : "rgba(92,124,250,0.09)",
          border: `1.5px solid ${isActive ? "rgba(124,159,255,0.65)" : hovered ? "rgba(92,124,250,0.42)" : "rgba(92,124,250,0.16)"}`,
          boxShadow: isActive
            ? "0 0 24px rgba(74,109,240,0.5), 0 4px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.22)"
            : hovered
              ? "0 0 14px rgba(74,109,240,0.22), 0 4px 12px rgba(0,0,0,0.08)"
              : "0 2px 8px rgba(0,0,0,0.06)",
          backdropFilter: "blur(10px)",
          transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
          outline: "none",
        }}
      >
        {isActive && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.3) 0%, transparent 62%)",
            pointerEvents: "none",
          }} />
        )}
        <item.Icon
          size={18}
          strokeWidth={isActive ? 2.2 : 1.7}
          style={{
            color: isActive ? "#fff" : hovered ? "#7c9fff" : "rgba(92,124,250,0.58)",
            transition: "color 0.2s",
            position: "relative", zIndex: 1,
          }}
        />
      </motion.button>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const offsets = NAV.map(({ href }) => {
        const el = document.querySelector(href);
        return el ? Math.abs(el.getBoundingClientRect().top) : Infinity;
      });
      setActiveIdx(offsets.indexOf(Math.min(...offsets)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .navlink {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(30,42,85,0.68);
          padding: 6px 13px; border-radius: 100px;
          text-decoration: none;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .navlink:hover { color: #2a3cad; background: rgba(74,109,240,0.07); }
      `}</style>

      {/* TOP NAVBAR */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav
            key="topnav"
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -72, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
              background: "rgba(240,242,255,0.9)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(99,130,255,0.1)",
              boxShadow: "0 1px 18px rgba(60,80,180,0.06)",
            }}
          >
            <div style={{
              maxWidth: 1200, margin: "0 auto", padding: "0 32px",
              height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <motion.a href="#home" onClick={e => { e.preventDefault(); scrollTo("#home"); }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ textDecoration: "none" }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #2a3cad, #5c7cfa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>lio</span>
              </motion.a>
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                {NAV.map((item, i) => (
                  <motion.a key={item.label} href={item.href}
                    onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                    className="navlink"
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 + 0.1 }}>
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* FLOATING RIGHT ICONS */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="floatdock"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              right: 24,
              top: "20%",
              transform: "translateY(-50%)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-end",
            }}
          >
            {NAV.map((item, i) => (
              <FloatIcon key={item.href} item={item} index={i} activeIdx={activeIdx} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}