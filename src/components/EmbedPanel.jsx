export default function EmbedPanel({ title, url }) {
  return (
    <section className="panel embed-panel">
      <div className="panel-header">
        <div>
          <h2>{title}</h2>
          <p>{url}</p>
        </div>

        <a href={url} target="_blank" rel="noreferrer" className="small-button">
          Open New Tab
        </a>
      </div>

      <iframe src={url} title={title} className="portal-iframe" />
    </section>
  );
}