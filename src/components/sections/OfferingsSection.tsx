import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Search, Network, FlaskConical, Presentation,
  ShieldCheck, Cloud, TrendingUp, ArrowRight, ArrowLeft,
  Sparkles, Building2, Layers, Brain, Database,
  CheckCircle2, Lightbulb, Hammer, Rocket, ChevronRight,
  Zap, Globe, Lock,
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const keyOfferings = [
  {
    id: "advisory",
    icon: Search,
    title: "Technology & Value Advisory",
    description: "I assess current-state platforms, operating models, and investment priorities to define practical transformation options with clear business value.",
    color: "#3b82f6",
    grad: "linear-gradient(135deg, #3b82f6, #6366f1)",
    chips: ["Architecture assessment", "Investment priorities", "Technology options"],
    details: [
      "Current-state platform and operating model assessment with gap analysis.",
      "Transformation options with trade-offs and prioritised roadmap you can act on immediately.",
      "Executive briefings and board-level narrative for major platform bets.",
    ],
  },
  {
    id: "architecture",
    icon: Network,
    title: "Enterprise Architecture & Roadmaps",
    description: "I define target-state architectures and modernisation roadmaps that align technology strategy with governance, risk, and growth priorities.",
    color: "#6366f1",
    grad: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    chips: ["Reference architecture", "EA governance", "Target-state roadmaps"],
    details: [
      "Enterprise architecture frameworks, principles, and governance operating models.",
      "Hybrid and multi-cloud reference architectures for banking, retail, and enterprise.",
      "Security-first designs with compliance controls built in from the start.",
    ],
  },
  {
    id: "platform",
    icon: Layers,
    title: "Platform & DevSecOps Acceleration",
    description: "I design secure, self-service platform capabilities and DevSecOps controls that improve delivery speed while maintaining compliance and reliability.",
    color: "#06b6d4",
    grad: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    chips: ["Platform engineering", "Secure CI/CD", "Policy-as-code"],
    details: [
      "Internal developer platform design with golden paths and self-service infrastructure.",
      "End-to-end pipeline hardening: SAST, DAST, SCA, and policy gates.",
      "Measurable reduction in lead time with no loss of deployment safety.",
    ],
  },
  {
    id: "workshops",
    icon: Presentation,
    title: "GenAI, Cloud & Data Workshops",
    description: "I run executive and engineering workshops on GenAI adoption, cloud operating models, and data modernisation with implementation-ready outcomes.",
    color: "#8b5cf6",
    grad: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    chips: ["GenAI workshops", "Cloud operating models", "Data modernisation"],
    details: [
      "Interactive sessions with exercises, templates, and practical toolkits.",
      "Alignment workshops bridging business goals with technical execution.",
      "Action plan outcomes tailored to engineering teams and executive leadership.",
    ],
  },
];

const focusAreas = [
  {
    id: "ea",
    icon: Building2,
    title: "Enterprise Architecture",
    description: "Reference architecture, capability mapping, and modernisation pathways across business-critical domains.",
    color: "#3b82f6",
    back: "Frameworks & governance that enable speed without sacrificing control. Cloud operating models with landing zones, policies, and guardrails built for scale.",
    chips: ["TOGAF", "BIAN", "Architecture Review Board", "Capability Mapping"],
  },
  {
    id: "platform",
    icon: Layers,
    title: "Platform Engineering & DevSecOps",
    description: "Internal developer platforms, secure CI/CD, and policy-as-code guardrails for faster, safer delivery.",
    color: "#6366f1",
    back: "IDP delivery with self-service golden paths. Pipeline hardening across the SDLC. Top 50 DevSecOps recognition globally — 30+ conference talks.",
    chips: ["IDP", "Policy-as-Code", "Pipeline Hardening", "SRE"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud, Reliability & FinOps",
    description: "Multi-cloud architecture, SRE operating models, and cost transparency practices for resilient scale.",
    color: "#06b6d4",
    back: "Multi-cloud design across AWS, Azure, GCP, and Oracle. SRE operating models with incident management and resilience engineering. FinOps and cost governance.",
    chips: ["AWS", "Azure", "GCP", "SRE Models", "FinOps"],
  },
  {
    id: "genai",
    icon: Brain,
    title: "GenAI & Data Modernisation",
    description: "Enterprise GenAI architecture, MLOps enablement, and trusted data foundations for decision intelligence.",
    color: "#8b5cf6",
    back: "GenAI use case prioritisation, RAG architecture, and responsible AI guardrails. Data platform modernisation from legacy warehouses to cloud-native lakehouse patterns.",
    chips: ["LLM Strategy", "RAG", "MLOps", "Data Governance"],
  },
];

const engagementModes = [
  {
    id: "advise",
    num: "01",
    icon: Lightbulb,
    label: "Advise",
    sublabel: "Strategy & Advisory",
    color: "#3b82f6",
    description: "Short, high-intensity engagements for leadership teams facing critical architecture or transformation decisions. I assess, challenge, and define a clear path forward — with options, trade-offs, and a prioritised roadmap you can act on immediately.",
    deliverables: [
      "Architecture assessment & gap analysis",
      "Technology strategy & investment options",
      "Executive briefings & board-level narrative",
    ],
  },
  {
    id: "architect",
    num: "02",
    icon: Hammer,
    label: "Architect",
    sublabel: "Design & Blueprint",
    color: "#6366f1",
    description: "From strategy to buildable design. I define target-state architectures, governance models, and implementation blueprints that engineering teams can execute — with enough rigour to survive contact with reality.",
    deliverables: [
      "Reference & target-state architecture",
      "Platform & data modernisation blueprints",
      "DevSecOps & operating model design",
    ],
  },
  {
    id: "execute",
    num: "03",
    icon: Rocket,
    label: "Execute",
    sublabel: "Embedded Delivery",
    color: "#06b6d4",
    description: "Hands-on delivery leadership for complex programs — embedded in your organisation, driving technical outcomes, managing architecture decisions in real time, ensuring what gets built matches what was designed.",
    deliverables: [
      "Program & platform delivery leadership",
      "Architecture governance during build",
      "Technical risk management & quality control",
    ],
  },
];

/* ─────────────────────────────────────────
   MAGNETIC TILT CARD
───────────────────────────────────────── */
function TiltCard({ children, style = {}, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ENGAGEMENT MODE CARD — white/blue/green palette
   Tilt on hover, glow border, click-only expand, smooth animation
───────────────────────────────────────── */
function EngagementCard({ mode, index, isInView }: { mode: typeof engagementModes[0]; index: number; isInView: boolean }) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = mode.icon;

  // Smooth tilt physics — spring returns to 0 on leave
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 32 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 32 });
  const glowX   = useSpring(useTransform(mx, [-0.5, 0.5], [10, 90]), { stiffness: 200, damping: 30 });
  const glowY   = useSpring(useTransform(my, [-0.5, 0.5], [10, 90]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0); my.set(0);
    setHovered(false);
  };

  // Accent green for Execute card, blue otherwise
  const accentIsGreen = mode.id === "execute";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActive(v => !v)}
      style={{
        rotateX, rotateY,
        transformStyle: "preserve-3d",
        perspective: 900,
        cursor: "pointer",
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        background: active
          ? `linear-gradient(160deg, #ffffff 0%, ${mode.color}06 100%)`
          : "white",
        border: `1.5px solid ${hovered || active ? mode.color + "45" : "rgba(0,0,0,0.07)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${mode.color}25, 0 20px 50px ${mode.color}18, 0 4px 16px rgba(0,0,0,0.06)`
          : active
            ? `0 0 0 1px ${mode.color}20, 0 12px 32px ${mode.color}12, 0 2px 8px rgba(0,0,0,0.04)`
            : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "background 0.3s, border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Mouse-tracked radial glow — uses spring motion values */}
      <motion.div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 22, zIndex: 0,
        background: useTransform(
          [glowX, glowY],
          ([gx, gy]: number[]) => hovered
            ? `radial-gradient(circle at ${gx}% ${gy}%, ${mode.color}12 0%, transparent 60%)`
            : "none"
        ),
      }} />

      {/* Faint dot grid — always present, brighter on hover */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${mode.color}15 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        opacity: hovered ? 0.9 : 0.3,
        transition: "opacity 0.4s",
      }} />

      {/* Top accent bar — animates in on hover/active */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2.5,
        background: hovered || active
          ? `linear-gradient(90deg, transparent, ${mode.color}, transparent)`
          : `linear-gradient(90deg, transparent, ${mode.color}30, transparent)`,
        transition: "background 0.3s",
        zIndex: 1,
      }} />

      {/* Large ghost number */}
      <div style={{
        position: "absolute", top: 14, left: 20, zIndex: 1,
        fontSize: 56, fontWeight: 900, lineHeight: 1,
        color: hovered ? `${mode.color}12` : `${mode.color}07`,
        fontFamily: "'Bricolage Grotesque', sans-serif",
        transition: "color 0.35s", pointerEvents: "none", userSelect: "none",
      }}>
        {mode.num}
      </div>

      <div style={{ padding: "26px 24px 22px", position: "relative", zIndex: 2 }}>

        {/* Icon top-right */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
          <motion.div
            style={{
              width: 50, height: 50, borderRadius: 15,
              background: hovered || active ? mode.color : `${mode.color}12`,
              border: `1.5px solid ${hovered || active ? mode.color : mode.color + "25"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: hovered ? `0 8px 24px ${mode.color}35` : "none",
              transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
            }}
            animate={hovered ? { rotate: [0, -8, 8, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.42 }}
          >
            <Icon size={22} style={{
              color: hovered || active ? "white" : mode.color,
              transition: "color 0.25s",
            }} />
          </motion.div>
        </div>

        {/* Label */}
        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase",
          color: hovered || active ? mode.color : "#94a3b8",
          marginBottom: 5, transition: "color 0.22s",
        }}>
          {mode.label}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 20, fontWeight: 800, lineHeight: 1.15, marginBottom: 0,
          color: hovered ? mode.color : "#111827",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          transition: "color 0.22s",
        }}>
          {mode.sublabel}
        </h3>

        {/* Divider */}
        <div style={{
          height: 1, marginTop: 14, marginBottom: 14,
          background: hovered
            ? `linear-gradient(90deg, ${mode.color}50, ${mode.color}10, transparent)`
            : "rgba(0,0,0,0.07)",
          transition: "background 0.3s",
        }} />

        {/* Description */}
        <p style={{
          fontSize: 13, lineHeight: 1.78, color: "#64748b",
          transition: "color 0.22s",
          margin: 0,
        }}>
          {mode.description}
        </p>

        {/* Click-to-expand deliverables — layout:fixed to prevent jump */}
        <motion.div
          initial={false}
          animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${mode.color}20` }}>
            {mode.deliverables.map((d, i) => (
              <motion.div
                key={d}
                initial={false}
                animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
                transition={{ duration: 0.3, delay: active ? i * 0.06 : 0, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 }}
              >
                <div style={{
                  width: 17, height: 17, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  background: `${mode.color}15`, border: `1px solid ${mode.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ChevronRight size={9} style={{ color: mode.color }} />
                </div>
                <span style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>{d}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expand hint — always rendered so layout is stable */}
        <div style={{
          display: "flex", alignItems: "center", gap: 5, marginTop: 14,
          fontSize: 11, fontWeight: 600,
          color: active ? mode.color : "#94a3b8",
          transition: "color 0.22s",
        }}>
          <motion.span
            animate={{ rotate: active ? 90 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronRight size={12} />
          </motion.span>
          {active ? "Hide deliverables" : "Click to see deliverables"}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FOCUS AREA CARD (flip-style)
───────────────────────────────────────── */
function FocusCard({ area, index, isInView }: { area: typeof focusAreas[0]; index: number; isInView: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = area.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900, cursor: "pointer", minHeight: 200 }}
      onClick={() => setFlipped(v => !v)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", minHeight: 200 }}
      >
        {/* FRONT — editorial left-accent style */}
        <div style={{
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          borderRadius: 20, overflow: "hidden",
          background: "white",
          border: `1px solid rgba(0,0,0,0.07)`,
          boxShadow: `0 4px 20px rgba(60,80,180,0.07)`,
          position: "relative",
          display: "flex",
        }}>
          {/* Bold left accent bar */}
          <div style={{
            width: 5, flexShrink: 0,
            background: `linear-gradient(180deg, ${area.color} 0%, ${area.color}66 100%)`,
            borderRadius: "0 0 0 0",
          }} />

          <div style={{ padding: "20px 18px 18px", flex: 1 }}>
            {/* Icon — large, sits top-right as a decorative element */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: area.color, marginBottom: 5,
                }}>
                  Domain
                </div>
                <h4 style={{
                  fontSize: 15.5, fontWeight: 800, color: "#111827", lineHeight: 1.2, margin: 0,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}>{area.title}</h4>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: `${area.color}10`,
                border: `1.5px solid ${area.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={20} style={{ color: area.color }} />
              </div>
            </div>

            {/* Thin accent rule */}
            <div style={{
              height: 1, marginBottom: 10,
              background: `linear-gradient(90deg, ${area.color}40, transparent)`,
            }} />

            <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, marginBottom: 12 }}>
              {area.description}
            </p>

            {/* Chips — square pill style, distinct from offering chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
              {area.chips.map(c => (
                <span key={c} style={{
                  fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                  background: `${area.color}0d`,
                  color: area.color,
                  letterSpacing: "0.01em",
                }}>{c}</span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, color: area.color }}>
              <span>Flip to explore</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          borderRadius: 20, padding: "22px 22px 20px",
          background: `linear-gradient(145deg, ${area.color}ee 0%, ${area.color}cc 100%)`,
          border: `1.5px solid ${area.color}`,
          boxShadow: `0 8px 32px ${area.color}40`,
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          overflow: "hidden",
        }}>
          {/* Dot texture */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={15} style={{ color: "white" }} />
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {area.title}
              </h4>
            </div>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.65 }}>{area.back}</p>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 5,
            fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.75)", marginTop: 12 }}>
            <ArrowLeft size={12} />
            <span>Flip back</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   OFFERING CARD — clean white, banner-header style
───────────────────────────────────────── */
function OfferingCard({ item, index, isInView }: { item: typeof keyOfferings[0]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        background: "white",
        border: `1px solid ${hovered ? item.color + "30" : "rgba(0,0,0,0.06)"}`,
        boxShadow: hovered
          ? `0 16px 48px ${item.color}18, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "border-color 0.25s, box-shadow 0.3s",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Coloured header banner */}
      <div style={{
        background: item.grad,
        padding: "20px 20px 16px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Geometric accent shape */}
        <div style={{
          position: "absolute", top: -20, right: -20, width: 80, height: 80,
          borderRadius: "50%", background: "rgba(255,255,255,0.12)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -12, right: 16, width: 48, height: 48,
          borderRadius: 12, background: "rgba(255,255,255,0.08)", transform: "rotate(20deg)",
          pointerEvents: "none",
        }} />
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: "rgba(255,255,255,0.22)",
          border: "1px solid rgba(255,255,255,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        }}>
          <Icon size={18} style={{ color: "white" }} />
        </div>
        <h3 style={{
          fontSize: 14.5, fontWeight: 800, color: "white", lineHeight: 1.25, margin: 0,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          textShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}>{item.title}</h3>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 20px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
          {item.description}
        </p>

        {/* Chips — text-only, no border, slash-separated feel */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 0", marginBottom: 14 }}>
          {item.chips.map((c, ci) => (
            <span key={c} style={{ fontSize: 11, fontWeight: 500, color: item.color }}>
              {c}{ci < item.chips.length - 1 ? <span style={{ color: "#d1d5db", margin: "0 6px" }}>·</span> : ""}
            </span>
          ))}
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: open ? `${item.color}08` : "transparent",
            border: `1px solid ${open ? item.color + "30" : item.color + "20"}`,
            borderRadius: 8, cursor: "pointer",
            padding: "6px 12px", fontSize: 12, fontWeight: 600, color: item.color,
            transition: "background 0.18s, border-color 0.18s",
            alignSelf: "flex-start",
          }}
        >
          {open ? "Hide details" : "View details"}
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }}>
            <ArrowRight size={12} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${item.color}25` }}>
                {item.details.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 2,
                      background: item.grad,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <CheckCircle2 size={9} style={{ color: "white" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function OfferingsSection() {
  const ref       = useRef<HTMLElement>(null);
  const isInView  = useInView(ref, { once: true, margin: "-60px" });
  const howRef    = useRef<HTMLDivElement>(null);
  const howInView = useInView(howRef, { once: true, margin: "-60px" });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1080);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDesktop = !isMobile && !isTablet;
  const px = isMobile ? "0 16px" : isTablet ? "0 24px" : "0 32px";

  return (
    <section
      id="offerings"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "60px 0 80px" : "96px 0 112px",
        background: "linear-gradient(180deg, #f8f9ff 0%, #f0f2ff 40%, #f8f9ff 100%)",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .off-tag { display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;background:white;border:1px solid rgba(99,130,255,0.2);color:#4a6df0;box-shadow:0 2px 12px rgba(99,130,255,0.09); }
        .off-h2 { font-size:clamp(26px,3.2vw,46px);font-weight:800;letter-spacing:-0.025em;line-height:1.1;color:#111827;margin:0;font-family:'Bricolage Grotesque',sans-serif; }
        .off-h2 em { font-style:normal;background:linear-gradient(135deg,#2a3cad,#5c7cfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .how-connector { position:absolute;top:50%;left:100%;width:32px;height:2px;background:linear-gradient(90deg,rgba(99,130,255,0.3),rgba(99,130,255,0.08));transform:translateY(-50%);pointer-events:none; }
        @media (max-width:1079px) { .how-connector { display:none; } }
      `}</style>

      {/* BG blobs */}
      <div style={{ position:"absolute", width:600, height:600, top:"-10%", right:"-5%",
        borderRadius:"50%", background:"rgba(99,130,255,0.05)", filter:"blur(80px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, bottom:"5%", left:"-8%",
        borderRadius:"50%", background:"rgba(80,100,255,0.04)", filter:"blur(80px)", pointerEvents:"none" }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: px }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <span className="off-tag">
              <Sparkles size={11} /> Advisory Services
            </span>
          </div>
          <h2 className="off-h2">
            Architecture, Transformation, <em>and Delivery</em>
          </h2>
          <p style={{ fontSize: isMobile ? 13.5 : 14.5, color: "#64748b", marginTop: 14,
            maxWidth: 580, margin: "14px auto 0", lineHeight: 1.75 }}>
            I partner with leadership teams to convert architecture and engineering strategy into measurable business outcomes across speed, resilience, security, and cost efficiency.
          </p>
          <motion.a
            href="https://calendly.com/uchit86/30min"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22,
              padding: "12px 24px", borderRadius: 100, textDecoration: "none",
              background: "linear-gradient(135deg, #2a3cad, #5c7cfa)",
              color: "white", fontSize: 13, fontWeight: 600,
              boxShadow: "0 8px 24px rgba(59,130,246,0.28)" }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(59,130,246,0.38)" } as any}
            whileTap={{ scale: 0.97 }}
          >
            Explore Engagement Options <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        {/* ── KEY OFFERINGS GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }}
          style={{ marginBottom: 10 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a6df0" }} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e2a55", letterSpacing: "0.02em" }}>Key Offerings</span>
          </div>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 12 : 14,
          marginBottom: isMobile ? 40 : 56,
        }}>
          {keyOfferings.map((item, i) => (
            <OfferingCard key={item.id} item={item} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── FOCUS AREAS ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18 }}
          style={{ marginBottom: 14 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 10, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a6df0" }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e2a55" }}>Focus Areas</span>
            </div>
            <p style={{ fontSize: 12, color: "#9aa5c8", maxWidth: 400 }}>
              Click any card to explore the depth behind each domain.
            </p>
          </div>
          <p style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: "#111827",
            fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: 1.25, marginBottom: 18 }}>
            I focus on high-impact domains that improve business agility, engineering effectiveness, and governance maturity at enterprise scale.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 12 : 14,
          marginBottom: isMobile ? 48 : 72,
        }}>
          {focusAreas.map((area, i) => (
            <FocusCard key={area.id} area={area} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ══════════════════════════════════════
            HOW I WORK — dark section band
        ══════════════════════════════════════ */}
        <div ref={howRef} style={{
          margin: isMobile ? "0 -16px" : isTablet ? "0 -24px" : "0 -32px",
          padding: isMobile ? "48px 16px 56px" : isTablet ? "60px 24px 72px" : "72px 32px 80px",
          background: "linear-gradient(160deg, #f0f7ff 0%, #e8f4fd 50%, #f0fdf4 100%)",
          borderRadius: isMobile ? 0 : 28,
          position: "relative", overflow: "hidden",
          border: "1px solid rgba(59,130,246,0.1)",
        }}>
          {/* Light band decorative blobs */}
          <div style={{ position:"absolute", top:"-15%", right:"-5%", width:400, height:400,
            borderRadius:"50%", background:"rgba(59,130,246,0.08)", filter:"blur(90px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-10%", left:"-8%", width:320, height:320,
            borderRadius:"50%", background:"rgba(16,185,129,0.07)", filter:"blur(70px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"40%", left:"40%", width:280, height:280,
            borderRadius:"50%", background:"rgba(99,102,241,0.05)", filter:"blur(80px)", pointerEvents:"none" }} />
          {/* Soft dot grid */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none",
            backgroundImage:"radial-gradient(rgba(59,130,246,0.08) 1px, transparent 1px)",
            backgroundSize:"28px 28px" }} />
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48, position: "relative", zIndex: 1 }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <span style={{
                display:"inline-flex", alignItems:"center", gap:7, padding:"6px 16px",
                borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
                background:"white", border:"1px solid rgba(59,130,246,0.2)", color:"#3b82f6",
                boxShadow:"0 2px 12px rgba(59,130,246,0.1)",
              }}>
                <Zap size={11} /> How I Work
              </span>
            </div>
            <h2 className="off-h2" style={{ fontSize: isMobile ? 26 : undefined }}>
              Three modes,{" "}
              <em>one outcome</em>
            </h2>
            <p style={{ fontSize: isMobile ? 13.5 : 14.5, color: "#64748b",
              maxWidth: 560, margin: "14px auto 0", lineHeight: 1.75 }}>
              Three engagement modes — each designed to meet organisations at the right point in their journey, with clear outputs and no overhead.
            </p>
          </motion.div>

          {/* Connector line — desktop only */}
          {isDesktop && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={howInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{
                position: "relative", height: 2, marginBottom: -2, zIndex: 0,
                background: "linear-gradient(90deg, rgba(59,130,246,0.0) 0%, rgba(59,130,246,0.25) 16.6%, rgba(59,130,246,0.25) 83.4%, rgba(59,130,246,0.0) 100%)",
                transformOrigin: "left",
                marginLeft: "16.6%", marginRight: "16.6%",
              }}
            />
          )}

          {/* 3 engagement cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 16,
            marginBottom: 28,
          }}>
            {engagementModes.map((mode, i) => (
              <EngagementCard key={mode.id} mode={mode} index={i} isInView={howInView} />
            ))}
          </div>

          {/* Footer note + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              textAlign: "center",
              padding: isMobile ? "20px 16px" : "24px 32px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(59,130,246,0.12)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px rgba(59,130,246,0.07)",
              position: "relative", zIndex: 1,
            }}
          >
            <p style={{ fontSize: isMobile ? 13 : 14, color: "#64748b", lineHeight: 1.7,
              maxWidth: 620, margin: "0 auto 16px" }}>
              Engagements span a single mode or progress through all three. Duration ranges from focused 2-week assessments to multi-quarter embedded programs.
            </p>
            <motion.a
              href="https://calendly.com/uchit86/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none",
                padding: "11px 24px", borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                color: "white", boxShadow: "0 6px 20px rgba(59,130,246,0.3)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 28px rgba(59,130,246,0.4)" } as any}
              whileTap={{ scale: 0.97 }}
            >
              Discuss what fits your situation <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}