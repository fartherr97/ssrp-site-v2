import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PortalCard from "../components/PortalCard";

const roster = [
  { name: "John Smith", discord: "johnsmith", tier: "Certified Civilian", status: "Active" },
  { name: "Alex Morgan", discord: "alexm", tier: "Certified Civilian II", status: "Active" },
  { name: "Chris Taylor", discord: "ctaylor", tier: "Certified Civilian III", status: "Pending Review" },
  { name: "Jordan Reed", discord: "jreed", tier: "Certified Civilian IV", status: "Active" },
];

const tiers = [
  ["Certified Civilian", "Standard trusted civilian access with foundational RP permissions."],
  ["Certified Civilian II", "Expanded civilian access for more trusted scenarios."],
  ["Certified Civilian III", "Advanced civilian trust tier for higher-impact RP."],
  ["Certified Civilian IV", "Top civilian tier with broader scenario flexibility."],
];

export default function Civilian() {
  const [search, setSearch] = useState("");

  const filteredRoster = roster.filter((person) =>
    `${person.name} ${person.discord} ${person.tier} ${person.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow="Civilian Operations"
        title="Civilian Operations Center"
        description="Manage civilian resources, rosters, tier information, document hubs, and operational standards."
      />

      <section className="card-grid">
        <PortalCard title="Civilian Roster" description="View and manage civilian members." icon="📋" />
        <PortalCard title="Document Hub" description="Civilian SOPs, guidelines, and references." icon="📁" />
        <PortalCard title="Tier System" description="Certified Civilian tier breakdown." icon="🏅" />
        <PortalCard title="Businesses / Organizations" description="Standards for official civilian groups." icon="🏢" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Civilian Roster</h2>
            <p>Demo roster table. This is where your real civilian roster logic will go.</p>
          </div>

          <input
            className="search-input"
            placeholder="Search roster..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Discord</th>
                <th>Tier</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map((person) => (
                <tr key={person.discord}>
                  <td>{person.name}</td>
                  <td>{person.discord}</td>
                  <td>{person.tier}</td>
                  <td>
                    <span className={`status-pill ${person.status === "Active" ? "green" : "yellow"}`}>
                      {person.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Certified Civilian Tier System</h2>
        <div className="tier-grid">
          {tiers.map(([tier, desc]) => (
            <div className="tier-card" key={tier}>
              <h3>{tier}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}