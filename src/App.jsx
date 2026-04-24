import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Roster from "./pages/Roster";
import Tiers from "./pages/Tiers";
import Documents from "./pages/Documents";
import Businesses from "./pages/Businesses";
import Rules from "./pages/Rules";
import Leadership from "./pages/Leadership";
import "./index.css";

const starterData = {
  reminder: "Review civilian tier standards and keep roster information updated.",
  civilianOfMonth: "Civilian of the Month",
  links: [
    { id: 1, title: "Civilian SOP", url: "#" },
    { id: 2, title: "Civilian Roster", url: "#" },
  ],
  businesses: [
    { id: 1, name: "Foxhound Security", type: "Business", status: "Approved" },
    { id: 2, name: "FDOT", type: "Department", status: "Approved" },
  ],
 roster: [
  {
    id: 1,
    name: "Henry G",
    discord: "123232322332",
    tier: "Certified Civilian",
    discipline: "None",
    hired: "2026-04-21",
    lastMove: "2026-04-21",
    notes: "—",
  },
]
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [data, setData] = useState(starterData);

  const pages = {
    dashboard: <Dashboard data={data} setActivePage={setActivePage} />,
    roster: <Roster data={data} setData={setData} />,
    tiers: <Tiers />,
    documents: <Documents data={data} />,
    businesses: <Businesses data={data} />,
    rules: <Rules />,
    leadership: <Leadership data={data} setData={setData} />,
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
            transition={{ duration: 0.22 }}
          >
            {pages[activePage]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}