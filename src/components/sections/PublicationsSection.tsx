import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, BookOpen, ExternalLink } from "lucide-react";

const publications = [
  {
    title: "The Future of Design Systems",
    description:
      "Exploring how design systems are evolving to meet the demands of modern product development.",
    publisher: "UX Collective",
    year: "2024",
    tag: "Design",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Building Accessible Web Applications",
    description:
      "A comprehensive guide to creating inclusive digital experiences for all users.",
    publisher: "A List Apart",
    year: "2024",
    tag: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=250&fit=crop",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    title: "React Performance at Scale",
    description:
      "Advanced techniques for building lightning-fast React applications at scale.",
    publisher: "CSS-Tricks",
    year: "2024",
    tag: "Development",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Microservices Architecture Patterns",
    description:
      "Best practices for designing and implementing microservices in enterprise applications.",
    publisher: "InfoQ",
    year: "2023",
    tag: "Backend",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    title: "AI-Driven Interface Design",
    description:
      "How artificial intelligence is transforming the way we approach user interface design.",
    publisher: "Smashing Magazine",
    year: "2023",
    tag: "AI & Design",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    gradient: "from-violet-400 to-blue-500",
  },
  {
    title: "TypeScript Best Practices Guide",
    description:
      "Essential patterns and practices for writing maintainable TypeScript code.",
    publisher: "Dev.to",
    year: "2023",
    tag: "TypeScript",
    gradient: "from-blue-400 to-blue-700",
  },
  {
    title: "Modern CSS Architecture",
    description:
      "Building scalable and maintainable CSS architectures for modern web applications.",
    publisher: "CSS Wizardry",
    year: "2023",
    tag: "CSS",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    title: "State Management in 2024",
    description:
      "Comparing modern state management solutions and choosing the right one for your project.",
    publisher: "Frontend Masters",
    year: "2024",
    tag: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    gradient: "from-blue-500 to-blue-700",
  },
];

type Publication = (typeof publications)[number] & { link?: string };

const PublicationCard = ({
  publication,
  cardWidth,
}: {
  publication: Publication;
  cardWidth: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasLink = Boolean(publication.link);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="flex-shrink-0 bg-white rounded-2xl overflow-hidden group cursor-pointer relative"
      style={{
        width: cardWidth,
        boxShadow: isHovered
          ? "0 20px 40px -10px rgba(59,130,246,0.22), 0 0 0 1px rgba(59,130,246,0.08)"
          : "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
      role="article"
      aria-label={publication.title}
    >
      {/* Image / gradient banner */}
      <div className="relative overflow-hidden bg-slate-100" style={{ height: cardWidth * 0.42 }}>
        {publication.image && !imageError ? (
          <>
            <motion.img
              src={publication.image}
              alt={publication.title}
              className="w-full h-full object-cover"
              animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              onError={() => setImageError(true)}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${publication.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          </>
        ) : (
          <>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${publication.gradient}`}
              style={{ backgroundSize: "200% 200%" }}
            />
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-6 -translate-y-6" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-8 translate-y-8" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isHovered ? { scale: 1.1, rotate: 4 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <BookOpen className="text-white/35 stroke-[1.5]" style={{ width: cardWidth * 0.13, height: cardWidth * 0.13 }} />
            </motion.div>
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id={`dots-${publication.title}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#dots-${publication.title})`} />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-transparent to-blue-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 p-4">
        {/* Tag */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {publication.tag.split(" ").map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors duration-300"
          style={{ fontSize: Math.max(13, cardWidth * 0.046) }}
        >
          {publication.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 mb-3 line-clamp-2 leading-relaxed" style={{ fontSize: Math.max(11, cardWidth * 0.038) }}>
          {publication.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <motion.a
            href={hasLink ? publication.link : "#"}
            onClick={(e) => { if (!hasLink) e.preventDefault(); }}
            target={hasLink ? "_blank" : undefined}
            rel={hasLink ? "noreferrer noopener" : undefined}
            aria-disabled={!hasLink}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border transition-all duration-200",
              hasLink
                ? "border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                : "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed",
            ].join(" ")}
            whileHover={hasLink ? { scale: 1.03 } : {}}
            whileTap={hasLink ? { scale: 0.97 } : {}}
          >
            <ExternalLink size={11} strokeWidth={2} />
            Open
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

const clampNegativeModulo = (value: number, modulo: number) => {
  if (modulo === 0) return 0;
  let v = value % modulo;
  if (v > 0) v -= modulo;
  return v;
};

const PublicationsMarquee = ({
  pauseOnHover = true,
}: {
  pauseOnHover?: boolean;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(300);

  // Responsive card width
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 400) setCardWidth(240);
      else if (vw < 640) setCardWidth(268);
      else if (vw < 768) setCardWidth(300);
      else setCardWidth(336);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const duplicatedPublications = useMemo(() => [...publications, ...publications], []);

  const GAP = 16;
  const STEP = cardWidth + GAP;
  const loopDistance = publications.length * STEP;

  // Scroll speed scales with card size so pace feels consistent
  const speed = cardWidth * 0.38;

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

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 0.5) return;
    e.preventDefault();
    if (pauseOnHover) setIsPaused(true);
    x.set(clampNegativeModulo(x.get() - delta, loopDistance));
  };

  // Touch scroll support
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.touches[0].clientX;
    touchStartX.current = e.touches[0].clientX;
    x.set(clampNegativeModulo(x.get() - delta, loopDistance));
  };
  const onTouchEnd = () => setIsPaused(false);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-16 w-72 h-72 sm:w-96 sm:h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-16 w-64 h-64 sm:w-80 sm:h-80 bg-blue-50/60 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 relative inline-block px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
              Written Works
            </span>
            <motion.div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>

          <motion.p
            className="text-slate-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed mt-2 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A selection of writing and published work
          </motion.p>
        </motion.div>

        {/* Marquee */}
        <div
          className="relative"
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div
            className="overflow-hidden py-3 sm:py-4"
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ overscrollBehavior: "contain" }}
          >
            <motion.div
              className="flex"
              style={{
                x,
                gap: GAP,
                width: "max-content",
                willChange: "transform",
              }}
            >
              {duplicatedPublications.map((pub, index) => (
                <PublicationCard
                  key={`${pub.title}-${index}`}
                  publication={pub}
                  cardWidth={cardWidth}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPaused ? 0 : 0.5 }}
            className="text-center mt-3 sm:mt-5"
          >
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide">
              Hover to pause · Scroll or swipe to explore
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 opacity-30 leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 30C240 10 480 50 720 30C960 10 1200 45 1440 25V60H0V30Z" fill="url(#wave-gradient)" />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="50%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default PublicationsMarquee;