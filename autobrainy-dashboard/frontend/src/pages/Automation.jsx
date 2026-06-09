import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Bot, Plus, Zap } from "lucide-react";

export default function Automation() {
  const [flows, setFlows] = useState([
    { name: "Welcome New Contact", trigger: "New Opt-in", steps: 3, active: true },
    { name: "Cart Abandonment", trigger: "No purchase in 24h", steps: 5, active: true },
    { name: "Post-Purchase Follow Up", trigger: "Order confirmed", steps: 4, active: false },
    { name: "Re-engagement Flow", trigger: "Inactive 30 days", steps: 6, active: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", trigger: "", active: true });
  const [submitting, setSubmitting] = useState(false);

  async function createFlow(e) {
    e?.preventDefault();
    setSubmitting(true);
    try {
      const newFlow = { name: form.name, trigger: form.trigger, steps: 1, active: form.active };
      setFlows([...flows, newFlow]);
      setShowModal(false);
      setForm({ name: "", trigger: "", active: true });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Automation" subtitle="Build WhatsApp chatbots and automated flows" />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {flows.map(f => (
              <div key={f.name} className="kpi-card hover:border-slate-600/60 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <Bot size={17} className="text-violet-400" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${f.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-600/20 text-slate-500 border-slate-600/20'}`}>
                    {f.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-1">{f.name}</h4>
                <p className="text-slate-500 text-sm mb-3">Trigger: {f.trigger}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Zap size={11} /> {f.steps} steps</span>
                </div>
              </div>
            ))}
            <div onClick={() => setShowModal(true)} className="kpi-card border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-sky-500/40 hover:bg-sky-500/5 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-2">
                  <Plus size={18} className="text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm font-medium">Create New Flow</p>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <form onSubmit={createFlow} className="bg-slate-900 p-6 rounded-2xl w-full max-w-md border border-slate-800">
                <h3 className="text-white text-lg font-semibold mb-4">Create Automation Flow</h3>
                <label className="text-slate-400 text-sm">Flow Name</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" required />
                <label className="text-slate-400 text-sm">Trigger</label>
                <input value={form.trigger} onChange={(e) => setForm({...form, trigger: e.target.value})} placeholder="e.g., New Opt-in" className="w-full mt-1 mb-3 p-2 rounded-md bg-slate-800 border border-slate-700 text-white" required />
                <label className="flex items-center gap-2 text-slate-300 text-sm">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} /> Active
                </label>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-700 rounded-lg text-sm text-white">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-sky-500 rounded-lg text-sm text-white">{submitting ? 'Creating...' : 'Create'}</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
