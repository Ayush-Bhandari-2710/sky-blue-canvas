import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  Search,
  Network,
  FlaskConical,
  Presentation,
  Container,
  ShieldCheck,
  Cloud,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

type Card = {
  id: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  chips: string[];
  details: string[];
};

type FocusArea = {
  id: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  stats: string[];
  backTitle: string;
  backPoints: string[];
};

const keyOfferings: Card[] = [
  {
    id: "analysis",
    icon: Search,
    title: "Analysis",
    description: "In-depth analysis of current and emerging technologies to guide confident decisions.",
    color: "from-sky-500 via-blue-500 to-indigo-500",
    chips: ["Tech radar", "Market intel", "Risk and trade-offs"],
    details: [
      "Technology landscape review with pragmatic recommendations.",
      "Architecture options with pros, cons, and operational impact.",
      "Decision support for build vs buy vs partner.",
    ],
  },
  {
    id: "enterprise-architecture",
    icon: Network,
    title: "Enterprise Architecture",
    description: "Hybrid-native application design and resilient infrastructure built for real-world scale.",
    color: "from-indigo-500 via-blue-500 to-cyan-500",
    chips: ["Hybrid-native", "Resilience", "Scalable patterns"],
    details: [
      "Reference architectures for hybrid and multi-cloud workloads.",
      "Reliability patterns: isolation, failover, and graceful degradation.",
      "Security-first designs aligned to enterprise constraints.",
    ],
  },
  {
    id: "pocs",
    icon: FlaskConical,
    title: "POCs",
    description: "Rapid proof-of-concepts for integration and customization in DevSecOps pipelines.",
    color: "from-cyan-500 via-blue-500 to-sky-500",
    chips: ["Integration", "Customization", "Pipeline-ready"],
    details: [
      "Hands-on validation of tooling, integrations, and edge cases.",
      "Clear success criteria, outcomes, and next steps.",
      "Documentation and handover for production path.",
    ],
  },
  {
    id: "workshops",
    icon: Presentation,
    title: "Workshops",
    description: "Bootcamps on enterprise architecture for business and technology decision makers.",
    color: "from-blue-600 via-indigo-500 to-violet-500",
    chips: ["Bootcamps", "Stakeholders", "Enablement"],
    details: [
      "Interactive sessions with exercises and templates.",
      "Alignment between business goals and technical execution.",
      "Action plan outcomes for teams and leadership.",
    ],
  },
];

const focusAreas: FocusArea[] = [
  {
    id: "containerization",
    icon: Container,
    title: "Containerization",
    description: "Docker, Kubernetes, CoreOS and LXD to build portable, repeatable deployments.",
    color: "from-sky-500 to-blue-600",
    stats: ["Docker", "Kubernetes", "CoreOS", "LXD"],
    backTitle: "What I deliver",
    backPoints: [
      "Container strategy aligned to environments and constraints.",
      "Kubernetes patterns for reliability, upgrades, and rollout safety.",
      "Golden paths: templates, base images, and standards for teams.",
    ],
  },
  {
    id: "devsecops",
    icon: ShieldCheck,
    title: "DevSecOps and Automation",
    description: "Build, test, deploy and roll-out end-to-end application infrastructure with confidence.",
    color: "from-blue-600 to-indigo-600",
    stats: ["CI/CD", "Policy as code", "Automation"],
    backTitle: "Typical outcomes",
    backPoints: [
      "Pipeline hardening: gates, scanning, and policy enforcement.",
      "Automation that reduces lead time without sacrificing control.",
      "Repeatable deployments with clear auditability.",
    ],
  },
  {
    id: "hybrid-iaas",
    icon: Cloud,
    title: "Hybrid IaaS",
    description: "Design and architect solutions for hybrid infrastructure across environments.",
    color: "from-indigo-600 to-violet-600",
    stats: ["Hybrid design", "Networking", "Governance"],
    backTitle: "Architecture focus",
    backPoints: [
      "Hybrid reference architecture with connectivity and identity.",
      "Governance guardrails that do not slow down delivery.",
      "Cost and reliability trade-offs documented clearly.",
    ],
  },
  {
    id: "scaling",
    icon: TrendingUp,
    title: "Infrastructure Scaling",
    description: "What to scale, when to scale and how to scale without breaking reliability.",
    color: "from-violet-600 to-blue-600",
    stats: ["Capacity", "SLOs", "Observability"],
    backTitle: "Scaling playbook",
    backPoints: [
      "Scaling signals: SLOs, saturation, and user impact metrics.",
      "Capacity and rollout strategy to avoid surprise outages.",
      "Observability patterns for fast detection and recovery.",
    ],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const OfferingsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // MULTI-OPEN Key Offerings
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  // Focus Areas expand state (each card can open independently)
  const [focusExpanded, setFocusExpanded] = useState<Record<string, boolean>>({});

  const toggleFocus = (id: string) => {
    setFocusExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Optional hook you can use later
  const allOpen = useMemo(() => openIds.size === keyOfferings.length, [openIds]);

  return (
    <section
      id="offerings"
      className="relative py-24 md:py-28 bg-gradient-to-b from-secondary/30 via-transparent to-transparent overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.22] [background:radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_70%_35%,rgba(99,102,241,0.16),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(34,211,238,0.12),transparent_42%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="container mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center mb-14 md:mb-16">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/15 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-xs uppercase tracking-wider">Key Offerings</span>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={0.08} className="text-3xl md:text-5xl font-bold mt-4 gradient-text">
            Architecture, DevSecOps, and Rapid Delivery
          </motion.h2>

          <motion.p variants={fadeUp} custom={0.16} className="text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
            By wide infrastructure experience, DevSecOps expertise, thorough understanding of cutting edge technologies,
            and market intelligence I deliver quality to customers with rapid speed.
          </motion.p>
        </motion.div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyOfferings.map((item, idx) => {
            const Icon = item.icon;
            const isOpen = openIds.has(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.18 } }}
                className={[
                  "glass-card p-8 rounded-3xl group glow-on-hover relative overflow-hidden",
                  "ring-1 ring-black/5 dark:ring-white/10",
                ].join(" ")}
              >
                {/* Hover wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 relative z-10 shadow-sm`}
                  whileHover={{ rotate: 6, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.description}</p>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-primary/15 bg-white/60 dark:bg-white/5 backdrop-blur-md text-foreground/80"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    onClick={() => toggleOpen(item.id)}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Hide details" : "View details"}
                    <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.18 }}>
                      <ArrowRight size={16} />
                    </motion.span>
                  </button>

                  {/* Details */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="mt-5"
                      >
                        <div className="h-px w-full bg-gradient-to-r from-primary/25 via-primary/10 to-transparent mb-4" />
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                          {item.details.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                              <span className="leading-relaxed">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accent line */}
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Focus Areas */}
        <div className="mt-14 md:mt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Focus Areas</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2">Cloud-first systems, programmable infrastructure</h3>
            </div>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              My passion for distributed computing, scalable architecture, and programmable infrastructure led me to cloud.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {focusAreas.map((a, idx) => {
              const Icon = a.icon;
              const isOpen = !!focusExpanded[a.id];

              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.5, delay: 0.05 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/55 dark:bg-white/5 backdrop-blur-md p-7 shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
                >
                  {/* Soft tinted background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-[0.08]`} />

                  {/* Magical burst when toggling */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="burst"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 0.9, scale: 1.25 }}
                        exit={{ opacity: 0, scale: 1.35 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 via-sky-400/10 to-transparent blur-2xl"
                      />
                    )}
                  </AnimatePresence>

                  {/* Stable layout: header / body / footer */}
                  <div className="relative grid h-[230px] grid-rows-[auto_1fr_auto]">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-sm`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <AnimatePresence mode="wait" initial={false}>
                            {!isOpen ? (
                              <motion.div
                                key="frontTitle"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <h4 className="text-lg font-semibold">{a.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{a.description}</p>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="backTitle"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <p className="text-xs uppercase tracking-wider text-primary font-medium">{a.backTitle}</p>
                                <h4 className="text-lg font-semibold mt-1">{a.title}</h4>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFocus(a.id)}
                        className="hidden sm:inline-flex items-center gap-2 text-primary text-sm font-medium hover:opacity-90"
                      >
                        {isOpen ? "Back" : "Explore"}
                        {isOpen ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                      </button>
                    </div>

                    {/* Body (locked height, scroll if longer) */}
                    <div className="mt-4 min-h-0">
                      <AnimatePresence mode="wait" initial={false}>
                        {!isOpen ? (
                          <motion.div
                            key="frontBody"
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full text-sm text-muted-foreground leading-relaxed"
                          >
                            <div className="h-px w-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent mb-4" />
                            <p className="max-w-[52ch]">{a.description}</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="backBody"
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full text-sm text-muted-foreground"
                          >
                            <div className="h-px w-full bg-gradient-to-r from-primary/25 via-primary/10 to-transparent mb-4" />
                            <div className="h-[92px] overflow-auto pr-2 space-y-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                              {a.backPoints.map((p) => (
                                <div key={p} className="flex gap-2">
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                                  <span className="leading-relaxed">{p}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Footer: pinned and stable */}
                    <div className="pt-4">
                      <motion.div
                        layout
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap gap-2"
                      >
                        {a.stats.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] px-2.5 py-1 rounded-full border border-primary/15 bg-white/60 dark:bg-white/5 backdrop-blur-md text-foreground/80"
                          >
                            {s}
                          </span>
                        ))}
                      </motion.div>

                      <div className="sm:hidden mt-4">
                        <button
                          type="button"
                          onClick={() => toggleFocus(a.id)}
                          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:opacity-90"
                        >
                          {isOpen ? "Back" : "Explore"}
                          {isOpen ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Accent line INSIDE card */}
                    <div className="pointer-events-none absolute bottom-10 left-0 h-[2px] w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 60 480 20 720 40C960 60 1200 25 1440 45V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default OfferingsSection;
