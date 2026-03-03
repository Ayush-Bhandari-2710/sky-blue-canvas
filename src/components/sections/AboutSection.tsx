import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Heart, Award, Coffee, Users, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const stats = [
  { icon: Users,  value: "50+",   label: "Happy Clients"  },
  { icon: Award,  value: "30+",   label: "Projects"       },
  { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
  { icon: Heart,  value: "100%",  label: "Passion"        },
];

const highlights = [
  { label: "Location",     value: "India",        icon: MapPin,       open: false },
  { label: "Experience",   value: "5+ Years",     icon: Calendar,     open: false },
  { label: "Availability", value: "Open to Work", icon: CheckCircle2, open: true  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const isDesktop = !isMobile && !isTablet;

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "64px 0 80px" : isTablet ? "80px 0 96px" : "96px 0 112px",
        background: "linear-gradient(180deg, #f7f8ff 0%, #eef0fb 100%)",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .about-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(99,130,255,0.08); border: 1px solid rgba(99,130,255,0.2); color: #4a6df0;
        }
        .about-h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(24px, 4vw, 44px); font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.12; color: #111827; margin: 0;
        }
        .about-h2 em {
          font-style: normal;
          background: linear-gradient(135deg, #2a3cad, #5c7cfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .img-card {
          border-radius: 24px; overflow: hidden;
          border: 1px solid rgba(99,130,255,0.12);
          box-shadow: 0 20px 60px rgba(60,80,180,0.1), 0 4px 16px rgba(60,80,180,0.06);
          background: #e8ebf8; width: 100%; position: relative;
        }
        .img-card img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
        }

        /* THE FIX: stretch wrapper makes image fill full column height */
        .img-col-stretch {
          display: flex;
          flex-direction: column;
          align-self: stretch;
        }
        .img-col-stretch .img-card {
          flex: 1;
          min-height: 0;
        }

        .exp-pill {
          position: absolute; bottom: 14px; right: 14px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(16px);
          border: 1px solid rgba(99,130,255,0.15); border-radius: 14px;
          padding: 10px 14px; box-shadow: 0 8px 24px rgba(60,80,180,0.13); text-align: center;
        }
        .exp-num {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800;
          background: linear-gradient(135deg, #2a3cad, #5c7cfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1;
        }
        .exp-label {
          font-size: 9px; color: #9aa5c8; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; line-height: 1.4;
        }

        .about-body {
          font-size: 15px; line-height: 1.85; color: #5a6a90; font-weight: 400; margin: 0;
        }
        .about-body-sm {
          font-size: 13.5px; line-height: 1.8; color: #5a6a90; font-weight: 400; margin: 0;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(80,112,232,0.18), transparent);
          margin: 20px 0;
        }

        .stat-tile {
          display: flex; flex-direction: column; align-items: center;
          padding: 14px 10px; border-radius: 14px;
          background: rgba(255,255,255,0.8); border: 1px solid rgba(99,130,255,0.1);
          box-shadow: 0 2px 12px rgba(99,130,255,0.06);
          text-align: center; transition: all 0.24s ease; cursor: default;
        }
        .stat-tile:hover {
          transform: translateY(-3px); border-color: rgba(99,130,255,0.22);
          box-shadow: 0 8px 28px rgba(99,130,255,0.11); background: rgba(255,255,255,0.97);
        }
        .stat-icon-wrap {
          width: 32px; height: 32px; border-radius: 10px;
          background: linear-gradient(135deg, #ebefff, #d8e0ff);
          display: flex; align-items: center; justify-content: center; margin-bottom: 7px;
        }
        .stat-val {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 17px;
          font-weight: 800; color: #3a5af0; line-height: 1; margin-bottom: 3px;
        }
        .stat-label { font-size: 10px; color: #9aa5c8; font-weight: 500; letter-spacing: 0.03em; line-height: 1.3; }

        .quote-block {
          padding: 16px 20px; border-radius: 14px;
          background: rgba(99,130,255,0.04); border: 1px solid rgba(99,130,255,0.12);
          border-left: 3px solid rgba(80,112,232,0.45);
        }
        .quote-text {
          font-size: 13.5px; font-style: italic; color: #4a5a8a;
          line-height: 1.7; margin: 0 0 5px 0; font-weight: 400;
        }
        .quote-attr { font-size: 10.5px; color: #9aa5c8; font-weight: 600; letter-spacing: 0.06em; }

        .info-chip {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-radius: 14px;
          background: rgba(255,255,255,0.82); border: 1px solid rgba(99,130,255,0.11);
          box-shadow: 0 2px 12px rgba(99,130,255,0.06); backdrop-filter: blur(12px);
          transition: all 0.22s ease; flex: 1; min-width: 0;
        }
        .info-chip:hover {
          background: rgba(255,255,255,0.97); border-color: rgba(99,130,255,0.24); transform: translateY(-2px);
        }
        .info-icon-wrap {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #e8edff, #d4dcff);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .info-key {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #b0bcd8; line-height: 1; margin-bottom: 3px;
        }
        .info-val { font-size: 13px; font-weight: 600; color: #1e2a55; line-height: 1; }
        .open-badge {
          margin-left: auto; font-size: 9.5px; font-weight: 700; letter-spacing: 0.07em;
          color: #2e7d32; background: rgba(76,175,80,0.1); border: 1px solid rgba(76,175,80,0.22);
          border-radius: 100px; padding: 3px 8px; white-space: nowrap; flex-shrink: 0;
        }
        .bg-blob { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(60px); }
      `}</style>

      <div className="bg-blob" style={{ width: 400, height: 400, top: "-10%", right: "5%", background: "rgba(99,130,255,0.07)" }} />
      <div className="bg-blob" style={{ width: 300, height: 300, bottom: "5%", left: "0%", background: "rgba(120,100,255,0.05)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : isTablet ? "0 28px" : "0 32px" }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <span className="about-tag">✦ Get to Know Me</span>
          </div>
          <h2 className="about-h2">The <em>Person</em> Behind the Work</h2>
          <p style={{ fontSize: 13.5, color: "#9aa5c8", fontWeight: 400, marginTop: 8 }}>
            Crafting experiences with intention, clarity, and care.
          </p>
        </motion.div>

        {/* ══════════ MOBILE < 640 ══════════ */}
        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Image — landscape crop, no dead space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="img-card" style={{ height: 250 }}>
                <img src="/images/image.png" alt="Uchit Vyas" />
                <motion.div className="exp-pill"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55 }}
                >
                  <div className="exp-num">5+</div>
                  <div className="exp-label">Years of<br />Experience</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <p className="about-body">
                I'm a passionate designer and developer with over 5 years of experience creating beautiful,
                functional digital experiences that solve real-world problems.
              </p>
              <p className="about-body">
                I believe great design is invisible — it just works. My approach combines aesthetic sensibility
                with user-centered thinking to deliver measurable results.
              </p>
              <div className="quote-block">
                <p className="quote-text">"Design is not just what it looks like — design is how it works."</p>
                <span className="quote-attr">— A guiding principle</span>
              </div>
            </motion.div>

            {/* Stats 2×2 */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
            >
              {stats.map((stat, i) => (
                <motion.div key={stat.label} className="stat-tile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.06 }}
                >
                  <div className="stat-icon-wrap"><stat.icon size={14} style={{ color: "#5070e8" }} /></div>
                  <div className="stat-val">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Info chips stacked */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {highlights.map((h, i) => (
                <div key={i} className="info-chip" style={{ flex: "none" }}>
                  <div className="info-icon-wrap"><h.icon size={14} style={{ color: "#5070e8" }} /></div>
                  <div>
                    <div className="info-key">{h.label}</div>
                    <div className="info-val">{h.value}</div>
                  </div>
                  {h.open && <span className="open-badge">● OPEN</span>}
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {/* ══════════ TABLET 640–1023 ══════════ */}
        {isTablet && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Grid: image left, content right — STRETCH so image fills height */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "42% 1fr",
              gap: 28,
              alignItems: "stretch",
            }}>
              {/* Left: img-col-stretch makes card fill full row height */}
              <motion.div
                className="img-col-stretch"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="img-card">
                  <img src="/images/image.png" alt="Uchit Vyas" />
                  <motion.div className="exp-pill"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.65 }}
                  >
                    <div className="exp-num">5+</div>
                    <div className="exp-label">Years of<br />Experience</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right: text + 2×2 stats + quote */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: "flex", flexDirection: "column", paddingTop: 2 }}
              >
                <p className="about-body-sm" style={{ marginBottom: 11 }}>
                  I'm a passionate designer and developer with over 5 years of experience creating beautiful,
                  functional digital experiences. My journey began with a curiosity for how technology can
                  solve real-world problems.
                </p>
                <p className="about-body-sm" style={{ marginBottom: 11 }}>
                  I believe great design is invisible — it just works. My approach combines aesthetic sensibility
                  with user-centered thinking, ensuring every project delivers measurable results.
                </p>
                <p className="about-body-sm">
                  When I'm not designing or coding, you'll find me exploring new technologies,
                  contributing to open source, or sharing knowledge through global talks.
                </p>

                <div className="divider" />

                {/* 2×2 on tablet — 4-in-a-row is too tight in narrow right column */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label} className="stat-tile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.38 + i * 0.06 }}
                    >
                      <div className="stat-icon-wrap"><stat.icon size={13} style={{ color: "#5070e8" }} /></div>
                      <div className="stat-val" style={{ fontSize: 15 }}>{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="quote-block">
                  <p className="quote-text">"Design is not just what it looks like — design is how it works."</p>
                  <span className="quote-attr">— A guiding principle</span>
                </div>
              </motion.div>
            </div>

            {/* Info chips — full width row below */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              style={{ display: "flex", gap: 12 }}
            >
              {highlights.map((h, i) => (
                <motion.div key={i} className="info-chip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.07 }}
                >
                  <div className="info-icon-wrap"><h.icon size={14} style={{ color: "#5070e8" }} /></div>
                  <div>
                    <div className="info-key">{h.label}</div>
                    <div className="info-val">{h.value}</div>
                  </div>
                  {h.open && <span className="open-badge">● OPEN</span>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* ══════════ DESKTOP ≥ 1024 ══════════ */}
        {isDesktop && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 52,
              alignItems: "stretch",
            }}>
              {/* Left: stretch image to fill row height */}
              <motion.div
                className="img-col-stretch"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="img-card">
                  <img src="/images/image.png" alt="Uchit Vyas" />
                  <motion.div className="exp-pill"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="exp-num">5+</div>
                    <div className="exp-label">Years of<br />Experience</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right: full text + 4-col stats + quote */}
              <motion.div
                initial={{ opacity: 0, x: 22 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", paddingTop: 4 }}
              >
                <p className="about-body" style={{ marginBottom: 14 }}>
                  I'm a passionate designer and developer with over 5 years of experience
                  creating beautiful, functional digital experiences. My journey began
                  with a curiosity for how technology can solve real-world problems and
                  has evolved into a career dedicated to crafting intuitive interfaces.
                </p>
                <p className="about-body" style={{ marginBottom: 14 }}>
                  I believe great design is invisible — it just works. My approach combines
                  aesthetic sensibility with user-centered thinking, ensuring every project
                  not only looks stunning but delivers measurable results for clients.
                </p>
                <p className="about-body">
                  When I'm not designing or coding, you'll find me exploring new technologies,
                  contributing to open source, or sharing knowledge through workshops and global talks.
                </p>

                <div className="divider" />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 22 }}>
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label} className="stat-tile"
                      initial={{ opacity: 0, y: 14 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.07 }}
                    >
                      <div className="stat-icon-wrap"><stat.icon size={15} style={{ color: "#5070e8" }} /></div>
                      <div className="stat-val">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="quote-block" style={{ marginTop: "auto" }}>
                  <p className="quote-text">"Design is not just what it looks like — design is how it works."</p>
                  <span className="quote-attr">— A guiding principle</span>
                </div>
              </motion.div>
            </div>

            {/* Info chips — full width horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              style={{ display: "flex", gap: 14 }}
            >
              {highlights.map((h, i) => (
                <motion.div key={i} className="info-chip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <div className="info-icon-wrap"><h.icon size={15} style={{ color: "#5070e8" }} /></div>
                  <div>
                    <div className="info-key">{h.label}</div>
                    <div className="info-val">{h.value}</div>
                  </div>
                  {h.open && <span className="open-badge">● OPEN</span>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AboutSection;