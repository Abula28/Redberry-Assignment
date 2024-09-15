import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import EstatePage from "./pages/EstatePage";
import React, { useEffect } from "react";
import AddListingPage from "./pages/AddListingPage";

function App() {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement?.type === "number") {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estate/:id" element={<EstatePage />} />
          <Route path="/add-listing" element={<AddListingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
