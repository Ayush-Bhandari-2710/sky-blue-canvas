import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Zap, Gift, BookOpen,
  Mic2, Mail, Menu, X, BriefcaseBusiness, Users,
} from "lucide-react";

const NAV = [
  { label: "Home",         href: "#home",         Icon: Home              },
  { label: "About",        href: "#about",        Icon: User              },
  { label: "Expertise",    href: "#expertise",    Icon: Zap               },
  { label: "Offerings",    href: "#offerings",    Icon: Gift              },
  { label: "Publications", href: "#publications", Icon: BookOpen          },
  { label: "Case Studies", href: "#case-studies", Icon: BriefcaseBusiness },
  { label: "Global Talks", href: "#talks",        Icon: Mic2              },
  { label: "Mentoring",    href: "#mentoring",    Icon: Users             },
  { label: "Contact",      href: "#contact",      Icon: Mail              },
];

const getIsMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const getScrolled = () =>
  typeof window !== "undefined" && window.scrollY > 60;

/* ─────────────────────────────────────────
   Logo - shared between mobile + desktop
───────────────────────────────────────── */
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <motion.a
      href="#home"
      onClick={e => { e.preventDefault(); onClick(); }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
    >
      {/* U monogram */}
      <div style={{
        width: 36, height: 36, borderRadius: 11, flexShrink: 0,
        background: "linear-gradient(135deg, #2a3cad 0%, #5c7cfa 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(74,109,240,0.32)",
      }}>
        <span style={{
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          fontSize: 16, fontWeight: 800, color: "white", lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>U</span>
      </div>

      <div style={{ lineHeight: 1 }}>
        <div style={{
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #2a3cad, #5c7cfa)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Uchit Vyas
        </div>
        <div style={{
          fontSize: 9.5, fontWeight: 500, color: "rgba(30,42,85,0.42)",
          letterSpacing: "0.05em", marginTop: 2, textTransform: "uppercase",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          Enterprise Architect
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   Floating right-dock icon (desktop scroll)
───────────────────────────────────────── */
function FloatIcon({
  item,
  index,
  activeIdx,
}: {
  item: (typeof NAV)[0];
  index: number;
  activeIdx: number;
}) {
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
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.88 }}
            transition={{ duration: 0.14 }}
            style={{
              position: "absolute", right: "calc(100% + 14px)",
              whiteSpace: "nowrap",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12, fontWeight: 600,
              color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
              background: isActive
                ? "linear-gradient(135deg, rgba(42,60,173,0.96), rgba(74,109,240,0.96))"
                : "rgba(12,18,55,0.86)",
              backdropFilter: "blur(14px)",
              border: `1px solid ${isActive ? "rgba(92,124,250,0.5)" : "rgba(92,124,250,0.18)"}`,
              borderRadius: 9, padding: "5px 12px",
              pointerEvents: "none",
              boxShadow: isActive
                ? "0 4px 18px rgba(74,109,240,0.35)"
                : "0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={scrollTo}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.18 : 1, y: hovered ? -2 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        whileTap={{ scale: 0.82 }}
        style={{
          width: 44, height: 44, borderRadius: "50%",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, position: "relative",
          background: isActive
            ? "linear-gradient(135deg, #3b5bdb, #5c7cfa)"
            : hovered
            ? "rgba(74,109,240,0.16)"
            : "rgba(92,124,250,0.08)",
          border: `1.5px solid ${
            isActive
              ? "rgba(124,159,255,0.65)"
              : hovered
              ? "rgba(92,124,250,0.4)"
              : "rgba(92,124,250,0.15)"
          }`,
          boxShadow: isActive
            ? "0 0 24px rgba(74,109,240,0.48), 0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.22)"
            : hovered
            ? "0 0 14px rgba(74,109,240,0.2), 0 4px 12px rgba(0,0,0,0.06)"
            : "0 2px 8px rgba(0,0,0,0.05)",
          backdropFilter: "blur(10px)",
          outline: "none",
          transition: "background 0.22s, border-color 0.22s, box-shadow 0.22s",
        }}
      >
        {/* Inner specular gloss on active */}
        {isActive && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.28) 0%, transparent 62%)",
            pointerEvents: "none",
          }} />
        )}
        <item.Icon
          size={17}
          strokeWidth={isActive ? 2.2 : 1.7}
          style={{
            color: isActive ? "#fff" : hovered ? "#7c9fff" : "rgba(92,124,250,0.55)",
            transition: "color 0.2s",
            position: "relative", zIndex: 1,
          }}
        />
      </motion.button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Mobile dropdown menu
───────────────────────────────────────── */
function MobileMenu({
  activeIdx,
  onNavigate,
  isOpen,
}: {
  activeIdx: number;
  onNavigate: (href: string) => void;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, scale: 0.92, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -8 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", top: "calc(100% + 10px)", right: 0,
            width: 230,
            background: "rgba(240,242,255,0.97)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderRadius: 18, border: "1px solid rgba(99,130,255,0.13)",
            boxShadow: "0 8px 32px rgba(60,80,180,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "10px", display: "flex", flexDirection: "column", gap: 2,
            transformOrigin: "top right", zIndex: 200,
          }}
        >
          {NAV.map((item, i) => (
            <motion.button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.028, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 10,
                fontSize: 13, fontWeight: activeIdx === i ? 600 : 500,
                color: activeIdx === i ? "#2a3cad" : "rgba(30,42,85,0.75)",
                background: activeIdx === i ? "rgba(74,109,240,0.08)" : "transparent",
                border: "none", cursor: "pointer", width: "100%", textAlign: "left",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "background 0.16s, color 0.16s",
              }}
            >
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                background: activeIdx === i
                  ? "linear-gradient(135deg, #3b5bdb, #5c7cfa)"
                  : "rgba(92,124,250,0.1)",
                border: `1px solid ${activeIdx === i ? "rgba(124,159,255,0.5)" : "rgba(92,124,250,0.14)"}`,
              }}>
                <item.Icon
                  size={12}
                  strokeWidth={activeIdx === i ? 2.2 : 1.8}
                  color={activeIdx === i ? "#fff" : "rgba(74,109,240,0.68)"}
                />
              </span>
              {item.label}
              {activeIdx === i && (
                <span style={{
                  marginLeft: "auto", width: 5, height: 5, borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b5bdb, #5c7cfa)", flexShrink: 0,
                }} />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────── */
export default function Navbar() {
  const [isMobile,  setIsMobile]  = useState(() => getIsMobile());
  const [scrolled,  setScrolled]  = useState(() => getScrolled());
  const [activeIdx, setActiveIdx] = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 60);
      if (sy > 60) setMenuOpen(false);
      const offsets = NAV.map(({ href }) => {
        const el = document.querySelector(href);
        return el ? Math.abs(el.getBoundingClientRect().top) : Infinity;
      });
      setActiveIdx(offsets.indexOf(Math.min(...offsets)));
    };
    const onResize = () => { setIsMobile(getIsMobile()); setMenuOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        `}</style>
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          height: 62,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 18px",
          background: "rgba(240,242,255,0.96)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(99,130,255,0.1)",
          boxShadow: "0 1px 18px rgba(60,80,180,0.06)",
        }}>
          <Logo onClick={() => scrollTo("#home")} />
          <div style={{ position: "relative" }}>
            <motion.button
              onClick={() => setMenuOpen(v => !v)}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle menu"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 40, height: 40, borderRadius: 11,
                background: menuOpen ? "rgba(74,109,240,0.12)" : "rgba(92,124,250,0.09)",
                border: `1.5px solid ${menuOpen ? "rgba(92,124,250,0.35)" : "rgba(92,124,250,0.18)"}`,
                cursor: "pointer", outline: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                    <X size={18} color="#2a3cad" strokeWidth={2.2} />
                  </motion.span>
                ) : (
                  <motion.span key="open"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                    <Menu size={18} color="#2a3cad" strokeWidth={2.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <MobileMenu activeIdx={activeIdx} onNavigate={scrollTo} isOpen={menuOpen} />
          </div>
        </div>
      </>
    );
  }

  /* ── DESKTOP ── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .navlink {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12.5px; font-weight: 500;
          color: rgba(30,42,85,0.62);
          padding: 6px 11px; border-radius: 100px;
          text-decoration: none;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .navlink:hover { color: #2a3cad; background: rgba(74,109,240,0.07); }
        .navlink-active {
          color: #2a3cad !important;
          background: rgba(74,109,240,0.09) !important;
          font-weight: 650 !important;
        }
      `}</style>

      {/* Top bar - visible before scroll */}
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
              background: "rgba(240,242,255,0.92)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(99,130,255,0.1)",
              boxShadow: "0 1px 18px rgba(60,80,180,0.06)",
            }}
          >
            <div style={{
              maxWidth: 1200, margin: "0 auto", padding: "0 28px",
              height: 66, display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <Logo onClick={() => scrollTo("#home")} />

              {/* Nav links */}
              <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                    className={`navlink${activeIdx === i ? " navlink-active" : ""}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.035 + 0.08 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="https://calendly.com/uchit86/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 100, textDecoration: "none",
                  background: "linear-gradient(135deg, #2a3cad, #5c7cfa)",
                  color: "white", fontSize: 12.5, fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(74,109,240,0.28)",
                  flexShrink: 0, whiteSpace: "nowrap",
                }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating right dock - visible after scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="floatdock"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", right: 22, top: "20%", transform: "translateY(-50%)",
              zIndex: 100, display: "flex", flexDirection: "column", gap: 10,
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