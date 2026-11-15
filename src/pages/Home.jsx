import Hero from "../components/Hero";
import Rsvp from "../components/Rsvp";
import Gallery from "../components/Gallery";
import Story from "../components/Story";
import Faq from "../components/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Rsvp />
      <Gallery />
      <Story />
      <Faq />
    </main>
  );
}
