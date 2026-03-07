import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ShieldCheck, Boxes, Activity, Cloud, Cog,
  Container, CheckCircle2, BarChart3, ServerCog,
  Package, GitBranch, Eye, Link2, Layers, KeyRound,
  Ticket, Network, Globe, Database, X,
  TrendingUp, Users, Award, Zap, Brain, BookOpen,
  Building2, Cpu, Lock, GitMerge,
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA — Updated with Uchit's real expertise
───────────────────────────────────────── */

// Core competency bars — the 8 headline domains
const expertise = [
  { name: "Enterprise Architecture", value: 92, icon: Building2,   color: "#3b82f6" },
  { name: "Platform Engineering",    value: 90, icon: Layers,      color: "#8b5cf6" },
  { name: "DevSecOps",               value: 91, icon: ShieldCheck, color: "#06b6d4" },
  { name: "Site Reliability Eng.",   value: 88, icon: Activity,    color: "#10b981" },
  { name: "Generative AI & MLOps",   value: 84, icon: Brain,       color: "#f59e0b" },
  { name: "Cloud Transformation",    value: 90, icon: Cloud,       color: "#ef4444" },
  { name: "Data Modernisation",      value: 86, icon: Database,    color: "#ec4899" },
  { name: "Tech Governance & FinOps",value: 83, icon: CheckCircle2,color: "#14b8a6" },
];

// 5 domain cards for the bento centre panel
const domainCards = [
  {
    label: "Architecture & Governance",
    sub:   "Asia's largest bank · TOGAF · BIAN · SAFe",
    icon:  Building2,
    color: "#3b82f6",
    skills: ["Reference Architecture","Target-State Roadmaps","Capability Mapping","Architecture Review Board","Risk & Control Alignment"],
  },
  {
    label: "Platform Engineering",
    sub:   "IDP delivery · 30%+ faster developer onboarding",
    icon:  Layers,
    color: "#8b5cf6",
    skills: ["Internal Developer Platforms","Golden Paths","Self-Service Infra","Kubernetes & OpenShift","Platform Observability"],
  },
  {
    label: "DevSecOps & Delivery",
    sub:   "Top 50 DevSecOps globally · 30+ conference talks",
    icon:  ShieldCheck,
    color: "#06b6d4",
    skills: ["Secure CI/CD","Policy-as-Code","Supply Chain Security","SAST & DAST","Continuous Compliance"],
  },
  {
    label: "Cloud & Reliability",
    sub:   "AWS · Azure · GCP · Oracle · Multi-cloud at scale",
    icon:  Cloud,
    color: "#ef4444",
    skills: ["Multi-Cloud Design","SRE Operating Models","FinOps & Cost Governance","Incident & Resilience","Performance Engineering"],
  },
  {
    label: "GenAI & Data",
    sub:   "Enterprise LLM platforms · Petabyte-scale data",
    icon:  Brain,
    color: "#f59e0b",
    skills: ["Enterprise GenAI Architecture","MLOps & Model Evaluation","Data Modernisation","Lineage & Governance","Analytics Readiness"],
  },
];

// Skill tiles for the bento surround — tooling grouped by category
const toolGroups = [
  { title: "CI/CD Engines",          icon: GitMerge,  items: ["Jenkins","GitLab CI","Bamboo","Travis CI","GO-CD","GitHub Actions"] },
  { title: "Cloud Platforms",        icon: Globe,     items: ["AWS","Azure","GCP","Oracle Cloud","OpenStack","VMware"] },
  { title: "Container Ecosystem",    icon: Container, items: ["Kubernetes","OpenShift","Docker","Nomad","Helm","Istio"] },
  { title: "IaC & Provisioning",     icon: Cog,       items: ["Terraform","Ansible","Chef","Packer","Pulumi","Crossplane"] },
  { title: "Source Code Mgmt",       icon: GitBranch, items: ["Git","GitLab","BitBucket","GitHub","Gerrit","Perforce"] },
  { title: "Observability",          icon: Eye,       items: ["Prometheus","Grafana","Datadog","Splunk","Dynatrace","Jaeger"] },
  { title: "Security & ITSM",        icon: Lock,      items: ["Vault","Centrify","ServiceNow","BMC Remedy","Jira","PagerDuty"] },
  { title: "Data & Analytics",       icon: Database,  items: ["DynamoDB","Snowflake","Databricks","Kafka","Spark","Redshift"] },
  { title: "AI & ML Tooling",        icon: Brain,     items: ["OpenAI","LangChain","MLflow","Kubeflow","SageMaker","Bedrock"] },
  { title: "Service Discovery",      icon: Network,   items: ["Consul","Serf","Istio Service Mesh","AWS Route 53"] },
  { title: "Published Works",        icon: BookOpen,  items: ["Applied OpenStack Design Patterns","Mastering AWS Development","AWS Development Essentials","DynamoDB Applied Design Patterns","Mule ESB Cookbook","US Patent US11334348B2"] },
  { title: "Monitoring & Alerting",  icon: Activity,  items: ["Nagios","Zabbix","Prometheus","Cacti","Hyperic","CloudWatch"] },
  { title: "Identity & Access",      icon: KeyRound,  items: ["Vault","Centrify","AWS IAM","Azure AD","Infoblox","Device42"] },
  { title: "Issue & Project Mgmt",   icon: Ticket,    items: ["Jira","Confluence","ServiceNow","Azure DevOps","Monday","Miro"] },
];

const sortedGroups = [...toolGroups].sort((a, b) => b.items.length - a.items.length);
const topTiles    = sortedGroups.slice(0, 4);
const leftTiles   = sortedGroups.slice(4, 7);
const rightTiles  = sortedGroups.slice(7, 10);
const bottomTiles = sortedGroups.slice(10, 14);

/* ─────────────────────────────────────────
   INTRO MINI CARD (expertise bar)
───────────────────────────────────────── */
function IntroCard({ e, i, isInView }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.32 + i * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }); }}
      onMouseMove={(ev) => {
        const rect = cardRef.current.getBoundingClientRect();
        setPos({
          x: ((ev.clientX - rect.left) / rect.width  - 0.5) * 18,
          y: ((ev.clientY - rect.top)  / rect.height - 0.5) * -18,
        });
      }}
      style={{
        borderRadius: 14, padding: "12px 13px",
        background: hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${hovered ? `${e.color}55` : "rgba(255,255,255,0.12)"}`,
        backdropFilter: "blur(12px)",
        display: "flex", flexDirection: "column", gap: 7,
        cursor: "default", position: "relative", overflow: "hidden",
        transform: hovered
          ? `perspective(600px) rotateX(${pos.y}deg) rotateY(${pos.x}deg) translateZ(4px)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        boxShadow: hovered ? `0 12px 36px ${e.color}30, 0 0 0 1px ${e.color}20` : "none",
        transition: "background 0.22s, border-color 0.22s, box-shadow 0.22s",
      }}
    >
      {hovered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%",
            background: `radial-gradient(circle, ${e.color}35 0%, transparent 70%)`,
            top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      )}
      {hovered && (
        <motion.div initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ duration: 0.6 }}
          style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", pointerEvents: "none" }} />
      )}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: `${e.color}22`, border: `1px solid ${e.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s"
        }}>
          <e.icon size={13} style={{ color: e.color }} />
        </div>
        {hovered && (
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            style={{ fontSize: 16, fontWeight: 800, color: e.color, lineHeight: 1 }}>
            {e.value}%
          </motion.div>
        )}
      </div>
      <div style={{ position: "relative", zIndex: 1, fontSize: 11, fontWeight: 600,
        color: hovered ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.82)",
        lineHeight: 1.28, transition: "color 0.18s" }}>
        {e.name}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ height: 2.5, borderRadius: 100, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
          <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${e.value}%` } : {}}
            transition={{ duration: 1, delay: 0.42 + i * 0.07, ease: "easeOut" }}
            style={{ height: "100%", borderRadius: 100, background: e.color,
              boxShadow: hovered ? `0 0 8px ${e.color}` : "none", transition: "box-shadow 0.22s" }} />
        </div>
        {!hovered && <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", marginTop: 2.5 }}>{e.value}%</div>}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   DOMAIN CARD — centre bento cards
───────────────────────────────────────── */
function DomainCard({ d, index, isInView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.22 + index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18, background: hovered ? `linear-gradient(145deg, ${d.color}0e 0%, #e8ecf8 100%)` : "linear-gradient(145deg, #eef1fb 0%, #e4e8f5 100%)",
        border: `1px solid ${hovered ? d.color + "45" : "rgba(99,130,255,0.18)"}`,
        boxShadow: hovered ? `0 16px 40px ${d.color}22, 0 2px 8px rgba(0,0,0,0.06)` : "0 4px 20px rgba(60,80,180,0.1)",
        padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10,
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "border-color 0.22s, box-shadow 0.25s",
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 2,
        background: hovered ? `linear-gradient(90deg, transparent, ${d.color}70, transparent)` : `linear-gradient(90deg, transparent, ${d.color}30, transparent)`,
        transition: "background 0.25s", borderRadius: "0 0 3px 3px" }} />
      {/* Corner glow */}
      <motion.div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, ${d.color}18 0%, transparent 70%)`, pointerEvents: "none" }}
        animate={{ opacity: hovered ? 1 : 0.4 }} transition={{ duration: 0.25 }} />

      {/* Icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${d.color}12`,
          border: `1px solid ${d.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <d.icon size={16} style={{ color: d.color }} />
        </div>
        <div>
          <div style={{ fontSize: "clamp(11px, 1.1vw, 12.5px)", fontWeight: 700, color: hovered ? d.color : "#111827", lineHeight: 1.2, transition: "color 0.2s" }}>{d.label}</div>
          <div style={{ fontSize: "clamp(9px, 0.85vw, 10px)", color: "#9aa5c8", fontWeight: 400, marginTop: 2, lineHeight: 1.4 }}>{d.sub}</div>
        </div>
      </div>
      {/* Skills list */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {d.skills.map(s => (
          <span key={s} style={{ fontSize: 10.5, fontWeight: 500, padding: "3px 9px", borderRadius: 100,
            background: hovered ? `${d.color}14` : `${d.color}12`, color: hovered ? d.color : "#2e3d6b",
            border: `1px solid ${d.color}28`, transition: "color 0.2s, background 0.2s" }}>{s}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SKILL TILE — popover on click
───────────────────────────────────────── */
function SkillTile({ g, accentColor, isInView, delay, compact = false }) {
  const [hovered, setHovered]   = useState(false);
  const [popOpen, setPopOpen]   = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [pop, setPop]           = useState({ top: 0, left: 0, isBottom: true, arrowLeft: 100 });
  const tileRef = useRef(null);
  const popRef  = useRef(null);

  const openPop = () => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const popW = 268, popH = 170, gap = 10;
    const isBottom = (window.innerHeight - rect.bottom) >= popH + gap;
    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - popW - 8));
    const top = isBottom ? rect.bottom + gap : rect.top - popH - gap;
    const arrowLeft = Math.max(14, Math.min((rect.left + rect.width / 2) - left - 5, popW - 24));
    setPop({ top, left, isBottom, arrowLeft });
    setPopOpen(v => !v);
  };

  useEffect(() => {
    if (!popOpen) return;
    const close = (e) => {
      if (tileRef.current?.contains(e.target)) return;
      if (popRef.current?.contains(e.target))  return;
      setPopOpen(false);
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", () => setPopOpen(false), { once: true, capture: true });
    return () => document.removeEventListener("mousedown", close);
  }, [popOpen]);

  return (
    <>
      <motion.button
        ref={tileRef} type="button" onClick={openPop} className="stile"
        style={{ minHeight: compact ? 74 : 90, position: "relative", overflow: "hidden",
          outline: popOpen ? `2px solid ${accentColor}35` : "none", outlineOffset: 2 }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(ev) => {
          if (!tileRef.current) return;
          const r = tileRef.current.getBoundingClientRect();
          setMousePos({ x: ((ev.clientX - r.left) / r.width) * 100, y: ((ev.clientY - r.top) / r.height) * 100 });
        }}
        whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.97 }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 16,
          background: hovered ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${accentColor}18 0%, transparent 65%)` : "transparent",
          transition: "background 0.1s" }} />
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
          background: hovered ? `linear-gradient(90deg, transparent, ${accentColor}70, transparent)` : "transparent",
          transition: "background 0.22s" }} />
        <AnimatePresence>
          {(hovered || popOpen) && (
            <motion.div key="badge"
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              style={{ position: "absolute", top: 7, right: 7, width: 16, height: 16, borderRadius: "50%",
                background: popOpen ? accentColor : `${accentColor}20`, border: `1px solid ${accentColor}50`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 800, color: popOpen ? "white" : accentColor, lineHeight: 1, pointerEvents: "none" }}>
              i
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: compact ? 28 : 32, height: compact ? 28 : 32, borderRadius: compact ? 8 : 9,
            background: hovered ? `${accentColor}22` : `${accentColor}14`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, position: "relative", zIndex: 1,
            boxShadow: hovered ? `0 0 12px ${accentColor}40` : "none",
            transition: "background 0.2s, box-shadow 0.2s" }}
          animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }} transition={{ duration: 0.4 }}>
          <g.icon size={compact ? 12 : 14} style={{ color: accentColor }} />
        </motion.div>
        <div style={{ fontSize: compact ? 10.5 : 11.5, fontWeight: 600, color: hovered ? "#111827" : "#1e2a55",
          lineHeight: 1.3, position: "relative", zIndex: 1, transition: "color 0.18s" }}>{g.title}</div>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: hovered ? accentColor : "#9aa5c8",
          position: "relative", zIndex: 1, transition: "color 0.18s" }}>{g.items.length} items</div>
      </motion.button>

      <AnimatePresence>
        {popOpen && (
          <motion.div ref={popRef}
            initial={{ opacity: 0, scale: 0.93, y: pop.isBottom ? -6 : 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: pop.isBottom ? -6 : 6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", top: pop.top, left: pop.left, width: 268, zIndex: 99999,
              background: "white", borderRadius: 14, border: `1px solid ${accentColor}22`,
              boxShadow: `0 8px 32px rgba(60,80,180,0.16), 0 2px 8px rgba(0,0,0,0.07)`,
              padding: "13px 14px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div style={{ position: "absolute", ...(pop.isBottom ? { top: -5 } : { bottom: -5 }), left: pop.arrowLeft,
              width: 10, height: 10, background: "white", border: `1px solid ${accentColor}22`,
              borderRight: "none", borderBottom: "none",
              transform: pop.isBottom ? "rotate(45deg)" : "rotate(225deg)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                background: `${accentColor}12`, border: `1px solid ${accentColor}25`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <g.icon size={12} style={{ color: accentColor }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{g.title}</div>
                <div style={{ fontSize: 10, color: "#9aa5c8", fontWeight: 500, marginTop: 1 }}>{g.items.length} items</div>
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); setPopOpen(false); }}
                style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(99,130,255,0.07)", border: "1px solid rgba(99,130,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={9} style={{ color: "#9aa5c8" }} />
              </button>
            </div>
            <div style={{ height: 1, marginBottom: 10, background: `linear-gradient(90deg, ${accentColor}25, transparent)` }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {g.items.map((it) => (
                <span key={it} style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 100,
                  background: `${accentColor}08`, border: `1px solid ${accentColor}20`, color: "#3a4a7a" }}>{it}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function ExpertiseSection() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
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

  return (
    <section id="expertise" ref={ref} style={{
      position: "relative",
      padding: isMobile ? "60px 0 76px" : "96px 0 112px",
      background: "#f0f2ff", overflow: "hidden",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .exp-tag { display:inline-flex;align-items:center;gap:6px;padding:6px 18px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;background:white;border:1px solid rgba(99,130,255,0.2);color:#4a6df0;box-shadow:0 2px 12px rgba(99,130,255,0.09); }
        .exp-title { font-size:clamp(28px,3.5vw,48px);font-weight:800;letter-spacing:-0.025em;line-height:1.1;color:#111827;margin:0; }
        .exp-title em { font-style:normal;background:linear-gradient(135deg,#2a3cad,#5c7cfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .intro-strip { background:linear-gradient(135deg,#1a2a6c 0%,#1e3a8a 52%,#1e40af 100%);border-radius:24px;position:relative;overflow:hidden;margin-bottom:28px; }
        .intro-strip::before { content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 80% at 92% 50%,rgba(99,160,255,0.18) 0%,transparent 60%),radial-gradient(ellipse 40% 60% at 5% 18%,rgba(120,80,255,0.14) 0%,transparent 55%); }
        .intro-strip::after { content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,0.055) 1px,transparent 1px);background-size:22px 22px; }
        .stat-pill { display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(8px); }
        .stat-pill-icon { width:32px;height:32px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center; }
        .slabel { display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:#1e2a55;margin-bottom:14px; }
        .slabel-dot { width:6px;height:6px;border-radius:50%;background:#4a6df0;flex-shrink:0; }
        .stile { border-radius:16px;background:white;border:1px solid rgba(99,130,255,0.1);box-shadow:0 2px 12px rgba(60,80,180,0.05);padding:13px 10px 11px;text-align:center;cursor:pointer;transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;display:flex;flex-direction:column;align-items:center;gap:5px;justify-content:center;width:100%; }
        .stile:hover { border-color:rgba(99,130,255,0.2);box-shadow:0 12px 36px rgba(60,80,180,0.12); }
        .bg-blob-e { position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px); }
      `}</style>

      <div className="bg-blob-e" style={{ width:500,height:500,top:"-8%",right:"-2%",background:"rgba(99,130,255,0.06)" }} />
      <div className="bg-blob-e" style={{ width:400,height:400,bottom:"0",left:"-5%",background:"rgba(80,100,255,0.05)" }} />

      <div style={{ maxWidth:1160, margin:"0 auto", padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "0 32px" }}>

        {/* HEADER */}
        <motion.div initial={{ opacity:0, y:16 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}
          style={{ textAlign:"center", marginBottom: isMobile ? 32 : 44 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <span className="exp-tag">✦ What I Do Best</span>
          </div>
          <h2 className="exp-title">Technical <em>Expertise</em></h2>
          <p style={{ fontSize:14, color:"#9aa5c8", marginTop:10, fontWeight:400, maxWidth:500, margin:"10px auto 0" }}>
            I lead enterprise technology transformation by combining architecture strategy with modern engineering execution — building secure, scalable, and resilient platforms.
          </p>
        </motion.div>

        {/* INTRO STRIP */}
        <motion.div className="intro-strip"
          initial={{ opacity:0, y:22 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ duration:0.65, delay:0.1 }}
          style={{ display:"grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr auto", gap: isMobile ? 20 : isTablet ? 24 : 48, alignItems:"center", padding: isMobile ? "28px 20px" : isTablet ? "32px 36px" : "40px 48px" }}>

          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ fontSize: isMobile ? 13.5 : 15, lineHeight:1.8, color:"rgba(255,255,255,0.72)", fontWeight:300, maxWidth:500, marginBottom: isMobile ? 20 : 28 }}>
              My core strengths span Enterprise Architecture, Platform Engineering, DevSecOps, SRE, Generative AI, Cloud Transformation, and Data Modernisation — focused on delivery speed, reliability, governance, and cost outcomes.
            </p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:10, maxWidth: isMobile ? "100%" : 520 }}>
              {[
                { icon: TrendingUp, color:"#3b82f6", label:"Enterprise Architecture", sub:"TOGAF · BIAN · SAFe · Asia's largest bank" },
                { icon: ShieldCheck, color:"#8b5cf6", label:"Top 50 DevSecOps Globally", sub:"30+ conference talks · Author & speaker" },
                { icon: Brain,      color:"#06b6d4", label:"GenAI & MLOps",             sub:"Enterprise LLM platforms at scale"        },
                { icon: BookOpen,   color:"#10b981", label:"6 Books · 1 US Patent",     sub:"Apress · Packt · USPTO US11334348B2"      },
              ].map((s, si) => (
                <motion.div key={s.label} className="stat-pill"
                  initial={{ opacity:0, y:8 }} animate={isInView ? { opacity:1, y:0 } : {}}
                  transition={{ delay:0.28 + si * 0.07 }}>
                  <div className="stat-pill-icon" style={{ background:`${s.color}22`, border:`1px solid ${s.color}40` }}>
                    <s.icon size={15} style={{ color:s.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:700, color:"rgba(255,255,255,0.92)", lineHeight:1.2 }}>{s.label}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:2, fontWeight:400 }}>{s.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA link */}
            <motion.a href="mailto:contact@hellouchit.com"
              initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ delay:0.65 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:22,
                padding:"11px 22px", borderRadius:100, textDecoration:"none",
                background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
                color:"rgba(255,255,255,0.9)", fontSize:12.5, fontWeight:600, backdropFilter:"blur(8px)" }}
              whileHover={{ background:"rgba(255,255,255,0.18)", scale:1.02 } as any}
              whileTap={{ scale:0.97 }}>
              Discuss Your Architecture Needs →
            </motion.a>
          </div>

          {!isMobile && (
            <div style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, width: isTablet ? "100%" : undefined, maxWidth: isTablet ? 560 : undefined }}>
              {expertise.map((e, i) => <IntroCard key={e.name} e={e} i={i} isInView={isInView} />)}
            </div>
          )}
        </motion.div>

        {/* DEPTH BY DOMAIN LABEL */}
        <motion.div initial={{ opacity:0, y:10 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ delay:0.2 }}
          style={{ marginBottom:14 }}>
          <div className="slabel"><span className="slabel-dot" />Depth by Domain</div>
        </motion.div>

        {/* DOMAIN CARDS — 5 cards, responsive */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap:12, marginBottom:28 }}>
          {domainCards.map((d, i) => <DomainCard key={d.label} d={d} index={i} isInView={isInView} />)}
        </div>

        {/* TOOLING LABEL */}
        <motion.div initial={{ opacity:0, y:10 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ delay:0.22 }}
          style={{ marginBottom:14 }}>
          <div className="slabel"><span className="slabel-dot" />Tooling & Technology</div>
        </motion.div>

        {/* DESKTOP BENTO */}
        {isDesktop && (
          <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ duration:0.4, delay:0.14 }}
            style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {/* TOP 4 */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {topTiles.map((g, i) => (
                <SkillTile key={g.title} g={g} accentColor={expertise[i % expertise.length].color}
                  isInView={isInView} delay={0.17 + i * 0.05} />
              ))}
            </div>
            {/* MIDDLE */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:12 }}>
              {/* Left 3 */}
              <div style={{ gridColumn:"1 / 3", display:"flex", flexDirection:"column", gap:12 }}>
                {leftTiles.map((g, i) => (
                  <SkillTile key={g.title} g={g} accentColor={expertise[(i+4) % expertise.length].color}
                    isInView={isInView} delay={0.2 + i * 0.05} compact />
                ))}
              </div>
              {/* Centre: 5 domain summary pills in a 2+3 layout */}
              <div style={{ gridColumn:"3 / 7", display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:12 }}>
                {[
                  { label:"IaC & Automation",     icon:Cog,        color:"#f59e0b", sub:"Terraform · Ansible · Chef · Packer"     },
                  { label:"Container Orchestration", icon:Container, color:"#ef4444", sub:"K8s · OpenShift · Docker · Nomad"       },
                  { label:"Security & Compliance", icon:ShieldCheck, color:"#8b5cf6", sub:"DevSecOps · Vault · Policy-as-Code"     },
                  { label:"Observability & SRE",   icon:Eye,        color:"#06b6d4", sub:"Prometheus · Grafana · Datadog · Splunk" },
                ].map((c, ci) => (
                  <motion.div key={c.label}
                    initial={{ opacity:0, y:12 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ delay:0.22 + ci * 0.06 }}
                    style={{ borderRadius:18, background:"white", border:"1px solid rgba(99,130,255,0.1)",
                      boxShadow:"0 4px 20px rgba(60,80,180,0.07)", padding:"18px 20px",
                      display:"flex", flexDirection:"column", gap:10, position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1.5,
                      background:`linear-gradient(90deg, transparent, ${c.color}50, transparent)` }} />
                    <div style={{ width:36, height:36, borderRadius:10, background:`${c.color}12`,
                      border:`1px solid ${c.color}25`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <c.icon size={16} style={{ color:c.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#111827", marginBottom:4, lineHeight:1.2 }}>{c.label}</div>
                      <div style={{ fontSize:11, color:"#9aa5c8", fontWeight:400, lineHeight:1.5 }}>{c.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Right 3 */}
              <div style={{ gridColumn:"7 / 9", display:"flex", flexDirection:"column", gap:12 }}>
                {rightTiles.map((g, i) => (
                  <SkillTile key={g.title} g={g} accentColor={expertise[(i+7) % expertise.length].color}
                    isInView={isInView} delay={0.2 + i * 0.05} compact />
                ))}
              </div>
            </div>
            {/* BOTTOM 4 */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {bottomTiles.map((g, i) => (
                <SkillTile key={g.title} g={g} accentColor={expertise[(i+2) % expertise.length].color}
                  isInView={isInView} delay={0.26 + i * 0.05} />
              ))}
            </div>
          </motion.div>
        )}

        {/* TABLET */}
        {isTablet && (
          <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ duration:0.4, delay:0.14 }}
            style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {sortedGroups.map((g, idx) => (
              <SkillTile key={g.title} g={g} accentColor={expertise[idx % expertise.length].color}
                isInView={isInView} delay={0.18 + idx * 0.025} />
            ))}
          </motion.div>
        )}

        {/* MOBILE */}
        {isMobile && (
          <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ duration:0.4, delay:0.14 }}
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
            {sortedGroups.map((g, idx) => (
              <SkillTile key={g.title} g={g} accentColor={expertise[idx % expertise.length].color}
                isInView={isInView} delay={0.18 + idx * 0.02} compact />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}