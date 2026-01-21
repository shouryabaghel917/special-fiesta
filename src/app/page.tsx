import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Schedule } from "@/components/schedule";
import { Gallery } from "@/components/gallery";
import { FAQ } from "@/components/faq";
import { RSVP } from "@/components/rsvp";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Schedule />
      <Gallery />
      <FAQ />
      <RSVP />
      <Footer />
    </main>
  );
}
