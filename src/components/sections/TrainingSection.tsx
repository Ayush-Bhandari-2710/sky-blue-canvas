import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Users, Video, ArrowRight, Zap, BookOpen, Code } from "lucide-react";

const trainings = [
  {
    icon: Code,
    title: "React Masterclass",
    description: "Comprehensive React training covering hooks, state management, and advanced patterns.",
    duration: "8 Weeks",
    format: "Live Online",
    students: "500+",
    color: "from-blue-500 to-primary",
  },
  {
    icon: BookOpen,
    title: "Design Systems Workshop",
    description: "Learn to build scalable design systems that unify design and development teams.",
    duration: "4 Weeks",
    format: "Hybrid",
    students: "300+",
    color: "from-primary to-blue-400",
  },
  {
    icon: Zap,
    title: "Performance Bootcamp",
    description: "Intensive training on web performance optimization and best practices.",
    duration: "2 Weeks",
    format: "In-Person",
    students: "200+",
    color: "from-blue-400 to-blue-600",
  },
];

const TrainingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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

        {/* Training Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {trainings.map((training, index) => (
            <motion.div
              key={training.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.2 }
              }}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer glow-on-hover"
            >
              {/* Header with gradient */}
              <div className={`p-6 bg-gradient-to-br ${training.color}`}>
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <training.icon className="w-7 h-7 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {training.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                  {training.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                    <Clock size={12} />
                    {training.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                    <Video size={12} />
                    {training.format}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                    <Users size={12} />
                    {training.students} trained
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-pill-primary flex items-center justify-center gap-2"
                >
                  Enroll Now
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 35C180 55 360 20 540 40C720 60 900 30 1080 45C1260 60 1380 40 1440 50V80H0V35Z" fill="hsl(210 100% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default TrainingSection;
