import { BrowserRouter, Route, Routes } from "react-router-dom";
import River from "./components/River";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Talk from "./pages/Talk";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home />;
      case "Talk":
        return <Talk />;
      case "Share":
        return <Share />;
      default:
        return <Home />;
    }
  };

  return (
    <BrowserRouter>
      <div className="container">
        <div className="animation"></div>
        <div className="content">{renderPage()}</div>
      </div>
    </BrowserRouter>
  );
}