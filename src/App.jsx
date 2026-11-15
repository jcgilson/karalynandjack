import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import TravelPage from "./pages/TravelPage";
import ItineraryPage from "./pages/ItineraryPage";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
