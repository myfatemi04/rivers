import { BrowserRouter, Route, Routes } from "react-router-dom";
import River from "./components/River";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Talk from "./pages/Talk";
import { useState } from "react";

export default function App() {
    /*
    Linear gradient from #590898 to #FF560E at 45 degree angle
    */
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/share" element={<Share />} />
      <Route path="/talk" element={<Talk />} />
    </Routes>
  </BrowserRouter>
}
