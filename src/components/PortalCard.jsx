export default function PortalCard({ title, description, icon, onClick, href }) {
  const content = (
    <>
      <div className="card-icon">{icon || "◆"}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-action">Open Section</span>
    </>
  );

  if (href) {
    return (
      <a className="portal-card" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className="portal-card portal-card-button" onClick={onClick}>
      {content}
    </button>
  );
}