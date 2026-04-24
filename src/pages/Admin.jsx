import PageHeader from "../components/PageHeader";
import PortalCard from "../components/PortalCard";

export default function Admin() {
  return (
    <>
      <PageHeader
        eyebrow="Admin Tools"
        title="Administrative Control Center"
        description="Central space for roster management, exam tools, logs, and internal staff utilities."
      />

      <section className="card-grid">
        <PortalCard title="Roster Management" description="Manage member records, statuses, and assignments." icon="📋" />
        <PortalCard title="Promotion / Demotion Tool" description="Move members between ranks and log changes." icon="⬆️" />
        <PortalCard title="Exam Review Tools" description="Review exam attempts and scoring data." icon="🧪" href="https://ssrp.us/admin-backend" />
        <PortalCard title="Internal Logs" description="View audit logs and administrative records." icon="📜" />
      </section>

      <section className="panel">
        <h2>Admin Tool Notes</h2>
        <p className="muted">
          This page is staged for your Apps Script tools. The next move is to migrate your roster adjustment UI here and connect it to Sheets or an API later.
        </p>
      </section>
    </>
  );
}