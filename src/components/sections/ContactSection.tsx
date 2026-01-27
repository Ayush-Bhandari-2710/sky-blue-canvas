import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Send, MapPin, Clock, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formFields = [
    { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary/30 to-transparent relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 gradient-text">
            Contact Me
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>

            <form className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="rounded-xl border-border/50 bg-secondary/30 focus:bg-white transition-colors"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="rounded-xl border-border/50 bg-secondary/30 focus:bg-white transition-colors resize-none"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full btn-pill-primary flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          {/* Meet Me Card */}
          <motion.div
            id="meet"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 rounded-3xl flex flex-col"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Meet Me
            </h3>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex-1 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary to-primary/5 min-h-[200px] flex items-center justify-center mb-6 relative overflow-hidden"
            >
              {/* Abstract map representation */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full" />
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary/50 rounded-full animate-pulse" />
                
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 border-t border-primary"
                      style={{ top: `${(i + 1) * 20}%` }}
                    />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 border-l border-primary"
                      style={{ left: `${(i + 1) * 20}%` }}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 p-4 bg-white rounded-full shadow-lg"
              >
                <MapPin className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Availability</p>
                  <p className="text-sm text-muted-foreground">Mon - Fri, 9AM - 6PM PST</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  href="mailto:hello@example.com"
                  className="flex items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Email</span>
                </motion.a>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.85 }}
                  whileHover={{ scale: 1.02 }}
                  href="tel:+1234567890"
                  className="flex items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Call</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30C360 50 720 10 1080 30C1260 40 1380 35 1440 30V60H0V30Z" fill="hsl(217 91% 95%)" />
        </svg>
      </div>
    </section>
  );
};

export default ContactSection;
