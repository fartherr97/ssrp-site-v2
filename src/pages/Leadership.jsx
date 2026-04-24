import { useState } from "react";
import PageHeader from "../components/PageHeader";

const tiers = ["Registered Civilian", "Certified Civilian", "Certified Civilian II", "Certified Civilian III", "Certified Civilian IV", "Supervisor", "Manager"];

export default function Leadership({ data, setData }) {
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [newBiz, setNewBiz] = useState({ name: "", type: "Business", status: "Pending" });
  const [newCiv, setNewCiv] = useState({ name: "", discord: "", tier: "Registered Civilian", status: "Active" });

  const addLink = () => {
    if (!newLink.title || !newLink.url) return;
    setData((p) => ({ ...p, links: [...p.links, { id: Date.now(), ...newLink }] }));
    setNewLink({ title: "", url: "" });
  };

  const addBusiness = () => {
    if (!newBiz.name) return;
    setData((p) => ({ ...p, businesses: [...p.businesses, { id: Date.now(), ...newBiz }] }));
    setNewBiz({ name: "", type: "Business", status: "Pending" });
  };

  const addCivilian = () => {
    if (!newCiv.name || !newCiv.discord) return;
    setData((p) => ({ ...p, roster: [...p.roster, { id: Date.now(), ...newCiv }] }));
    setNewCiv({ name: "", discord: "", tier: "Registered Civilian", status: "Active" });
  };

  const removeItem = (type, id) => {
    setData((p) => ({ ...p, [type]: p[type].filter((item) => item.id !== id) }));
  };

  return (
    <>
      <PageHeader eyebrow="Leadership" title="Civilian Leadership Control Center" description="Manage reminders, civilian of the month, quick links, businesses, and roster entries." />

      <section className="leadership-grid">
        <div className="panel">
          <h2>Reminders</h2>
          <textarea className="text-area" value={data.reminder} onChange={(e) => setData((p) => ({ ...p, reminder: e.target.value }))} />
        </div>

        <div className="panel">
          <h2>Civilian of the Month</h2>
          <input className="search-input full" value={data.civilianOfMonth} onChange={(e) => setData((p) => ({ ...p, civilianOfMonth: e.target.value }))} />
        </div>
      </section>

      <section className="panel">
        <h2>Manage Links</h2>
        <div className="form-row">
          <input className="search-input" placeholder="Title" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} />
          <input className="search-input" placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
          <button className="primary-button no-margin" onClick={addLink}>Add Link</button>
        </div>

        <div className="manage-list">
          {data.links.map((link) => (
            <div key={link.id}>
              <span>{link.title}</span>
              <button className="danger-button" onClick={() => removeItem("links", link.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Add / Remove Businesses</h2>
        <div className="form-row">
          <input className="search-input" placeholder="Business name" value={newBiz.name} onChange={(e) => setNewBiz({ ...newBiz, name: e.target.value })} />
          <select className="select-input" value={newBiz.type} onChange={(e) => setNewBiz({ ...newBiz, type: e.target.value })}>
            <option>Business</option><option>Organization</option><option>Gang</option><option>Department</option>
          </select>
          <select className="select-input" value={newBiz.status} onChange={(e) => setNewBiz({ ...newBiz, status: e.target.value })}>
            <option>Pending</option><option>Approved</option><option>Suspended</option>
          </select>
          <button className="primary-button no-margin" onClick={addBusiness}>Add</button>
        </div>

        <div className="manage-list">
          {data.businesses.map((biz) => (
            <div key={biz.id}>
              <span>{biz.name} — {biz.status}</span>
              <button className="danger-button" onClick={() => removeItem("businesses", biz.id)}>Remove</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}