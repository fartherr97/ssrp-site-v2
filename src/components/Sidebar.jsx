import { LayoutDashboard, Users, Medal, Folder, Building2, ShieldCheck, Crown } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "roster", label: "Roster", icon: Users },
  { id: "tiers", label: "Civilian Tiers", icon: Medal },
  { id: "documents", label: "Document Hub", icon: Folder },
  { id: "businesses", label: "Businesses & Orgs", icon: Building2 },
  { id: "rules", label: "Rules / Permissions", icon: ShieldCheck },
  { id: "leadership", label: "Leadership", icon: Crown },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="https://cdn.ssrp.us/images/ssrp.png" className="brand-logo" />
        <div>
          <div className="brand-title">Civilian Portal</div>
          <div className="brand-subtitle">SSRP Civilian Operations</div>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-button ${activePage === item.id ? "active" : ""}`}
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
          <p>Civilian frontend preview active.</p>
        </div>
      </div>
    </aside>
  );
}