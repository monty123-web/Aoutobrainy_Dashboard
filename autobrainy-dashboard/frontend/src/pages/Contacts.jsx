import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LeadsTable from "../components/LeadsTable";
import { Upload, Download, Filter, Search, Plus } from "lucide-react";
import axios from "axios";

export default function Contacts() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", source: "Website", status: "Cold", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data?.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function createLead(e) {
    e?.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/api/leads", form);
      setLeads([res.data, ...leads]);
      setShowAddModal(false);
      setForm({ name: "", mobile: "", source: "Website", status: "Cold", city: "" });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteLead(id) {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);
      setLeads(leads.filter(l => l.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  const filteredLeads = leads.filter(l => l.name?.toLowerCase().includes(search.toLowerCase()) || l.mobile?.includes(search));

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Contacts" subtitle="Manage your WhatsApp contact database" />
        <main className="flex-1 p-6 space-y-6">
          {/* Action Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 flex-1 max-w-sm">
              <Search size={14} className="text-slate-500" />
              <input type="text" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full" />
            </div>
            <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
              <Filter size={15} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
              <Upload size={15} /> Import CSV
            </button>
            <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
              <Download size={15} /> Export
            </button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-sky-500 text-white text-sm px-4 py-2 rounded-xl hover:bg-sky-400 transition-colors">
              <Plus size={15} /> Add Contact
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Contacts", value: leads.length },
              { label: "Opted In", value: leads.filter(l => l.status === "Hot").length },
              { label: "Opted Out", value: leads.filter(l => l.status === "Cold").length },
            ].map(s => (
              <div key={s.label} className="kpi-card">
                <p className="text-slate-400 text-sm">{s.label}</p>
                <p className="text-white text-2xl font-bold mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          {error && <p className="text-red-400">{error}</p>}
          <LeadsTable leads={filteredLeads} onDelete={deleteLead} />

          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <form onSubmit={createLead} className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-800">
                <h3 className="text-white text-lg font-semibold mb-4">Add Contact</h3>
                <label className="text-slate-400 text-sm">Name</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" required />
                <label className="text-slate-400 text-sm">Mobile</label>
                <input value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" required />
                <label className="text-slate-400 text-sm">City</label>
                <input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" />
                <label className="text-slate-400 text-sm">Source</label>
                <select value={form.source} onChange={(e) => setForm({...form, source: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white">
                  <option>Website</option>
                  <option>Campaign</option>
                  <option>Referral</option>
                </select>
                <label className="text-slate-400 text-sm">Status</label>
                <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white">
                  <option>Hot</option>
                  <option>Warm</option>
                  <option>Cold</option>
                </select>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-700 rounded-lg text-sm text-white">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-sky-500 rounded-lg text-sm text-white">{submitting ? 'Adding...' : 'Add'}</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
