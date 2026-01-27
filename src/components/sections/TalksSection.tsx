import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Users, Calendar, ExternalLink, Globe } from "lucide-react";

const talks = [
  {
    event: "React Summit",
    location: "Amsterdam, Netherlands",
    year: "2024",
    audience: "2,500+",
    topic: "Building Scalable Design Systems",
  },
  {
    event: "CSS Conf EU",
    location: "Berlin, Germany",
    year: "2024",
    audience: "1,800+",
    topic: "The Art of Micro-Animations",
  },
  {
    event: "JSConf Asia",
    location: "Singapore",
    year: "2023",
    audience: "2,000+",
    topic: "Performance at Scale",
  },
  {
    event: "SmashingConf",
    location: "New York, USA",
    year: "2023",
    audience: "1,200+",
    topic: "Future of Web Design",
  },
];

const TalksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="talks" className="py-24 bg-gradient-to-b from-secondary/30 to-transparent relative overflow-hidden">
      {/* Abstract Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <Globe className="w-[600px] h-[600px] text-primary" strokeWidth={0.5} />
        </motion.div>
      </div>

      {/* Animated Pin Markers */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { x: "20%", y: "30%" },
          { x: "75%", y: "25%" },
          { x: "60%", y: "60%" },
          { x: "35%", y: "70%" },
        ].map((pos, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <MapPin className="w-6 h-6 text-primary" />
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </div>
          </motion.div>
        ))}
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
            Speaking Engagements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            Global Talks
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Sharing knowledge and experiences at conferences around the world.
          </p>
        </motion.div>

        {/* Talks Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {talks.map((talk, index) => (
            <motion.div
              key={talk.event}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.2 }
              }}
              className="glass-card p-6 rounded-3xl group cursor-pointer glow-on-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {talk.event}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1">
                    {talk.topic}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full bg-primary/10 text-primary"
                >
                  <ExternalLink size={18} />
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  {talk.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {talk.year}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-primary" />
                  {talk.audience} attendees
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* World Map Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 glass-card px-8 py-4 rounded-full">
            <Globe className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              15+ Countries
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-lg font-semibold text-foreground">
              50+ Events
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-lg font-semibold text-foreground">
              10,000+ Attendees
            </span>
          </div>
        </motion.div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 45C240 65 480 25 720 45C960 65 1200 30 1440 50V80H0V45Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default TalksSection;
