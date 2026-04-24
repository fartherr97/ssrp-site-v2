import PageHeader from "../components/PageHeader";

export default function Rules({ data }) {
  return (
    <>
      <PageHeader
        eyebrow="Rules / Permissions"
        title="Rules & Permissions"
        description="Tier-based civilian permissions and approval requirements."
      />

      {data.rulesTables.map((table) => (
        <section key={table.id} className="rules-table">
          <h2>{table.title}</h2>

          <div className="permission-table-wrap">
            <table className="permission-table">
              <thead>
                <tr>
                  <th>Feature / Access</th>
                  {table.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {table.rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.feature}</td>

                    {row.access.map((allowed, i) => (
                      <td key={i} className="check-cell">
                        {allowed ? "✅" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}