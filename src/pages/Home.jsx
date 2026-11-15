import Hero from "../components/Hero";
import Rsvp from "../components/Rsvp";
import JourneyPlanner from "../components/JourneyPlanner";
import Travel from "../components/Travel";
import Itinerary from "../components/Itinerary";
import Gallery from "../components/Gallery";
import Story from "../components/Story";
import Faq from "../components/Faq";

// One page, like the Framer site: the menu links jump to these sections.
export default function Home() {
  return (
    <main>
      <Hero />
      <Rsvp />
      <JourneyPlanner />
      <Travel />
      <Itinerary />
      <Story />
      <Faq />
      <Gallery />
    </main>
  );
}
