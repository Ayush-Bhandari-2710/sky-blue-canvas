import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Network, CreditCard, Zap, Database, ShoppingCart,
  ChevronRight, ArrowUpRight, BookOpen
} from "lucide-react";

const cases = [
  {
    id: "01",
    category: "Banking & Financial Services · Enterprise Architecture",
    title: "EA Governance at Asia's Largest Bank",
    subtitle: "Asia's Largest Bank",
    cardTitle: "Enterprise Architecture Governance",
    desc: "Aligned hundreds of initiatives to a unified technology strategy and risk framework. Decision velocity improved, shadow IT reduced, architecture elevated to a board-level asset.",
    tags: ["Enterprise Architecture", "TOGAF", "BIAN", "Risk Governance"],
    icon: Network,
    gradFrom: "#0a2e2a", gradMid: "#0e4a3a", gradTo: "#1a6b52",
    shapeColor: "#1d7a5f",
    shape: "triangle",
    accent: "#10b981",
    accentLight: "#d1fae5",
  },
  {
    id: "02",
    category: "Banking · Payment Infrastructure · Multi-Region",
    title: "Multi-Region Payment Platform — Delivered in 3 Months",
    subtitle: "Delivered in 3 Months",
    cardTitle: "Multi-Region Banking Payment Platform",
    desc: "Designed and shipped a cross-region payment platform under a compressed mandate. Launched on time with zero critical production defects across all regions.",
    tags: ["Payment Systems", "Multi-Region", "SRE", "Banking"],
    icon: CreditCard,
    gradFrom: "#061e30", gradMid: "#0a3d55", gradTo: "#0e5f72",
    shapeColor: "#1277a0",
    shape: "circle",
    accent: "#0ea5e9",
    accentLight: "#e0f2fe",
  },
  {
    id: "03",
    category: "FinTech · Platform Engineering · Speed-to-Market",
    title: "High-Speed Digital Lending Platform at Scale",
    subtitle: "Platform at Scale",
    cardTitle: "High-Speed Digital Lending",
    desc: "Replaced legacy approval workflows with event-driven microservices — turning weeks of credit decisioning into seconds without compromising compliance or audit trails.",
    tags: ["Microservices", "Event-Driven", "FinTech", "Kubernetes"],
    icon: Zap,
    gradFrom: "#080e28", gradMid: "#0d1f4a", gradTo: "#122868",
    shapeColor: "#1a3d7a",
    shape: "roundedSquare",
    accent: "#6366f1",
    accentLight: "#ede9fe",
  },
  {
    id: "04",
    category: "Data Platform · Compliance · Cost Optimisation",
    title: "Enterprise Data Archival Platform Transformation",
    subtitle: "Platform Transformation",
    cardTitle: "Enterprise Data Archival",
    desc: "Governed, lifecycle-aware archival platform replacing fragmented legacy storage. Full regulatory compliance, end-to-end lineage, and significant cost reduction across petabyte-scale datasets.",
    tags: ["Data Modernisation", "Governance", "Compliance", "FinOps"],
    icon: Database,
    gradFrom: "#060d28", gradMid: "#0a1840", gradTo: "#0e254e",
    shapeColor: "#0d6e6e",
    shape: "orb",
    accent: "#06b6d4",
    accentLight: "#cffafe",
  },
  {
    id: "05",
    category: "Retail · Digital Transformation · Innovation Strategy",
    title: "Retail Platform Modernisation & Innovation Roadmap",
    subtitle: "Innovation Roadmap",
    cardTitle: "Retail Platform Modernisation",
    desc: "Monolith to composable API-first architecture. The phased roadmap connected technology investment to commercial outcomes — faster time-to-market, reduced cost, new revenue-enabling capabilities.",
    tags: ["API-First", "Modernisation", "Innovation Roadmap", "Cloud Migration"],
    icon: ShoppingCart,
    gradFrom: "#0c0a2e", gradMid: "#1a1660", gradTo: "#2a228a",
    shapeColor: "#3d35a0",
    shape: "roundedSquare",
    accent: "#818cf8",
    accentLight: "#e0e7ff",
  },
];

// ── Geometric shape (top-right of card header) ────────────────────────────────
function CardShape({ shape, color }: { shape: string; color: string }) {
  if (shape === "triangle") return (
    <div style={{ position:"absolute", top:14, right:18, width:0, height:0,
      borderLeft:"46px solid transparent", borderRight:"46px solid transparent",
      borderTop:`80px solid ${color}`, filter:`drop-shadow(0 4px 14px ${color}55)` }} />
  );
  if (shape === "circle") return (
    <div style={{ position:"absolute", top:12, right:16, width:92, height:92, borderRadius:"50%",
      background:`radial-gradient(circle at 40% 40%,${color}cc,${color}55)`,
      boxShadow:`0 0 0 1px ${color}40,0 8px 28px ${color}44` }} />
  );
  if (shape === "roundedSquare") return (
    <div style={{ position:"absolute", top:12, right:16, width:82, height:82, borderRadius:18,
      background:`linear-gradient(145deg,${color}cc,${color}44)`,
      boxShadow:`0 0 0 1px ${color}40,0 8px 24px ${color}38` }} />
  );
  if (shape === "orb") return (
    <div style={{ position:"absolute", top:-16, right:-16, width:105, height:105, borderRadius:"50%",
      background:`radial-gradient(circle at 38% 38%,${color}dd,${color}44)`,
      boxShadow:`0 0 0 1px ${color}30,0 12px 36px ${color}50` }} />
  );
  return null;
}

// ── Dark gradient card header ─────────────────────────────────────────────────
function CaseCardHeader({ c, hov }: { c: typeof cases[0]; hov: boolean }) {
  const Icon = c.icon;
  return (
    <div style={{
      position: "relative", height: 200, flexShrink: 0, overflow: "hidden",
      background: `linear-gradient(135deg,${c.gradFrom} 0%,${c.gradMid} 55%,${c.gradTo} 100%)`,
      borderRadius: "20px 20px 0 0",
      display: "flex", flexDirection: "column",
    }}>
      {/* Noise overlay */}
      <div style={{ position:"absolute", inset:0, opacity:0.35,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        pointerEvents:"none" }} />

      {/* Geometric shape top-right */}
      <CardShape shape={c.shape} color={c.shapeColor} />

      {/* Row 1: ID badge + arrow */}
      <div style={{ position:"relative", zIndex:2, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 14px 0 16px" }}>
        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:10, fontWeight:800,
          letterSpacing:"0.12em", color:`${c.accent}cc`,
          background:`${c.accent}18`, border:`1px solid ${c.accent}30`,
          padding:"3px 10px", borderRadius:100 }}>
          {c.id}
        </div>
        <motion.div animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.65 }} transition={{ duration:0.2 }}
          style={{ width:28, height:28, borderRadius:"50%", background:c.accent,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 4px 12px ${c.accent}55` }}>
          <ArrowUpRight size={13} style={{ color:"white" }} />
        </motion.div>
      </div>

      {/* Row 2: Icon — centred, takes up the middle space */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:2 }}>
        <motion.div
          animate={{ scale: hov ? 1.1 : 1, rotate: hov ? -6 : 0 }}
          transition={{ type:"spring", stiffness:340, damping:22 }}
          style={{ width:56, height:56, borderRadius:"50%",
            background:"rgba(255,255,255,0.08)",
            border:`1.5px solid ${c.accent}40`,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 0 0 6px ${c.accent}0c,0 6px 20px rgba(0,0,0,0.25)`,
            backdropFilter:"blur(4px)" }}
        >
          <Icon size={22} style={{ color: c.accent }} />
        </motion.div>
      </div>

      {/* Row 3: Title text — pinned to bottom, never touches icon */}
      <div style={{ position:"relative", zIndex:2, padding:"0 52px 16px 16px" }}>
        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:13.5, fontWeight:800,
          color:"rgba(255,255,255,0.92)", lineHeight:1.28, letterSpacing:"-0.015em",
          textShadow:"0 2px 10px rgba(0,0,0,0.35)" }}>
          {c.cardTitle}
        </div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:3 }}>
          {c.subtitle}
        </div>
      </div>
    </div>
  );
}

// ── Full case card ─────────────────────────────────────────────────────────────
function CaseCard({ c, index, inView }: { c: typeof cases[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my,[-0.5,0.5],[5,-5]),{stiffness:260,damping:28});
  const ry = useSpring(useTransform(mx,[-0.5,0.5],[-5,5]),{stiffness:260,damping:28});

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX-r.left)/r.width-0.5);
    my.set((e.clientY-r.top)/r.height-0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); setHov(false); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity:0, y:38 }}
      animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:0.08+index*0.1, duration:0.6, ease:[0.16,1,0.3,1] }}
      onMouseMove={onMove}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX:rx, rotateY:ry, transformStyle:"preserve-3d",
        background: hov ? "white" : "rgba(255,255,255,0.88)",
        borderRadius:20,
        border: hov ? `1.5px solid ${c.accent}38` : "1.5px solid rgba(91,110,247,0.1)",
        boxShadow: hov
          ? `0 22px 60px ${c.accent}1a,0 4px 16px ${c.accent}0d`
          : "0 4px 20px rgba(60,80,180,0.07)",
        overflow:"hidden",
        transition:"background 0.25s,border-color 0.25s,box-shadow 0.3s",
        cursor:"pointer",
        display:"flex", flexDirection:"column" as const,
        position:"relative",
      }}
    >
      {/* Top accent slide bar */}
      <motion.div animate={{ scaleX: hov ? 1 : 0 }} initial={{ scaleX:0 }}
        transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
        style={{ position:"absolute", top:0, left:0, right:0, height:3, zIndex:10,
          background:`linear-gradient(90deg,${c.accent},${c.accent}55)`, transformOrigin:"left" }} />

      <CaseCardHeader c={c} hov={hov} />

      {/* Body */}
      <div style={{ padding:"20px 22px 24px", flex:1, display:"flex", flexDirection:"column" as const }}>
        <div style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.04em", color:"#94a3b8",
          fontFamily:"'Bricolage Grotesque',sans-serif", marginBottom:8, lineHeight:1.5 }}>
          {c.category}
        </div>
        <h3 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:15.5, fontWeight:800,
          color:"#0f172a", lineHeight:1.32, margin:"0 0 10px", letterSpacing:"-0.02em" }}>
          {c.title}
        </h3>
        <p style={{ fontSize:12.5, color:"#64748b", lineHeight:1.78, margin:"0 0 16px", flex:1 }}>
          {c.desc}
        </p>
        <div style={{ display:"flex", flexWrap:"wrap" as const, gap:5, marginTop:"auto" }}>
          {c.tags.map(tag=>(
            <span key={tag} style={{ fontSize:10.5, fontWeight:600, padding:"3px 9px", borderRadius:100,
              background:`${c.accent}10`, color:c.accent, border:`1px solid ${c.accent}22`,
              fontFamily:"'Bricolage Grotesque',sans-serif" }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Medium CTA card (6th slot) ────────────────────────────────────────────────
function MediumCard({ inView }: { inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my,[-0.5,0.5],[5,-5]),{stiffness:260,damping:28});
  const ry = useSpring(useTransform(mx,[-0.5,0.5],[-5,5]),{stiffness:260,damping:28});
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX-r.left)/r.width-0.5);
    my.set((e.clientY-r.top)/r.height-0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); setHov(false); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity:0, y:38 }}
      animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:0.08+5*0.1, duration:0.6, ease:[0.16,1,0.3,1] }}
      onMouseMove={onMove}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={onLeave}
      style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d" }}
    >
      <motion.a
        href="https://medium.com/@uchit86"
        target="_blank" rel="noreferrer"
        style={{
          display:"flex", flexDirection:"column" as const,
          alignItems:"center", justifyContent:"center", textAlign:"center" as const,
          height:"100%", minHeight:320,
          background: hov ? "white" : "rgba(255,255,255,0.88)",
          borderRadius:20,
          border: hov ? "1.5px solid rgba(99,102,241,0.38)" : "1.5px solid rgba(91,110,247,0.1)",
          boxShadow: hov
            ? "0 22px 60px rgba(99,102,241,0.12),0 4px 16px rgba(99,102,241,0.08)"
            : "0 4px 20px rgba(60,80,180,0.07)",
          padding:"36px 28px",
          textDecoration:"none",
          position:"relative", overflow:"hidden",
          transition:"background 0.25s,border-color 0.25s,box-shadow 0.3s",
          cursor:"pointer",
        }}
      >
        {/* Accent slide bar */}
        <motion.div animate={{ scaleX: hov ? 1 : 0 }} initial={{ scaleX:0 }}
          transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
          style={{ position:"absolute", top:0, left:0, right:0, height:3,
            background:"linear-gradient(90deg,#6366f1,#818cf855)", transformOrigin:"left", zIndex:2 }} />

        {/* Soft bg tint on hover */}
        <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration:0.3 }}
          style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 40%,rgba(99,102,241,0.04),transparent 70%)", pointerEvents:"none" }} />

        {/* Icon */}
        <motion.div
          animate={{ scale: hov ? 1.1 : 1, rotate: hov ? -6 : 0 }}
          transition={{ type:"spring", stiffness:340, damping:22 }}
          style={{ width:58, height:58, borderRadius:"50%",
            background:"linear-gradient(135deg,#ede9fe,#e0e7ff)",
            border:"1.5px solid rgba(99,102,241,0.2)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 0 0 6px rgba(99,102,241,0.06),0 6px 20px rgba(99,102,241,0.12)",
            marginBottom:22, position:"relative", zIndex:1 }}
        >
          <BookOpen size={24} style={{ color:"#6366f1" }} />
        </motion.div>

        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:20, fontWeight:800,
          color:"#0f172a", letterSpacing:"-0.025em", marginBottom:12, position:"relative", zIndex:1 }}>
          More Case Studies
        </div>
        <p style={{ fontSize:13, color:"#64748b", lineHeight:1.75, marginBottom:24, maxWidth:230,
          position:"relative", zIndex:1 }}>
          Browse the full collection of enterprise transformation case studies on Medium.
        </p>
        <motion.div animate={{ x: hov ? 4 : 0 }} transition={{ duration:0.18 }}
          style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13.5,
            fontWeight:700, color:"#6366f1", fontFamily:"'Bricolage Grotesque',sans-serif",
            borderBottom:"1.5px solid rgba(99,102,241,0.3)", paddingBottom:2,
            position:"relative", zIndex:1 }}>
          View all on Medium <ArrowUpRight size={14} />
        </motion.div>
      </motion.a>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CaseStudiesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="case-studies" ref={ref} style={{
      position:"relative",
      background:"linear-gradient(180deg,#f8f9ff 0%,#f0f2ff 60%,#f8f9ff 100%)",
      padding:"100px 40px 112px",
      overflow:"hidden",
      fontFamily:"'Inter',system-ui,sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Bg orbs */}
      <div style={{position:"absolute",top:"8%",right:"-5%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)",pointerEvents:"none"}} />
      <div style={{position:"absolute",bottom:"5%",left:"-5%",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.05) 0%,transparent 70%)",pointerEvents:"none"}} />

      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:60, flexWrap:"wrap" as const, gap:24 }}>
          <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease:[0.16,1,0.3,1]}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"4px 14px",borderRadius:100,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",marginBottom:16}}>
              <motion.span animate={{scale:[1,1.6,1],opacity:[1,0.4,1]}} transition={{duration:2,repeat:Infinity}}
                style={{width:5,height:5,borderRadius:"50%",background:"#6366f1",display:"block"}} />
              <span style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6366f1",fontFamily:"'Bricolage Grotesque',sans-serif"}}>Selected Work</span>
            </div>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:44,fontWeight:800,letterSpacing:"-0.035em",color:"#0f172a",margin:"0 0 12px",lineHeight:1.05}}>
              Case Studies
            </h2>
            <p style={{fontSize:15.5,color:"#64748b",lineHeight:1.75,maxWidth:540,margin:0}}>
              Real enterprise transformations. Real outcomes. Each engagement represents a mandate to solve something genuinely hard — at scale, under pressure, with results that stick.
            </p>
          </motion.div>

          <motion.a href="mailto:contact@hellouchit.com"
            initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.2,duration:0.55}}
            whileHover={{scale:1.04,boxShadow:"0 14px 40px rgba(99,102,241,0.3)"}}
            whileTap={{scale:0.97}}
            style={{display:"inline-flex",alignItems:"center",gap:9,padding:"13px 26px",borderRadius:100,textDecoration:"none",background:"linear-gradient(135deg,#3a52d9,#6366f1)",color:"white",fontSize:14,fontWeight:700,fontFamily:"'Bricolage Grotesque',sans-serif",boxShadow:"0 8px 28px rgba(99,102,241,0.28),inset 0 1px 0 rgba(255,255,255,0.2)",flexShrink:0}}>
            Discuss Your Transformation <ChevronRight size={15} />
          </motion.a>
        </div>

        {/* 3×2 grid — 5 cases + Medium CTA */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22, perspective:1200 }}>
          {cases.map((c,i) => <CaseCard key={c.id} c={c} index={i} inView={inView} />)}
          <MediumCard inView={inView} />
        </div>
      </div>
    </section>
  );
}