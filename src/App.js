import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Talk from "./pages/Talk";
import { useState } from "react";


export default function App() {
  /*
  Linear gradient from #590898 to #FF560E at 45 degree angle
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/share" element={<Share />} />
      <Route path="/talk" element={<Talk />} />
    </Routes>
  </BrowserRouter>
  */
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
      <div className="container">
        <div className="animation"></div>
        <div className="content">{renderPage()}</div>
      </div>
    );
  }


