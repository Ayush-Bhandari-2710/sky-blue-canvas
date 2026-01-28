import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Boxes,
  Activity,
  Cloud,
  Cog,
  Container,
  CheckCircle2,
  BarChart3,
  Wrench,
  ServerCog,
  Package,
  GitBranch,
  Eye,
  Link2,
  Layers,
  KeyRound,
  Ticket,
  Network,
  Globe,
  Database,
  X,
  ExternalLink,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  heroImageSrc?: string;
  expertiseBgSrc?: string; // your blue bg image without text
};

const expertise = [
  { name: "Hybrid Cloud", value: 80, icon: Cloud },
  { name: "DevSecOps", value: 80, icon: ShieldCheck },
  { name: "SRE", value: 60, icon: Activity },
  { name: "Container Orchestration", value: 70, icon: Boxes },
  { name: "Infrastructure Automation", value: 80, icon: Cog },
  { name: "Containers", value: 70, icon: Container },
  { name: "Quality Engineering", value: 60, icon: CheckCircle2 },
  { name: "Analytics", value: 60, icon: BarChart3 },
];

const additionalGroups = [
  {
    title: "Infrastructure Automation",
    icon: Wrench,
    items: [
      "Chef",
      "Puppet",
      "CFEngine",
      "Cloudify",
      "Salt",
      "Ansible",
      "Fabric",
      "Func",
      "Rundeck",
      "Capistrano",
      "ControlTier",
      "Juju",
    ],
  },
  {
    title: "CI Engines",
    icon: ServerCog,
    items: ["Jenkins", "Hudson", "Bamboo", "Travis", "Cruise-control", "Atlas", "GO-CD"],
  },
  {
    title: "Provisioning",
    icon: Package,
    items: ["Crowbar", "Razor", "Cobbler", "Kickstart", "Terraform"],
  },
  {
    title: "Source Code Management",
    icon: GitBranch,
    items: ["Git", "Gerrit", "Gitlab", "BitBucket/Stash", "Subversion", "Perforce"],
  },
  {
    title: "Monitoring",
    icon: Eye,
    items: ["Prometheus", "Nagios", "Hyperic", "Zabbix", "Cacti"],
  },
  {
    title: "Libraries, Connectors and Tools",
    icon: Link2,
    items: ["fog", "jcloud", "libcloud"],
  },
  {
    title: "Deployment and Management Tools",
    icon: Layers,
    items: ["Vagrant", "Rightscale", "Scalr", "Enstratius", "Otto", "XLdeploy"],
  },
  {
    title: "Packaging Systems",
    icon: Package,
    items: ["DEB", "RPM", "YUM", "ISO"],
  },
  {
    title: "Identity Management",
    icon: KeyRound,
    items: ["Vault", "Centrify"],
  },
  {
    title: "ITSM Suite",
    icon: Ticket,
    items: ["BMC Remedy", "ServiceNow"],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: ["Splunk", "ELK"],
  },
  {
    title: "Issue Tracking",
    icon: Ticket,
    items: ["Jira", "RedMine"],
  },
  {
    title: "Containers",
    icon: Container,
    items: ["LXC", "Docker", "Kubernetes", "Nomad"],
  },
  {
    title: "Service Discovery",
    icon: Network,
    items: ["Consul", "Serf"],
  },
  {
    title: "Cloud",
    icon: Globe,
    items: ["AWS", "GCP", "Azure", "Openstack", "Softlayer", "VMware"],
  },
  {
    title: "IPAM",
    icon: Database,
    items: [
      "Nipap",
      "PHPIPAM",
      "GestoIP",
      "Infoblox",
      "Solarwinds IPAM",
      "Device42",
      "FusionLayer IPAM and Discovery",
    ],
  },
  {
    title: "Blockchain",
    icon: Link2,
    items: ["Hyperledger Fabric"],
  },
  {
    title: "Quality Engineering",
    icon: CheckCircle2,
    items: [
      "RSpec",
      "Cucumber",
      "tailor",
      "foodcritic",
      "SoapUI",
      "JMeter",
      "Katalon",
      "Test-kitchen",
      "ServerSpec",
      "chef-spec",
      "Selenium",
      "Gatling",
    ],
  },
];

// per-card tint (hover + dialog)
const tints = [
  { name: "mint", soft: "rgba(196, 255, 233, 0.75)", edge: "rgba(32, 201, 151, 0.25)" },
  { name: "lavender", soft: "rgba(236, 221, 255, 0.75)", edge: "rgba(124, 58, 237, 0.22)" },
  { name: "peach", soft: "rgba(255, 227, 204, 0.75)", edge: "rgba(249, 115, 22, 0.20)" },
  { name: "butter", soft: "rgba(255, 247, 204, 0.78)", edge: "rgba(234, 179, 8, 0.22)" },
  { name: "ice", soft: "rgba(214, 244, 255, 0.75)", edge: "rgba(14, 165, 233, 0.22)" },
  { name: "rose", soft: "rgba(255, 220, 235, 0.75)", edge: "rgba(244, 63, 94, 0.22)" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function splitIntoColumns(items: string[], cols: number) {
  const out: string[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, idx) => out[idx % cols].push(item));
  return out;
}

function tintForIndex(idx: number) {
  return tints[idx % tints.length];
}

export default function ExpertiseSection({
  heroImageSrc = "/images/infra-hero.png",
  expertiseBgSrc = "/images/expertise-bg.png",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const [open, setOpen] = useState(false);
  const [activeGroupIdx, setActiveGroupIdx] = useState<number | null>(null);

  const activeGroup = useMemo(() => {
    if (activeGroupIdx === null) return null;
    return additionalGroups[activeGroupIdx] ?? null;
  }, [activeGroupIdx]);

  const activeColumns = useMemo(() => {
    if (!activeGroup) return [];
    return splitIntoColumns(activeGroup.items, 2);
  }, [activeGroup]);

  const activeTint = useMemo(() => {
    if (activeGroupIdx === null) return null;
    return tintForIndex(activeGroupIdx);
  }, [activeGroupIdx]);

  return (
    <section id="expertise" className="relative py-24">
      {/* soft background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 right-[-120px] h-[520px] w-[520px] rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* section label + title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-primary font-medium text-sm uppercase tracking-wider">
            What I Do Best
          </div>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold gradient-text">
            Technical Expertise
          </h2>
        </motion.div>

        {/* HERO (unchanged, as you said it is good) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="glass-card rounded-3xl p-6 md:p-8"
        >
          <div className="grid gap-8 items-center md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="text-muted-foreground leading-relaxed">
                Navigating complex IT infrastructures with advanced automation and
                containerization to ensure optimal performance, scalability, and
                reliability.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: "Hybrid Cloud", icon: Cloud },
                  { label: "DevSecOps Pipelines", icon: ShieldCheck },
                  { label: "Infrastructure Automation", icon: Boxes },
                  { label: "Quality Engineering", icon: Activity },
                ].map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    <t.icon className="h-3.5 w-3.5 text-primary" />
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-blue-500 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition"
                      type="button"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </DialogTrigger>

                  <DialogContent
                    className="
                      max-w-2xl
                      rounded-3xl
                      border border-white/10
                      bg-slate-950/95
                      text-white
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >
                    <DialogHeader>
                      <DialogTitle className="text-xl md:text-2xl font-semibold">
                        Deep infrastructure work, done cleanly
                      </DialogTitle>
                    </DialogHeader>

                    <div className="mt-2 space-y-4 text-sm md:text-base text-white/80">
                      <p>
                        Recent trends in huge, complex IT infrastructures with automation
                        and containerization have resulted in new requirements for
                        techniques and tools integrated at every layer. Much of my work
                        centers on capturing performance and elasticity criteria during
                        physical and virtual layout phases of infrastructure and data
                        pipeline engineering.
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          {
                            title: "Reliability outcomes",
                            desc: "99.9999% availability and durability algorithms for complex rollout and automation problems.",
                          },
                          {
                            title: "Platform engineering",
                            desc: "DevSecOps pipelines, microservices scalability, and full deployment control.",
                          },
                          {
                            title: "Performance focus",
                            desc: "Minimum-cost calculation, low-latency networks, and elasticity-driven infrastructure design.",
                          },
                          {
                            title: "Quality and observability",
                            desc: "Quality Engineering practices with strong monitoring and analytics foundations.",
                          },
                        ].map((c) => (
                          <div
                            key={c.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4"
                          >
                            <div className="font-semibold text-white">{c.title}</div>
                            <div className="mt-1 text-white/70 text-sm">{c.desc}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {["Hybrid Cloud", "DevSecOps", "SRE", "Kubernetes", "Terraform", "Observability"].map(
                          (tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative w-full">
                <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-r from-primary/10 to-blue-400/10 blur-2xl" />
                <div className="relative rounded-3xl border border-primary/10 bg-white/40 p-3 md:p-4">
                  <img
                    src={heroImageSrc}
                    alt="Infrastructure illustration"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          {/* LEFT: Expertise - blue background panel (no black) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-primary/10 shadow-[0_16px_70px_rgba(2,8,23,0.14)]">
              <img
                src={expertiseBgSrc}
                alt="Expertise background"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />

              {/* Keep it readable but NOT black: blue glass overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(2,18,40,0.40),rgba(2,18,40,0.32))]" />
              <div className="absolute inset-0 backdrop-blur-[0px]" />

              <div className="relative p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-black">
                    <div className="text-lg font-semibold">My Expertise</div>
                    <div className="text-xs text-black/70">Core capabilities and depth</div>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/75">
                    {expertise.length} areas
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {expertise.map((s, i) => {
                    const Icon = s.icon;
                    const pct = clamp(s.value, 0, 100);

                    return (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.18 + i * 0.06 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/10 flex items-center justify-center">
                              <Icon className="h-4.5 w-4.5 text-cyan-200/90" />
                            </div>
                            <div className="text-sm font-medium text-white/90">{s.name}</div>
                          </div>
                          <div className="text-sm font-semibold text-white/85">{pct}%</div>
                        </div>

                        <div className="mt-3 h-2 rounded-full bg-white/15 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${pct}%` } : {}}
                            transition={{
                              duration: 0.9,
                              delay: 0.22 + i * 0.05,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300/90 via-sky-300/90 to-blue-400/90"
                          />
                        </div>

                        <div className="mt-3 h-px bg-white/10" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Additional Skills - clean cards + tint-hover + colored dialog */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="lg:col-span-7"
          >
            <div className="mb-4 flex items-center justify-center lg:justify-start">
              <div className="glass-card px-6 py-3 rounded-full">
                <span className="text-base font-semibold text-foreground">Additional Skills</span>
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-white/45 backdrop-blur-xl p-4 md:p-6 shadow-[0_14px_60px_rgba(2,8,23,0.10)]">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {additionalGroups.map((g, idx) => {
                  const tint = tintForIndex(idx);

                  return (
                    <motion.button
                      key={g.title}
                      type="button"
                      onClick={() => {
                        setActiveGroupIdx(idx);
                        setOpen(true);
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.99 }}
                      className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white/70 p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/25"
                      style={{
                        // hover hint: uses shadow + subtle wash
                        boxShadow: "0 10px 30px rgba(2,8,23,0.06)",
                      }}
                    >
                      {/* tint wash */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                        style={{
                          background: `radial-gradient(800px circle at 20% 0%, ${tint.soft}, rgba(255,255,255,0) 55%)`,
                        }}
                      />

                      {/* Open button top-right */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="h-8 w-8 rounded-full border border-primary/10 bg-white/75 flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </div>

                      {/* Centered title */}
                      <div className="relative z-10 flex min-h-[88px] items-center justify-center text-center px-6">
                        <div>
                          <div className="text-sm font-semibold text-foreground leading-snug">
                            {g.title}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {g.items.length} tools
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                Click any category to open details. Hover shows a tint preview.
              </div>
            </div>

            {/* Dialog (single, content swaps) */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent
                className="max-w-3xl rounded-3xl border border-black/5 shadow-2xl backdrop-blur-xl"
                style={{
                  background:
                    activeTint
                      ? `linear-gradient(180deg, ${activeTint.soft}, rgba(255,255,255,0.86))`
                      : "linear-gradient(180deg, rgba(255,255,255,0.90), rgba(255,255,255,0.78))",
                }}
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-lg md:text-xl font-semibold text-foreground">
                        {activeGroup?.title ?? "Details"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tools and systems in this category
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="h-10 w-10 rounded-full border border-primary/10 bg-white/70 hover:bg-white/90 flex items-center justify-center transition"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {activeColumns.map((col, colIdx) => (
                    <div
                      key={colIdx}
                      className="rounded-2xl border border-primary/10 bg-white/70 p-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        {col.map((it) => (
                          <span
                            key={it}
                            className="rounded-full border border-primary/10 bg-white/80 px-3 py-1 text-xs text-foreground/80 hover:text-foreground hover:border-primary/20 transition"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-primary/10 bg-white/60 p-4">
                  <div className="text-sm font-semibold text-foreground">Quick idea</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    If you want this to feel even more premium, we can add a tiny “copy”
                    button and a search inside this dialog.
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60C180 30 360 70 540 50C720 30 900 60 1080 45C1260 30 1380 50 1440 40V80H0V60Z"
            fill="hsl(210 100% 98%)"
          />
        </svg>
      </div>
    </section>
  );
}
