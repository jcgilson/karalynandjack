import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Old page URLs now jump to their section on the single page. */}
        <Route path="/travel" element={<Navigate to="/#getting-here" replace />} />
        <Route path="/itinerary" element={<Navigate to="/#itinerary" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
