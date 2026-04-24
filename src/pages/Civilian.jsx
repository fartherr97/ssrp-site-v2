import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import PortalCard from "../components/PortalCard";

const initialRoster = [
  { id: 1, name: "John Smith", discord: "johnsmith", tier: "Certified Civilian", status: "Active" },
  { id: 2, name: "Alex Morgan", discord: "alexm", tier: "Certified Civilian II", status: "Active" },
  { id: 3, name: "Chris Taylor", discord: "ctaylor", tier: "Certified Civilian III", status: "Pending Review" },
  { id: 4, name: "Jordan Reed", discord: "jreed", tier: "Certified Civilian IV", status: "Active" },
];

const tierOrder = [
  "Registered Civilian",
  "Certified Civilian",
  "Certified Civilian II",
  "Certified Civilian III",
  "Certified Civilian IV",
  "Supervisor",
  "Manager",
];

export default function Civilian() {
  const [roster, setRoster] = useState(initialRoster);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [bulkTier, setBulkTier] = useState("Certified Civilian");

  const filteredRoster = useMemo(() => {
    return roster.filter((person) =>
      `${person.name} ${person.discord} ${person.tier} ${person.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [roster, search]);

  const toggleSelected = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const applyBulkTier = () => {
    setRoster((current) =>
      current.map((person) =>
        selected.includes(person.id) ? { ...person, tier: bulkTier } : person
      )
    );
    setSelected([]);
  };

  return (
    <>
      <PageHeader
        eyebrow="Civilian Operations"
        title="Civilian Operations Center"
        description="Manage civilian rosters, certification tiers, document hubs, and civilian operational standards."
      />

      <section className="card-grid">
        <PortalCard title="Civilian Roster" description="View, search, and manage civilian members." icon="📋" />
        <PortalCard title="Document Hub" description="Civilian SOPs, guidelines, and references." icon="📁" />
        <PortalCard title="Tier System" description="Certified Civilian tier breakdown." icon="🏅" />
        <PortalCard title="Organizations" description="Businesses, gangs, and official civilian groups." icon="🏢" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Civilian Roster</h2>
            <p>
              Search members, select multiple civilians, and adjust certification tiers.
            </p>
          </div>

          <input
            className="search-input"
            placeholder="Search roster..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {selected.length > 0 && (
          <div className="bulk-bar">
            <strong>{selected.length} selected</strong>

            <select
              className="select-input"
              value={bulkTier}
              onChange={(e) => setBulkTier(e.target.value)}
            >
              {tierOrder.map((tier) => (
                <option key={tier}>{tier}</option>
              ))}
            </select>

            <button className="primary-button no-margin" onClick={applyBulkTier}>
              Apply Tier
            </button>

            <button className="small-button" onClick={() => setSelected([])}>
              Clear
            </button>
          </div>
        )}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Discord</th>
                <th>Tier</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map((person) => (
                <tr
                  key={person.id}
                  className={selected.includes(person.id) ? "selected-row" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(person.id)}
                      onChange={() => toggleSelected(person.id)}
                    />
                  </td>
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
          {tierOrder.map((tier, index) => (
            <div className="tier-card" key={tier}>
              <div className="tier-number">{index + 1}</div>
              <h3>{tier}</h3>
              <p>
                {tier === "Registered Civilian"
                  ? "Basic civilian access with limited permissions."
                  : tier === "Certified Civilian"
                  ? "Minimum eligibility for FDOT and Foxhound applications."
                  : tier === "Certified Civilian IV"
                  ? "Highest certified civilian tier before leadership roles."
                  : tier === "Supervisor" || tier === "Manager"
                  ? "Civilian leadership and operational oversight."
                  : "Expanded trust tier with additional civilian permissions."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}