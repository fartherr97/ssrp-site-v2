import PageHeader from "../components/PageHeader";

export default function Tiers({ data }) {
  return (
    <>
      <PageHeader
        eyebrow="Civilian Tiers"
        title="Tier System"
        description="Breakdown of civilian ranks, permissions, and progression."
      />

      <section className="panel">
        <div className="tier-grid">
          {data.tiers.map((tier) => (
            <div className="tier-card" key={tier.id}>
              <img src={tier.logo} alt={tier.name} className="tier-logo" />
              <h3>{tier.name}</h3>
              <p>{tier.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}