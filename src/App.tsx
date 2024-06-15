import { Route, Routes, useLocation } from "react-router-dom";
import Cover from "./pages/cover";
import Intro from "./pages/intro";
import { AnimatePresence } from "framer-motion";
import Transition from "./components/transition";
import Contents from "./pages/contents";
import About from "./pages/about";
import GitaPage from "./pages/page";
import NotFound from "./pages/not-found";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <Transition>
              <Cover />
            </Transition>
          }
        />
        <Route path="/intro" element={<Intro />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/about" element={<About />} />
        <Route path="/page/:pageNo" element={<GitaPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
