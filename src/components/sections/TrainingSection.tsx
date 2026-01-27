import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, ArrowRight } from "lucide-react";

type TimelineItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const BOLT_D = `
  M150 40
  L115 100
  L165 150
  L120 215
  L175 275
  L110 350
  L170 420
  L120 495
  L180 565
  L130 640
  L165 700
  L140 740
`;

const timeline: TimelineItem[] = [
  {
    id: "infra-automation-devsecops",
    date: "Nov 2015",
    title: "Infrastructure Automation and DevSecOps",
    description:
      "Hands-on CI/CD tooling, rollout safety, and automation patterns for faster delivery with confidence. Includes orchestration in automation workflows and DevSecOps toolchains.",
    tags: ["CI/CD", "Automation", "Policy gates"],
  },
  {
    id: "chef",
    date: "Feb 2015",
    title: "Infrastructure Configuration with Chef",
    description:
      "Infrastructure as code foundations using reusable cookbooks, environment parity, and safe change management across dev, staging, and production.",
    tags: ["IaC", "Config mgmt", "Environments"],
  },
  {
    id: "puppet",
    date: "Jan 2014",
    title: "Automation with Puppet",
    description:
      "Policy-driven configuration using modules and manifests, with emphasis on repeatability and control across large fleets.",
    tags: ["Automation", "Policies", "Repeatability"],
  },
  {
    id: "bpmn",
    date: "Nov 2013",
    title: "Activiti BPMN",
    description:
      "Business process modeling and workflow automation using BPMN, with monitoring patterns for reliable operations.",
    tags: ["BPMN", "Workflows", "Ops"],
  },
  {
    id: "git",
    date: "Aug 2013",
    title: "Version Control System: Git",
    description:
      "Branching strategies, collaboration workflows, and release hygiene for teams shipping continuously.",
    tags: ["Git", "Branching", "Collaboration"],
  },
  {
    id: "alfresco",
    date: "Jan 2012",
    title: "Alfresco CMS",
    description:
      "Enterprise content management patterns including governance, lifecycle, and workflow-based operations.",
    tags: ["CMS", "Governance", "Content"],
  },
  {
    id: "ci",
    date: "Dec 2011",
    title: "Continuous Integration",
    description:
      "Build automation, test pipelines, and quality gates to reduce integration pain and improve release confidence.",
    tags: ["CI", "Testing", "Quality gates"],
  },
  {
    id: "cloud",
    date: "May 2011",
    title: "Cloud Computing",
    description:
      "Cloud fundamentals and scalable architecture patterns with focus on cost, reliability, and operational maturity.",
    tags: ["Cloud", "Scaling", "Reliability"],
  },
];

function TimelineCard({
  it,
  idx,
  isInViewSection,
}: {
  it: TimelineItem;
  idx: number;
  isInViewSection: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Active while the card is around the middle of the viewport
  const cardActive = useInView(cardRef, {
    margin: "-35% 0px -45% 0px",
  });

  const activeOpacity = cardActive ? 1 : 0.6;
  const nodeFill = cardActive ? 1 : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 18 }}
      animate={isInViewSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{
        duration: 0.55,
        delay: idx * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      {/* Mobile node */}
      <div className="lg:hidden absolute left-0 top-0 bottom-0 w-10 flex flex-col items-center">
        <div
          className="mt-6 h-6 w-6 rounded-full bg-white border border-primary/20"
          style={{
            boxShadow: cardActive
              ? "0 0 0 6px rgba(59,130,246,0.18), 0 0 24px rgba(34,211,238,0.22)"
              : "0 0 0 6px rgba(59,130,246,0.08)",
          }}
        >
          <div
            className="h-full w-full rounded-full bg-primary"
            style={{ transform: `scale(${nodeFill})`, opacity: nodeFill }}
          />
        </div>
      </div>

      <div className="lg:flex lg:items-start lg:gap-8">
        {/* Date badge column */}
        <div className="hidden lg:block w-28 pt-3">
          <div
            style={{ opacity: activeOpacity }}
            className="inline-flex items-center px-3 py-1 rounded-md bg-white/60 dark:bg-white/5 border border-primary/15 backdrop-blur-md text-sm text-foreground/80"
          >
            {it.date}
          </div>
        </div>

        {/* Content card */}
        <motion.div
          style={{ opacity: activeOpacity }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.18 }}
          className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-9 py-7 shadow-[0_10px_30px_rgba(2,6,23,0.06)] flex-1"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-sky-400/8 to-transparent"
            style={{ opacity: activeOpacity }}
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="lg:hidden text-xs uppercase tracking-wider text-primary font-medium mb-1">
                  {it.date}
                </div>

                <div className="inline-flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    Training milestone
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-foreground">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{it.description}</p>
              </div>

              <div className="hidden md:flex items-center gap-2 text-primary text-sm font-medium">
                Explore <ArrowRight size={16} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {it.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-primary/15 bg-white/70 dark:bg-white/5 backdrop-blur-md text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

const TrainingSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll progress for this section only (used for the bolt draw + glow)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <section id="training" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Learn With Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            Training Programs
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Hands-on training programs designed to level up your skills and accelerate your career.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative grid lg:grid-cols-[220px_1fr_220px] gap-8 lg:gap-12">
          {/* Left rail */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative h-[760px]">
                <motion.div
                  style={{ opacity: glowOpacity }}
                  className="pointer-events-none absolute -inset-10 rounded-[40px] bg-gradient-to-b from-sky-400/10 via-primary/10 to-transparent blur-2xl"
                />

                <svg
                  viewBox="0 0 220 760"
                  className="w-full h-[760px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <filter id="boltGlowLeft" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="
                          1 0 0 0 0
                          0 1 0 0 0
                          0 0 2 0 0
                          0 0 0 1 0"
                        result="boost"
                      />
                      <feMerge>
                        <feMergeNode in="boost" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="boltBloomLeft" x="-120%" y="-120%" width="320%" height="320%">
                      <feGaussianBlur stdDeviation="14" result="b" />
                      <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d={BOLT_D}
                    stroke="rgba(59,130,246,0.12)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <motion.path
                    d={BOLT_D}
                    stroke="rgba(59,130,246,0.28)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#boltBloomLeft)"
                    style={{ pathLength: pathProgress }}
                  />

                  <motion.path
                    d={BOLT_D}
                    stroke="rgba(59,130,246,0.95)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#boltGlowLeft)"
                    style={{ pathLength: pathProgress }}
                  />

                  <motion.path
                    d={BOLT_D}
                    stroke="rgba(34,211,238,0.95)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      pathLength: pathProgress,
                      opacity: useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]),
                    }}
                  />

                  <motion.path
                    d={BOLT_D}
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      pathLength: pathProgress,
                      opacity: useTransform(scrollYProgress, (v) => (v > 0.02 ? 0.35 : 0)),
                    }}
                    animate={{ opacity: [0.18, 0.42, 0.22] }}
                    transition={{ duration: 0.9, repeat: Infinity, repeatType: "mirror" }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Items (center column) */}
          <div className="space-y-6">
            {timeline.map((it, idx) => (
              <TimelineCard key={it.id} it={it} idx={idx} isInViewSection={isInView} />
            ))}
          </div>

          {/* Right rail */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative h-[760px]">
                <motion.div
                  style={{ opacity: glowOpacity }}
                  className="pointer-events-none absolute -inset-10 rounded-[40px] bg-gradient-to-b from-sky-400/10 via-primary/10 to-transparent blur-2xl"
                />

                <svg
                  viewBox="0 0 220 760"
                  className="w-full h-[760px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <filter id="boltGlowRight" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="
                          1 0 0 0 0
                          0 1 0 0 0
                          0 0 2 0 0
                          0 0 0 1 0"
                        result="boost"
                      />
                      <feMerge>
                        <feMergeNode in="boost" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="boltBloomRight" x="-120%" y="-120%" width="320%" height="320%">
                      <feGaussianBlur stdDeviation="14" result="b" />
                      <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g transform="translate(220 0) scale(-1 1)">
                    <path
                      d={BOLT_D}
                      stroke="rgba(59,130,246,0.12)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <motion.path
                      d={BOLT_D}
                      stroke="rgba(59,130,246,0.28)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#boltBloomRight)"
                      style={{ pathLength: pathProgress }}
                    />

                    <motion.path
                      d={BOLT_D}
                      stroke="rgba(59,130,246,0.95)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#boltGlowRight)"
                      style={{ pathLength: pathProgress }}
                    />

                    <motion.path
                      d={BOLT_D}
                      stroke="rgba(34,211,238,0.95)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        pathLength: pathProgress,
                        opacity: useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]),
                      }}
                    />

                    <motion.path
                      d={BOLT_D}
                      stroke="rgba(255,255,255,0.75)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        pathLength: pathProgress,
                        opacity: useTransform(scrollYProgress, (v) => (v > 0.02 ? 0.35 : 0)),
                      }}
                      animate={{ opacity: [0.18, 0.42, 0.22] }}
                      transition={{ duration: 0.9, repeat: Infinity, repeatType: "mirror" }}
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 35C180 55 360 20 540 40C720 60 900 30 1080 45C1260 60 1380 40 1440 50V80H0V35Z"
            fill="hsl(210 100% 98%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default TrainingSection;
