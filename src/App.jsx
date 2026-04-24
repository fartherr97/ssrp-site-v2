import { useState } from "react";

const nav = ["Dashboard", "Civilian Operations", "Staff Operations", "Admin Tools", "Leadership Panel"];

const pageCards = {
  "Dashboard": [
    ["Admin Backend", "https://ssrp.us/admin-backend"],
    ["Staff Roster", "https://ssrp.us/staff-roster"],
    ["Records Dashboard", "https://records.ssrp.us"],
    ["IA Portal", "https://records.ssrp.us/ia"],
  ],
  "Civilian Operations": [
    ["Civilian Roster", "#"],
    ["Civilian Document Hub", "#"],
    ["Certified Civilian Tiers", "#"],
    ["Business / Organization Standards", "#"],
  ],
  "Staff Operations": [
    ["Staff Roster", "https://ssrp.us/staff-roster"],
    ["Admin Backend", "https://ssrp.us/admin-backend"],
    ["Staff Dashboard", "https://records.ssrp.us"],
    ["Staff Document Hub", "#"],
  ],
  "Admin Tools": [
    ["Roster Management", "#"],
    ["Promotion / Demotion Tool", "#"],
    ["Exam Review Tools", "https://ssrp.us/admin-backend"],
    ["Internal Logs", "#"],
  ],
  "Leadership Panel": [
    ["Edit Reminders", "#"],
    ["Featured Member", "#"],
    ["Recent Activity Controls", "#"],
    ["Manage Portal Links", "#"],
  ],
};

const civTiers = [
  ["Certified Civilian", "Foundational civilian access and standard roleplay permissions."],
  ["Certified Civilian II", "Expanded roleplay options and additional scenario trust."],
  ["Certified Civilian III", "Higher-impact RP permissions and advanced civilian opportunities."],
  ["Certified Civilian IV", "Top civilian tier with broader scenario flexibility."],
];

export default function App() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <img src="https://cdn.ssrp.us/images/ssrp.png" style={styles.logo} />
          <div>
            <div style={styles.brandTitle}>SSRP Portal</div>
            <div style={styles.brandSub}>Civilian & Staff Hub</div>
          </div>
        </div>

        <nav style={styles.nav}>
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              style={{
                ...styles.navBtn,
                ...(active === item ? styles.navBtnActive : {}),
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        <div style={styles.statusBox}>
          <strong>Portal Status</strong>
          <p>Frontend preview active.</p>
        </div>
      </aside>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.kicker}>Sunshine State Roleplay</div>
          <h1>{active}</h1>
          <p>
            Centralized access for civilian operations, staff resources,
            administrative tools, and leadership controls.
          </p>
        </section>

        <section style={styles.grid}>
          {pageCards[active].map(([title, link]) => (
            <a
              key={title}
              href={link}
              target={link === "#" ? "_self" : "_blank"}
              style={styles.card}
            >
              <div style={styles.cardIcon}>◆</div>
              <h3>{title}</h3>
              <p>Open, manage, or review this section from the SSRP internal portal.</p>
              <span style={styles.openBtn}>Open Section</span>
            </a>
          ))}
        </section>

        {active === "Civilian Operations" && (
          <section style={styles.panel}>
            <h2>Certified Civilian Tier System</h2>
            <div style={styles.tierGrid}>
              {civTiers.map(([tier, desc]) => (
                <div key={tier} style={styles.tierCard}>
                  <h3>{tier}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "Staff Operations" && (
          <section style={styles.panel}>
            <h2>Staff Quick Access</h2>
            <div style={styles.activityList}>
              <div>Admin Backend connected as primary exam review hub.</div>
              <div>Staff Roster available for live member reference.</div>
              <div>Records Dashboard available for staff activity review.</div>
            </div>
          </section>
        )}

        <section style={styles.bottomGrid}>
          <div style={styles.panel}>
            <h2>Recent Activity</h2>
            <div style={styles.activityList}>
              <div>Civilian Operations structure drafted.</div>
              <div>Staff Operations quick links added.</div>
              <div>Leadership Panel concept prepared.</div>
            </div>
          </div>

          <div style={styles.panel}>
            <h2>Reminders</h2>
            <p style={{ color: "#9ca3af" }}>
              Keep this portal focused on civilian and staff use only. Public-facing SSRP pages should stay separate.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "radial-gradient(circle at top, #1f2937 0%, #080b12 45%, #05070d 100%)",
    color: "white",
    fontFamily: "Inter, Arial, sans-serif",
  },
  sidebar: {
    width: 285,
    background: "rgba(13,17,28,.95)",
    borderRight: "1px solid rgba(255,255,255,.08)",
    padding: 22,
    display: "flex",
    flexDirection: "column",
  },
  brand: { display: "flex", alignItems: "center", gap: 12, marginBottom: 32 },
  logo: { width: 52, height: 52, borderRadius: 14 },
  brandTitle: { color: "#f5b642", fontWeight: 800, fontSize: 19 },
  brandSub: { color: "#9ca3af", fontSize: 12 },
  nav: { display: "grid", gap: 10 },
  navBtn: {
    background: "transparent",
    color: "#d1d5db",
    border: "1px solid transparent",
    borderRadius: 14,
    padding: "13px 14px",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: 700,
  },
  navBtnActive: {
    background: "#f5b642",
    color: "#111827",
    boxShadow: "0 0 28px rgba(245,182,66,.22)",
  },
  statusBox: {
    marginTop: "auto",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 16,
    padding: 16,
    color: "#d1d5db",
    fontSize: 13,
  },
  main: { flex: 1, padding: 34, overflowY: "auto" },
  hero: {
    background: "linear-gradient(135deg, rgba(31,41,55,.95), rgba(10,15,25,.95))",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 28,
    padding: 34,
    boxShadow: "0 24px 70px rgba(0,0,0,.35)",
  },
  kicker: {
    color: "#f5b642",
    textTransform: "uppercase",
    letterSpacing: 4,
    fontSize: 12,
    fontWeight: 800,
  },
  grid: {
    marginTop: 26,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 18,
  },
  card: {
    background: "rgba(16,22,36,.92)",
    border: "1px solid rgba(255,255,255,.08)",
    color: "white",
    textDecoration: "none",
    borderRadius: 22,
    padding: 22,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    background: "rgba(245,182,66,.12)",
    color: "#f5b642",
    display: "grid",
    placeItems: "center",
  },
  openBtn: {
    display: "inline-block",
    marginTop: 14,
    padding: "9px 12px",
    borderRadius: 10,
    background: "rgba(255,255,255,.08)",
    fontSize: 13,
    fontWeight: 800,
  },
  panel: {
    marginTop: 24,
    background: "rgba(16,22,36,.92)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 22,
    padding: 22,
  },
  tierGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  tierCard: {
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 16,
    padding: 16,
  },
  activityList: {
    display: "grid",
    gap: 12,
    color: "#d1d5db",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 18,
  },
};