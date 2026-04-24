import PageHeader from "../components/PageHeader";

const tiers = [
  ["Registered Civilian", "Basic civilian access with limited permissions."],
  ["Certified Civilian", "Minimum eligibility for FDOT and Foxhound applications."],
  ["Certified Civilian II", "Expanded civilian trust and additional RP flexibility."],
  ["Certified Civilian III", "Advanced civilian RP permissions."],
  ["Certified Civilian IV", "Highest certification tier before leadership roles."],
  ["Supervisor", "Civilian leadership support and oversight."],
  ["Manager", "Civilian department management and operational control."],
];

export default function Tiers() {
  return (
    <>
      <PageHeader eyebrow="Civilian Tiers" title="Tier System" description="Breakdown of civilian ranks, permissions, and progression." />
      <section className="panel">
        <div className="tier-grid">
          {tiers.map(([tier, desc], i) => (
            <div className="tier-card" key={tier}>
              <div className="tier-number">{i + 1}</div>
              <h3>{tier}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}