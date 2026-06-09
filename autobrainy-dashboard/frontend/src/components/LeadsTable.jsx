import { Phone, MessageSquare, Trash2 } from "lucide-react";

const statusColors = {
  Hot: "bg-red-500/10 text-red-400 border-red-500/20",
  Warm: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cold: "bg-sky-500/10 text-sky-400 border-sky-500/20",
};

export default function LeadsTable({ leads = [], onDelete = () => {} }) {
  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Recent Leads</h3>
        <button className="text-sky-400 text-sm hover:text-sky-300 transition-colors">View All →</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">Name</th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">Mobile</th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">Source</th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">City</th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">Status</th>
              <th className="text-right text-slate-500 font-medium pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="table-row">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {lead.name[0]}
                    </div>
                    <span className="text-white font-medium">{lead.name}</span>
                  </div>
                </td>
                <td className="py-3.5 pr-4 text-slate-400 font-mono text-xs">{lead.mobile}</td>
                <td className="py-3.5 pr-4 text-slate-400">{lead.source}</td>
                <td className="py-3.5 pr-4 text-slate-400">{lead.city}</td>
                <td className="py-3.5 pr-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[lead.status]}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                      <MessageSquare size={13} className="text-emerald-400" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition-colors">
                      <Phone size={13} className="text-sky-400" />
                    </button>
                    <button onClick={() => onDelete(lead.id)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                      <Trash2 size={13} className="text-red-400" />
                    </button>
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
