import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Cloud, ShieldCheck, PenLine } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const floatingBubbles = [
  { size: 60, x: "10%", y: "20%", delay: 0, duration: 6 },
  { size: 40, x: "85%", y: "15%", delay: 1, duration: 7 },
  { size: 80, x: "75%", y: "70%", delay: 2, duration: 8 },
  { size: 30, x: "15%", y: "75%", delay: 0.5, duration: 5 },
  { size: 50, x: "90%", y: "45%", delay: 1.5, duration: 6 },
  { size: 35, x: "5%", y: "50%", delay: 2.5, duration: 7 },
  { size: 45, x: "60%", y: "85%", delay: 0.8, duration: 8 },
  { size: 25, x: "40%", y: "10%", delay: 1.2, duration: 5 },
];

// aligned to match your screenshot style (top-left, top-right, bottom-left, bottom-right)
const badges = [
  { text: "100% Client Satisfaction", Icon: Star, pos: "top-14 left-[-28px]" },
  { text: "An Author", Icon: PenLine, pos: "top-2 right-[-10px]" },
  { text: "Cloud Fanatic", Icon: Cloud, pos: "bottom-10 left-[-44px]" },
  { text: "SRE Practitioner", Icon: ShieldCheck, pos: "bottom-14 right-[-34px]" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20"
    >
      {/* Floating Bubbles */}
      {floatingBubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/5 blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              Available for Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Hi, I'm <span className="gradient-text">Uchit Vyas</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              A passionate designer and developer crafting beautiful digital
              experiences that connect brands with their audience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                className="btn-pill-primary inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 24px -4px hsl(217 91% 60% / 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                className="btn-pill-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Avatar with Blob */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Morphing Blob Background */}
            <motion.div
              className="absolute w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 animate-blob"
              style={{
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
              animate={{
                scale: [1, 1.03, 1],
                rotate: [0, 1.5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Avatar + badges wrapper */}
            <div className="relative z-10 w-fit">
              <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-white shadow-card">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-6xl bg-gradient-to-br from-primary/20 to-primary/5">
                  YN
                </AvatarFallback>
              </Avatar>

              {/* Floating Badges */}
              {badges.map(({ text, Icon, pos }, index) => (
                <motion.div
                  key={text}
                  className={[
                    "absolute",
                    pos,
                    "glass-card px-4 py-2",
                    "flex items-center gap-2 text-sm font-medium whitespace-nowrap",
                    "rounded-full",
                    "shadow-[0_10px_30px_rgba(2,8,23,0.10)]",
                    "border border-white/40",
                  ].join(" ")}
                  initial={{ opacity: 0, scale: 0.86, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.12, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/70 border border-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-foreground/90">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50C240 80 480 20 720 50C960 80 1200 20 1440 50V100H0V50Z"
            fill="hsl(210 100% 98%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
