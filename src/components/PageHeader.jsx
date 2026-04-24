export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}