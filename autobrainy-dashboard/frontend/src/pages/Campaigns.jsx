import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CampaignTable from "../components/CampaignTable";
import { MessageChart } from "../components/Charts";
import axios from "axios";
import { PlusCircle } from "lucide-react";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", status: "Active", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      const res = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(res.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function createCampaign(e) {
    e?.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/api/campaigns", {
        name: form.name,
        status: form.status,
        message: form.message,
      });
      setCampaigns([res.data, ...campaigns]);
      setShowModal(false);
      setForm({ name: "", status: "Active", message: "" });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteCampaign(id) {
    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`);
      setCampaigns(campaigns.filter(c => c.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  const stats = [
    { label: "Total Campaigns", value: campaigns.length, color: "text-white" },
    { label: "Active", value: campaigns.filter(c => c.status === "Active").length, color: "text-emerald-400" },
    { label: "Scheduled", value: campaigns.filter(c => c.status === "Scheduled").length, color: "text-sky-400" },
    { label: "Completed", value: campaigns.filter(c => c.status === "Completed").length, color: "text-slate-400" },
  ];

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Campaigns" subtitle="Create and manage your WhatsApp campaigns" />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="kpi-card">
                <p className="text-slate-400 text-sm">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">Campaigns</h2>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-sky-400 transition-colors">
              <PlusCircle size={16} />
              New Campaign
            </button>
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <MessageChart />
          <CampaignTable campaigns={campaigns} onDelete={deleteCampaign} />

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <form onSubmit={createCampaign} className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-800">
                <h3 className="text-white text-lg font-semibold mb-4">Create Campaign</h3>
                <label className="text-slate-400 text-sm">Campaign Name</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" required />
                <label className="text-slate-400 text-sm">Status</label>
                <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white">
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Paused</option>
                </select>
                <label className="text-slate-400 text-sm">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" rows="3" />
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-700 rounded-lg text-sm text-white">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-sky-500 rounded-lg text-sm text-white">{submitting ? 'Saving...' : 'Create'}</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
