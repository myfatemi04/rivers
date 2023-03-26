import { BrowserRouter, Route, Routes } from "react-router-dom";
import River from "./components/River";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Talk from "./pages/Talk";

export default function App() {
  /*
  Linear gradient from #590898 to #FF560E at 45 degree angle
  */
  return <>
    <River />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share" element={<Share />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/river" element={<River />} />
      </Routes>
    </BrowserRouter>
  </>
}
