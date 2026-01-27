import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import TalksSection from "@/components/sections/TalksSection";
import TrainingSection from "@/components/sections/TrainingSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen gradient-bg"
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <OfferingsSection />
        <PublicationsSection />
        <TalksSection />
        <TrainingSection />
        <ContactSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
