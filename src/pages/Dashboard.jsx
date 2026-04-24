import PageHeader from "../components/PageHeader";
import PortalCard from "../components/PortalCard";

export default function Dashboard({ data, setActivePage }) {
  return (
    <>
      <PageHeader
        eyebrow="Sunshine State Roleplay"
        title="Civilian Operations Portal"
        description="Centralized hub for registered civilians, certified civilians, civilian leadership, documents, businesses, and tier-based permissions."
      />

      <section className="card-grid">
        <PortalCard title="Civilian Roster" description="View civilian members and certifications." icon="👥" onClick={() => setActivePage("roster")} />
        <PortalCard title="Civilian Tiers" description="Review Registered Civ and Certified Civ tiers." icon="🏅" onClick={() => setActivePage("tiers")} />
        <PortalCard title="Document Hub" description="Access civilian SOPs and resources." icon="📁" onClick={() => setActivePage("documents")} />
        <PortalCard title="Businesses & Orgs" description="Approved civilian businesses and organizations." icon="🏢" onClick={() => setActivePage("businesses")} />
      </section>

      <section className="dashboard-grid">
        <div className="panel large-panel">
          <h2>Current Reminder</h2>
          <p className="muted">{data.reminder}</p>
        </div>

        <div className="panel">
          <h2>Civilian of the Month</h2>
          <div className="featured-box">{data.civilianOfMonth}</div>
        </div>
      </section>

      <section className="panel">
        <h2>Quick Links</h2>
        <div className="link-grid">
          {data.links.map((link) => (
            <a key={link.id} href={link.url} className="quick-link">
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}