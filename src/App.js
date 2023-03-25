import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Talk from "./pages/Talk";

export default function App() {
  return <div>
    <p>This text will show up on all pages.</p>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share" element={<Share />} />
        <Route path="/talk" element={<Talk />} />
      </Routes>
    </BrowserRouter>
  </div>
}
