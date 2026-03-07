import { motion, useInView, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Users, Star, Target, MessageCircle,
  TrendingUp, Globe, BookOpen, Layers, ExternalLink,
} from "lucide-react";

const mentoringAreas = [
  { icon: Target,    title: "Career Architecture",                  body: "Building deliberate careers — not accidental ones. How to position yourself for senior IC and leadership roles in enterprise technology without losing technical credibility.", accent: "#3b82f6" },
  { icon: TrendingUp,title: "Technical to Strategic",               body: "How to translate engineering depth into business influence. Making the shift from solving technical problems to defining programmes that connect technology investment to commercial outcomes.", accent: "#6366f1" },
  { icon: Users,     title: "Engineering Leadership",               body: "Leading engineering teams and architecture practices with authority and clarity. Navigating stakeholders, managing technical debt politically, and building systems thinking into your leadership.", accent: "#0ea5e9" },
  { icon: Layers,    title: "Platform & Architecture Thinking",     body: "Deep mentoring for those moving into Enterprise Architecture, Platform Engineering, or DevSecOps leadership — with real patterns, frameworks, and decision models from live enterprise programs.", accent: "#8b5cf6" },
  { icon: BookOpen,  title: "Thought Leadership & Visibility",      body: "How to build a credible technical voice — through writing, speaking, and building in public. Turning expertise into influence beyond your organisation.", accent: "#059669" },
  { icon: Globe,     title: "Working Across Cultures & Geographies",body: "Navigating multinational enterprise programs across ASEAN, Europe, and Australia. Building relationships and delivering outcomes across different organisational cultures.", accent: "#f59e0b" },
];

const testimonials = [
  { quote: "Uchit doesn't just give answers — he helps you ask better questions. That shift alone changed how I lead.",                                                                 name: "Emma R.",    role: "Principal Engineer",      company: "Global Bank, Singapore"    },
  { quote: "The frameworks he shared completely changed how I approach enterprise clients. Three months in I had my first C-suite conversation.",                                       name: "James W.",   role: "Independent Consultant",   company: "London, UK"                },
  { quote: "Direct, practical, no fluff. I went from lead to principal in under a year. Worth every session.",                                                                         name: "Priya S.",   role: "Principal Architect",     company: "APAC Telco"                },
  { quote: "I was stuck on the IC track for three years. Two months with Uchit and I had a concrete roadmap to my first architecture role.",                                           name: "Daniel M.",  role: "Cloud Architect",         company: "Melbourne, Australia"      },
  { quote: "His ability to bridge commercial thinking with technical depth is rare. He helped me find my leadership voice.",                                                            name: "Aisha T.",   role: "VP Engineering",          company: "FinTech, Dubai"            },
  { quote: "Uchit helped me understand the political landscape of enterprise delivery — something no certification teaches you.",                                                       name: "Marcus L.",  role: "Platform Lead",           company: "Retail Enterprise, Sydney" },
];

const stats = [
  { value: "15+",    label: "Years\nEnterprise Delivery", color: "#3b82f6" },
  { value: "30+",    label: "Global Conference\nTalks",   color: "#6366f1" },
  { value: "4",      label: "Continents\nDelivered",      color: "#0ea5e9" },
  { value: "Top 50", label: "DevSecOps\nGlobally",        color: "#8b5cf6" },
];

// ─── Infinite testimonial marquee ─────────────────────────────────────────────
// Subtle accent palette — one per testimonial, cycling
const CARD_ACCENTS = [
  { color:"#3b82f6", bg:"rgba(59,130,246,0.04)",  avatarBg:"linear-gradient(135deg,#dbeafe,#bfdbfe)", borderHover:"rgba(59,130,246,0.35)"  },
  { color:"#6366f1", bg:"rgba(99,102,241,0.04)",  avatarBg:"linear-gradient(135deg,#e0e7ff,#c7d2fe)", borderHover:"rgba(99,102,241,0.35)"  },
  { color:"#0ea5e9", bg:"rgba(14,165,233,0.04)",  avatarBg:"linear-gradient(135deg,#e0f2fe,#bae6fd)", borderHover:"rgba(14,165,233,0.35)"  },
  { color:"#8b5cf6", bg:"rgba(139,92,246,0.04)",  avatarBg:"linear-gradient(135deg,#ede9fe,#ddd6fe)", borderHover:"rgba(139,92,246,0.35)" },
  { color:"#059669", bg:"rgba(5,150,105,0.04)",   avatarBg:"linear-gradient(135deg,#d1fae5,#a7f3d0)", borderHover:"rgba(5,150,105,0.35)"  },
  { color:"#f59e0b", bg:"rgba(245,158,11,0.04)",  avatarBg:"linear-gradient(135deg,#fef3c7,#fde68a)", borderHover:"rgba(245,158,11,0.35)" },
];

function TCard({ t, accentIdx }: { t: typeof testimonials[0]; accentIdx: number }) {
  const [hovered, setHovered] = useState(false);
  const a = CARD_ACCENTS[accentIdx % CARD_ACCENTS.length];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 360, flexShrink: 0, borderRadius: 22,
        background: hovered ? a.bg : "white",
        border: hovered ? `1px solid ${a.borderHover}` : "1px solid rgba(99,130,255,0.1)",
        boxShadow: hovered
          ? `0 8px 40px ${a.color}18, 0 0 0 3px ${a.color}10`
          : "0 4px 24px rgba(60,80,180,0.07)",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", height: 260,
        padding: "26px 28px 24px",
        transition: "background 0.28s, border-color 0.28s, box-shadow 0.28s",
        cursor: "default",
      }}
    >
      {/* Accent top bar */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 2,
        background: `linear-gradient(90deg, transparent, ${a.color}${hovered ? "70" : "25"}, transparent)`,
        borderRadius: 2, transition: "all 0.28s",
      }} />
      {/* Decorative quote glyph */}
      <div style={{
        position: "absolute", top: 10, right: 16, fontSize: 80, lineHeight: 1,
        color: `${a.color}${hovered ? "12" : "07"}`,
        fontFamily: "Georgia,serif", fontWeight: 900,
        userSelect: "none", pointerEvents: "none", transition: "color 0.28s",
      }}>"</div>
      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 14, flexShrink: 0 }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#f59e0b" style={{ color: "#f59e0b" }} />)}
      </div>
      {/* Quote */}
      <p style={{
        fontSize: 14, lineHeight: 1.72, color: "#334155",
        margin: 0, fontWeight: 400, fontFamily: "'Inter',sans-serif",
        flex: 1, overflow: "hidden",
        display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as const,
      }}>
        "{t.quote}"
      </p>
      {/* Attribution */}
      <div style={{
        display: "flex", alignItems: "center", gap: 11,
        marginTop: 16, flexShrink: 0, paddingTop: 16,
        borderTop: `1px solid ${a.color}${hovered ? "20" : "10"}`,
        transition: "border-color 0.28s",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: a.avatarBg,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          boxShadow: hovered ? `0 0 0 3px ${a.color}20` : "none",
          transition: "box-shadow 0.28s",
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: a.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
            {t.name.split(" ").map((n: string) => n[0]).join("")}
          </span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e2a55", fontFamily: "'Bricolage Grotesque',sans-serif" }}>{t.name}</div>
          <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 500 }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialMarquee({ bg }: { bg: string }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div style={{ overflow:"hidden", position:"relative", width:"100%" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:120, zIndex:2, background:`linear-gradient(90deg,${bg},transparent)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:120, zIndex:2, background:`linear-gradient(270deg,${bg},transparent)`, pointerEvents:"none" }} />
      <motion.div
        style={{ display:"flex", gap:20, width:"max-content", padding:"12px 0" }}
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:44, repeat:Infinity, ease:"linear" }}
      >
        {doubled.map((t, i) => (
          <TCard key={i} t={t} accentIdx={i % testimonials.length} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Area card with magnetic tilt ─────────────────────────────────────────────
function AreaCard({ item, index, inView }: { item: typeof mentoringAreas[0]; index: number; inView: boolean }) {
  const ref     = useRef<HTMLDivElement>(null);
  const mx      = useMotionValue(0);
  const my      = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5,0.5],[7,-7]), { stiffness:280, damping:28 });
  const rotateY = useSpring(useTransform(mx, [-0.5,0.5],[-7,7]), { stiffness:280, damping:28 });
  const scale   = useSpring(1, { stiffness:280, damping:28 });
  const glowX   = useTransform(mx, [-0.5,0.5],[0,100]);
  const glowY   = useTransform(my, [-0.5,0.5],[0,100]);
  const glowBg  = useMotionTemplate`radial-gradient(circle 130px at ${glowX}% ${glowY}%, ${item.accent}14 0%, transparent 70%)`;
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  const onMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onEnter = () => { scale.set(1.03); setHovered(true); };
  const onLeave = () => { mx.set(0); my.set(0); scale.set(1); setHovered(false); };

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay:0.08 + index*0.07, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ perspective:900, height:"100%" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
        style={{
          rotateX, rotateY, scale,
          borderRadius:20, padding:"24px 22px",
          background:"white",
          border: hovered ? `1px solid ${item.accent}35` : "1px solid rgba(99,130,255,0.1)",
          boxShadow: hovered ? `0 20px 52px ${item.accent}14, 0 0 0 4px ${item.accent}08` : "0 2px 16px rgba(60,80,180,0.06)",
          transition:"border-color 0.25s, box-shadow 0.25s",
          position:"relative" as const, overflow:"hidden",
          cursor:"default", transformStyle:"preserve-3d", willChange:"transform",
          height:"100%", boxSizing:"border-box" as const,
        }}
      >
        {/* Cursor glow */}
        <motion.div style={{ position:"absolute", inset:0, borderRadius:20, pointerEvents:"none", background:glowBg, opacity: hovered ? 1 : 0, transition:"opacity 0.2s" }} />
        {/* Top accent line */}
        <div style={{ position:"absolute", top:0, left:"12%", right:"12%", height:2, background:`linear-gradient(90deg,transparent,${item.accent}${hovered?"80":"28"},transparent)`, borderRadius:2, transition:"all 0.25s" }} />
        {/* Left stripe */}
        <div style={{ position:"absolute", top:"15%", left:0, width: hovered?3:2, height:"70%", borderRadius:"0 3px 3px 0", background:`linear-gradient(180deg,transparent,${item.accent}${hovered?"90":"40"},transparent)`, transition:"all 0.25s" }} />
        {/* Icon */}
        <div style={{ width:42, height:42, borderRadius:13, background:`linear-gradient(135deg,${item.accent}18,${item.accent}08)`, border:`1px solid ${item.accent}22`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, flexShrink:0, boxShadow: hovered?`0 4px 14px ${item.accent}22`:"none", transition:"box-shadow 0.25s", position:"relative", zIndex:1 }}>
          <Icon size={19} style={{ color:item.accent }} />
        </div>
        <h3 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:15.5, fontWeight:800, color:"#0f172a", lineHeight:1.25, margin:"0 0 10px", position:"relative", zIndex:1 }}>{item.title}</h3>
        <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.78, margin:0, fontWeight:400, position:"relative", zIndex:1 }}>{item.body}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const MentoringSection = () => {
  const ref=useRef(null), areasRef=useRef(null), quoteRef=useRef(null), marqRef=useRef(null), ctaRef=useRef(null);
  const inView      = useInView(ref,      {once:true,margin:"-60px"});
  const areasInView = useInView(areasRef, {once:true,margin:"-60px"});
  const quoteInView = useInView(quoteRef, {once:true,margin:"-60px"});
  const marqInView  = useInView(marqRef,  {once:true,margin:"-60px"});
  const ctaInView   = useInView(ctaRef,   {once:true,margin:"-60px"});

  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const cb=()=>setW(window.innerWidth); window.addEventListener("resize",cb); return()=>window.removeEventListener("resize",cb); },[]);
  const isMobile=w<640, isTablet=w>=640&&w<1024;
  const px=isMobile?"0 20px":isTablet?"0 28px":"0 40px";

  return (
    <section id="mentoring" ref={ref} style={{ position:"relative", background:"linear-gradient(180deg,#f7f8ff 0%,#eef0fb 50%,#f0f4ff 100%)", overflow:"hidden", fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap');
        .m-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(99,130,255,0.12),transparent);}
      `}</style>

      <div style={{ position:"absolute", width:560, height:560, top:"-10%", right:"-8%", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,130,255,0.07) 0%,transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:440, height:440, bottom:"5%", left:"-6%", borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

      {/* §1 HERO */}
      <div style={{ padding:isMobile?"72px 0 56px":"96px 0 72px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:px }}>
          <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5}} style={{display:"flex",justifyContent:"center",marginBottom:20}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"5px 16px",borderRadius:100,background:"white",border:"1px solid rgba(99,130,255,0.2)",boxShadow:"0 2px 12px rgba(99,130,255,0.09)"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#3b82f6",flexShrink:0}}/>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#3b82f6",fontFamily:"'Bricolage Grotesque',sans-serif"}}>1-on-1 Mentoring</span>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.55,delay:0.07,ease:[0.16,1,0.3,1]}} style={{textAlign:"center",marginBottom:isMobile?16:20}}>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:isMobile?"clamp(28px,8vw,38px)":"clamp(38px,5vw,58px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.05,color:"#0f172a",margin:"0 0 20px"}}>Mentoring</h2>
            <p style={{fontSize:isMobile?14:16,color:"#475569",lineHeight:1.82,maxWidth:640,margin:"0 auto",fontWeight:400}}>
              I mentor engineers, architects, and technology leaders at inflection points — the move from IC to lead, from lead to principal, from technical to strategic. My mentoring is direct, practical, and grounded in 15+ years of real delivery across some of the most demanding organisations in the world.
            </p>
          </motion.div>

          <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,delay:0.18}} style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap",marginBottom:isMobile?48:64}}>
            <a href="https://emergimentors.com.au/mentor-profile/uchit-vyas" target="_blank" rel="noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 28px",borderRadius:100,background:"linear-gradient(135deg,#1e3a8a,#3b82f6)",color:"white",fontSize:14,fontWeight:700,textDecoration:"none",fontFamily:"'Bricolage Grotesque',sans-serif",boxShadow:"0 8px 28px rgba(59,130,246,0.32),inset 0 1px 0 rgba(255,255,255,0.18)",transition:"transform 0.2s,box-shadow 0.2s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";(e.currentTarget as HTMLElement).style.boxShadow="0 14px 40px rgba(59,130,246,0.42)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow="0 8px 28px rgba(59,130,246,0.32),inset 0 1px 0 rgba(255,255,255,0.18)";}}>
              <Users size={15}/> Book a Session <ArrowRight size={14}/>
            </a>
            <a href="mailto:contact@hellouchit.com"
              style={{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 26px",borderRadius:100,background:"white",color:"#1e3a8a",fontSize:14,fontWeight:600,textDecoration:"none",fontFamily:"'Bricolage Grotesque',sans-serif",border:"1.5px solid rgba(59,130,246,0.22)",boxShadow:"0 2px 12px rgba(60,80,180,0.07)",transition:"border-color 0.2s,transform 0.2s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";(e.currentTarget as HTMLElement).style.borderColor="rgba(59,130,246,0.45)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.borderColor="rgba(59,130,246,0.22)";}}>
              <MessageCircle size={14}/> Get in Touch
            </a>
          </motion.div>

          <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:isMobile?10:14}}>
            {stats.map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.22+i*0.07,duration:0.45,ease:[0.16,1,0.3,1]}}
                whileHover={{y:-4,boxShadow:"0 12px 32px rgba(60,80,180,0.1)"} as any}
                style={{display:"flex",flexDirection:"column" as const,alignItems:"center",padding:"20px 16px",borderRadius:18,background:"white",border:"1px solid rgba(99,130,255,0.1)",boxShadow:"0 2px 16px rgba(60,80,180,0.06)",textAlign:"center" as const}}>
                <div style={{width:28,height:3,borderRadius:2,background:s.color,marginBottom:12}}/>
                <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:isMobile?26:30,fontWeight:800,color:s.color,lineHeight:1,marginBottom:6}}>{s.value}</span>
                <span style={{fontSize:11,fontWeight:500,color:"#94a3b8",letterSpacing:"0.03em",lineHeight:1.45,whiteSpace:"pre-line" as const}}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="m-divider"/>

      {/* §2 AREAS */}
      <div ref={areasRef} style={{padding:isMobile?"56px 0":"72px 0",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:px}}>
          <motion.div initial={{opacity:0,y:14}} animate={areasInView?{opacity:1,y:0}:{}} transition={{duration:0.5}} style={{textAlign:"center",marginBottom:isMobile?32:48}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:100,background:"rgba(99,130,255,0.07)",border:"1px solid rgba(99,130,255,0.14)",marginBottom:14}}>
              <span style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#5070e8",fontFamily:"'Bricolage Grotesque',sans-serif"}}>Areas of Focus</span>
            </div>
            <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:isMobile?"clamp(22px,6vw,28px)":"clamp(26px,3vw,36px)",fontWeight:800,letterSpacing:"-0.025em",lineHeight:1.1,color:"#0f172a",margin:"0 0 12px"}}>What We'll Work On</h3>
            <p style={{fontSize:14,color:"#64748b",lineHeight:1.72,maxWidth:460,margin:"0 auto"}}>Practical, personalised guidance across the areas that matter most to your growth.</p>
          </motion.div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)",gap:isMobile?12:16,alignItems:"stretch"}}>
            {mentoringAreas.map((item,i)=><AreaCard key={item.title} item={item} index={i} inView={areasInView}/>)}
          </div>
        </div>
      </div>

      <div className="m-divider"/>

      {/* §3 PHILOSOPHY QUOTE */}
      <div ref={quoteRef} style={{padding:isMobile?"56px 0":"72px 0",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:px}}>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?36:64,alignItems:"center"}}>
            <motion.div initial={{opacity:0,x:-16}} animate={quoteInView?{opacity:1,x:0}:{}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}>
              <div style={{borderLeft:"3px solid #3b82f6",paddingLeft:24}}>
                <p style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:isMobile?18:22,fontWeight:700,color:"#0f172a",lineHeight:1.55,margin:"0 0 14px"}}>
                  "The best mentor I ever had didn't tell me what to do. They helped me think more clearly about the right question. That's the kind of mentor I try to be."
                </p>
                <span style={{fontSize:12,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase" as const,color:"#94a3b8"}}>— Uchit Vyas</span>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:16}} animate={quoteInView?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:0.12,ease:[0.22,1,0.36,1]}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:100,background:"rgba(99,130,255,0.07)",border:"1px solid rgba(99,130,255,0.14)",marginBottom:18}}>
                <span style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#5070e8",fontFamily:"'Bricolage Grotesque',sans-serif"}}>My Approach</span>
              </div>
              <p style={{fontSize:15,color:"#475569",lineHeight:1.82,margin:"0 0 16px"}}>
                I work with people who are serious about growing. That means being honest when something isn't working, being specific about what needs to change, and holding you accountable to the goals you set.
              </p>
              <p style={{fontSize:15,color:"#475569",lineHeight:1.82,margin:"0 0 24px"}}>
                I don't do motivational speeches. I do working sessions with real outputs. Available via Emergent Mentors for structured 1:1 mentoring sessions — also open to informal conversations for people earlier in their journey.
              </p>
              <a href="https://emergimentors.com.au/mentor-profile/uchit-vyas" target="_blank" rel="noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:13.5,fontWeight:700,color:"#3b82f6",textDecoration:"none",fontFamily:"'Bricolage Grotesque',sans-serif",transition:"gap 0.2s"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.gap="11px";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.gap="7px";}}>
                <ExternalLink size={14}/> View Profile on Emergent Mentors <ArrowRight size={14}/>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="m-divider"/>

      {/* §4 TESTIMONIAL MARQUEE */}
      <div ref={marqRef} style={{padding:isMobile?"56px 0":"72px 0",position:"relative",zIndex:1,overflow:"hidden"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:px,marginBottom:isMobile?32:44}}>
          <motion.div initial={{opacity:0,y:14}} animate={marqInView?{opacity:1,y:0}:{}} transition={{duration:0.5}} style={{textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:100,background:"rgba(99,130,255,0.07)",border:"1px solid rgba(99,130,255,0.14)",marginBottom:14}}>
              <span style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#5070e8",fontFamily:"'Bricolage Grotesque',sans-serif"}}>Mentee Voices</span>
            </div>
            <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:isMobile?"clamp(22px,6vw,28px)":"clamp(26px,3vw,36px)",fontWeight:800,letterSpacing:"-0.025em",lineHeight:1.1,color:"#0f172a",margin:0}}>
              What people say after working together.
            </h3>
          </motion.div>
        </div>
        <motion.div initial={{opacity:0}} animate={marqInView?{opacity:1}:{}} transition={{duration:0.6,delay:0.2}}>
          <TestimonialMarquee bg="rgb(242,244,255)"/>
        </motion.div>
      </div>

      <div className="m-divider"/>

      {/* §5 CTA BAND */}
      <div ref={ctaRef} style={{padding:isMobile?"56px 0 72px":"72px 0 96px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:px}}>
          <motion.div initial={{opacity:0,y:20}} animate={ctaInView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease:[0.16,1,0.3,1]}}
            style={{borderRadius:28,padding:isMobile?"40px 24px":"56px 60px",background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#1d4ed8 100%)",position:"relative" as const,overflow:"hidden",boxShadow:"0 32px 80px rgba(30,58,138,0.22)"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)"}}/>
            <div style={{position:"absolute",top:-60,right:-60,width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,130,255,0.25) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-40,left:-40,width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.2) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:0,left:"10%",right:"10%",height:1,background:"linear-gradient(90deg,transparent,rgba(147,197,253,0.4),transparent)"}}/>
            <div style={{position:"relative",zIndex:1,display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr auto",gap:isMobile?32:48,alignItems:"center"}}>
              <div>
                <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"rgba(147,197,253,0.8)",marginBottom:12,fontFamily:"'Bricolage Grotesque',sans-serif"}}>Start Today</p>
                <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:isMobile?24:34,fontWeight:800,color:"#f0f6ff",lineHeight:1.1,letterSpacing:"-0.025em",margin:"0 0 14px"}}>
                  Ready to invest in your{" "}<span style={{color:"rgba(147,197,253,0.92)"}}>next level?</span>
                </h3>
                <p style={{fontSize:14,color:"rgba(196,213,255,0.75)",lineHeight:1.75,margin:0,maxWidth:480}}>
                  Available for a limited number of mentees each quarter. Book a free 30-minute discovery call to see if we're the right fit.
                </p>
              </div>
              <div style={{display:"flex",flexDirection:"column" as const,gap:10,alignItems:isMobile?"flex-start":"center",flexShrink:0}}>
                <a href="https://emergimentors.com.au/mentor-profile/uchit-vyas" target="_blank" rel="noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 28px",borderRadius:100,background:"rgba(255,255,255,0.95)",color:"#1e3a8a",fontSize:13.5,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap" as const,fontFamily:"'Bricolage Grotesque',sans-serif",boxShadow:"0 8px 28px rgba(0,0,0,0.2),inset 0 1px 0 white",transition:"transform 0.2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";}}>
                  <Users size={14}/> View Mentor Profile <ArrowRight size={13}/>
                </a>
                <a href="https://calendly.com/uchit86/30min" target="_blank" rel="noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",borderRadius:100,background:"transparent",color:"rgba(200,220,255,0.9)",fontSize:13.5,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap" as const,fontFamily:"'Bricolage Grotesque',sans-serif",border:"1px solid rgba(255,255,255,0.2)",transition:"border-color 0.2s,transform 0.2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.4)";(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.2)";(e.currentTarget as HTMLElement).style.transform="";}}>
                  <MessageCircle size={14}/> Book Discovery Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MentoringSection;