import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Faq from "./_components/Faq";
import Hero from "./_components/Hero";
import Offer from "./_components/Offer";
import Problem from "./_components/Problem";
import Proof from "./_components/Proof";
import Solution from "./_components/Solution";
import Testimonials from "./_components/Testimonials";

export default function Home() {
  return (
    <>
      <ScrollProgress className="bg-marca" />
      <Hero />
      <Proof />
      <Problem />
      <Solution />
      <Testimonials />
      <Faq />
      <Offer />
      <Footer />
    </>
  );
}
