import { Trash2 } from "lucide-react";

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Scheduled: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Completed: "bg-slate-600/30 text-slate-400 border-slate-600/30",
  Paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function CampaignTable({ campaigns = [], onDelete = () => {} }) {
  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Recent Campaigns</h3>
        <button className="text-sky-400 text-sm hover:text-sky-300 transition-colors">View All →</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">Campaign</th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">Status</th>
              <th className="text-right text-slate-500 font-medium pb-3 pr-4">Sent</th>
              <th className="text-right text-slate-500 font-medium pb-3 pr-4">Opened</th>
              <th className="text-right text-slate-500 font-medium pb-3 pr-4">Replied</th>
              <th className="text-right text-slate-500 font-medium pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="table-row">
                <td className="py-3.5 pr-4">
                  <span className="text-white font-medium">{c.name}</span>
                </td>
                <td className="py-3.5 pr-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[c.status] || statusStyles.Paused}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-right text-slate-300">{c.sent || '—'}</td>
                <td className="py-3.5 pr-4 text-right text-slate-300">{c.opened || '—'}</td>
                <td className="py-3.5 pr-4 text-right text-slate-300">{c.replied || '—'}</td>
                <td className="py-3.5 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{c.date || new Date().toLocaleDateString()}</span>
                    <button onClick={() => onDelete(c.id)} className="text-red-400 hover:text-red-300 ml-2"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
