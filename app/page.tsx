import { DemoProvider } from "@/components/demo-modal";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem, Solution } from "@/components/problem-solution";
import { Features } from "@/components/features";
import { AISection, DashboardShowcase } from "@/components/showcase-ai";
import { BeforeAfter, Workflow } from "@/components/workflow-stats";
import { FAQ, Pricing, Testimonials } from "@/components/social";
import { Contact, Footer, StickyCTA } from "@/components/contact-footer";

export default function Home() {
  return (
    <DemoProvider>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <DashboardShowcase />
        <AISection />
        <Workflow />
        <BeforeAfter />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </DemoProvider>
  );
}
