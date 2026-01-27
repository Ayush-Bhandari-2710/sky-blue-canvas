import { AnimatePresence, motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Globe,
  PlayCircle,
  Filter,
  Search,
  Sparkles,
  X,
} from "lucide-react";

/**
 * Global Talks v2
 * - Keeps: globe background, animated pins, talks cards, stats pill, wave separator
 * - Adds: personal intro copy, filters (year, region), search, "Recent Talks" timeline feel,
 *         expandable details modal with abstract + Watch link, richer hover micro-interactions
 */

type Talk = {
  id: string;
  monthYear: string; // "Apr 2021"
  year: number;
  city: string;
  country: string;
  region: "ASEAN" | "Europe" | "USA" | "India";
  event: string;
  title: string; // talk title
  subtitle?: string; // optional short line
  abstract: string; // long description
  watchUrl?: string; // "Watch Here" link
  audience?: string; // optional
  tags: string[];
};

const talks: Talk[] = [
  {
    id: "apidays-2021",
    monthYear: "Apr 2021",
    year: 2021,
    city: "Singapore",
    country: "Singapore",
    region: "ASEAN",
    event: "APIDays",
    title: "API Design Collaboration",
    abstract:
      "Quality assurance begins from requirements and design through delivery, avoiding delays caused by quality issues and enabling faster time-to-market. Organizations need to think about application design gaps from day 0 by establishing the same framework, methodology, templates, and process across the enterprise ecosystem.",
    watchUrl: "#",
    audience: "",
    tags: ["API Design", "Quality", "Process"],
  },
  {
    id: "cloud-expo-asia-2017",
    monthYear: "Oct 2017",
    year: 2017,
    city: "Singapore",
    country: "Singapore",
    region: "ASEAN",
    event: "Cloud Expo Asia",
    title: "The Journey to DevSecOps",
    abstract:
      "Everyone wants to deploy apps and infrastructure faster, without disputes. An agile framework helps ship in real time, but continuous innovation can conflict with stability and security. Without security at every stage, DevSecOps just introduces vulnerabilities faster. To resolve this conflict, eliminate gaps in recursive feedback loops. Teams often struggle to collaborate smoothly, producing gaps in development and quality, slowing delivery and increasing security risk. These shortcomings can be addressed by adopting a rugged DevSecOps model and strengthening collaboration across the lifecycle.",
    watchUrl: "#",
    tags: ["DevSecOps", "Security", "Feedback loops"],
  },
  {
    id: "topconf-2016",
    monthYear: "Nov 2016",
    year: 2016,
    city: "Estonia",
    country: "Estonia",
    region: "Europe",
    event: "TopConf 2016",
    title: "Let’s Democratize Deployments",
    abstract:
      "Expectations from development and operations groups are measured against time-to-market as a key KPI for competitiveness. Teams are expected to release quickly with high quality, reliability, and repeatability at any scale. The Platform is a deployment automation platform to deploy and configure simple to complex environments reliably and repeatedly at the click of a button. Installations taking weeks can happen in minutes, enabling high-speed deployment automation.",
    watchUrl: "#",
    tags: ["Automation", "Deployments", "Reliability"],
  },
  {
    id: "pstc-2016",
    monthYear: "Nov 2016",
    year: 2016,
    city: "Pune",
    country: "India",
    region: "India",
    event: "PSTC 2016",
    title: "Transforming Test Execution and Analysis Speed by 100x!",
    abstract:
      "A transformational QA platform that helps embrace DevSecOps best practices for continuous testing and delivery. It integrates QA automation with deployment automation and real-time test result analytics. It provides scalability with cross-browser testing across versions in hours. A cloud-based DevSecOps-centric automation accelerator creates dynamic infrastructure on the fly for rapid parallel functional, performance, security, and scale testing with advanced analytics to fail fast.",
    watchUrl: "#",
    tags: ["QA", "Continuous Testing", "Analytics"],
  },
  {
    id: "devsecops-summit-2016",
    monthYear: "Sept 2016",
    year: 2016,
    city: "Pune",
    country: "India",
    region: "India",
    event: "DevSecOps Summit",
    title: "Automate your Infrastructure with Chef",
    abstract:
      "A platform to converge and showcase capabilities and products in IT automation, helping managers and engineers exchange, engage, and explore opportunities. Chef automates application configuration, deployment, and management across networks of any size, whether cloud, on-premises, or hybrid. Chef supports infrastructure management and solves complex operational problems.",
    watchUrl: "#",
    tags: ["Chef", "IaC", "Automation"],
  },
  {
    id: "it-automation-summit-2016",
    monthYear: "Apr 2016",
    year: 2016,
    city: "Bangalore",
    country: "India",
    region: "India",
    event: "IT Automation Summit",
    title: "Scaling with Automation",
    abstract:
      "A company with tens of customers expected hundreds within months after investor interest. Scaling infrastructure was the unknown. We introduced Terraform for infrastructure creation, Chef for OS hardening, and Packer for AWS and vSphere support. Later, we added Serf to trigger chef-clients quickly and Consul for service monitoring, improving responsiveness and operational visibility.",
    watchUrl: "#",
    tags: ["Terraform", "Chef", "Scaling"],
  },
  {
    id: "cmc-2016",
    monthYear: "Feb 2016",
    year: 2016,
    city: "Belgium",
    country: "Belgium",
    region: "Europe",
    event: "Config Management Camp",
    title: "Rapid Infrastructure Provisioning",
    abstract:
      "A Fortune 500 company scaled rollouts across data centers with an automation framework. We introduced Chef provisioning for VM provisioning, capacity management, network management components, event-driven workflows, OS hardening, and Packer for in-house cloud support. Later, we added service discovery, monitoring, and real analytics across isolated data centers.",
    watchUrl: "#",
    tags: ["Provisioning", "Monitoring", "Automation"],
  },
  {
    id: "hashiconf-2015",
    monthYear: "Sept 2015",
    year: 2015,
    city: "Portland",
    country: "USA",
    region: "USA",
    event: "Hashiconf",
    title: "Scaling Under Pressure using Terraform, Packer and Chef",
    abstract:
      "A scaling story that started with a small customer base and grew rapidly. Infrastructure scaling was the unknown. We introduced Terraform for infrastructure creation, Chef for OS hardening, and Packer for AWS and vSphere support. Later, we improved response with Serf triggering and Consul monitoring. The same approach was applied to a Fortune 500 customer to replace 15-year-old scripts, including strategies for provisioning across availability zones and AWS regions.",
    watchUrl: "#",
    tags: ["Terraform", "Packer", "Chef"],
  },
];

const pins = [
  { x: "18%", y: "32%", label: "Europe" },
  { x: "78%", y: "28%", label: "Asia" },
  { x: "70%", y: "62%", label: "USA" },
  { x: "35%", y: "68%", label: "India" },
];

const pill = (active: boolean) =>
  `inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition ${
    active
      ? "bg-primary/10 border-primary/25 text-primary"
      : "bg-white/60 dark:bg-white/5 border-black/5 dark:border-white/10 text-foreground/70 hover:text-foreground"
  }`;

function formatLocation(t: Talk) {
  return `${t.city}, ${t.country}`;
}

function regionLabel(r: Talk["region"]) {
  if (r === "ASEAN") return "ASEAN";
  if (r === "Europe") return "Europe";
  if (r === "USA") return "USA";
  return "India";
}

export default function TalksSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Talk["region"] | "All">("All");
  const [year, setYear] = useState<number | "All">("All");
  const [selected, setSelected] = useState<Talk | null>(null);

  const years = useMemo(() => {
    const y = Array.from(new Set(talks.map((t) => t.year))).sort((a, b) => b - a);
    return y;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return talks
      .filter((t) => (region === "All" ? true : t.region === region))
      .filter((t) => (year === "All" ? true : t.year === year))
      .filter((t) => {
        if (!q) return true;
        const hay = `${t.event} ${t.title} ${t.city} ${t.country} ${t.region} ${t.tags.join(" ")}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.monthYear.localeCompare(a.monthYear);
      });
  }, [query, region, year]);

  const stats = useMemo(() => {
    const countries = new Set(talks.map((t) => t.country)).size;
    const events = talks.length;
    const regions = new Set(talks.map((t) => t.region)).size;
    return { countries, events, regions };
  }, []);

  return (
    <section
      id="talks"
      ref={ref}
      className="py-24 bg-gradient-to-b from-secondary/30 to-transparent relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(2,6,23,0.6)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      {/* Abstract Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Globe className="w-[620px] h-[620px] text-primary" strokeWidth={0.6} />
        </motion.div>
      </div>

      {/* Animated Pin Markers */}
      <div className="absolute inset-0 overflow-hidden">
        {pins.map((pos, index) => (
          <motion.div
            key={pos.label}
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.45 + index * 0.12, type: "spring", stiffness: 220, damping: 18 }}
          >
            <div className="relative">
              <MapPin className="w-6 h-6 text-primary" />
              <motion.div
                className="absolute -inset-3 bg-primary/20 rounded-full"
                animate={{ scale: [1, 1.6, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.25 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header + personal intro */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Speaking Engagements
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">Global Talks</h2>

          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
            Uchit has been speaking at technology conferences for a long time across ASEAN, Europe, and the USA.
            His sessions are engaging, simple, and focused on articulating the value of emerging technologies for
            consumers, developers, architects, and entrepreneurs. Keynotes consistently receive strong feedback ratings.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-5xl mx-auto mb-10"
        >
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 py-3 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
              <Search className="w-4 h-4 text-primary" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search talks, events, topics, places..."
                className="w-full md:w-[340px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground px-2">
                <Filter className="w-4 h-4 text-primary" />
                Filters
              </span>

              <button onClick={() => setRegion("All")} className={pill(region === "All")}>
                All
              </button>
              <button onClick={() => setRegion("ASEAN")} className={pill(region === "ASEAN")}>
                ASEAN
              </button>
              <button onClick={() => setRegion("Europe")} className={pill(region === "Europe")}>
                Europe
              </button>
              <button onClick={() => setRegion("USA")} className={pill(region === "USA")}>
                USA
              </button>
              <button onClick={() => setRegion("India")} className={pill(region === "India")}>
                India
              </button>

              <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1" />

              <select
                value={year}
                onChange={(e) => setYear(e.target.value === "All" ? "All" : Number(e.target.value))}
                className="rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-3 py-2 text-sm text-foreground outline-none"
              >
                <option value="All">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> of{" "}
            <span className="text-foreground font-medium">{talks.length}</span> talks
          </div>
        </motion.div>

        {/* Cards + timeline spine */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Center spine on desktop */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            <div className="grid md:grid-cols-2 gap-6 md:gap-x-12 lg:gap-x-16">
              {filtered.map((t, idx) => {
                const left = idx % 2 === 0;

                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.04 * idx }}
                    whileHover={{ y: -6 }}
                    className={[
                      "text-left relative rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md p-6",
                      "shadow-[0_10px_30px_rgba(2,6,23,0.06)] group transition",
                      "focus:outline-none focus:ring-2 focus:ring-primary/30",
                      left ? "md:pr-7" : "md:pl-7",
                    ].join(" ")}
                  >
                    {/* Connector dot to spine */}
                    <div
                      className={[
                        "hidden md:block absolute top-8 w-3 h-3 rounded-full bg-primary",
                        "shadow-[0_0_0_6px_rgba(59,130,246,0.14)]",
                        left ? "right-[-7px]" : "left-[-7px]",
                      ].join(" ")}
                    />
                    <div
                      className={[
                        "hidden md:block absolute top-[34px] h-px bg-primary/25",
                        left ? "right-0 w-10" : "left-0 w-10",
                      ].join(" ")}
                    />

                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                          <Calendar className="w-4 h-4" />
                          {t.monthYear}
                          <span className="text-muted-foreground">•</span>
                          {regionLabel(t.region)}
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                          {t.event}
                        </h3>
                        <p className="text-sm text-primary font-medium mt-1">{t.title}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground">
                          <PlayCircle className="w-4 h-4 text-primary" />
                          Details
                        </span>
                        <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/15 transition">
                          <ExternalLink size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-primary" />
                        {formatLocation(t)}
                      </div>
                      {t.audience ? (
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-primary" />
                          {t.audience} attendees
                        </div>
                      ) : null}
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-primary/15 bg-white/70 dark:bg-white/5 backdrop-blur-md text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                      {t.tags.length > 4 ? (
                        <span className="text-[11px] px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 text-muted-foreground">
                          +{t.tags.length - 4}
                        </span>
                      ) : null}
                    </div>

                    {/* Bottom accent */}
                    <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary/55 via-primary/15 to-transparent" />

                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-b from-sky-400/10 via-primary/10 to-transparent blur-2xl" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No talks match your filters. Try clearing filters or changing the search.
              </div>
            ) : null}
          </div>
        </motion.div>

        {/* Stats pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-8 py-4 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
            <Globe className="w-6 h-6 text-primary" />
            <span className="text-base md:text-lg font-semibold text-foreground">{stats.countries}+ Countries</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-base md:text-lg font-semibold text-foreground">{stats.events}+ Talks</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-base md:text-lg font-semibold text-foreground">{stats.regions} Regions</span>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected ? (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
            >
              <div
                className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white dark:bg-[#0b1220] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-7 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 right-[-120px] w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl" />
                  </div>

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
                        <Calendar className="w-4 h-4" />
                        {selected.monthYear}
                        <span className="text-muted-foreground">•</span>
                        {regionLabel(selected.region)}
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-2">
                        {selected.event}
                      </h3>
                      <p className="text-sm md:text-base text-primary font-medium mt-1">{selected.title}</p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-primary" />
                          {formatLocation(selected)}
                        </div>
                        {selected.audience ? (
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-primary" />
                            {selected.audience} attendees
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="p-2 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 text-foreground/70 hover:text-foreground transition"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative mt-5">
                    <p className="text-sm md:text-[15px] leading-relaxed text-foreground/80">
                      {selected.abstract}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {selected.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-primary/15 bg-white/70 dark:bg-white/5 backdrop-blur-md text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <div className="text-xs text-muted-foreground">
                        Tip: Click outside to close. Use filters to explore by region and year.
                      </div>

                      {selected.watchUrl ? (
                        <a
                          href={selected.watchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-95 transition"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Watch Here
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 px-5 py-2.5 text-sm text-muted-foreground">
                          Video coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-[2px] w-full bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 45C240 65 480 25 720 45C960 65 1200 30 1440 50V80H0V45Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
