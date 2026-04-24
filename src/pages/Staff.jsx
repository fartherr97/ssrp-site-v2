import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PortalCard from "../components/PortalCard";
import EmbedPanel from "../components/EmbedPanel";

export default function Staff() {
  const [embed, setEmbed] = useState(null);

  const tools = [
    ["Staff Roster", "https://ssrp.us/staff-roster", "👥"],
    ["Admin Backend", "https://ssrp.us/admin-backend", "🧪"],
    ["Staff Dashboard", "https://records.ssrp.us", "📊"],
    ["IA Portal", "https://records.ssrp.us/ia", "🗂️"],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Staff Operations"
        title="Staff Operations Center"
        description="Access staff rosters, backend review tools, dashboards, policy resources, and staff documentation."
      />

      <section className="card-grid">
        {tools.map(([title, url, icon]) => (
          <PortalCard
            key={title}
            title={title}
            description="Open this tool directly inside the portal viewer."
            icon={icon}
            onClick={() => setEmbed({ title, url })}
          />
        ))}
      </section>

      {embed ? (
        <EmbedPanel title={embed.title} url={embed.url} />
      ) : (
        <section className="panel">
          <h2>Select a Staff Tool</h2>
          <p className="muted">
            Choose a staff resource above to open it inside the portal. Some sites may block iframe embedding, but the fallback button will still open it in a new tab.
          </p>
        </section>
      )}
    </>
  );
}