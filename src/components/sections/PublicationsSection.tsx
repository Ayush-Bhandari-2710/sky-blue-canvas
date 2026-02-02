import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, BookOpen } from "lucide-react";

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

type Publication = (typeof publications)[number];

const PublicationCard = ({ publication }: { publication: Publication }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="flex-shrink-0 w-96 bg-white rounded-3xl overflow-hidden group cursor-pointer relative"
      style={{
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Image Section or Gradient Fallback */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {publication.image && !imageError ? (
          <>
            <motion.img
              src={publication.image}
              alt={publication.title}
              className="w-full h-full object-cover"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onError={() => setImageError(true)}
            />

            {/* Image Overlay Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${publication.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
            />

            {/* Darkening overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </>
        ) : (
          <>
            {/* Fallback Gradient Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${publication.gradient}`}
              animate={
                isHovered
                  ? {
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }
                  : {}
              }
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl transform -translate-x-12 translate-y-12" />

            {/* Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <BookOpen className="w-16 h-16 text-white/40 stroke-[1.5]" />
            </motion.div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern
                  id="dots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>
          </>
        )}

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20"
          initial={false}
          animate={
            isHovered
              ? {
                  background: [
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 60%, transparent 100%)",
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 60%, transparent 100%)",
                  ],
                  backgroundPosition: ["-200% 0", "200% 0"],
                }
              : {}
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Content Container */}
      <div className="relative z-10 p-6">
        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.tag.split(" ").map((tag, index) => (
            <motion.span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(219, 234, 254, 1)" }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {publication.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {publication.description}
        </p>

        {/* Bottom Section */}
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={14} strokeWidth={2} />
          <span className="text-sm font-medium">{publication.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

const clampNegativeModulo = (value: number, modulo: number) => {
  // Keeps value in range [-modulo, 0)
  if (modulo === 0) return 0;
  let v = value % modulo;
  if (v > 0) v -= modulo;
  return v;
};

const PublicationsMarquee = ({
  speed = 40, // seconds for one full set to pass
  pauseOnHover = true,
}: {
  speed?: number;
  pauseOnHover?: boolean;
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list for seamless visual loop
  const duplicatedPublications = useMemo(() => [...publications, ...publications], []);

  // Card sizing based on your Tailwind classes
  const CARD_WIDTH = 384; // w-96
  const GAP = 24; // gap-6
  const STEP = CARD_WIDTH + GAP;

  // Distance for one full set
  const loopDistance = publications.length * STEP;

  const x = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const stop = () => {
    controlsRef.current?.stop();
    controlsRef.current = null;
  };

  const start = () => {
    if (loopDistance <= 0) return;

    stop();

    // Ensure x is always within a stable range so it never jumps
    const current = clampNegativeModulo(x.get(), loopDistance);
    x.set(current);

    // Remaining distance to reach the end of this cycle
    const remaining = Math.abs(-loopDistance - current);
    const duration = (remaining / loopDistance) * speed;

    controlsRef.current = animate(x, -loopDistance, {
      duration: Math.max(0.001, duration),
      ease: "linear",
      onComplete: () => {
        // Hard reset back to 0, then continue
        x.set(0);
        start();
      },
    });
  };

  useEffect(() => {
    // Start on mount
    start();

    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopDistance, speed]);

  useEffect(() => {
    if (pauseOnHover && isPaused) stop();
    if (pauseOnHover && !isPaused) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, pauseOnHover]);

  // Optional: allow wheel to "nudge" the marquee without restarting
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Convert vertical wheel into horizontal movement
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 0.5) return;

    e.preventDefault();

    // Pause while user interacts
    if (pauseOnHover) setIsPaused(true);

    // Move content based on wheel direction
    const next = x.get() - delta;
    x.set(clampNegativeModulo(next, loopDistance));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.span
              className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-blue-400"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Publications
            </span>
            <motion.span
              className="w-12 h-px bg-gradient-to-r from-blue-400 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-black mb-5 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
              Publications
            </span>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.h2>

          <motion.p
            className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Insights and knowledge shared across leading publications
          </motion.p>
        </motion.div>

        {/* Scrolling Marquee Container */}
        <div
          className="relative"
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Track */}
          <div
            className="overflow-hidden py-4"
            onWheel={onWheel}
            style={{ overscrollBehavior: "contain" }}
          >
            <motion.div
              className="flex gap-6"
              style={{
                x,
                width: "max-content",
                willChange: "transform",
              }}
            >
              {duplicatedPublications.map((pub, index) => (
                <PublicationCard key={`${pub.title}-${index}`} publication={pub} />
              ))}
            </motion.div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPaused ? 0 : 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Hover to pause • Scroll to explore
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 opacity-30">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 30C240 10 480 50 720 30C960 10 1200 45 1440 25V60H0V30Z"
            fill="url(#wave-gradient)"
          />
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
