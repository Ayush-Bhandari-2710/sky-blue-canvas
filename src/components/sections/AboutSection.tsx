import { motion, useInView, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Heart, Award, Coffee, Users, MapPin, Calendar, CheckCircle2,
  Globe, Layers, Shield, Database, Cpu, Building2, ArrowRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "15+",  suffix: "",  label: "Years Enterprise\nDelivery",  color: "#3b82f6" },
  { value: "6",    suffix: "",  label: "Published Books\n& Patents",  color: "#818cf8" },
  { value: "30+",  suffix: "",  label: "Global Conference\nTalks",    color: "#38bdf8" },
  { value: "Top",  num: "50",   label: "DevSecOps\nGlobally",         color: "#34d399" },
  { value: "4",    suffix: "",  label: "Continents\nof Delivery",     color: "#f59e0b" },
  { value: "1",    suffix: "",  label: "US Patent\nGranted",          color: "#ec4899" },
];

const highlights = [
  { label: "Location",     value: "Melbourne, Australia", icon: MapPin,       open: false },
  { label: "Experience",   value: "15+ Years",            icon: Calendar,     open: false },
  { label: "Availability", value: "Open to Consulting",   icon: CheckCircle2, open: true  },
];

const CertIcons: Record<string, React.FC<{ size?: number }>> = {
  aws: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M13.8 21.4c0 .6.1 1.1.2 1.5.2.4.4.8.7 1.2.1.2.2.3.2.5s-.1.4-.4.6l-1.2.8c-.2.1-.3.2-.5.2s-.3-.1-.5-.3c-.2-.3-.5-.6-.6-1-.2-.4-.3-.8-.3-1.3 0-1 .4-2 1.1-2.8.8-.8 1.8-1.2 3-1.2.3 0 .6 0 .9.1.3 0 .6.1.8.2l-3.4 1.5zm1.9 7.3c-.6.5-1.4.8-2.3.8-1 0-1.9-.3-2.6-.8-.7-.5-1-1.2-1-2s.3-1.5 1-2.1c.7-.6 1.5-.9 2.6-.9.4 0 .8 0 1.2.1s.8.2 1.2.3v1.2c0 .6-.2 1.1-.5 1.4-.4.4-.9.6-1.6.7v.3zm17-1.9c.2.5.3 1.1.3 1.7 0 1-.3 1.8-.9 2.4-.6.6-1.4.9-2.4.9-.7 0-1.3-.2-1.9-.5-.5-.4-.9-.8-1.2-1.4l1.4-.6c.2.4.4.7.7.9.3.2.6.3 1 .3.5 0 .9-.2 1.1-.5.3-.4.4-.9.4-1.5v-.4l-3.9-8.5h1.9l2.9 6.7 2.6-6.7h1.8l-3.8 7.2zM24 32.8c-5 0-9.3-1.6-12.8-4.9-.3-.3-.3-.6 0-.9.3-.2.6-.2.9.1 3.2 3 7.1 4.5 11.9 4.5 2.9 0 5.9-.6 9-1.8.4-.2.8 0 .9.4.1.4 0 .8-.4 1-3.3 1.1-6.4 1.6-9.5 1.6zm12.2-2.7c-.4-.3-.5-.6-.2-1 .9-1.1 1.1-3.4.5-5.1-.1-.4 0-.7.4-.8.4-.1.7.1.8.5.8 2.2.5 5-.7 6.4-.3.3-.5.3-.8 0z" fill="#FF9900"/>
      <path d="M21.3 22.8c0-.5.1-.9.3-1.3.2-.3.5-.5.9-.5.5 0 .8.3 1 .8.2.5.3 1.2.3 2.1v5.7h1.7v-5.7c0-.9.1-1.6.3-2.1.2-.5.6-.8 1-.8.4 0 .7.2.9.5.2.4.3.8.3 1.3v6.8h1.7V22c0-1.1-.2-1.9-.7-2.5-.5-.6-1.1-.9-1.9-.9-.5 0-1 .2-1.4.5-.4.3-.7.8-.9 1.3-.2-.6-.5-1-.9-1.3-.4-.3-.9-.5-1.4-.5-.8 0-1.5.3-1.9.9-.5.6-.7 1.4-.7 2.5v7.6h1.4v-6.8z" fill="#232F3E"/>
    </svg>
  ),
  azure: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M22.2 8L13 28.1l7 .1-4 8.8H35L22.2 8z" fill="#0072C6"/>
      <path d="M27.5 10.5L20.3 31l4.5.1-8.8 6.9h16.3L27.5 10.5z" fill="#0072C6" opacity="0.7"/>
      <path d="M13 28.2l7 .1-4 8.7H13l8.5-5.8-8.5-3z" fill="#0072C6" opacity="0.4"/>
    </svg>
  ),
  oracle: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="16" width="40" height="16" rx="8" fill="#C74634"/>
      <text x="24" y="27" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">ORACLE</text>
    </svg>
  ),
  devops: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="#7c3aed" strokeWidth="2.5" fill="none"/>
      <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M32 20l-4 4 4 4" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="24" cy="24" r="2.5" fill="#7c3aed"/>
    </svg>
  ),
  accenture: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 8L8 38h10l6-12 6 12h10L24 8z" fill="#A100FF"/>
      <path d="M30 28l4 10h-8l4-10z" fill="#A100FF" opacity="0.6"/>
    </svg>
  ),
  shield: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 6L10 12v10c0 9.4 6 18.2 14 21 8-2.8 14-11.6 14-21V12L24 6z" fill="#e11d48" opacity="0.15" stroke="#e11d48" strokeWidth="2"/>
      <path d="M18 24l4 4 8-8" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  book: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="22" height="32" rx="3" fill="#d97706" opacity="0.2" stroke="#d97706" strokeWidth="2"/>
      <rect x="14" y="8" width="22" height="32" rx="3" fill="#d97706" opacity="0.35" stroke="#d97706" strokeWidth="2"/>
      <line x1="18" y1="18" x2="30" y2="18" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="23" x2="30" y2="23" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="28" x2="26" y2="28" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  patent: ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="20" r="12" stroke="#4f46e5" strokeWidth="2" fill="none"/>
      <path d="M18 20h12M24 14v12" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M16 34l-4 6M32 34l4 6" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 40h24" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const certifications = [
  { name: "AWS Certified",         sub: "Solutions Architect",    color: "#f59e0b", bg: "#fffbeb", iconKey: "aws" },
  { name: "Microsoft Azure",       sub: "Certified",              color: "#2563eb", bg: "#eff6ff", iconKey: "azure" },
  { name: "Oracle Certified",      sub: "Cloud Infrastructure",   color: "#dc2626", bg: "#fef2f2", iconKey: "oracle" },
  { name: "DevOps Institute",      sub: "Ambassador",             color: "#7c3aed", bg: "#f5f3ff", iconKey: "devops" },
  { name: "Bunsen Burner Award",   sub: "Accenture",              color: "#A100FF", bg: "#faf5ff", iconKey: "accenture" },
  { name: "Delivery Heroes Award", sub: "Accenture",              color: "#A100FF", bg: "#faf5ff", iconKey: "accenture" },
  { name: "Top 50 DevSecOps",      sub: "Globally Recognised",    color: "#e11d48", bg: "#fff1f2", iconKey: "shield" },
  { name: "6× Published Author",   sub: "Apress & Packt",         color: "#d97706", bg: "#fffbeb", iconKey: "book" },
  { name: "US Patent Granted",     sub: "US11334348B2 · 2022",    color: "#4f46e5", bg: "#eef2ff", iconKey: "patent" },
];

const impactAreas = [
  {
    icon: Layers,
    title: "Enterprise Architecture\n& Cloud Transformation",
    body: "Applied TOGAF, SAFe, and BIAN to define reference architectures and modernisation roadmaps. Governed multi-cloud platforms across AWS, Azure, GCP, and Oracle - embedding Kubernetes, OpenShift, and FinOps practices at scale.",
    tags: ["TOGAF", "AWS", "Azure", "GCP", "FinOps"],
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.12)",
  },
  {
    icon: Shield,
    title: "DevSecOps &\nPlatform Engineering",
    body: "Designed secure, self-service internal developer platforms by embedding policy-as-code and software supply chain controls into CI/CD pipelines - accelerating delivery without sacrificing compliance or resilience.",
    tags: ["DevSecOps", "IDP", "CI/CD", "Policy-as-Code"],
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.12)",
  },
  {
    icon: Database,
    title: "Data Modernisation\n& Governance",
    body: "Led enterprise data modernisation programs delivering trusted, analytics-ready data with end-to-end lineage. Defined lifecycle and archival strategies that cut costs, strengthened regulatory compliance, and improved auditability.",
    tags: ["Data Governance", "Lineage", "Compliance", "Analytics"],
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.12)",
  },
  {
    icon: Cpu,
    title: "Generative AI\n& MLOps",
    body: "Led enterprise GenAI initiatives end-to-end - from use-case design and model evaluation to MLOps and responsible adoption frameworks. Delivered platforms that improved productivity and decision-making at scale.",
    tags: ["GenAI", "MLOps", "LLMs", "Responsible AI"],
    accent: "#34d399",
    glow: "rgba(52,211,153,0.12)",
  },
];

const industries = [
  "Banking & Financial Services",
  "Retail & E-Commerce",
  "Insurance",
  "Telecommunications",
  "Government",
  "Healthcare",
  "Technology Consulting",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "5px 14px 5px 10px", borderRadius: 100,
      background: light ? "rgba(255,255,255,0.1)" : "rgba(99,130,255,0.07)",
      border: light ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(99,130,255,0.18)",
      marginBottom: 14,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: light ? "rgba(147,197,253,0.9)" : "linear-gradient(135deg, #3b82f6, #6366f1)" }} />
      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: light ? "rgba(147,197,253,0.9)" : "#4a6df0" }}>
        {children}
      </span>
    </div>
  );
}

// Small subsection label - replaces the big h2 headings
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ height: 1, width: 20, background: "rgba(99,130,255,0.3)" }} />
      <span style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "#94a3b8",
        fontFamily: "system-ui, sans-serif",
      }}>
        {children}
      </span>
      <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(99,130,255,0.2), transparent)" }} />
    </div>
  );
}

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: sub ? 28 : 32 }}>
      <h2 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900,
        letterSpacing: "-0.03em", lineHeight: 1.1,
        color: "#0f172a", margin: "0 0 8px",
      }}>
        {children}
      </h2>
      {sub && (
        <p style={{ fontSize: 14, color: "#94a3b8", fontWeight: 400, margin: 0, lineHeight: 1.6 }}>{sub}</p>
      )}
    </div>
  );
}

// ─── Magnetic tilt card (impact areas) ───────────────────────────────────────
function TiltCard({ area, index, impactIn }: { area: typeof impactAreas[0]; index: number; impactIn: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const [hovered, setHovered] = useState(false);
  const spotlightBg = useMotionTemplate`radial-gradient(circle 120px at ${glowX}% ${glowY}%, ${area.accent}18 0%, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseEnter = () => { scale.set(1.03); setHovered(true); };
  const handleMouseLeave = () => { x.set(0); y.set(0); scale.set(1); setHovered(false); };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={impactIn ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}>
      <motion.div
        onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        style={{
          rotateX, rotateY, scale,
          borderRadius: 20, padding: 24,
          background: "rgba(255,255,255,0.78)",
          border: `1px solid ${hovered ? area.accent + "40" : "rgba(99,130,255,0.1)"}`,
          boxShadow: hovered
            ? `0 24px 50px ${area.glow}, inset 0 1px 0 rgba(255,255,255,0.9)`
            : `0 2px 20px rgba(60,80,180,0.06), inset 0 1px 0 rgba(255,255,255,0.9)`,
          display: "flex", flexDirection: "column" as const, gap: 14,
          overflow: "hidden", position: "relative" as const, cursor: "default",
          transformStyle: "preserve-3d", transition: "border-color 0.25s, box-shadow 0.25s", willChange: "transform",
        }}>
        <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 20, background: spotlightBg, opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }} />
        {impactIn && (
          <motion.div style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", zIndex: 2 }}
            initial={{ x: "-100%", opacity: 0.7 }} animate={{ x: "200%", opacity: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.9, ease: "easeOut" }}>
            <div style={{ width: "60%", height: "100%", background: `linear-gradient(105deg, transparent, ${area.accent}22, transparent)` }} />
          </motion.div>
        )}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${area.accent}, ${area.accent}55, transparent)`, borderRadius: "20px 20px 0 0" }} />
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${area.accent}20 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${area.accent}18, ${area.accent}08)`, border: `1px solid ${area.accent}25`, flexShrink: 0, position: "relative", zIndex: 1 }}>
          <area.icon size={18} style={{ color: area.accent }} />
        </div>
        <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, fontWeight: 900, color: "#0f172a", lineHeight: 1.25, margin: 0, whiteSpace: "pre-line", position: "relative", zIndex: 1 }}>{area.title}</h3>
        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: "#5a6a90", fontWeight: 400, margin: 0, position: "relative", zIndex: 1 }}>{area.body}</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, marginTop: "auto", position: "relative", zIndex: 1 }}>
          {area.tags.map(t => (
            <span key={t} style={{ display: "inline-block", padding: "3px 10px", borderRadius: 100, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em", background: `${area.accent}0f`, color: area.accent, border: `1px solid ${area.accent}22` }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Cert card ────────────────────────────────────────────────────────────────
function CertCard({ c, i, certsIn }: { c: typeof certifications[0]; i: number; certsIn: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = CertIcons[c.iconKey];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={certsIn ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 14px", borderRadius: 14,
        background: hovered ? c.bg : "#fff",
        border: hovered ? `1.5px solid ${c.color}55` : `1px solid ${c.color}20`,
        boxShadow: hovered
          ? `0 0 0 4px ${c.color}12, 0 10px 28px ${c.color}20, inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 2px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)`,
        display: "flex", flexDirection: "column" as const, gap: 8,
        position: "relative" as const, overflow: "hidden", cursor: "default",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
      }}>
      <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: hovered ? 3 : 2, borderRadius: "0 3px 3px 0", background: `linear-gradient(180deg, ${c.color}, ${c.color}55)`, opacity: hovered ? 1 : 0.4, transition: "all 0.22s" }} />
      <div style={{ width: 36, height: 36, borderRadius: 9, background: hovered ? `${c.color}14` : `${c.color}09`, border: `1px solid ${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.22s", flexShrink: 0 }}>
        <Icon size={22} />
      </div>
      <div>
        <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: hovered ? c.color : "#1e2a55", lineHeight: 1.3, transition: "color 0.18s" }}>{c.name}</span>
        <span style={{ display: "block", fontSize: 10.5, fontWeight: 500, color: "#64748b", lineHeight: 1.4, marginTop: 2 }}>{c.sub}</span>
      </div>
    </motion.div>
  );
}

// ─── CTA tilt card ────────────────────────────────────────────────────────────
function CTATiltCard({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 260, damping: 28 });
  const scale = useSpring(1, { stiffness: 260, damping: 28 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onEnter = () => scale.set(1.02);
  const onLeave = () => { x.set(0); y.set(0); scale.set(1); };
  return (
    <div ref={ref} style={{ perspective: 900 }}>
      <motion.div onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
        style={{ rotateX, rotateY, scale, borderRadius: 24, position: "relative" as const, overflow: "hidden", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(24px)", border: "1px solid rgba(59,130,246,0.14)", boxShadow: "0 24px 64px rgba(30,58,138,0.09), inset 0 1px 0 rgba(255,255,255,1)", transformStyle: "preserve-3d", padding: isMobile ? 24 : 40, willChange: "transform" }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const AboutSection = () => {
  const sectionRef    = useRef(null);
  const credRef       = useRef(null); // unified credentials section
  const impactRef     = useRef(null);
  const philosophyRef = useRef(null);

  const sectionIn    = useInView(sectionRef,    { once: true, margin: "-60px" });
  const credIn       = useInView(credRef,       { once: true, margin: "-60px" });
  const impactIn     = useInView(impactRef,     { once: true, margin: "-60px" });
  const philosophyIn = useInView(philosophyRef, { once: true, margin: "-60px" });

  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const cb = () => setW(window.innerWidth);
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);
  const isMobile  = w < 640;
  const isTablet  = w >= 640 && w < 1024;
  const isDesktop = w >= 1024;
  const px = isMobile ? "0 20px" : isTablet ? "0 28px" : "0 40px";

  return (
    <section id="about" ref={sectionRef} style={{ position: "relative", background: "linear-gradient(180deg, #f7f8ff 0%, #eef0fb 60%, #f0f4ff 100%)", overflow: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');
        .about-blob { position:absolute; border-radius:50%; pointer-events:none; filter:blur(70px); }
        .img-card-about { border-radius:22px; overflow:hidden; border:1px solid rgba(99,130,255,0.12); box-shadow:0 24px 64px rgba(60,80,180,0.11), 0 4px 16px rgba(60,80,180,0.06); background:#e8ebf8; width:100%; position:relative; display:flex; flex-direction:column; flex-shrink:0; }
        .img-card-about img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; flex:1; min-height:1px; }
        .exp-pill-about { position:absolute; bottom:14px; right:14px; background:rgba(255,255,255,0.96); backdrop-filter:blur(16px); border:1px solid rgba(99,130,255,0.15); border-radius:14px; padding:10px 14px; box-shadow:0 8px 24px rgba(60,80,180,0.13); text-align:center; }
        .about-body-p  { font-size:15px;   line-height:1.85; color:#4b5a80; font-weight:400; margin:0; }
        .about-body-sm { font-size:13.5px; line-height:1.8;  color:#4b5a80; font-weight:400; margin:0; }
        .stat-card-about { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:16px 10px 14px; border-radius:14px; text-align:center; background:rgba(255,255,255,0.82); border:1px solid rgba(99,130,255,0.1); box-shadow:0 2px 14px rgba(99,130,255,0.06), inset 0 1px 0 rgba(255,255,255,0.9); transition:all 0.25s cubic-bezier(0.16,1,0.3,1); cursor:default; position:relative; }
        .stat-card-about:hover { transform:translateY(-3px); background:rgba(255,255,255,0.97); box-shadow:0 10px 32px rgba(99,130,255,0.12); border-color:rgba(99,130,255,0.2); }
        .cert-grid { display:grid; gap:12px; justify-items:stretch; }
        .industry-badge { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:100px; font-size:12.5px; font-weight:500; color:#1e2a55; background:rgba(255,255,255,0.85); border:1px solid rgba(99,130,255,0.13); box-shadow:0 2px 10px rgba(99,130,255,0.07); transition:all 0.22s ease; cursor:default; }
        .industry-badge:hover { background:rgba(255,255,255,0.99); border-color:rgba(99,130,255,0.28); transform:translateY(-2px); box-shadow:0 6px 20px rgba(99,130,255,0.1); }
        .info-chip-about { display:flex; align-items:center; gap:10px; padding:12px 16px; border-radius:14px; background:rgba(255,255,255,0.82); border:1px solid rgba(99,130,255,0.11); box-shadow:0 2px 12px rgba(99,130,255,0.06); backdrop-filter:blur(12px); transition:all 0.22s ease; flex:1; min-width:0; }
        .info-chip-about:hover { background:rgba(255,255,255,0.97); border-color:rgba(99,130,255,0.24); transform:translateY(-2px); }
        .quote-block-about { padding:18px 22px; border-radius:16px; background:rgba(99,130,255,0.04); border:1px solid rgba(99,130,255,0.12); border-left:3px solid rgba(80,112,232,0.5); }
        .divider-about { height:1px; background:linear-gradient(90deg,rgba(80,112,232,0.15),rgba(99,130,255,0.08),transparent); margin:20px 0; }
        .section-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(99,130,255,0.15),transparent); margin:0; }
        .open-badge { margin-left:auto; font-size:9.5px; font-weight:700; letter-spacing:0.07em; color:#2e7d32; background:rgba(76,175,80,0.1); border:1px solid rgba(76,175,80,0.22); border-radius:100px; padding:3px 8px; white-space:nowrap; flex-shrink:0; }
        .philosophy-band { position:relative; overflow:hidden; }
        .philosophy-band-bg { position:absolute; inset:0; background: linear-gradient(145deg, #f8faff 0%, #f0f5ff 30%, #eaf0ff 60%, #e8eeff 100%); }
        .philosophy-band-grid { position:absolute; inset:0; pointer-events:none; background-image: linear-gradient(rgba(59,130,246,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.09) 1px, transparent 1px), linear-gradient(rgba(59,130,246,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.035) 1px, transparent 1px); background-size: 56px 56px, 56px 56px, 14px 14px, 14px 14px; }
        .philosophy-band-dots { position:absolute; inset:0; pointer-events:none; background-image: radial-gradient(circle, rgba(59,130,246,0.25) 1.5px, transparent 1.5px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 100%); }
        .philosophy-band-noise { position:absolute; inset:0; pointer-events:none; opacity:0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .philosophy-orb { position:absolute; border-radius:50%; pointer-events:none; }
        .philosophy-band::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; z-index:2; background:linear-gradient(90deg, transparent, rgba(59,130,246,0.18), transparent); }
      `}</style>

      {/* Ambient blobs */}
      <div className="about-blob" style={{ width:500, height:500, top:"-8%",  right:"0%",  background:"rgba(99,130,255,0.07)" }} />
      <div className="about-blob" style={{ width:380, height:380, bottom:"15%",left:"-5%",  background:"rgba(120,100,255,0.05)" }} />
      <div className="about-blob" style={{ width:300, height:300, top:"55%",  right:"10%", background:"rgba(56,189,248,0.05)" }} />

      {/* ══════════════════════════════════════════════════════════════
          §1 INTRO
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: isMobile ? "64px 0 56px" : isTablet ? "80px 0 64px" : "96px 0 72px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:px }}>
          <motion.div initial={{ opacity:0, y:14 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
            style={{ textAlign:"center", marginBottom: isMobile ? 36 : 52 }}>
            <SectionEyebrow>Get to Know Me</SectionEyebrow>
            <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:"clamp(28px,4.5vw,52px)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.1, color:"#0f172a", margin:"0 0 10px" }}>
              The <span style={{ background:"linear-gradient(135deg,#2a3cad,#5c7cfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Person</span> Behind the Work
            </h2>
            <p style={{ fontSize:14, color:"#94a3b8", fontWeight:400, margin:"0 auto", maxWidth:480 }}>
              Senior Technology & Transformation Leader - turning complex technology change into measurable business outcomes.
            </p>
          </motion.div>

          {isMobile ? (
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <motion.div initial={{ opacity:0, y:18 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.1 }}>
                <div className="img-card-about" style={{ height:300, minHeight:300 }}>
                  <img src="/images/image.png" alt="Uchit Vyas" loading="eager" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                  <motion.div className="exp-pill-about" initial={{ opacity:0, scale:0.85 }} animate={sectionIn ? { opacity:1, scale:1 } : {}} transition={{ delay:0.5 }}>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, fontWeight:900, background:"linear-gradient(135deg,#2a3cad,#5c7cfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1 }}>15+</div>
                    <div style={{ fontSize:9, color:"#9aa5c8", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginTop:3 }}>Years of<br/>Experience</div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity:0, y:14 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.2 }} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <p className="about-body-sm">I'm an Enterprise Architect and Transformation Leader with 15+ years leading enterprise-scale programs across banking, retail, and Fortune 500 organisations - from C-suite strategy to live platform delivery.</p>
                <p className="about-body-sm">I don't just advise on transformation; I architect and execute it. My approach combines strong engineering fundamentals with commercial acumen to deliver outcomes that actually stick.</p>
                <div className="quote-block-about">
                  <p style={{ fontSize:13, fontStyle:"italic", color:"#4a5a8a", lineHeight:1.7, margin:"0 0 5px" }}>"I bridge the gap between vision and execution - translating ambitious digital strategy into secure, scalable platforms that actually ship."</p>
                  <span style={{ fontSize:10.5, color:"#9aa5c8", fontWeight:600, letterSpacing:"0.06em" }}>- Uchit Vyas</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity:0, y:12 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.35 }} style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {highlights.map((h, i) => (
                  <div key={i} className="info-chip-about">
                    <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#e8edff,#d4dcff)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <h.icon size={14} style={{ color:"#5070e8" }} />
                    </div>
                    <div><div style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#b0bcd8", marginBottom:3 }}>{h.label}</div><div style={{ fontSize:13, fontWeight:600, color:"#1e2a55" }}>{h.value}</div></div>
                    {h.open && <span className="open-badge">● OPEN</span>}
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns: isTablet ? "42% 1fr" : "1fr 1fr", gap: isTablet ? 28 : 52, alignItems:"stretch" }}>
              <motion.div initial={{ opacity:0, y:20 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.1, ease:[0.22,1,0.36,1] }} style={{ display:"flex", flexDirection:"column", alignSelf:"stretch" }}>
                <div className="img-card-about" style={{ flex:1 }}>
                  <img src="/images/image.png" alt="Uchit Vyas" loading="eager" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block", minHeight:1 }} />
                  <motion.div className="exp-pill-about" initial={{ opacity:0, scale:0.85 }} animate={sectionIn ? { opacity:1, scale:1 } : {}} transition={{ delay:0.65 }}>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, fontWeight:900, background:"linear-gradient(135deg,#2a3cad,#5c7cfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1 }}>15+</div>
                    <div style={{ fontSize:9, color:"#9aa5c8", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginTop:3 }}>Years of<br/>Experience</div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity:0, x:20 }} animate={sectionIn ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.2, ease:[0.22,1,0.36,1] }} style={{ display:"flex", flexDirection:"column", paddingTop:4 }}>
                <p className={isTablet ? "about-body-sm" : "about-body-p"} style={{ marginBottom:12 }}>
                  I'm an Enterprise Architect and Transformation Leader with 15+ years leading enterprise-scale programs across banking, retail, and Fortune 500 organisations - from C-suite strategy to live platform delivery.
                </p>
                <p className={isTablet ? "about-body-sm" : "about-body-p"} style={{ marginBottom:12 }}>
                  My approach is grounded in strong engineering fundamentals married with commercial acumen. I work directly with CIOs, CTOs, and business executives as a trusted advisor, cutting through complexity to define clear roadmaps and govern delivery with accountability.
                </p>
                {isDesktop && (
                  <p className="about-body-p">
                    Whether establishing enterprise architecture governance at Asia's largest bank, accelerating a digital lending platform in weeks, or standing up a GenAI capability from scratch - I bring calm, decisive technical leadership to the hardest problems.
                  </p>
                )}
                <div className="divider-about" />
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:18 }}>
                  {stats.slice(0,4).map((s, i) => (
                    <motion.div key={s.label} className="stat-card-about"
                      initial={{ opacity:0, y:10 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.4 + i * 0.06 }}>
                      <div style={{ fontFamily:"'DM Serif Display',serif", fontSize: isTablet ? 17 : 20, fontWeight:900, color:s.color, lineHeight:1, marginBottom:4 }}>
                        {s.num ? <>{s.value}<span style={{ fontSize: isTablet ? 17 : 20 }}>{s.num}</span></> : s.value}
                      </div>
                      <div style={{ fontSize:9.5, color:"#94a3b8", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", lineHeight:1.4, whiteSpace:"pre-line", textAlign:"center" }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="quote-block-about" style={{ marginTop:"auto" }}>
                  <p style={{ fontSize: isTablet ? 12.5 : 13.5, fontStyle:"italic", color:"#4a5a8a", lineHeight:1.7, margin:"0 0 5px" }}>
                    "I bridge the gap between vision and execution - translating ambitious digital strategy into secure, scalable platforms that actually ship, perform, and deliver value at enterprise scale."
                  </p>
                  <span style={{ fontSize:10.5, color:"#9aa5c8", fontWeight:600, letterSpacing:"0.06em" }}>- Uchit Vyas</span>
                </div>
              </motion.div>
            </div>
          )}

          {!isMobile && (
            <motion.div initial={{ opacity:0, y:14 }} animate={sectionIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.6 }}
              style={{ display:"flex", gap:12, marginTop:24 }}>
              {highlights.map((h, i) => (
                <div key={i} className="info-chip-about">
                  <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#e8edff,#d4dcff)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <h.icon size={15} style={{ color:"#5070e8" }} />
                  </div>
                  <div>
                    <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#b0bcd8", marginBottom:3 }}>{h.label}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#1e2a55" }}>{h.value}</div>
                  </div>
                  {h.open && <span className="open-badge">● OPEN</span>}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════════════════════════
          §2 CREDENTIALS - unified: stats + certs + industries
      ══════════════════════════════════════════════════════════════ */}
      <div ref={credRef} style={{ padding: isMobile ? "56px 0 60px" : "72px 0 80px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:px }}>

          {/* Section header */}
          <motion.div initial={{ opacity:0, y:14 }} animate={credIn ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
            style={{ textAlign:"center", marginBottom: isMobile ? 36 : 52 }}>
            <SectionEyebrow>Credentials & Recognition</SectionEyebrow>
            <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:"clamp(26px,3.5vw,42px)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.1, color:"#0f172a", margin:"0 0 8px" }}>
              Numbers, Certifications &{" "}
              <span style={{ background:"linear-gradient(135deg,#2a3cad,#5c7cfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Industries</span>
            </h2>
            <p style={{ fontSize:14, color:"#94a3b8", fontWeight:400, margin:"0 auto", maxWidth:480 }}>
              A career defined by scale, depth, global recognition, and measurable outcomes across industries.
            </p>
          </motion.div>

          {/* ── By the Numbers ── */}
          <motion.div initial={{ opacity:0, y:10 }} animate={credIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.08, duration:0.45 }}>
            <SubLabel>By the Numbers</SubLabel>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "repeat(6,1fr)", gap: isMobile ? 8 : 12, marginBottom: isMobile ? 36 : 48 }}>
            {stats.map((s, i) => (
              <motion.div key={s.label} className="stat-card-about"
                initial={{ opacity:0, y:14 }} animate={credIn ? { opacity:1, y:0 } : {}}
                transition={{ delay:0.1 + i * 0.06, duration:0.45, ease:[0.16,1,0.3,1] }}
                style={{ padding: isMobile ? "14px 8px 12px" : "18px 12px 16px" }}>
                <div style={{ position:"absolute", top:0, left:"25%", right:"25%", height:2, borderRadius:"0 0 3px 3px", background:`linear-gradient(90deg,transparent,${s.color},transparent)`, opacity:0.7 }} />
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize: isMobile ? 24 : 30, fontWeight:900, color:s.color, lineHeight:1, marginBottom:5 }}>
                  {s.num ? <>{s.value}<span style={{ fontSize: isMobile ? 24 : 30 }}>{s.num}</span></> : s.value}
                </div>
                <div style={{ fontSize:9, color:"#94a3b8", fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase", lineHeight:1.5, whiteSpace:"pre-line", textAlign:"center" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Certifications ── */}
          <motion.div initial={{ opacity:0, y:10 }} animate={credIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.22, duration:0.45 }}>
            <SubLabel>Certifications & Awards</SubLabel>
          </motion.div>
          <div className="cert-grid" style={{ gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", marginBottom: isMobile ? 36 : 48 }}>
            {certifications.map((c, i) => (
              <CertCard key={c.name} c={c} i={i} certsIn={credIn} />
            ))}
          </div>

          {/* ── Industries ── */}
          <motion.div initial={{ opacity:0, y:10 }} animate={credIn ? { opacity:1, y:0 } : {}} transition={{ delay:0.35, duration:0.45 }}>
            <SubLabel>Industries & Domains</SubLabel>
          </motion.div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
            {industries.map((ind, i) => (
              <motion.div key={ind} className="industry-badge"
                initial={{ opacity:0, scale:0.9 }} animate={credIn ? { opacity:1, scale:1 } : {}}
                transition={{ delay:0.38 + i * 0.05, duration:0.35, ease:[0.16,1,0.3,1] }}>
                <Building2 size={12} style={{ color:"#5070e8", flexShrink:0 }} />
                {ind}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════════════════════════
          §3 IMPACT - magnetic tilt + scroll shimmer
      ══════════════════════════════════════════════════════════════ */}
      <div ref={impactRef} style={{ padding: isMobile ? "56px 0" : "72px 0" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:px }}>
          <motion.div initial={{ opacity:0, y:14 }} animate={impactIn ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
            style={{ textAlign:"center", marginBottom: isMobile ? 32 : 44 }}>
            <SectionEyebrow>Expertise in Practice</SectionEyebrow>
            <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.1, color:"#0f172a", margin:"0 0 8px" }}>
              Where I Create <span style={{ background:"linear-gradient(135deg,#2a3cad,#5c7cfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Impact</span>
            </h2>
            <p style={{ fontSize:14, color:"#94a3b8", fontWeight:400, margin:"0 auto", maxWidth:460 }}>Four domains where I consistently drive measurable enterprise outcomes.</p>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 14 : 16 }}>
            {impactAreas.map((area, i) => (
              <TiltCard key={area.title} area={area} index={i} impactIn={impactIn} />
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* ══════════════════════════════════════════════════════════════
          §4 PHILOSOPHY + CTA
      ══════════════════════════════════════════════════════════════ */}
      <div ref={philosophyRef} className="philosophy-band" style={{ padding: isMobile ? "72px 0 88px" : "96px 0 112px" }}>
        <div className="philosophy-band-bg" />
        <div className="philosophy-band-grid" />
        <div className="philosophy-band-dots" />
        <div className="philosophy-band-noise" />

        <motion.div className="philosophy-orb" style={{ width:500, height:500, top:"-20%", right:"0%", background:"radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)", filter:"blur(70px)" }}
          animate={{ scale:[1,1.14,1], opacity:[0.6,1,0.6] }} transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }} />
        <motion.div className="philosophy-orb" style={{ width:420, height:420, bottom:"-15%", left:"-3%", background:"radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)", filter:"blur(70px)" }}
          animate={{ scale:[1,1.1,1], opacity:[0.5,0.85,0.5] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:4 }} />
        <motion.div className="philosophy-orb" style={{ width:260, height:260, top:"40%", left:"40%", background:"radial-gradient(circle,rgba(147,197,253,0.12) 0%,transparent 70%)", filter:"blur(50px)" }}
          animate={{ scale:[1,1.2,1], opacity:[0.4,0.7,0.4] }} transition={{ duration:7, repeat:Infinity, ease:"easeInOut", delay:2 }} />

        <div style={{ maxWidth:1100, margin:"0 auto", padding:px, position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 64, alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-16 }} animate={philosophyIn ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
              <SectionEyebrow>Leadership Philosophy</SectionEyebrow>
              <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize: isMobile ? "clamp(26px,6vw,32px)" : "clamp(30px,4vw,46px)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.08, color:"#0f172a", margin:"0 0 28px" }}>
                Pragmatic.{" "}
                <span style={{ fontStyle:"italic", background:"linear-gradient(135deg,#1e40af,#3b82f6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Outcome&#8209;focused.</span>
                <br />Relentlessly Curious.
              </h2>
              <div style={{ borderLeft:"2.5px solid rgba(59,130,246,0.35)", paddingLeft:20, marginBottom:24 }}>
                <p style={{ fontSize: isMobile ? 13.5 : 15.5, fontStyle:"italic", color:"#334155", lineHeight:1.8, margin:0 }}>
                  "I bridge the gap between vision and execution - translating ambitious digital strategy into secure, scalable platforms that actually ship, perform, and deliver value at enterprise scale."
                </p>
                <span style={{ display:"block", marginTop:8, fontSize:10.5, color:"#94a3b8", fontWeight:600, letterSpacing:"0.07em" }}>- Uchit Vyas</span>
              </div>
              <p style={{ fontSize:14, color:"#475569", lineHeight:1.82, margin:"0 0 12px" }}>
                My approach is grounded in strong engineering fundamentals married with commercial acumen. I work directly with CIOs, CTOs, and business executives as a trusted advisor, cutting through complexity to define clear roadmaps and govern delivery with accountability.
              </p>
              <p style={{ fontSize:14, color:"#475569", lineHeight:1.82, margin:0 }}>
                Whether establishing enterprise architecture governance at Asia's largest bank, accelerating a digital lending platform in weeks, or standing up a GenAI capability from scratch - I bring calm, decisive technical leadership to the hardest problems.
              </p>
            </motion.div>

            <motion.div initial={{ opacity:0, x:16 }} animate={philosophyIn ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.15, ease:[0.22,1,0.36,1] }}>
              <CTATiltCard isMobile={isMobile}>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:10 }}>What I offer</p>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize: isMobile ? 22 : 28, fontWeight:900, color:"#0f172a", lineHeight:1.15, margin:"0 0 10px" }}>
                  Ready to work<br />together?
                </h3>
                <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.72, margin:"0 0 28px" }}>
                  Whether you need an enterprise architect, transformation leader, or strategic technology advisor - let's talk about how I can help.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
                  {["Advisory & Strategy","Architecture & Design","Platform & Transformation","Workshops & Enablement"].map((item, i) => (
                    <motion.div key={item} initial={{ opacity:0, x:10 }} animate={philosophyIn ? { opacity:1, x:0 } : {}} transition={{ delay:0.4 + i * 0.07 }}
                      style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:18, height:18, borderRadius:6, background:"linear-gradient(135deg,rgba(59,130,246,0.15),rgba(99,102,241,0.1))", border:"1px solid rgba(59,130,246,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <CheckCircle2 size={11} style={{ color:"#3b82f6" }} />
                      </div>
                      <span style={{ fontSize:13.5, fontWeight:500, color:"#1e2a55" }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.a href="https://calendly.com/uchit86/30min" target="_blank" rel="noreferrer noopener"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", borderRadius:100, background:"linear-gradient(135deg,#1e3a8a,#3b82f6)", color:"white", fontSize:13.5, fontWeight:700, textDecoration:"none", boxShadow:"0 8px 28px rgba(59,130,246,0.32), inset 0 1px 0 rgba(255,255,255,0.18)", position:"relative", overflow:"hidden" }}
                  whileHover={{ scale:1.03, boxShadow:"0 12px 36px rgba(59,130,246,0.4)" } as any}
                  whileTap={{ scale:0.97 }}>
                  <motion.span style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%)", pointerEvents:"none" }}
                    animate={{ x:["-120%","120%"] }} transition={{ duration:2.8, repeat:Infinity, repeatDelay:2.5, ease:"easeInOut" }} />
                  <span style={{ position:"relative" }}>Book a Strategy Call</span>
                  <ArrowRight size={14} style={{ position:"relative" }} />
                </motion.a>
              </CTATiltCard>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;