import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Offerings", href: "#offerings" },
  { label: "Publications", href: "#publications" },
  { label: "Talks", href: "#talks" },
  { label: "Training", href: "#training" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-blue-50 to-blue-100/80 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">Portfolio</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Creating beautiful digital experiences that connect brands with their audience. 
              Let's build something amazing together.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-card/80 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to receive updates on new projects and articles.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-full text-sm border border-border/50 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
          >
            <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart size={14} className="text-primary fill-primary" /> using modern tech
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
