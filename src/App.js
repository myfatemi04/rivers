import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Talk from "./pages/Talk";

export default function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share" element={<Share />} />
        <Route path="/talk" element={<Talk />} />
      </Routes>
    </BrowserRouter>
  </div>
}
