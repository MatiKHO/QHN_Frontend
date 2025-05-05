import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ClubPage from "@/pages/club";
import "leaflet/dist/leaflet.css";
import EventBot from "@/pages/eventBot";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<EventBot />} path="/event-bot" />
      <Route element={<ClubPage />} path="/club" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;


