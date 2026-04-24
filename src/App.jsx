import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Civilian from "./pages/Civilian";
import Staff from "./pages/Staff";
import Admin from "./pages/Admin";
import Leadership from "./pages/Leadership";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard setActivePage={setActivePage} />,
    civilian: <Civilian />,
    staff: <Staff />,
    admin: <Admin />,
    leadership: <Leadership />,
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {pages[activePage]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}