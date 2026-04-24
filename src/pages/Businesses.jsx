import PageHeader from "../components/PageHeader";

export default function Businesses({ data }) {
  return (
    <>
      <PageHeader eyebrow="Businesses & Organizations" title="Civilian Businesses & Organizations" description="Approved civilian groups, business standards, and organization tracking." />

      <section className="panel">
        <h2>Approved / Pending Groups</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Type</th><th>Status</th></tr>
            </thead>
            <tbody>
              {data.businesses.map((biz) => (
                <tr key={biz.id}>
                  <td>{biz.name}</td>
                  <td>{biz.type}</td>
                  <td><span className={`status-pill ${biz.status === "Approved" ? "green" : "yellow"}`}>{biz.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}