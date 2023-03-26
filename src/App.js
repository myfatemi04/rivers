import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence} from "framer-motion";
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
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<Share />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="/river" element={<River />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  </>
}
