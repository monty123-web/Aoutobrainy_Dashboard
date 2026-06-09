import { Users, MessageSquare, TrendingUp, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    title: "Total Contacts",
    value: "12,540",
    change: "+8.2%",
    positive: true,
    icon: Users,
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    title: "Messages Sent",
    value: "1,25,450",
    change: "+14.5%",
    positive: true,
    icon: MessageSquare,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Open Rate",
    value: "87.6%",
    change: "+2.1%",
    positive: true,
    icon: TrendingUp,
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    title: "Active Campaigns",
    value: "24",
    change: "-3",
    positive: false,
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className={`kpi-card hover:border-slate-600/60 transition-all duration-200`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                <Icon size={18} className={`bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: 'transparent', fill: 'currentcolor' }} />
                {/* fallback plain icon */}
                <Icon size={18} className="text-white absolute opacity-0" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
            <p className="text-white text-2xl font-bold tracking-tight">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
