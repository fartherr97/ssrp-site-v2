import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tierOrder = [
  "Manager",
  "Supervisor",
  "Certified Civilian IV",
  "Certified Civilian III",
  "Certified Civilian II",
  "Certified Civilian",
];

const editTierOrder = [
  "Certified Civilian",
  "Certified Civilian II",
  "Certified Civilian III",
  "Certified Civilian IV",
  "Supervisor",
  "Manager",
];

const disciplineOptions = [
  "None",
  "Verbal Warning",
  "Strike I",
  "Strike II",
  "Temp. Suspended",
];

function formatDate(date) {
  if (!date) return "—";

  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;

  return `${month}/${day}/${year}`;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function Roster({ data, setData }) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All Tiers");
  const [disciplineFilter, setDisciplineFilter] = useState("All Discipline");
  const [editing, setEditing] = useState(false);

  const filtered = useMemo(() => {
    return data.roster.filter((p) => {
      const matchesSearch = `${p.name} ${p.discord} ${p.tier} ${p.discipline || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTier = tierFilter === "All Tiers" || p.tier === tierFilter;

      const matchesDiscipline =
        disciplineFilter === "All Discipline" ||
        (p.discipline || "None") === disciplineFilter;

      return matchesSearch && matchesTier && matchesDiscipline;
    });
  }, [data.roster, search, tierFilter, disciplineFilter]);

  const grouped = useMemo(() => {
    const map = {};
    tierOrder.forEach((tier) => (map[tier] = []));
    filtered.forEach((p) => {
      if (map[p.tier]) map[p.tier].push(p);
    });
    return map;
  }, [filtered]);

const hasActiveFilter =
  tierFilter !== "All Tiers" ||
  disciplineFilter !== "All Discipline" ||
  search.trim() !== "";

const visibleTiers =
  tierFilter !== "All Tiers"
    ? tierOrder.filter((tier) => tier === tierFilter)
    : hasActiveFilter
    ? tierOrder.filter((tier) => (grouped[tier] || []).length > 0)
    : tierOrder;

  return (
    <div className="roster-page">
      <div className="roster-topbar">
        <h1>
          Sunshine State Roleplay <span>| Civilian Roster</span>
        </h1>

        <div className="roster-stats">
          <span>Total {data.roster.length}</span>
        </div>
      </div>

      <div className="roster-toolbar">
        <input
          className="roster-search"
          placeholder="Search name, Discord ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="roster-filter"
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
        >
          <option>All Tiers</option>
          {tierOrder.map((tier) => (
            <option key={tier}>{tier}</option>
          ))}
        </select>

        <select
          className="roster-filter"
          value={disciplineFilter}
          onChange={(e) => setDisciplineFilter(e.target.value)}
        >
          <option>All Discipline</option>
          {disciplineOptions.map((discipline) => (
            <option key={discipline}>{discipline}</option>
          ))}
        </select>

        <button className="roster-button" onClick={() => setEditing(true)}>
          Edit Members
        </button>
      </div>

      <div className="roster-layout">
        <main className="roster-table-card">
          <table className="roster-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Discord UID</th>
                <th>Discipline</th>
                <th>Hired</th>
                <th>Last Move</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {visibleTiers.map((tier) => (
                <TierGroup key={tier} tier={tier} members={grouped[tier] || []} />
              ))}
            </tbody>
          </table>
        </main>

        <aside className="roster-sidepanel">
          <div className="side-logo-card">
            <img src="https://cdn.ssrp.us/images/ssrp.png" alt="SSRP Logo" />
          </div>

          <div className="side-card">
            <h3>Tier Navigation</h3>

            <button
              className="side-nav-button"
              onClick={() => setTierFilter("All Tiers")}
            >
              View All Tiers
            </button>

            {tierOrder.map((tier) => (
              <button
                key={tier}
                className="side-nav-button"
                onClick={() => setTierFilter(tier)}
              >
                {tier}
              </button>
            ))}
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {editing && (
          <RosterEditModal
            data={data}
            setData={setData}
            close={() => setEditing(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TierGroup({ tier, members }) {
  return (
    <>
      <tr className="group-row">
        <td colSpan="6">{tier}</td>
      </tr>

      {members.map((p) => (
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.discord}</td>
          <td>{p.discipline || "None"}</td>
          <td>{formatDate(p.hired)}</td>
          <td>{formatDate(p.lastMove)}</td>
          <td>{p.notes || "—"}</td>
        </tr>
      ))}
    </>
  );
}

function RosterEditModal({ data, setData, close }) {
  const [selected, setSelected] = useState([]);
  const [modalSearch, setModalSearch] = useState("");
  const [modalTierFilter, setModalTierFilter] = useState("All Tiers");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bulkTier, setBulkTier] = useState("Certified Civilian");
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    discord: "",
    hired: todayISO(),
    notes: "",
    tier: "Certified Civilian",
  });

  const selectedMembers = data.roster.filter((p) => selected.includes(p.id));
  const singleMember = selectedMembers.length === 1 ? selectedMembers[0] : null;

  const visible = data.roster
    .filter((p) => {
      const matchesSearch = `${p.name} ${p.discord} ${p.tier}`
        .toLowerCase()
        .includes(modalSearch.toLowerCase());

      const matchesTier =
        modalTierFilter === "All Tiers" || p.tier === modalTierFilter;

      return matchesSearch && matchesTier;
    })
    .sort(
      (a, b) =>
        editTierOrder.indexOf(a.tier) - editTierOrder.indexOf(b.tier) ||
        a.name.localeCompare(b.name)
    );

  const toggle = (id) => {
    setSaved(false);
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  };

  const updateSingle = (field, value) => {
    if (!singleMember) return;

    setSaved(false);

    setData((prev) => ({
      ...prev,
      roster: prev.roster.map((p) =>
        p.id === singleMember.id
          ? {
              ...p,
              [field]: value,
              ...(field === "tier" ? { lastMove: todayISO() } : {}),
            }
          : p
      ),
    }));
  };

  const applyBulkTier = () => {
    setData((prev) => ({
      ...prev,
      roster: prev.roster.map((p) =>
        selected.includes(p.id)
          ? { ...p, tier: bulkTier, lastMove: todayISO() }
          : p
      ),
    }));
  };

  const saveChanges = () => {
    setSaving(true);
    setSaved(false);

    setTimeout(() => {
      if (selected.length > 1) applyBulkTier();

      setSaving(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1600);
    }, 450);
  };

  const addMember = () => {
    if (!newMember.name || !newMember.discord) return;

    setData((prev) => ({
      ...prev,
      roster: [
        ...prev.roster,
        {
          id: Date.now(),
          ...newMember,
          discipline: "None",
          lastMove: todayISO(),
        },
      ],
    }));

    setNewMember({
      name: "",
      discord: "",
      hired: todayISO(),
      notes: "",
      tier: "Certified Civilian",
    });

    setAddingMember(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <motion.div
      className="edit-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
    >
      <motion.div
        className="edit-modal"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
      >
        <div className="edit-modal-header">
          <div>
            <h2>Edit Members</h2>
            <p>
              Search by name or Discord UID, then update one person or change
              the selected tier for multiple members.
            </p>
          </div>

          <button className="roster-button" onClick={close}>
            Close
          </button>
        </div>

        <div className="edit-grid">
          <div>
            <div className="edit-filter-row">
              <input
                className="roster-search full"
                placeholder="Search members..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
              />

              <select
                className="roster-filter full"
                value={modalTierFilter}
                onChange={(e) => setModalTierFilter(e.target.value)}
              >
                <option>All Tiers</option>
                {editTierOrder.map((tier) => (
                  <option key={tier}>{tier}</option>
                ))}
              </select>
            </div>

            <div className="edit-list">
              {visible.map((p) => (
                <label
                  className={`edit-row ${
                    selected.includes(p.id) ? "selected-edit-row" : ""
                  }`}
                  key={p.id}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => toggle(p.id)}
                  />

                  <div>
                    <strong>{p.name}</strong>
                    <p>{p.discord}</p>
                  </div>

                  <span>{p.tier}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="edit-panel">
            <h3>Selected Members</h3>
            <p>{selected.length} selected</p>

            <AnimatePresence mode="wait">
              {selected.length === 0 && (
                <motion.div
                  key="empty"
                  className="empty-edit-state"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  Select a member to edit their details.
                </motion.div>
              )}

              {selected.length === 1 && singleMember && (
                <motion.div
                  key={`single-${singleMember.id}`}
                  className="single-edit-form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <label>Name</label>
                  <input
                    className="search-input full"
                    value={singleMember.name}
                    onChange={(e) => updateSingle("name", e.target.value)}
                  />

                  <label>Discord UID</label>
                  <input
                    className="search-input full"
                    value={singleMember.discord}
                    onChange={(e) => updateSingle("discord", e.target.value)}
                  />

                  <label>Tier</label>
                  <select
                    className="roster-filter full"
                    value={singleMember.tier}
                    onChange={(e) => updateSingle("tier", e.target.value)}
                  >
                    {tierOrder.map((tier) => (
                      <option key={tier}>{tier}</option>
                    ))}
                  </select>

                  <label>Discipline</label>
                  <select
                    className="roster-filter full"
                    value={singleMember.discipline || "None"}
                    onChange={(e) =>
                      updateSingle("discipline", e.target.value)
                    }
                  >
                    {disciplineOptions.map((discipline) => (
                      <option key={discipline}>{discipline}</option>
                    ))}
                  </select>

                  <label>Hired Date</label>
                  <input
                    type="date"
                    className="search-input full"
                    value={singleMember.hired || ""}
                    onChange={(e) => updateSingle("hired", e.target.value)}
                  />

                  <label>Last Move</label>
                  <input
                    type="date"
                    className="search-input full"
                    value={singleMember.lastMove || ""}
                    onChange={(e) => updateSingle("lastMove", e.target.value)}
                  />

                  <label>Notes</label>
                  <input
                    className="search-input full"
                    value={singleMember.notes || ""}
                    onChange={(e) => updateSingle("notes", e.target.value)}
                  />
                </motion.div>
              )}

              {selected.length > 1 && (
                <motion.div
                  key="multiple"
                  className="single-edit-form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <label>Change Selected Tier</label>
                  <select
                    className="roster-filter full"
                    value={bulkTier}
                    onChange={(e) => {
                      setSaved(false);
                      setBulkTier(e.target.value);
                    }}
                  >
                    {tierOrder.map((tier) => (
                      <option key={tier}>{tier}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="add-member-wrap">
              <button
                className="small-button full-button"
                onClick={() => setAddingMember((v) => !v)}
              >
                {addingMember ? "Cancel Add Member" : "Add Member"}
              </button>

              <AnimatePresence>
                {addingMember && (
                  <motion.div
                    className="single-edit-form add-member-form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <label>Name</label>
                    <input
                      className="search-input full"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                    />

                    <label>Discord UID</label>
                    <input
                      className="search-input full"
                      value={newMember.discord}
                      onChange={(e) =>
                        setNewMember({ ...newMember, discord: e.target.value })
                      }
                    />

                    <label>Hire Date</label>
                    <input
                      type="date"
                      className="search-input full"
                      value={newMember.hired}
                      onChange={(e) =>
                        setNewMember({ ...newMember, hired: e.target.value })
                      }
                    />

                    <label>Notes</label>
                    <input
                      className="search-input full"
                      value={newMember.notes}
                      onChange={(e) =>
                        setNewMember({ ...newMember, notes: e.target.value })
                      }
                    />

                    <label>Tier</label>
                    <select
                      className="roster-filter full"
                      value={newMember.tier}
                      onChange={(e) =>
                        setNewMember({ ...newMember, tier: e.target.value })
                      }
                    >
                      {tierOrder.map((tier) => (
                        <option key={tier}>{tier}</option>
                      ))}
                    </select>

                    <button className="primary-button no-margin" onClick={addMember}>
                      Create Member
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className={`save-button ${saving ? "saving" : ""} ${
                saved ? "saved" : ""
              }`}
              onClick={saveChanges}
              disabled={saving || selected.length === 0}
            >
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
            </button>

            <AnimatePresence>
              {saved && (
                <motion.div
                  className="save-complete"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.14 }}
                >
                  Changes saved successfully.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}