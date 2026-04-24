import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Leadership() {
  const [reminder, setReminder] = useState("Review civilian tier standards and staff document hub links.");
  const [featured, setFeatured] = useState("Staff Member of the Month");

  return (
    <>
      <PageHeader
        eyebrow="Leadership Panel"
        title="Leadership Management"
        description="Manage reminders, featured member content, recent activity, and portal link controls."
      />

      <section className="leadership-grid">
        <div className="panel">
          <h2>Edit Reminders</h2>
          <textarea
            className="text-area"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          />
          <button className="primary-button">Save Reminder</button>
        </div>

        <div className="panel">
          <h2>Featured Member</h2>
          <input
            className="search-input full"
            value={featured}
            onChange={(e) => setFeatured(e.target.value)}
          />
          <button className="primary-button">Save Featured Member</button>
        </div>
      </section>

      <section className="panel">
        <h2>Preview</h2>
        <div className="preview-box">
          <strong>Reminder:</strong>
          <p>{reminder}</p>

          <strong>Featured:</strong>
          <p>{featured}</p>
        </div>
      </section>
    </>
  );
}