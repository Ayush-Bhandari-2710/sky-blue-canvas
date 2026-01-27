import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, Palette, Database, Globe, 
  Smartphone, Cloud, GitBranch, Layers 
} from "lucide-react";

const skills = [
  { name: "UI/UX Design", percentage: 95, color: "from-primary to-blue-400" },
  { name: "Frontend Development", percentage: 90, color: "from-blue-500 to-blue-300" },
  { name: "React & TypeScript", percentage: 92, color: "from-primary to-blue-400" },
  { name: "Backend Development", percentage: 78, color: "from-blue-600 to-blue-400" },
  { name: "Database Management", percentage: 85, color: "from-blue-500 to-primary" },
  { name: "Cloud Services", percentage: 80, color: "from-primary to-blue-300" },
];

const techStack = [
  { icon: Code2, name: "React", color: "text-blue-500" },
  { icon: Layers, name: "TypeScript", color: "text-blue-600" },
  { icon: Palette, name: "Tailwind", color: "text-primary" },
  { icon: Database, name: "PostgreSQL", color: "text-blue-700" },
  { icon: Globe, name: "Node.js", color: "text-blue-500" },
  { icon: Smartphone, name: "React Native", color: "text-blue-400" },
  { icon: Cloud, name: "AWS", color: "text-blue-600" },
  { icon: GitBranch, name: "Git", color: "text-primary" },
];

const AnimatedProgressBar = ({ 
  skill, 
  index, 
  isInView 
}: { 
  skill: typeof skills[0]; 
  index: number; 
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="text-sm font-semibold text-primary"
        >
          {skill.percentage}%
        </motion.span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
        />
      </div>
    </motion.div>
  );
};

const ExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
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
            What I Do Best
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            Technical Expertise
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Skills with Progress Bars */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-xl font-semibold text-foreground mb-8"
            >
              Core Skills
            </motion.h3>
            
            {skills.map((skill, index) => (
              <AnimatedProgressBar
                key={skill.name}
                skill={skill}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Tech Stack Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-xl font-semibold text-foreground mb-8"
            >
              Technology Stack
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-card p-6 flex flex-col items-center gap-3 group cursor-pointer glow-on-hover"
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <tech.icon className={`w-10 h-10 ${tech.color}`} />
                  </motion.div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Percentage Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
            >
              {[
                { label: "Problem Solving", value: "98%" },
                { label: "Team Collaboration", value: "95%" },
                { label: "Learning Agility", value: "100%" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card px-6 py-4 rounded-full flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-300 flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-bold">{badge.value}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60C180 30 360 70 540 50C720 30 900 60 1080 45C1260 30 1380 50 1440 40V80H0V60Z" fill="hsl(210 100% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default ExpertiseSection;
