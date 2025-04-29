import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import EventsPage from "@/pages/events";
import CategoriesPage from "@/pages/categories";
import ClubPage from "@/pages/club";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<EventsPage />} path="/eventos" />
      <Route element={<CategoriesPage />} path="/categorias" />
      <Route element={<ClubPage />} path="/club" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
