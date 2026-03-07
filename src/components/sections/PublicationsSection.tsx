import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, BookOpen, ExternalLink, Award, FileText } from "lucide-react";

// ─── Uchit's real publications ───────────────────────────────────────────────
type PublicationType = "book" | "patent";

type Publication = {
  id: string;
  type: PublicationType;
  title: string;
  authors: string;
  publisher: string;
  date: string;
  year: number;
  coverImage: string;
  summary: string;
  tag: string;
  gradient: string;
  href: string;
};

const publications: Publication[] = [
  {
    id: "applied-openstack",
    type: "book",
    title: "Applied OpenStack Design Patterns",
    authors: "Uchit Vyas",
    publisher: "Apress",
    date: "December 2016",
    year: 2016,
    coverImage: "/images/Book/AppliedOpenStack.jpg",
    summary:
      "Learn practical and applied OpenStack cloud design solutions to gain maximum control over your infrastructure.",
    tag: "Cloud",
    gradient: "from-blue-500 to-indigo-600",
    href: "https://goo.gl/IQIgVb",
  },
  {
    id: "mastering-aws",
    type: "book",
    title: "Mastering AWS Development",
    authors: "Uchit Vyas",
    publisher: "Packt Publishing",
    date: "June 2015",
    year: 2015,
    coverImage: "/images/Book/Mastering_AWS.jpg",
    summary:
      "Develop and migrate your enterprise applications to the Amazon Web Services platform.",
    tag: "AWS",
    gradient: "from-amber-500 to-orange-600",
    href: "https://goo.gl/nNTudi",
  },
  {
    id: "aws-development-essentials",
    type: "book",
    title: "AWS Development Essentials",
    authors: "Uchit Vyas, Prabhakaran Kuppusamy",
    publisher: "Packt Publishing",
    date: "November 2014",
    year: 2014,
    coverImage: "/images/Book/AWSDevelopmentEssential.jpg",
    summary:
      "Design and build flexible, highly scalable and cost-effective applications using Amazon Web Services.",
    tag: "AWS",
    gradient: "from-orange-500 to-red-500",
    href: "https://goo.gl/807T5C",
  },
  {
    id: "dynamodb-patterns",
    type: "book",
    title: "DynamoDB Applied Design Patterns",
    authors: "Uchit Vyas, Prabhakaran Kuppusamy",
    publisher: "Packt Publishing",
    date: "September 2014",
    year: 2014,
    coverImage: "/images/Book/DynamoDB.jpg",
    summary:
      "Apply efficient DynamoDB design patterns for high performance of applications.",
    tag: "Database",
    gradient: "from-cyan-500 to-blue-600",
    href: "https://goo.gl/N8n7hQ",
  },
  {
    id: "mule-esb",
    type: "book",
    title: "Mule ESB Cookbook",
    authors: "Uchit Vyas, Zakir Laliwala, Azaz Desai, Abdul Samad",
    publisher: "Packt Publishing",
    date: "August 2013",
    year: 2013,
    coverImage: "/images/Book/MuleESB.jpg",
    summary:
      "Over 40 recipes to effectively build your enterprise solutions from the ground up using Mule ESB.",
    tag: "Integration",
    gradient: "from-violet-500 to-purple-600",
    href: "https://goo.gl/c7uwG",
  },
  {
    id: "us-patent",
    type: "patent",
    title: "US11334348B2 — United States Patent",
    authors: "Uchit Vyas, Jacky Wong",
    publisher: "USPTO",
    date: "Granted May 2022",
    year: 2022,
    coverImage: "/images/Book/US11334348B2.svg",
    summary:
      "United States patent — view full details on Google Patents for inventor list, abstract, claims, and legal status.",
    tag: "Patent",
    gradient: "from-emerald-500 to-teal-600",
    href: "https://patents.google.com/patent/US11334348B2/en",
  },
];

// ─── Stat bar items (matches screenshot) ─────────────────────────────────────
const statBarItems = [
  { value: "6", superscript: "", label: "Books & Patents" },
  { value: "3", superscript: "", label: "Major Publishers" },
  { value: "1", superscript: "x", label: "US Patent Granted" },
  { value: "Top", highlight: "50", label: "DevSecOps Globally" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const clampNegativeModulo = (value: number, modulo: number) => {
  if (modulo === 0) return 0;
  let v = value % modulo;
  if (v > 0) v -= modulo;
  return v;
};

// ─── Publication Card ─────────────────────────────────────────────────────────
const PublicationCard = ({
  publication,
  cardWidth,
}: {
  publication: Publication;
  cardWidth: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isPatent = publication.type === "patent";

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.018 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="flex-shrink-0 bg-white rounded-2xl overflow-hidden group cursor-pointer relative"
      style={{
        width: cardWidth,
        boxShadow: isHovered
          ? "0 24px 48px -8px rgba(59,130,246,0.22), 0 0 0 1px rgba(59,130,246,0.10)"
          : "0 2px 10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease",
      }}
      role="article"
      aria-label={publication.title}
    >
      {/* Banner */}
      <div
        className="relative overflow-hidden bg-slate-100"
        style={{ height: cardWidth * 0.46 }}
      >
        {!imgError ? (
          <>
            <motion.img
              src={publication.coverImage}
              alt={publication.title}
              className="w-full h-full object-cover"
              animate={isHovered ? { scale: 1.07 } : { scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              onError={() => setImgError(true)}
            />
            {/* Tinted overlay on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${publication.gradient}`}
              animate={{ opacity: isHovered ? 0.18 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </>
        ) : (
          <>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${publication.gradient}`}
            />
            {/* Subtle grid texture */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id={`dots-${publication.id}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#dots-${publication.id})`} />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-6 -translate-y-6" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-8 translate-y-8" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isHovered ? { scale: 1.12, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {isPatent
                ? <FileText className="text-white/40 stroke-[1.5]" style={{ width: cardWidth * 0.14, height: cardWidth * 0.14 }} />
                : <BookOpen className="text-white/40 stroke-[1.5]" style={{ width: cardWidth * 0.14, height: cardWidth * 0.14 }} />
              }
            </motion.div>
          </>
        )}

        {/* Publisher badge — top left */}
        <motion.div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white/90 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.32)", border: "1px solid rgba(255,255,255,0.18)" }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {publication.publisher}
        </motion.div>
      </div>

      {/* Blue shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.06) 50%, transparent 60%)",
        }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 p-4">
        {/* Tag */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            {publication.tag}
          </span>
          {isPatent && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
              US Patent
            </span>
          )}
        </div>

        {/* Title */}
        <motion.h3
          className="font-bold text-slate-900 mb-1.5 line-clamp-2 leading-snug"
          animate={{ color: isHovered ? "#1d4ed8" : "#0f172a" }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: Math.max(13, cardWidth * 0.046) }}
        >
          {publication.title}
        </motion.h3>

        {/* Authors */}
        <p className="text-slate-400 mb-2 text-[10px] font-medium truncate">
          {publication.authors}
        </p>

        {/* Description */}
        <p
          className="text-slate-500 mb-3 line-clamp-2 leading-relaxed"
          style={{ fontSize: Math.max(11, cardWidth * 0.037) }}
        >
          {publication.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <motion.a
            href={publication.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={10} strokeWidth={2.2} />
            {isPatent ? "View Patent" : "View Book"}
          </motion.a>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar size={11} strokeWidth={2} />
            <span className="text-[11px] font-medium">{publication.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Eased counter with overshoot ────────────────────────────────────────────
function AnimatedNumber({ value, inView, delay = 0 }: { value: number; inView: boolean; delay?: number }) {
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let startTime: number | null = null;
      const duration = 1600;
      const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = Math.min((now - startTime) / duration, 1);
        setDisplay(Math.round(easeOutExpo(elapsed) * value));
        if (elapsed < 1) requestAnimationFrame(tick);
        else { setDisplay(value); setDone(true); }
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, value, delay]);
  return <>{display}</>;
}

// ─── Individual stat card ─────────────────────────────────────────────────────
function StatCard({
  item, index, inView,
}: {
  item: typeof statBarItems[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const configs = [
    { accent: "#3b82f6", glow: "rgba(59,130,246,0.25)", icon: "📚" },
    { accent: "#818cf8", glow: "rgba(129,140,248,0.22)", icon: "🏢" },
    { accent: "#38bdf8", glow: "rgba(56,189,248,0.22)", icon: "⚖️" },
    { accent: "#34d399", glow: "rgba(52,211,153,0.22)", icon: "🏆" },
  ];
  const cfg = configs[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.18 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        flex: "1 1 0",
        minWidth: 0,
        padding: "clamp(14px, 2vw, 22px) clamp(10px, 1.5vw, 18px)",
        borderRadius: 16,
        background: hovered
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.72)",
        border: `1px solid ${hovered ? cfg.accent + "44" : "rgba(99,130,255,0.12)"}`,
        backdropFilter: "blur(20px)",
        boxShadow: hovered
          ? `0 20px 48px ${cfg.glow}, 0 0 0 1px ${cfg.accent}22, inset 0 1px 0 rgba(255,255,255,0.9)`
          : "0 4px 24px rgba(60,80,180,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Corner glow on hover */}
      <motion.div
        style={{
          position: "absolute", top: -20, right: -20,
          width: 80, height: 80, borderRadius: "50%",
          background: `radial-gradient(circle, ${cfg.accent}30 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.4 : 0.8 }}
        transition={{ duration: 0.35 }}
      />

      {/* Accent top bar */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
          borderRadius: "0 0 4px 4px",
          background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)`,
          pointerEvents: "none",
        }}
        animate={{ opacity: hovered ? 1 : 0.5, scaleX: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Emoji icon — floats up on hover */}
      <motion.div
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1, marginBottom: 8, filter: "saturate(1.2)" }}
        animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {cfg.icon}
      </motion.div>

      {/* Value — big animated number */}
      <div style={{ lineHeight: 1, marginBottom: 6 }}>
        {"highlight" in item ? (
          // Top 50
          <div style={{ display: "flex", alignItems: "baseline", gap: 3, justifyContent: "center" }}>
            <motion.span
              style={{
                fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900,
                letterSpacing: "-0.04em", color: "#1e293b",
                fontFamily: "'DM Serif Display', Georgia, serif",
              }}
              animate={{ color: hovered ? cfg.accent : "#1e293b" }}
              transition={{ duration: 0.25 }}
            >
              Top
            </motion.span>
            <motion.span
              style={{
                fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900,
                letterSpacing: "-0.04em",
                fontFamily: "'DM Serif Display', Georgia, serif",
                background: `linear-gradient(135deg, ${cfg.accent}, #10b981)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={inView ? { scale: [0.8, 1.12, 1] } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              50
            </motion.span>
          </div>
        ) : (
          <motion.span
            style={{
              fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 900,
              letterSpacing: "-0.05em", display: "block",
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}
            animate={{ color: hovered ? cfg.accent : "#1e293b" }}
            transition={{ duration: 0.25 }}
          >
            <AnimatedNumber value={parseInt(item.value)} inView={inView} delay={0.2 + index * 0.1} />
            {item.superscript && (
              <span style={{
                fontSize: "0.4em", fontWeight: 800, verticalAlign: "super",
                color: cfg.accent, fontFamily: "system-ui",
              }}>
                {item.superscript}
              </span>
            )}
          </motion.span>
        )}
      </div>

      {/* Animated divider line */}
      <motion.div
        style={{ height: 1, borderRadius: 4, marginBottom: 6, alignSelf: "stretch" }}
        initial={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}30, transparent)` }}
        animate={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${cfg.accent}70, transparent)`
            : `linear-gradient(90deg, transparent, ${cfg.accent}30, transparent)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Label */}
      <motion.span
        style={{
          fontSize: "clamp(8px, 0.75vw, 10px)", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          fontFamily: "system-ui",
        }}
        animate={{ color: hovered ? cfg.accent : "#94a3b8" }}
        transition={{ duration: 0.25 }}
      >
        {item.label}
      </motion.span>
    </motion.div>
  );
}

// ─── Responsive stat grid (2-col mobile → 4-col 480px+) ─────────────────────
function StatGrid({ inView }: { inView: boolean }) {
  const [cols, setCols] = useState(typeof window !== "undefined" && window.innerWidth >= 480 ? 4 : 2);
  useEffect(() => {
    const update = () => setCols(window.innerWidth >= 480 ? 4 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <div style={{
      position: "relative", zIndex: 1,
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: "clamp(8px, 1.5vw, 14px)",
    }}>
      {statBarItems.map((item, i) => (
        <StatCard key={item.label} item={item} index={i} inView={inView} />
      ))}
    </div>
  );
}

// ─── Stat Bar — premium open layout ──────────────────────────────────────────
function StatBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ position: "relative" }}>

      {/* ── Ambient blue glow behind the whole row ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: "-40px -60px",
          background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(99,130,255,0.13) 0%, rgba(56,189,248,0.07) 45%, transparent 75%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Floating particle dots ── */}
      {[
        { top: "10%",  left: "12%",  size: 4, delay: 0,   dur: 4   },
        { top: "80%",  left: "28%",  size: 3, delay: 0.8, dur: 5.5 },
        { top: "20%",  left: "68%",  size: 5, delay: 0.4, dur: 3.8 },
        { top: "70%",  left: "82%",  size: 3, delay: 1.2, dur: 4.5 },
        { top: "45%",  left: "45%",  size: 2, delay: 0.6, dur: 6   },
        { top: "15%",  left: "90%",  size: 4, delay: 1.5, dur: 4.2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", top: p.top, left: p.left,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "rgba(99,130,255,0.45)",
            pointerEvents: "none", zIndex: 0,
          }}
          animate={{ y: [-4, 4, -4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── The four stat cards — 2-col on mobile, 4-col on 480px+ ── */}
      <StatGrid inView={inView} />
    </div>
  );
}

// ─── Main Marquee Section ─────────────────────────────────────────────────────
const PublicationsMarquee = ({ pauseOnHover = true }: { pauseOnHover?: boolean }) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 400) setCardWidth(248);
      else if (vw < 640) setCardWidth(272);
      else if (vw < 768) setCardWidth(304);
      else setCardWidth(340);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const duplicated = useMemo(() => [...publications, ...publications], []);
  const GAP = 16;
  const STEP = cardWidth + GAP;
  const loopDistance = publications.length * STEP;
  const speed = cardWidth * 0.36;

  const x = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const stop = () => { controlsRef.current?.stop(); controlsRef.current = null; };
  const start = () => {
    if (loopDistance <= 0) return;
    stop();
    const current = clampNegativeModulo(x.get(), loopDistance);
    x.set(current);
    const remaining = Math.abs(-loopDistance - current);
    const duration = (remaining / loopDistance) * speed;
    controlsRef.current = animate(x, -loopDistance, {
      duration: Math.max(0.001, duration),
      ease: "linear",
      onComplete: () => { x.set(0); start(); },
    });
  };

  useEffect(() => { start(); return () => stop(); }, [loopDistance, speed]);
  useEffect(() => {
    if (pauseOnHover && isPaused) stop();
    if (pauseOnHover && !isPaused) start();
  }, [isPaused, pauseOnHover]);

  const touchStartX = useRef(0);
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 0.5) return;
    e.preventDefault();
    if (pauseOnHover) setIsPaused(true);
    x.set(clampNegativeModulo(x.get() - delta, loopDistance));
  };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; setIsPaused(true); };
  const onTouchMove = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.touches[0].clientX;
    touchStartX.current = e.touches[0].clientX;
    x.set(clampNegativeModulo(x.get() - delta, loopDistance));
  };
  const onTouchEnd = () => setIsPaused(false);

  return (
    <section id="publications" className="relative overflow-hidden" style={{ background: "#f8f9ff" }}>

      {/* ── Premium section background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Faint blueprint grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(99,130,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(99,130,255,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        {/* Radial atmosphere */}
        <motion.div
          style={{ position: "absolute", top: "-10%", right: "-5%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,130,255,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", bottom: "5%", left: "-8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", filter: "blur(50px)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" style={{ paddingTop: "clamp(48px, 7vw, 80px)" }}>

        {/* ── CENTRED PREMIUM HEADER ── */}
        <div ref={headerRef} style={{ marginBottom: "clamp(32px, 5vw, 60px)", textAlign: "center", position: "relative" }}>

          {/* ── Big ambient blue glow centred on the entire header ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "140%", height: "180%",
              background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(99,130,255,0.14) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)",
              filter: "blur(32px)", pointerEvents: "none", zIndex: 0,
            }}
          />
          {/* Secondary warm glow — bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.4 }}
            style={{
              position: "absolute", bottom: "-10%", left: "50%",
              transform: "translateX(-50%)",
              width: "80%", height: "60%",
              background: "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(129,140,248,0.1) 0%, transparent 70%)",
              filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
            }}
          />

          {/* ── Floating orbs — alive ambient ── */}
          {[
            { x: "8%",  y: "20%", w: 7,  h: 7,  c: "rgba(59,130,246,0.5)",   dur: 4.2, d: 0   },
            { x: "92%", y: "35%", w: 5,  h: 5,  c: "rgba(129,140,248,0.45)", dur: 5.8, d: 0.7 },
            { x: "15%", y: "75%", w: 4,  h: 4,  c: "rgba(56,189,248,0.4)",   dur: 3.9, d: 1.1 },
            { x: "85%", y: "70%", w: 6,  h: 6,  c: "rgba(99,130,255,0.4)",   dur: 5.1, d: 0.3 },
            { x: "50%", y: "5%",  w: 3,  h: 3,  c: "rgba(52,211,153,0.35)",  dur: 6.2, d: 1.8 },
            { x: "30%", y: "88%", w: 5,  h: 5,  c: "rgba(59,130,246,0.3)",   dur: 4.6, d: 0.9 },
            { x: "70%", y: "12%", w: 4,  h: 4,  c: "rgba(129,140,248,0.35)", dur: 5.4, d: 0.5 },
          ].map((o, i) => (
            <motion.div key={i} style={{
              position: "absolute", left: o.x, top: o.y,
              width: o.w, height: o.h, borderRadius: "50%",
              background: o.c, pointerEvents: "none", zIndex: 1,
            }}
              animate={{ y: [-6, 6, -6], x: [-3, 3, -3], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: o.dur, repeat: Infinity, delay: o.d, ease: "easeInOut" }}
            />
          ))}

          {/* ── Eyebrow pill ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 2 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px 6px 10px", borderRadius: 100,
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(99,130,255,0.2)",
              boxShadow: "0 2px 16px rgba(99,130,255,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}>
              {/* Animated pulsing dot */}
              <div style={{ position: "relative", width: 8, height: 8 }}>
                <motion.div
                  style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#3b82f6" }}
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#3b82f6" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#3b82f6" }}>
                Thought Leadership
              </span>
            </div>
          </motion.div>

          {/* ── Display heading — stacked word reveal ── */}
          <div style={{ position: "relative", zIndex: 2, marginBottom: 16 }}>
            {/* Ghost echo for depth */}
            <div style={{
              position: "absolute", inset: 0,
              fontSize: "clamp(38px, 6.5vw, 72px)", fontWeight: 900,
              letterSpacing: "-0.04em", lineHeight: 1,
              fontFamily: "'DM Serif Display', Georgia, serif",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(99,130,255,0.08)",
              userSelect: "none", pointerEvents: "none",
              transform: "translate(2px, 4px)",
            }}>
              Publications
            </div>

            {"Publications".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 32, rotateX: -40 }}
                animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.025, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(38px, 6.5vw, 72px)", fontWeight: 900,
                  letterSpacing: "-0.03em", lineHeight: 1,
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  background: "linear-gradient(160deg, #0f172a 0%, #1e40af 45%, #1e3a8a 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* ── Animated divider ── */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 20, position: "relative", zIndex: 2 }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 1.5, width: 56, transformOrigin: "right", background: "linear-gradient(90deg, transparent, #6366f1)" }}
            />
            <motion.div
              initial={{ scale: 0, rotate: 45 }} animate={headerInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 5, height: 5, borderRadius: 1.5, background: "linear-gradient(135deg, #3b82f6, #6366f1)", flexShrink: 0 }}
            />
            <motion.div
              initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 1.5, width: 56, transformOrigin: "left", background: "linear-gradient(90deg, #6366f1, transparent)" }}
            />
          </div>

          {/* ── Body copy — centred, constrained ── */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.65 }}
            style={{
              fontSize: "clamp(13.5px, 1.2vw, 15.5px)", lineHeight: 1.75,
              color: "#475569", fontWeight: 400, margin: "0 auto 24px",
              maxWidth: 520, position: "relative", zIndex: 2,
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            Six published works spanning{" "}
            <strong style={{ color: "#1e40af", fontWeight: 600 }}>Cloud Architecture</strong>,{" "}
            <strong style={{ color: "#1e40af", fontWeight: 600 }}>Data Engineering</strong>,{" "}
            <strong style={{ color: "#1e40af", fontWeight: 600 }}>DevSecOps</strong>, and{" "}
            <strong style={{ color: "#1e40af", fontWeight: 600 }}>Enterprise Integration</strong> — each a practitioner's
            blueprint, not a theory exercise. Published with Apress and Packt, read across 4 continents.
          </motion.p>

          {/* ── CTA button — centred with shimmer ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 2, marginBottom: "clamp(28px, 4vw, 48px)" }}
          >
            <motion.a
              href="https://calendly.com/uchit86/30min"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 22px", borderRadius: 100,
                background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
                color: "white", fontSize: 12.5, fontWeight: 700,
                letterSpacing: "0.01em", textDecoration: "none",
                boxShadow: "0 4px 20px rgba(16,185,129,0.28), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.18)",
                position: "relative", overflow: "hidden",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 40px rgba(16,185,129,0.48)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)",
                  pointerEvents: "none",
                }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              />
              <Award size={13} strokeWidth={2.2} style={{ flexShrink: 0, position: "relative" }} />
              <span style={{ position: "relative" }}>Discuss Your Transformation Roadmap</span>
            </motion.a>
          </motion.div>

          {/* ── Stat bar ── */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <StatBar />
          </div>
        </div>

        {/* ── Marquee ── */}
        <div
          className="relative"
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #f8f9ff, rgba(248,249,255,0.8), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #f8f9ff, rgba(248,249,255,0.8), transparent)" }} />

          <div
            className="overflow-hidden py-4"
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ overscrollBehavior: "contain" }}
          >
            <motion.div
              className="flex"
              style={{ x, gap: GAP, width: "max-content", willChange: "transform" }}
            >
              {duplicated.map((pub, index) => (
                <PublicationCard
                  key={`${pub.id}-${index}`}
                  publication={pub}
                  cardWidth={cardWidth}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPaused ? 0 : 0.5 }}
            className="text-center mt-2 sm:mt-4"
          >
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide">
              Hover to pause · Scroll or swipe to explore
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ paddingBottom: "clamp(28px, 4vw, 56px)" }} />

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20 leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 30C240 10 480 50 720 30C960 10 1200 45 1440 25V60H0V30Z" fill="url(#wave-pubs)" />
          <defs>
            <linearGradient id="wave-pubs" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default PublicationsMarquee;