import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { LifeBuoy, MessageSquare, Book, Video } from "lucide-react";

const tickets = [
  { id: "#TKT001", subject: "WhatsApp template not approved", status: "Open", date: "Nov 5, 2024" },
  { id: "#TKT002", subject: "CSV import fails for large files", status: "Resolved", date: "Oct 28, 2024" },
  { id: "#TKT003", subject: "Webhook not receiving messages", status: "In Progress", date: "Nov 3, 2024" },
];

const statusColors = {
  Open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "In Progress": "bg-sky-500/10 text-sky-400 border-sky-500/20",
};

export default function Support() {
  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Support" subtitle="Get help with Autobrainy" />
        <main className="flex-1 p-6 space-y-6">
          {/* Resources */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Book, label: "Documentation", desc: "Full API and feature docs", color: "sky" },
              { icon: Video, label: "Video Tutorials", desc: "Step-by-step guides", color: "violet" },
              { icon: MessageSquare, label: "Live Chat", desc: "Chat with our team", color: "emerald" },
            ].map(r => (
              <div key={r.label} className={`kpi-card cursor-pointer hover:border-slate-600/60 transition-all`}>
                <div className={`w-10 h-10 rounded-xl bg-${r.color}-500/10 border border-${r.color}-500/20 flex items-center justify-center mb-3`}>
                  <r.icon size={18} className={`text-${r.color}-400`} />
                </div>
                <p className="text-white font-semibold">{r.label}</p>
                <p className="text-slate-500 text-sm mt-0.5">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Tickets */}
          <div className="kpi-card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Support Tickets</h3>
              <button className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                <LifeBuoy size={15} /> New Ticket
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-slate-500 font-medium pb-3 pr-4">Ticket ID</th>
                  <th className="text-left text-slate-500 font-medium pb-3 pr-4">Subject</th>
                  <th className="text-left text-slate-500 font-medium pb-3 pr-4">Status</th>
                  <th className="text-right text-slate-500 font-medium pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(t => (
                  <tr key={t.id} className="table-row">
                    <td className="py-3.5 pr-4 font-mono text-xs text-slate-500">{t.id}</td>
                    <td className="py-3.5 pr-4 text-white">{t.subject}</td>
                    <td className="py-3.5 pr-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[t.status]}`}>{t.status}</span>
                    </td>
                    <td className="py-3.5 text-right text-slate-500">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
