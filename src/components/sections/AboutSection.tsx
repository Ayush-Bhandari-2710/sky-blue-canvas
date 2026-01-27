import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Award, Coffee, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "30+", label: "Projects Completed" },
  { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
  { icon: Heart, value: "100%", label: "Passion" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-secondary/30 to-transparent relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get to Know Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-xl" />
            
            <div className="relative glass-card p-4 rounded-3xl">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/10 via-secondary to-primary/5 flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="About Me"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating Stats Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 glass-card px-6 py-4 rounded-2xl"
              >
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate designer and developer with over 5 years of experience 
              creating beautiful, functional digital experiences. My journey began 
              with a curiosity for how technology can solve real-world problems and 
              has evolved into a career dedicated to crafting intuitive interfaces.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe great design is invisible – it just works. My approach combines 
              aesthetic sensibility with user-centered thinking, ensuring every project 
              not only looks stunning but delivers measurable results for clients.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not designing or coding, you'll find me exploring new technologies, 
              contributing to open source, or sharing knowledge through workshops and talks.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 70 720 10 1080 40C1260 55 1380 45 1440 40V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;
