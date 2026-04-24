import PageHeader from "../components/PageHeader";
import PortalCard from "../components/PortalCard";

export default function Dashboard({ setActivePage }) {
  return (
    <>
      <PageHeader
        eyebrow="Sunshine State Roleplay"
        title="Internal Operations Portal"
        description="Centralized access for civilian operations, staff resources, admin tools, and leadership controls."
      />

      <section className="card-grid">
        <PortalCard
          title="Civilian Operations"
          description="Rosters, civilian tiers, document hubs, and civilian resources."
          icon="🚗"
          onClick={() => setActivePage("civilian")}
        />
        <PortalCard
          title="Staff Operations"
          description="Staff roster, admin backend, staff dashboard, and policy resources."
          icon="🛡️"
          onClick={() => setActivePage("staff")}
        />
        <PortalCard
          title="Admin Tools"
          description="Roster management, exam tools, logs, and internal utilities."
          icon="⚙️"
          onClick={() => setActivePage("admin")}
        />
        <PortalCard
          title="Leadership Panel"
          description="Manage reminders, featured member, activity, and portal links."
          icon="👑"
          onClick={() => setActivePage("leadership")}
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel large-panel">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div>Civilian Operations portal shell created.</div>
            <div>Staff Operations quick links staged.</div>
            <div>Leadership Panel frontend drafted.</div>
            <div>Embedded tool viewer added.</div>
          </div>
        </div>

        <div className="panel">
          <h2>Reminders</h2>
          <p className="muted">
            This portal should stay focused on civilian and staff use only.
            Public-facing community pages should remain separate.
          </p>
        </div>
      </section>
    </>
  );
}