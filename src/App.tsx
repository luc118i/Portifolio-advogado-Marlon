import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

import { HeroSection } from "./pages/HeroSection";
import { AboutSection } from "./pages/AboutSection";
import { PracticeAreasSection } from "./pages/PracticeAreasSection";
import { CredentialsSection } from "./pages/CredentialsSection";
import { PublicationsSection } from "./pages/PublicationsSection";
import { ContactSection } from "./pages/ContactSection";

export default function App() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <PracticeAreasSection />
        <CredentialsSection />
        <PublicationsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
