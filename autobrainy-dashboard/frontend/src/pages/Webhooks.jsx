import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Zap, PlusCircle, Activity, CheckCircle, Clock3 } from "lucide-react";

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", url: "", events: "", active: true });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadWebhooks() {
      try {
        const response = await axios.get("http://localhost:5000/api/webhooks");
        setWebhooks(response.data || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    }
    loadWebhooks();
  }, []);

  async function createWebhook(e) {
    e?.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        url: form.url,
        events: form.events.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const res = await axios.post("http://localhost:5000/api/webhooks", payload);
      setWebhooks((w) => [res.data, ...w]);
      setShowModal(false);
      setForm({ name: "", url: "", events: "", active: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function triggerWebhook(id) {
    try {
      await axios.post(`http://localhost:5000/api/webhooks/${id}/trigger`, { payload: { test: true } });
      // update lastTriggered in UI
      setWebhooks((list) => list.map((w) => (w.id === id ? { ...w, lastTriggered: new Date().toISOString() } : w)));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  async function deleteWebhook(id) {
    try {
      await axios.delete(`http://localhost:5000/api/webhooks/${id}`);
      setWebhooks((list) => list.filter((w) => w.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Webhooks" subtitle="Manage outbound webhook integrations" />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            {[
              { label: "Active Webhooks", value: webhooks.filter((w) => w.active).length, icon: CheckCircle, color: "text-emerald-300" },
              { label: "Total Webhooks", value: webhooks.length, icon: Zap, color: "text-sky-300" },
              { label: "Failed Runs", value: "N/A", icon: Activity, color: "text-orange-300" },
              { label: "Last Sync", value: webhooks[0]?.lastTriggered || "Never", icon: Clock3, color: "text-violet-300" },
            ].map((item) => (
              <div key={item.label} className="kpi-card p-5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-[0.24em]">{item.label}</p>
                    <p className="text-white text-3xl font-semibold mt-2">{item.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="kpi-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-xl font-semibold">Webhook subscriptions</h2>
                <p className="text-slate-500 text-sm">Create and manage webhook endpoints for system events.</p>
              </div>
              <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-sky-400 transition-colors">
                <PlusCircle size={16} />
                Add Webhook
              </button>
            </div>

            {loading && <p className="text-slate-400">Loading webhooks...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading && !error && webhooks.length === 0 && (
              <p className="text-slate-400">No webhooks configured yet. Add one from the backend API or your configuration system.</p>
            )}

            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div>
                      <p className="text-white text-lg font-semibold">{webhook.name}</p>
                      <p className="text-slate-500 text-sm mt-1">{webhook.url}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-2 text-slate-400 text-xs">
                        <span className="bg-slate-800 px-3 py-1 rounded-full">Events: {webhook.events?.join(", ") || "None"}</span>
                        <span className="bg-slate-800 px-3 py-1 rounded-full">Status: {webhook.active ? "Active" : "Inactive"}</span>
                        <span className="bg-slate-800 px-3 py-1 rounded-full">Last Triggered: {webhook.lastTriggered || "Never"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => triggerWebhook(webhook.id)} className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-sky-300">Trigger</button>
                        <button onClick={() => deleteWebhook(webhook.id)} className="px-3 py-1 bg-rose-600 rounded-lg text-sm text-white">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <form onSubmit={createWebhook} className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-800">
                <h3 className="text-white text-lg font-semibold mb-4">Add Webhook</h3>
                <label className="text-slate-400 text-sm">Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" />
                <label className="text-slate-400 text-sm">URL</label>
                <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" />
                <label className="text-slate-400 text-sm">Events (comma separated)</label>
                <input value={form.events} onChange={(e) => setForm((f) => ({ ...f, events: e.target.value }))} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" />
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} /> Active</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1 bg-slate-700 rounded-lg text-sm text-white">Cancel</button>
                    <button type="submit" disabled={submitting} className="px-3 py-1 bg-sky-500 rounded-lg text-sm text-white">{submitting ? 'Saving...' : 'Save'}</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
