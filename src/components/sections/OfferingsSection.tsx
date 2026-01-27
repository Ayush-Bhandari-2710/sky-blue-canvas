import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code, Megaphone, BarChart, ArrowRight } from "lucide-react";

const offerings = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning interfaces that delight users and drive engagement.",
    color: "from-blue-500 to-primary",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Building fast, responsive, and scalable web applications with modern technologies.",
    color: "from-primary to-blue-400",
  },
  {
    icon: Megaphone,
    title: "Brand Strategy",
    description: "Developing cohesive brand identities that resonate with your target audience.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: BarChart,
    title: "Digital Consulting",
    description: "Providing expert guidance on digital transformation and technology adoption.",
    color: "from-blue-600 to-primary",
  },
];

const OfferingsSection = () => {
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
    <section id="offerings" className="py-24 bg-gradient-to-b from-secondary/30 to-transparent relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            What I Offer
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your unique needs and goals.
          </p>
        </motion.div>

        {/* Offerings Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.2 }
              }}
              className="glass-card p-8 rounded-3xl group cursor-pointer glow-on-hover relative overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${offering.color} flex items-center justify-center mb-6 relative z-10`}
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <offering.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">
                {offering.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 relative z-10">
                {offering.description}
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-primary text-sm font-medium relative z-10"
              >
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 60 480 20 720 40C960 60 1200 25 1440 45V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default OfferingsSection;
