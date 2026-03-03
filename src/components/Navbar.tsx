import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Zap, Gift, BookOpen,
  Mic2, GraduationCap, Mail, Handshake, Menu, X,
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
  const [scrolled,   setScrolled]   = useState(false);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Close menu on scroll
  useEffect(() => {
    if (scrolled) setMenuOpen(false);
  }, [scrolled]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
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
        .hamburger-btn {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(92,124,250,0.09);
          border: 1.5px solid rgba(92,124,250,0.18);
          cursor: pointer; outline: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .hamburger-btn:hover {
          background: rgba(74,109,240,0.16);
          border-color: rgba(92,124,250,0.38);
        }
        .mobile-menu-item {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          color: rgba(30,42,85,0.78);
          display: flex; align-items: center; gap: 12px;
          padding: 13px 20px; border-radius: 12px;
          text-decoration: none; cursor: pointer;
          transition: color 0.18s, background 0.18s;
          border: none; background: transparent; width: 100%; text-align: left;
        }
        .mobile-menu-item:hover, .mobile-menu-item.active {
          color: #2a3cad;
          background: rgba(74,109,240,0.08);
        }
        .mobile-menu-item.active {
          font-weight: 600;
        }
      `}</style>

      {/* ─── TOP NAVBAR (desktop: not scrolled) ─── */}
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
              {/* Logo */}
              <motion.a
                href="#home"
                onClick={e => { e.preventDefault(); scrollTo("#home"); }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{ textDecoration: "none" }}
              >
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #2a3cad, #5c7cfa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Portfolio</span>
              </motion.a>

              {/* Desktop links */}
              {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {NAV.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                      className="navlink"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 + 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              )}

              {/* Hamburger (mobile only) */}
              {isMobile && (
                <motion.button
                  className="hamburger-btn"
                  onClick={() => setMenuOpen(v => !v)}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <X size={20} color="#2a3cad" strokeWidth={2.2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Menu size={20} color="#2a3cad" strokeWidth={2.2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </div>

            {/* ─── MOBILE DROPDOWN MENU ─── */}
            <AnimatePresence>
              {isMobile && menuOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    overflow: "hidden",
                    borderTop: "1px solid rgba(99,130,255,0.1)",
                  }}
                >
                  <div style={{
                    padding: "10px 16px 16px",
                    display: "flex", flexDirection: "column", gap: 2,
                    background: "rgba(240,242,255,0.97)",
                  }}>
                    {NAV.map((item, i) => (
                      <motion.button
                        key={item.href}
                        className={`mobile-menu-item${activeIdx === i ? " active" : ""}`}
                        onClick={() => scrollTo(item.href)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                          background: activeIdx === i
                            ? "linear-gradient(135deg, #3b5bdb, #5c7cfa)"
                            : "rgba(92,124,250,0.1)",
                          border: `1px solid ${activeIdx === i ? "rgba(124,159,255,0.5)" : "rgba(92,124,250,0.16)"}`,
                        }}>
                          <item.Icon
                            size={15}
                            strokeWidth={activeIdx === i ? 2.2 : 1.8}
                            color={activeIdx === i ? "#fff" : "rgba(74,109,240,0.7)"}
                          />
                        </span>
                        {item.label}
                        {activeIdx === i && (
                          <span style={{
                            marginLeft: "auto",
                            width: 6, height: 6, borderRadius: "50%",
                            background: "linear-gradient(135deg, #3b5bdb, #5c7cfa)",
                            flexShrink: 0,
                          }} />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ─── FLOATING RIGHT DOCK (desktop: scrolled) ─── */}
      <AnimatePresence>
        {scrolled && !isMobile && (
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

      {/* ─── MOBILE SCROLLED: compact floating hamburger ─── */}
      <AnimatePresence>
        {scrolled && isMobile && (
          <motion.div
            key="mobile-scrolled-fab"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", top: 16, right: 16, zIndex: 110 }}
          >
            <motion.button
              className="hamburger-btn"
              onClick={() => setMenuOpen(v => !v)}
              whileTap={{ scale: 0.88 }}
              style={{
                background: "rgba(240,242,255,0.95)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 4px 20px rgba(60,80,180,0.14), 0 1px 4px rgba(0,0,0,0.06)",
                width: 48, height: 48, borderRadius: 14,
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={20} color="#2a3cad" strokeWidth={2.2} />
                  </motion.span>
                ) : (
                  <motion.span key="open"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={20} color="#2a3cad" strokeWidth={2.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile scrolled dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  key="mobile-scrolled-menu"
                  initial={{ opacity: 0, scale: 0.92, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    width: 220,
                    background: "rgba(240,242,255,0.97)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 18,
                    border: "1px solid rgba(99,130,255,0.14)",
                    boxShadow: "0 8px 32px rgba(60,80,180,0.14), 0 2px 8px rgba(0,0,0,0.06)",
                    padding: "10px 10px",
                    display: "flex", flexDirection: "column", gap: 2,
                    transformOrigin: "top right",
                  }}
                >
                  {NAV.map((item, i) => (
                    <motion.button
                      key={item.href}
                      className={`mobile-menu-item${activeIdx === i ? " active" : ""}`}
                      onClick={() => scrollTo(item.href)}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      style={{ fontSize: 13, padding: "10px 14px", borderRadius: 10 }}
                    >
                      <span style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        background: activeIdx === i
                          ? "linear-gradient(135deg, #3b5bdb, #5c7cfa)"
                          : "rgba(92,124,250,0.1)",
                        border: `1px solid ${activeIdx === i ? "rgba(124,159,255,0.5)" : "rgba(92,124,250,0.14)"}`,
                      }}>
                        <item.Icon size={13} strokeWidth={activeIdx === i ? 2.2 : 1.8}
                          color={activeIdx === i ? "#fff" : "rgba(74,109,240,0.7)"} />
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}