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
    {
      id: 1,
      title: "Civilian SOP",
      url: "#",
    },
    {
      id: 2,
      title: "Civilian Roster",
      url: "#",
    },
  ],

  businesses: [
    {
      id: 1,
      name: "Foxhound Security",
      type: "Business",
      leader: "John Smith",
      logo: "https://cdn.ssrp.us/images/ssrp.png",
      notes: "Private security organization.",
    },
    {
      id: 2,
      name: "FDOT",
      type: "Department",
      leader: "Civilian Operations",
      logo: "https://cdn.ssrp.us/images/ssrp.png",
      notes: "Civilian department for roadway and vehicle support roleplay.",
    },
  ],

  rulesTables: [
  {
    id: 1,
    title: "Civilian Permissions Matrix",
    columns: ["Reg Civ", "Cert Civ", "Cert Civ II", "Cert Civ III", "Cert Civ IV"],
    rows: [
      {
        feature: "Custom Vehicles",
        access: [true, true, true, true, true],
      },
      {
        feature: "Sports / High-End Vehicles",
        access: [false, true, true, true, true],
      },
      {
        feature: "Business Ownership",
        access: [false, false, true, true, true],
      },
      {
        feature: "Organized Crime RP",
        access: [false, false, false, true, true],
      },
      {
        feature: "Military RP",
        access: [false, false, false, false, true],
      },
    ],
  },
],

  roster: [
    {
      id: 1,
      name: "Ryan",
      discord: "173538213728747520",
      tier: "Manager",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 2,
      name: "Dirt",
      discord: "173538213728747520",
      tier: "Supervisor",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 3,
      name: "Henry G",
      discord: "123232322332",
      tier: "Certified Civilian IV",
      discipline: "Strike II",
      hired: "2026-04-21",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 4,
      name: "Marco Rico the Third",
      discord: "173538213728747520",
      tier: "Certified Civilian III",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 5,
      name: "Troy R.",
      discord: "173538213728747520",
      tier: "Certified Civilian II",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 6,
      name: "Jackson H.",
      discord: "173538213728747520",
      tier: "Certified Civilian",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 7,
      name: "John D.",
      discord: "173538213728747520",
      tier: "Certified Civilian",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
    {
      id: 8,
      name: "Trevor M.",
      discord: "173538213728747520",
      tier: "Certified Civilian",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "—",
    },
  ],
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
    rules: <Rules data={data} />,
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