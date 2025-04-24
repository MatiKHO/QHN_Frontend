import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import ClubPage from "@/pages/club";
import TicketsPage from "@/pages/tickets";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<ClubPage />} path="/club" />
      <Route element={<TicketsPage />} path="/tickets" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
