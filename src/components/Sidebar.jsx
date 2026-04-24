import {
  LayoutDashboard,
  Car,
  Shield,
  Wrench,
  Crown,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "civilian", label: "Civilian Operations", icon: Car },
  { id: "staff", label: "Staff Operations", icon: Shield },
  { id: "admin", label: "Admin Tools", icon: Wrench },
  { id: "leadership", label: "Leadership Panel", icon: Crown },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="https://cdn.ssrp.us/images/ssrp.png" className="brand-logo" />
        <div>
          <div className="brand-title">SSRP Portal</div>
          <div className="brand-subtitle">Internal Operations Hub</div>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              className={`nav-button ${active ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-status">
        <div className="status-dot" />
        <div>
          <strong>Portal Online</strong>
          <p>Frontend preview build active.</p>
        </div>
      </div>
    </aside>
  );
}