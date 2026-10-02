import { ScrollProgress } from "@/components/ui/scroll-progress";
import Hero from "./_components/Hero";
import Proof from "./_components/Proof";

export default function Home() {
  return (
    <>
      <ScrollProgress className="bg-marca" />
      <Hero />
      <Proof />
    </>
  );
}
