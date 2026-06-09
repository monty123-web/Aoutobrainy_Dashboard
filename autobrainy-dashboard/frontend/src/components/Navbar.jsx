import { Bell, Search, Plus } from "lucide-react";

export default function Navbar({ title, subtitle }) {
  return (
    <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div>
        <h2 className="text-white font-bold text-lg leading-none">{title}</h2>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 w-56">
          <Search size={14} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full"
          />
        </div>

        {/* New Campaign Button */}
        <button className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          <Plus size={16} />
          New Campaign
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors">
          <Bell size={16} className="text-slate-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
        </button>
      </div>
    </div>
  );
}
