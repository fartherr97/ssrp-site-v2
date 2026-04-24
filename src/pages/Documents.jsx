import PageHeader from "../components/PageHeader";

export default function Documents({ data }) {
  return (
    <>
      <PageHeader eyebrow="Document Hub" title="Civilian Document Hub" description="Civilian SOPs, standards, guidelines, and operational resources." />
      <section className="panel">
        <h2>Documents & Links</h2>
        <div className="link-grid">
          {data.links.map((link) => (
            <a key={link.id} href={link.url} className="quick-link">{link.title}</a>
          ))}
        </div>
      </section>
    </>
  );
}