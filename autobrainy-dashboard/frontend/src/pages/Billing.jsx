import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { CreditCard, Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    features: ["5,000 Messages/month", "1 WhatsApp Number", "Basic Analytics", "Email Support"],
    current: false,
  },
  {
    name: "Growth",
    price: "₹2,999",
    period: "/month",
    features: ["50,000 Messages/month", "3 WhatsApp Numbers", "Advanced Analytics", "Automation Flows", "Priority Support"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "₹7,999",
    period: "/month",
    features: ["Unlimited Messages", "Unlimited Numbers", "AI Chatbot", "Custom Integrations", "Dedicated Manager"],
    current: false,
  },
];

export default function Billing() {
  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Billing" subtitle="Manage your subscription and payments" />
        <main className="flex-1 p-6 space-y-6">
          {/* Current Usage */}
          <div className="kpi-card">
            <h3 className="text-white font-semibold mb-4">Current Plan Usage</h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Messages Used", value: "32,450", total: "50,000", pct: 65 },
                { label: "Contacts", value: "12,540", total: "Unlimited", pct: 0 },
                { label: "Campaigns", value: "24", total: "100", pct: 24 },
              ].map(u => (
                <div key={u.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">{u.label}</span>
                    <span className="text-white font-medium">{u.value} / {u.total}</span>
                  </div>
                  {u.pct > 0 && (
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" style={{ width: `${u.pct}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-3 gap-4">
            {plans.map(plan => (
              <div key={plan.name} className={`kpi-card relative ${plan.current ? 'border-sky-500/40 bg-sky-500/5' : ''}`}>
                {plan.current && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Current Plan
                  </span>
                )}
                <h4 className="text-white font-bold text-lg mb-1">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-white text-3xl font-bold">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <Check size={14} className="text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.current ? 'bg-sky-500/10 border border-sky-500/30 text-sky-400 cursor-default' : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:opacity-90'}`}>
                  {plan.current ? 'Active' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
