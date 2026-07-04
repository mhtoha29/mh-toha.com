import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ClientLogos from '@/components/sections/ClientLogos';
import Services from '@/components/sections/Services';
import SkillMatrix from '@/components/sections/SkillMatrix';
import SelectedWork from '@/components/sections/SelectedWork';
import Experience from '@/components/sections/Experience';
import TEXITAgency from '@/components/sections/TEXITAgency';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Marquee from '@/components/fx/Marquee';

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <ClientLogos />
        <Marquee />
        <Services />
        <SkillMatrix />
        <SelectedWork />
        <Experience />
        <TEXITAgency />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
