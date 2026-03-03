import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Zap, ArrowRight, BookOpen } from "lucide-react";

const timeline = [
  {
    id: "infra-automation-devsecops",
    date: "Nov 2015",
    title: "Infrastructure Automation and DevSecOps",
    description:
      "Hands-on CI/CD tooling, rollout safety, and automation patterns for faster delivery with confidence. Includes orchestration in automation workflows and DevSecOps toolchains.",
    tags: ["CI/CD", "Automation", "Policy gates"],
    accent: "#3b82f6",
  },
  {
    id: "chef",
    date: "Feb 2015",
    title: "Infrastructure Configuration with Chef",
    description:
      "Infrastructure as code foundations using reusable cookbooks, environment parity, and safe change management across dev, staging, and production.",
    tags: ["IaC", "Config mgmt", "Environments"],
    accent: "#06b6d4",
  },
  {
    id: "puppet",
    date: "Jan 2014",
    title: "Automation with Puppet",
    description:
      "Policy-driven configuration using modules and manifests, with emphasis on repeatability and control across large fleets.",
    tags: ["Automation", "Policies", "Repeatability"],
    accent: "#8b5cf6",
  },
  {
    id: "bpmn",
    date: "Nov 2013",
    title: "Activiti BPMN",
    description:
      "Business process modeling and workflow automation using BPMN, with monitoring patterns for reliable operations.",
    tags: ["BPMN", "Workflows", "Ops"],
    accent: "#10b981",
  },
  {
    id: "git",
    date: "Aug 2013",
    title: "Version Control System: Git",
    description:
      "Branching strategies, collaboration workflows, and release hygiene for teams shipping continuously.",
    tags: ["Git", "Branching", "Collaboration"],
    accent: "#f59e0b",
  },
  {
    id: "alfresco",
    date: "Jan 2012",
    title: "Alfresco CMS",
    description:
      "Enterprise content management patterns including governance, lifecycle, and workflow-based operations.",
    tags: ["CMS", "Governance", "Content"],
    accent: "#ec4899",
  },
  {
    id: "ci",
    date: "Dec 2011",
    title: "Continuous Integration",
    description:
      "Build automation, test pipelines, and quality gates to reduce integration pain and improve release confidence.",
    tags: ["CI", "Testing", "Quality gates"],
    accent: "#3b82f6",
  },
  {
    id: "cloud",
    date: "May 2011",
    title: "Cloud Computing",
    description:
      "Cloud fundamentals and scalable architecture patterns with focus on cost, reliability, and operational maturity.",
    tags: ["Cloud", "Scaling", "Reliability"],
    accent: "#6366f1",
  },
];

/* ── Very subtle blue noise on white ── */
function BlueNoiseCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = (canvas.width  = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(W, H);
    const d   = img.data;

    for (let i = 0; i < d.length; i += 4) {
      const r = Math.random();
      if (r > 0.991) {
        // faint blue speck
        d[i]     = 80 + Math.random() * 40;
        d[i + 1] = 120 + Math.random() * 40;
        d[i + 2] = 220 + Math.random() * 35;
        d[i + 3] = 18 + Math.random() * 22;
      } else if (r > 0.975) {
        // even lighter blue-grey grain
        d[i]     = 160 + Math.random() * 30;
        d[i + 1] = 175 + Math.random() * 30;
        d[i + 2] = 220 + Math.random() * 30;
        d[i + 3] = 6 + Math.random() * 9;
      }
      // else fully transparent — keeps bg clean white
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        opacity: 0.9,
        zIndex: 0,
      }}
    />
  );
}

/* ── Card ── */
function TimelineCard({ it, idx, isInViewSection }) {
  const cardRef = useRef(null);
  const [hov, setHov] = useState(false);

  const active = useInView(cardRef, { margin: "-30% 0px -42% 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      animate={isInViewSection ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.55, delay: idx * 0.065, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative", display: "flex",
        alignItems: "flex-start", gap: 0, marginBottom: 16,
      }}
    >
      {/* Node column */}
      <div style={{
        flexShrink: 0, width: 52,
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 26,
      }}>
        <div style={{ position: "relative", width: 16, height: 16 }}>
          {active && (
            <motion.div
              animate={{ scale: [1, 2.1, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                border: `1.5px solid ${it.accent}`,
                pointerEvents: "none",
              }}
            />
          )}
          <motion.div
            animate={{
              background: active ? it.accent : "#d1d9ef",
              boxShadow: active ? `0 0 12px ${it.accent}55` : "none",
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: 16, height: 16, borderRadius: "50%",
              border: `2px solid ${active ? it.accent + "50" : "#e2e7f5"}`,
            }}
          />
        </div>
      </div>

      {/* Date */}
      <div style={{
        flexShrink: 0, width: 90, paddingTop: 27, paddingRight: 18,
        display: "flex", justifyContent: "flex-end",
      }}>
        <motion.span
          animate={{ opacity: active ? 1 : 0.35, color: active ? it.accent : "#9aa5c8" }}
          transition={{ duration: 0.35 }}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {it.date}
        </motion.span>
      </div>

      {/* Card */}
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        animate={{ opacity: active ? 1 : 0.45, y: hov ? -5 : 0 }}
        transition={{ duration: 0.24 }}
        style={{
          flex: 1,
          borderRadius: 20,
          padding: "20px 24px 22px",
          position: "relative",
          overflow: "hidden",
          background: "white",
          border: `1px solid ${active ? it.accent + "28" : "rgba(99,130,255,0.1)"}`,
          boxShadow: active
            ? `0 8px 32px rgba(60,80,180,0.09), 0 0 0 1px ${it.accent}12`
            : "0 2px 12px rgba(60,80,180,0.05)",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1.5,
          background: active
            ? `linear-gradient(90deg, transparent, ${it.accent}60, transparent)`
            : "transparent",
          transition: "background 0.4s",
          pointerEvents: "none",
          borderRadius: 1,
        }} />

        {/* Left stripe */}
        <motion.div
          animate={{ opacity: active ? 1 : 0, scaleY: active ? 1 : 0.3 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", top: "15%", left: 0,
            width: 2.5, height: "70%", borderRadius: 2,
            background: `linear-gradient(to bottom, transparent, ${it.accent}80, transparent)`,
            transformOrigin: "center",
          }}
        />

        {/* Shimmer on hover */}
        <AnimatePresence>
          {hov && active && (
            <motion.div
              key="sh"
              initial={{ x: "-110%" }} animate={{ x: "220%" }} exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              style={{
                position: "absolute", top: 0, left: 0,
                width: "40%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(99,130,255,0.04), transparent)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Badge row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: 100,
              background: `${it.accent}10`,
              border: `1px solid ${it.accent}25`,
            }}>
              <Zap size={9} style={{ color: it.accent }} />
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.09em",
                textTransform: "uppercase", color: it.accent,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                Training milestone
              </span>
            </div>

            <motion.div
              animate={{ opacity: hov && active ? 1 : 0, x: hov ? 0 : 6 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                fontSize: 12, fontWeight: 600, color: it.accent,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Explore <ArrowRight size={12} />
            </motion.div>
          </div>

          {/* Title */}
          <h3 style={{
            margin: "0 0 8px",
            fontSize: "clamp(14.5px, 1.8vw, 17px)",
            fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: "-0.015em",
            lineHeight: 1.3,
            color: active ? "#111827" : "#9aa5c8",
            transition: "color 0.4s",
          }}>
            {it.title}
          </h3>

          {/* Description */}
          <p style={{
            margin: "0 0 14px",
            fontSize: 13.5, lineHeight: 1.75,
            color: active ? "#6b7a99" : "#c0cbe8",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            transition: "color 0.4s",
          }}>
            {it.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {it.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 500,
                padding: "4px 11px", borderRadius: 100,
                background: active ? `${it.accent}08` : "rgba(99,130,255,0.04)",
                border: `1px solid ${active ? it.accent + "22" : "rgba(99,130,255,0.1)"}`,
                color: active ? "#4a5580" : "#b0bcd8",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.35s",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main ── */
const TrainingSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="training"
      style={{
        position: "relative",
        padding: "96px 0 120px",
        background: "#ffffff",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Very faint blue radial tint — keeps it white but not sterile */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 40% at 50% 0%,   rgba(99,130,255,0.055) 0%, transparent 65%),
          radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,130,255,0.04)  0%, transparent 60%)
        `,
      }} />

      {/* Blue noise grain */}
      <BlueNoiseCanvas />

      <div
        ref={ref}
        style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}
      >

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 16px", borderRadius: 100,
              background: "white",
              border: "1px solid rgba(99,130,255,0.2)",
              boxShadow: "0 2px 10px rgba(99,130,255,0.08)",
            }}>
              <BookOpen size={11} style={{ color: "#4a6df0" }} />
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#4a6df0",
              }}>
                Learn With Me
              </span>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: "0 0 14px",
            color: "#111827",
          }}>
            Training{" "}
            <span style={{
              background: "linear-gradient(135deg, #2a3cad, #5c7cfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Programs
            </span>
          </h2>

          <p style={{
            fontSize: 14, lineHeight: 1.75,
            color: "#9aa5c8",
            maxWidth: 480, margin: "0 auto",
            fontWeight: 400,
          }}>
            Hands-on training programs designed to level up your skills
            and accelerate your career in modern infrastructure engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>

          {/* Guide line */}
          <div style={{
            position: "absolute",
            left: 59, top: 0, bottom: 0, width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(99,130,255,0.18) 8%, rgba(99,130,255,0.14) 50%, rgba(99,130,255,0.08) 92%, transparent)",
            pointerEvents: "none",
          }} />



          <div style={{ display: "flex", flexDirection: "column" }}>
            {timeline.map((it, idx) => (
              <TimelineCard key={it.id} it={it} idx={idx} isInViewSection={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;