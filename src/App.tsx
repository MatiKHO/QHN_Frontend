import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import "leaflet/dist/leaflet.css";
import EventBot from "@/pages/eventBot";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<ProfilePage />} path="/profile" />
      <Route element={<EventBot />} path="/event-bot" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;


