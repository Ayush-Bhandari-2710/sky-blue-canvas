import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, MapPin, Clock, Mail, Linkedin, Twitter, BookOpen, CheckCircle, ExternalLink } from "lucide-react";

// ── Breakpoint hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">(() => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

// ── Floating label field ──────────────────────────────────────────────────────
function FloatField({ label, type = "text", textarea = false, delay = 0, inView }: {
  label: string; type?: string; textarea?: boolean; delay?: number; inView: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value,   setValue  ] = useState("");
  const lifted = focused || value.length > 0;

  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: lifted ? "18px 14px 6px" : "12px 14px",
    borderRadius: 12,
    border: focused ? "1.5px solid #5b6ef7" : "1px solid rgba(91,110,247,0.2)",
    background: focused ? "#fff" : "#f4f5ff",
    fontSize: 13.5, color: "#1a1f4e", outline: "none",
    fontFamily: "'Inter', sans-serif",
    boxShadow: focused ? "0 0 0 4px rgba(91,110,247,0.1)" : "none",
    transition: "all 0.22s", boxSizing: "border-box" as const,
    resize: "none" as const, lineHeight: 1.6, display: "block",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
    >
      <motion.label
        animate={lifted ? {
          top: -10, fontSize: "10px",
          color: focused ? "#5b6ef7" : "#8090c0",
          fontWeight: 700, letterSpacing: "0.08em",
          background: focused ? "#fff" : "#f0f2ff",
          paddingLeft: 6, paddingRight: 6,
        } : {
          top: textarea ? 14 : "50%", fontSize: "13.5px",
          color: "#a0acc8", fontWeight: 400, letterSpacing: "0",
          background: "transparent", paddingLeft: 0, paddingRight: 0,
        }}
        style={{
          position: "absolute", left: 12,
          transform: lifted ? "none" : "translateY(-50%)",
          pointerEvents: "none", zIndex: 3,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          textTransform: lifted ? "uppercase" as const : "none" as const,
          borderRadius: 4, whiteSpace: "nowrap" as const,
          transition: "all 0.2s ease", lineHeight: 1,
        }}
      >
        {label}
      </motion.label>
      {textarea ? (
        <textarea rows={4} value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...fieldStyle, minHeight: 110 }} />
      ) : (
        <input type={type} value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={fieldStyle} />
      )}
    </motion.div>
  );
}

// ── Contact card ──────────────────────────────────────────────────────────────
function ContactCard({ icon: Icon, label, value, href, accent, delay, inView, compact = false }: {
  icon: any; label: string; value: string; href: string;
  accent: string; delay: number; inView: boolean; compact?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}
      style={{
        display: "flex", alignItems: "center",
        gap: compact ? 10 : 12,
        padding: compact ? "11px 12px" : "15px 16px",
        borderRadius: compact ? 12 : 16,
        background: hov ? `${accent}08` : "white",
        border: hov ? `1.5px solid ${accent}45` : "1.5px solid rgba(91,110,247,0.1)",
        textDecoration: "none",
        boxShadow: hov ? `0 10px 32px ${accent}22, 0 0 0 3px ${accent}09` : "0 2px 10px rgba(91,110,247,0.07)",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        position: "relative", overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {hov && (
          <motion.div key="sw"
            initial={{ x: "-100%", opacity: 0.8 }} animate={{ x: "220%", opacity: 0.8 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ position: "absolute", top: 0, left: 0, width: "55%", height: "100%",
              background: `linear-gradient(90deg,transparent,${accent}16,transparent)`, pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={{ scale: hov ? 1.15 : 1, rotate: hov ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 20 }}
        style={{ width: compact ? 34 : 42, height: compact ? 34 : 42, borderRadius: compact ? 10 : 12, flexShrink: 0,
          background: `linear-gradient(135deg,${accent}22,${accent}0a)`, border: `1px solid ${accent}28`,
          display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Icon size={compact ? 15 : 18} style={{ color: accent }} />
      </motion.div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.09em",
          textTransform: "uppercase" as const, color: "#9aa5c8",
          fontFamily: "'Bricolage Grotesque',sans-serif", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: compact ? 11.5 : 13, fontWeight: 600,
          color: hov ? accent : "#2d3a6b",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          fontFamily: "'Bricolage Grotesque',sans-serif", transition: "color 0.2s" }}>{value}</div>
      </div>
      <motion.div animate={{ x: hov ? 4 : 0, opacity: hov ? 1 : 0.2 }} transition={{ duration: 0.18 }} style={{ flexShrink: 0 }}>
        <ExternalLink size={11} style={{ color: accent }} />
      </motion.div>
    </motion.a>
  );
}

// ── Confetti burst ────────────────────────────────────────────────────────────
function Burst({ x, y }: { x: number; y: number }) {
  const colors = ["#5b6ef7","#f472b6","#fbbf24","#34d399","#818cf8","#f97316"];
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const r = 55 + Math.random() * 70;
        return (
          <motion.div key={i}
            initial={{ x, y, scale: 1, opacity: 1 }}
            animate={{ x: x + Math.cos(angle)*r, y: y + Math.sin(angle)*r, scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 + Math.random()*0.4, ease: "easeOut" }}
            style={{ position: "fixed", top: 0, left: 0, width: 7, height: 7,
              borderRadius: i % 3 === 0 ? 2 : "50%",
              background: colors[i % colors.length],
              pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)" }}
          />
        );
      })}
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bp     = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isDesktop = bp === "desktop";

  const [sent,   setSent  ] = useState(false);
  const [burst,  setBurst ] = useState<{x:number,y:number}|null>(null);
  const [imgHov, setImgHov] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Tilt — desktop only
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5,0.5],[2,-2]), {stiffness:180, damping:28});
  const ry = useSpring(useTransform(mx, [-0.5,0.5],[-2,2]), {stiffness:180, damping:28});
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX-r.left)/r.width  - 0.5);
    my.set((e.clientY-r.top )/r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const handleSend = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setBurst({ x: r.left + r.width/2, y: r.top + r.height/2 });
      setTimeout(() => setBurst(null), 1100);
    }
    setSent(true);
  };

  const socials = [
    { icon: Mail,     label: "Email",    value: "contact@hellouchit.com", href: "mailto:contact@hellouchit.com",     accent: "#5b6ef7" },
    { icon: Linkedin, label: "LinkedIn", value: "in/uchitvyas",           href: "https://linkedin.com/in/uchitvyas", accent: "#0ea5e9" },
    { icon: Twitter,  label: "Twitter",  value: "@uchit_vyas",            href: "https://twitter.com/uchit_vyas",    accent: "#6366f1" },
    { icon: BookOpen, label: "Medium",   value: "@uchit86",               href: "https://medium.com/@uchit86",       accent: "#059669" },
  ];

  // Responsive values
  const sectionPad = isMobile ? "64px 16px 80px" : isTablet ? "72px 24px 88px" : "88px 32px 104px";
  const cardRadius = isMobile ? 22 : 30;
  const formPad    = isMobile ? "28px 20px 32px" : isTablet ? "36px 32px" : "52px 44px 52px 48px";
  const rightPad   = isMobile ? "24px 20px 32px" : isTablet ? "28px 28px" : "40px 36px 40px 32px";

  return (
    <section id="contact" ref={ref} style={{
      position: "relative", fontFamily: "'Inter',system-ui,sans-serif",
      background: "linear-gradient(145deg,#eaedff 0%,#dde1ff 45%,#e6e9ff 100%)",
      padding: sectionPad, overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap');
        textarea{resize:none;}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #f4f5ff inset!important;}
      `}</style>

      {burst && <Burst x={burst.x} y={burst.y} />}

      {/* Animated blobs */}
      {[
        {w:420,h:420,s:{top:-100,left:-100}, rx:"62% 38% 55% 45%/48% 58% 42% 52%", c:"rgba(91,110,247,0.2)",  dur:10,dl:0  },
        {w:370,h:370,s:{bottom:-80,right:-80},rx:"45% 55% 38% 62%/55% 42% 58% 45%", c:"rgba(91,110,247,0.16)", dur:13,dl:1  },
        {w:200,h:200,s:{top:"28%",right:"-3%"},rx:"50%",                             c:"rgba(110,126,255,0.14)",dur:7, dl:2  },
        {w:110,h:110,s:{top:"10%",right:"17%"},rx:"50%",                             c:"rgba(91,110,247,0.11)", dur:6, dl:0.5},
      ].map((b,i) => (
        <motion.div key={i}
          animate={{scale:[1,1.06,1],rotate:[0,i%2===0?4:-4,0]}}
          transition={{duration:b.dur,repeat:Infinity,ease:"easeInOut",delay:b.dl}}
          style={{position:"absolute",...b.s,width:b.w,height:b.h,borderRadius:b.rx,background:b.c,pointerEvents:"none"}}
        />
      ))}

      {/* ── CARD ── */}
      <motion.div
        initial={{ opacity:0, y:32, scale:0.97 }}
        animate={inView ? { opacity:1, y:0, scale:1 } : {}}
        transition={{ duration:0.72, ease:[0.16,1,0.3,1] }}
        onMouseMove={onMove} onMouseLeave={onLeave}
        style={{
          maxWidth: isMobile ? "100%" : isTablet ? 720 : 980,
          margin: "0 auto",
          background: "rgba(255,255,255,0.97)",
          borderRadius: cardRadius,
          boxShadow: "0 28px 72px rgba(60,80,200,0.16),0 4px 16px rgba(60,80,200,0.08)",
          overflow: "visible",
          display: "grid",
          // Mobile/tablet: single column. Desktop: side-by-side.
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          position: "relative", zIndex: 1,
          rotateX: isMobile ? 0 : rx,
          rotateY: isMobile ? 0 : ry,
          transformStyle: "preserve-3d" as const,
        }}
      >
        {/* ══ FORM PANEL ══ */}
        <div style={{ borderRadius: isDesktop ? `${cardRadius}px 0 0 ${cardRadius}px` : `${cardRadius}px ${cardRadius}px 0 0`, overflow: "hidden" }}>
          <div style={{ padding: formPad }}>

            <motion.div initial={{ opacity:0, y:14 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.16, duration:0.5 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:100,
                background:"rgba(91,110,247,0.09)", border:"1px solid rgba(91,110,247,0.18)", marginBottom:16 }}>
                <motion.span animate={{scale:[1,1.7,1],opacity:[1,0.4,1]}} transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}
                  style={{width:5,height:5,borderRadius:"50%",background:"#5b6ef7",display:"block"}} />
                <span style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#5b6ef7",fontFamily:"'Bricolage Grotesque',sans-serif"}}>Get In Touch</span>
              </div>
                <br />
              <div style={{ position:"relative", display:"inline-block", marginBottom:10 }}>
                <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize: isMobile ? 28 : 36, fontWeight:800, letterSpacing:"-0.03em", color:"#1a1f4e", margin:0 }}>
                  Let's talk.
                </h2>
                <motion.div initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{delay:0.65,duration:0.55,ease:[0.16,1,0.3,1]}}
                  style={{position:"absolute",bottom:-3,left:0,right:0,height:3,borderRadius:2,background:"linear-gradient(90deg,#5b6ef7,#818cf8)",transformOrigin:"left"}} />
              </div>

              <p style={{ fontSize:13.5, color:"#7a88b4", lineHeight:1.82, margin:"12px 0 24px", maxWidth: isDesktop ? 295 : "100%" }}>
                Speaking engagement, consulting opportunity, or mentoring conversation — I respond within 24 hours.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok"
                  initial={{opacity:0,scale:0.85,y:16}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0}}
                  transition={{type:"spring",stiffness:280,damping:22}}
                  style={{textAlign:"center",padding:"24px 0"}}
                >
                  <motion.div initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}}
                    transition={{type:"spring",stiffness:360,damping:16,delay:0.1}}
                    style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#dbeafe,#ede9fe)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",boxShadow:"0 8px 32px rgba(91,110,247,0.22)"}}>
                    <CheckCircle size={32} style={{color:"#5b6ef7"}} />
                  </motion.div>
                  <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:800,color:"#1a1f4e",marginBottom:8}}>Message sent! 🎉</div>
                    <div style={{fontSize:14,color:"#7a88b4"}}>Thanks — I'll reply within 24 hours.</div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{display:"flex",flexDirection:"column",gap:18}}>
                  {/* Name + Email: 2-col on tablet+, stacked on mobile */}
                  <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
                    <FloatField label="Your Name"     delay={0.28} inView={inView} />
                    <FloatField label="Email Address" delay={0.33} inView={inView} type="email" />
                  </div>
                  <FloatField label="Subject"      delay={0.37} inView={inView} />
                  <FloatField label="Your Message" delay={0.41} inView={inView} textarea />

                  <motion.div initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.47}}>
                    <motion.button ref={btnRef} onClick={handleSend}
                      whileHover={{scale:1.04,boxShadow:"0 16px 44px rgba(91,110,247,0.46)"}}
                      whileTap={{scale:0.95}}
                      style={{display:"inline-flex",alignItems:"center",gap:10,padding:"13px 28px",borderRadius:100,
                        background:"linear-gradient(135deg,#3a52d9,#5b6ef7)",color:"white",
                        fontSize: isMobile ? 13.5 : 14, fontWeight:700,
                        fontFamily:"'Bricolage Grotesque',sans-serif",border:"none",cursor:"pointer",
                        boxShadow:"0 8px 28px rgba(91,110,247,0.3),inset 0 1px 0 rgba(255,255,255,0.2)",
                        width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start" }}>
                      Send Message
                      <motion.span animate={{x:[0,4,0],rotate:[0,12,0]}} transition={{duration:1.6,repeat:Infinity,ease:"easeInOut"}}>
                        <Send size={15} />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div style={{
          background: "linear-gradient(155deg,#f5f6ff 0%,#eceeff 100%)",
          borderLeft: isDesktop ? "1px solid rgba(91,110,247,0.08)" : "none",
          borderTop: isDesktop ? "none" : "1px solid rgba(91,110,247,0.1)",
          padding: rightPad,
          display: "flex", flexDirection: "column", gap: 16,
          borderRadius: isDesktop ? `0 ${cardRadius}px ${cardRadius}px 0` : `0 0 ${cardRadius}px ${cardRadius}px`,
          overflow: "hidden",
        }}>

          {/* Envelope illustration — hidden on mobile to save space, shown on tablet+ */}
          {!isMobile && (
            <div
              onMouseEnter={() => setImgHov(true)}
              onMouseLeave={() => setImgHov(false)}
              style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center",
                height: isTablet ? 160 : 195, cursor:"pointer" }}
            >
              <motion.div
                animate={{ scale: imgHov ? 1.3 : 1, opacity: imgHov ? 0.85 : 0.55 }}
                transition={{ duration:0.4 }}
                style={{ position:"absolute", width:140, height:140, borderRadius:"50%",
                  background:"radial-gradient(circle,rgba(195,202,255,0.7) 0%,transparent 72%)" }}
              />
              {[
                {top:"5%", left:"10%",  s:9, c:"#f472b6",dl:0  },
                {top:"3%", right:"12%", s:7, c:"#fbbf24",dl:0.5 },
                {top:"52%",left:"3%",   s:6, c:"#818cf8",dl:0.9 },
                {bottom:"8%", right:"6%",s:8,c:"#34d399",dl:0.3 },
                {top:"28%",right:"4%",  s:5, c:"#60a5fa",dl:1.1 },
              ].map((d,i) => (
                <motion.div key={i}
                  animate={{ y: imgHov ? [0,-14,0] : [0,-6,0], scale: imgHov ? [1,1.5,1] : [1,1.15,1] }}
                  transition={{ duration: imgHov ? 1.2+i*0.15 : 2.4+i*0.3, repeat:Infinity, ease:"easeInOut", delay:d.dl }}
                  style={{ position:"absolute", ...(d as any), width:d.s, height:d.s, borderRadius:"50%", background:d.c, zIndex:2 }}
                />
              ))}
              <motion.div
                animate={{ y: [0,-10,0], scale: imgHov ? 1.18 : 1 }}
                transition={{ y:{duration:4,repeat:Infinity,ease:"easeInOut"}, scale:{duration:0.35,ease:[0.16,1,0.3,1]} }}
                style={{ position:"relative", zIndex:3 }}
              >
                <img src="/images/hd_envelope_icon.png" alt="Contact Uchit Vyas"
                  style={{ width: imgHov ? 175 : 155, height: "auto", objectFit:"contain",
                    filter: imgHov ? "drop-shadow(0 22px 48px rgba(91,110,247,0.42))" : "drop-shadow(0 12px 28px rgba(91,110,247,0.2))",
                    display:"block", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}
                />
              </motion.div>
            </div>
          )}

          {/* On mobile: compact header instead of envelope */}
          {isMobile && (
            <motion.div initial={{opacity:0,y:10}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.3}}>
              <div style={{ fontSize:13, fontWeight:600, color:"#5b6ef7",
                fontFamily:"'Bricolage Grotesque',sans-serif", marginBottom:4 }}>
                Connect with me
              </div>
              <p style={{ fontSize:12.5, color:"#7a88b4", margin:0, lineHeight:1.6 }}>
                Find me on any of the channels below — I'm active and responsive.
              </p>
            </motion.div>
          )}

          {/* Location + time */}
          <div style={{ display:"flex", gap:8, flexWrap: isMobile ? "wrap" : "nowrap" }}>
            {[{icon:MapPin,label:"Melbourne, VIC, AU"},{icon:Clock,label:"Mon–Fri · 9AM–6PM AEST"}].map((row,i) => {
              const Icon = row.icon;
              return (
                <motion.div key={i}
                  initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.44+i*0.07}}
                  whileHover={{y:-3,boxShadow:"0 8px 24px rgba(91,110,247,0.14)"}}
                  style={{ flex: isMobile ? "1 1 calc(50% - 4px)" : 1,
                    display:"flex", alignItems:"center", gap:8, padding:"11px 12px",
                    borderRadius:12, background:"white", border:"1px solid rgba(91,110,247,0.12)",
                    boxShadow:"0 2px 8px rgba(91,110,247,0.07)", transition:"box-shadow 0.2s", cursor:"default",
                    minWidth: isMobile ? "calc(50% - 4px)" : 0 }}
                >
                  <motion.span animate={{rotate:[0,12,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut",delay:i*1.8}}>
                    <Icon size={14} style={{color:"#5b6ef7"}} />
                  </motion.span>
                  <span style={{fontSize:11, color:"#4a5080", fontWeight:500, lineHeight:1.4}}>{row.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Social cards */}
          <div style={{ display:"grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 8 : 10 }}>
            {socials.map((s,i) => (
              <ContactCard key={s.label} {...s} delay={0.5+i*0.07} inView={inView} compact={isMobile} />
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}