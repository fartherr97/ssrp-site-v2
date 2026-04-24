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
        <div key={table.id} className="rules-table">
          <h2>{table.title}</h2>

          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Permissions</th>
                <th>Approval</th>
              </tr>
            </thead>

            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.tier}</td>
                  <td>{row.permission}</td>
                  <td>{row.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}