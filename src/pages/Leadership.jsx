import { useState } from "react";
import PageHeader from "../components/PageHeader";

const defaultColumns = ["Reg Civ", "Cert Civ", "Cert Civ II", "Cert Civ III", "Cert Civ IV"];

export default function Leadership({ data, setData }) {
  const [newRuleTableTitle, setNewRuleTableTitle] = useState("");
  const [newRuleRow, setNewRuleRow] = useState({});

  const addRuleTable = () => {
    if (!newRuleTableTitle.trim()) return;

    setData((prev) => ({
      ...prev,
      rulesTables: [
        ...prev.rulesTables,
        {
          id: Date.now(),
          title: newRuleTableTitle,
          columns: defaultColumns,
          rows: [],
        },
      ],
    }));

    setNewRuleTableTitle("");
  };

const [newLink, setNewLink] = useState({ title: "", url: "" });


const updateBusiness = (id, field, value) => {
  setData((prev) => ({
    ...prev,
    businesses: prev.businesses.map((biz) =>
      biz.id === id ? { ...biz, [field]: value } : biz
    ),
  }));
};

const [savedSection, setSavedSection] = useState("");

const saveSection = (section) => {
  setSavedSection(section);
  setTimeout(() => setSavedSection(""), 1600);
};


const [newBiz, setNewBiz] = useState({
  name: "",
  type: "Business",
  leader: "",
  logo: "",
  notes: "",
});

const addBusiness = () => {
  if (!newBiz.name || !newBiz.leader) return;

  setData((prev) => ({
    ...prev,
    businesses: [
      ...prev.businesses,
      {
        id: Date.now(),
        ...newBiz,
        logo: newBiz.logo || "https://cdn.ssrp.us/images/ssrp.png",
      },
    ],
  }));

  setNewBiz({
    name: "",
    type: "Business",
    leader: "",
    logo: "",
    notes: "",
  });
};

const removeBusiness = (id) => {
  setData((prev) => ({
    ...prev,
    businesses: prev.businesses.filter((biz) => biz.id !== id),
  }));
};


const addLink = () => {
  if (!newLink.title || !newLink.url) return;

  setData((prev) => ({
    ...prev,
    links: [...prev.links, { id: Date.now(), ...newLink }],
  }));

  setNewLink({ title: "", url: "" });
};

const removeItem = (type, id) => {
  setData((prev) => ({
    ...prev,
    [type]: prev[type].filter((item) => item.id !== id),
  }));
};

  const removeRuleTable = (tableId) => {
    setData((prev) => ({
      ...prev,
      rulesTables: prev.rulesTables.filter((table) => table.id !== tableId),
    }));
  };

  const updateRuleTableTitle = (tableId, title) => {
    setData((prev) => ({
      ...prev,
      rulesTables: prev.rulesTables.map((table) =>
        table.id === tableId ? { ...table, title } : table
      ),
    }));
  };

  const addRuleRow = (tableId) => {
    const feature = newRuleRow[tableId] || "";
    if (!feature.trim()) return;

    setData((prev) => ({
      ...prev,
      rulesTables: prev.rulesTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              rows: [
                ...table.rows,
                {
                  feature,
                  access: table.columns.map(() => false),
                },
              ],
            }
          : table
      ),
    }));

    setNewRuleRow((prev) => ({ ...prev, [tableId]: "" }));
  };

  const removeRuleRow = (tableId, rowIndex) => {
    setData((prev) => ({
      ...prev,
      rulesTables: prev.rulesTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              rows: table.rows.filter((_, index) => index !== rowIndex),
            }
          : table
      ),
    }));
  };

  const updateRuleFeature = (tableId, rowIndex, feature) => {
    setData((prev) => ({
      ...prev,
      rulesTables: prev.rulesTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              rows: table.rows.map((row, index) =>
                index === rowIndex ? { ...row, feature } : row
              ),
            }
          : table
      ),
    }));
  };

  const toggleRuleAccess = (tableId, rowIndex, columnIndex) => {
    setData((prev) => ({
      ...prev,
      rulesTables: prev.rulesTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              rows: table.rows.map((row, index) =>
                index === rowIndex
                  ? {
                      ...row,
                      access: row.access.map((allowed, i) =>
                        i === columnIndex ? !allowed : allowed
                      ),
                    }
                  : row
              ),
            }
          : table
      ),
    }));
  };

  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Civilian Leadership Control Center"
        description="Manage civilian portal reminders, links, businesses, and rules/permissions."
      />

      <section className="leadership-grid">
        <div className="panel">
          <h2>Reminders</h2>
          <textarea
            className="text-area"
            value={data.reminder}
            onChange={(e) =>
              setData((prev) => ({ ...prev, reminder: e.target.value }))
            }
          />
<button className="primary-button no-margin" onClick={() => saveSection("reminders")}>
  {savedSection === "reminders" ? "Saved ✓" : "Save Reminder"}
</button>

        </div>

        <div className="panel">
          <h2>Civilian of the Month</h2>
          <input
            className="search-input full"
            value={data.civilianOfMonth}
            onChange={(e) =>
              setData((prev) => ({ ...prev, civilianOfMonth: e.target.value }))
            }
          />
  <button
    className="primary-button"
    onClick={() => saveSection("civilianOfMonth")}
  >
    {savedSection === "civilianOfMonth" ? "Saved ✓" : "Save Civilian of the Month"}
  </button>


        </div>
      </section>

<section className="panel">
  <h2>Manage Links</h2>

  <div className="form-row">
    <input
      className="search-input"
      placeholder="Title"
      value={newLink.title}
      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
    />

    <input
      className="search-input"
      placeholder="URL"
      value={newLink.url}
      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
    />

    <button className="primary-button no-margin" onClick={addLink}>
      Add Link
    </button>
  </div>

  <div className="manage-list">
    {data.links.map((link) => (
      <div key={link.id}>
        <span>{link.title}</span>

        <button
          className="danger-button"
          onClick={() => removeItem("links", link.id)}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
<button
  className="primary-button"
  onClick={() => saveSection("links")}
>
  {savedSection === "links" ? "Saved ✓" : "Save Links"}
</button>

</section>

<section className="panel">
  <h2>Manage Businesses & Organizations</h2>

  <div className="form-row">
    <input
      className="search-input"
      placeholder="Business / Org Name"
      value={newBiz.name}
      onChange={(e) => setNewBiz({ ...newBiz, name: e.target.value })}
    />

    <select
      className="select-input"
      value={newBiz.type}
      onChange={(e) => setNewBiz({ ...newBiz, type: e.target.value })}
    >
      <option>Business</option>
      <option>Organization</option>
      <option>Gang</option>
      <option>Department</option>
    </select>

    <input
      className="search-input"
      placeholder="Leader Name"
      value={newBiz.leader}
      onChange={(e) => setNewBiz({ ...newBiz, leader: e.target.value })}
    />

    <input
      className="search-input"
      placeholder="Logo URL"
      value={newBiz.logo}
      onChange={(e) => setNewBiz({ ...newBiz, logo: e.target.value })}
    />

    <input
      className="search-input"
      placeholder="Notes"
      value={newBiz.notes}
      onChange={(e) => setNewBiz({ ...newBiz, notes: e.target.value })}
    />

    <button className="primary-button no-margin" onClick={addBusiness}>
      Add Business / Org
    </button>
  </div>

  <div className="manage-list business-edit-list">
  {data.businesses.map((biz) => (
    <div key={biz.id} className="business-edit-row">
      <input
        className="search-input"
        value={biz.name}
        onChange={(e) => updateBusiness(biz.id, "name", e.target.value)}
        placeholder="Name"
      />

      <select
        className="select-input"
        value={biz.type}
        onChange={(e) => updateBusiness(biz.id, "type", e.target.value)}
      >
        <option>Business</option>
        <option>Organization</option>
        <option>Gang</option>
        <option>Department</option>
      </select>

      <input
        className="search-input"
        value={biz.leader}
        onChange={(e) => updateBusiness(biz.id, "leader", e.target.value)}
        placeholder="Leader"
      />

      <input
        className="search-input"
        value={biz.logo}
        onChange={(e) => updateBusiness(biz.id, "logo", e.target.value)}
        placeholder="Logo URL"
      />

      <input
        className="search-input"
        value={biz.notes}
        onChange={(e) => updateBusiness(biz.id, "notes", e.target.value)}
        placeholder="Notes"
      />

      <button
        className="danger-button"
        onClick={() => removeBusiness(biz.id)}
      >
        Remove
      </button>
    </div>
  ))}
</div>

<button
  className="primary-button"
  onClick={() => saveSection("businesses")}
>
  {savedSection === "businesses" ? "Saved ✓" : "Save Businesses"}
</button>
</section>


      <section className="panel">
        <h2>Rules & Permissions Tables</h2>

        <div className="form-row">
          <input
            className="search-input"
            placeholder="New table title"
            value={newRuleTableTitle}
            onChange={(e) => setNewRuleTableTitle(e.target.value)}
          />

          <button className="primary-button no-margin" onClick={addRuleTable}>
            Add Table
          </button>
        </div>

        {data.rulesTables.map((table) => (
          <div key={table.id} className="rules-editor-card">
            <div className="panel-header">
              <input
                className="search-input full"
                value={table.title}
                onChange={(e) => updateRuleTableTitle(table.id, e.target.value)}
              />

              <button
                className="danger-button"
                onClick={() => removeRuleTable(table.id)}
              >
                Remove Table
              </button>
            </div>

            <div className="permission-table-wrap">
              <table className="permission-table">
                <thead>
                  <tr>
                    <th>Feature / Access</th>
                    {table.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>
                        <input
                          className="table-edit-input"
                          value={row.feature}
                          onChange={(e) =>
                            updateRuleFeature(table.id, rowIndex, e.target.value)
                          }
                        />
                      </td>

                      {table.columns.map((column, columnIndex) => (
                        <td key={column} className="check-cell">
                          <input
                            type="checkbox"
                            checked={row.access[columnIndex]}
                            onChange={() =>
                              toggleRuleAccess(table.id, rowIndex, columnIndex)
                            }
                          />
                        </td>
                      ))}

                      <td>
                        <button
                          className="danger-button"
                          onClick={() => removeRuleRow(table.id, rowIndex)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="form-row add-row">
              <input
                className="search-input"
                placeholder="New feature/access name"
                value={newRuleRow[table.id] || ""}
                onChange={(e) =>
                  setNewRuleRow((prev) => ({
                    ...prev,
                    [table.id]: e.target.value,
                  }))
                }
              />

              <button
                className="primary-button no-margin"
                onClick={() => addRuleRow(table.id)}
              >
                Add Row
              </button>

              <button
  className="primary-button no-margin"
  onClick={() => saveSection(`rules-${table.id}`)}
>
  {savedSection === `rules-${table.id}` ? "Saved ✓" : "Save Table"}
</button>
            </div>
          </div>
          
        ))}
        
      </section>
      
    </>
    
  );
}