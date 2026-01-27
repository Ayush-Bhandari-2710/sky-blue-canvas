import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const publications = [
  {
    title: "The Future of Design Systems",
    description: "Exploring how design systems are evolving to meet the demands of modern product development.",
    tags: ["Design", "Systems"],
    date: "Mar 2024",
    gradient: "from-blue-400 via-primary to-blue-600",
  },
  {
    title: "Building Accessible Web Apps",
    description: "A comprehensive guide to creating inclusive digital experiences for all users.",
    tags: ["Accessibility", "Web Dev"],
    date: "Feb 2024",
    gradient: "from-primary via-blue-500 to-blue-400",
  },
  {
    title: "React Performance Optimization",
    description: "Advanced techniques for building lightning-fast React applications at scale.",
    tags: ["React", "Performance"],
    date: "Jan 2024",
    gradient: "from-blue-500 via-blue-400 to-primary",
  },
  {
    title: "Microservices Architecture",
    description: "Best practices for designing and implementing microservices in enterprise applications.",
    tags: ["Backend", "Architecture"],
    date: "Dec 2023",
    gradient: "from-blue-600 via-primary to-blue-500",
  },
  {
    title: "AI in Modern UI Design",
    description: "How artificial intelligence is transforming the way we approach user interface design.",
    tags: ["AI", "Design"],
    date: "Nov 2023",
    gradient: "from-primary via-blue-400 to-blue-500",
  },
  {
    title: "TypeScript Best Practices",
    description: "Essential patterns and practices for writing maintainable TypeScript code.",
    tags: ["TypeScript", "Best Practices"],
    date: "Oct 2023",
    gradient: "from-blue-400 via-blue-600 to-primary",
  },
];

const PublicationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="publications" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
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
            Written Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            Publications
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Insights and knowledge shared through articles, tutorials, and research papers.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publications.map((pub, index) => (
            <motion.article
              key={pub.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.25 }
              }}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer glow-on-hover"
            >
              {/* Gradient Cover */}
              <div className={`h-32 bg-gradient-to-br ${pub.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/30" />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {pub.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {pub.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {pub.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={14} />
                    {pub.date}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="flex items-center gap-1 text-primary text-sm font-medium"
                  >
                    Read More
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50C180 20 360 60 540 40C720 20 900 55 1080 35C1260 15 1380 45 1440 35V80H0V50Z" fill="hsl(210 100% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default PublicationsSection;
