import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Send,
  Bot,
  BarChart3,
  CreditCard,
  Settings,
  LifeBuoy,
  MessageSquare,
  ChevronDown,
  Zap
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Contacts", path: "/contacts" },
  { icon: Send, label: "Campaigns", path: "/campaigns" },
  { icon: Zap, label: "Webhooks", path: "/webhooks" },
  { icon: Bot, label: "Automation", path: "/automation" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

const bottomItems = [
  { icon: CreditCard, label: "Billing", path: "/billing" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: LifeBuoy, label: "Support", path: "/support" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            <MessageSquare size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Autobrainy</h1>
            <p className="text-slate-500 text-xs mt-0.5">WhatsApp Platform</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Status Badge */}
      <div className="mx-3 mt-3 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 text-xs font-semibold">WhatsApp Connected</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 p-3 space-y-1 mt-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <div
            key={path}
            onClick={() => navigate(path)}
            className={`sidebar-link ${location.pathname === path ? "active" : ""}`}
          >
            <Icon size={18} />
            {label}
            {label === "Campaigns" && (
              <span className="ml-auto bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">24</span>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        {bottomItems.map(({ icon: Icon, label, path }) => (
          <div
            key={path}
            onClick={() => navigate(path)}
            className={`sidebar-link ${location.pathname === path ? "active" : ""}`}
          >
            <Icon size={18} />
            {label}
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Admin User</p>
            <p className="text-slate-500 text-xs truncate">admin@autobrainy.com</p>
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
}
