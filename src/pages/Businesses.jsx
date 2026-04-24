export default function Businesses({ data }) {
  return (
    <div className="page">
      <h1>Businesses & Organizations</h1>

      <div className="business-grid">
        {data.businesses.map((b) => (
          <div key={b.id} className="business-card">
            <img src={b.logo} alt={b.name} />

            <h3>{b.name}</h3>
            <p>Leader: {b.leader}</p>
            <span>{b.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}