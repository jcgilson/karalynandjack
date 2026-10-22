import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Rsvp from "./components/Rsvp";
import Travel from "./components/Travel";
import Itinerary from "./components/Itinerary";
import Gallery from "./components/Gallery";
import Story from "./components/Story";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Menu />
      <main>
        <Hero />
        <Rsvp />
        <Travel />
        <Itinerary />
        <Gallery />
        <Story />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
