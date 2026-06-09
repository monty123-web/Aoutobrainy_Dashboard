import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICards from "../components/KPICards";
import CampaignTable from "../components/CampaignTable";
import LeadsTable from "../components/LeadsTable";
import { MessageChart, ContactGrowthChart, DeliveryChart } from "../components/Charts";
import { TrendingUp, Users, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <Navbar
          title="Dashboard"
          subtitle="Welcome back, Admin 👋  Here's what's happening today"
        />

        <main className="flex-1 p-6 space-y-6">
          {/* KPI Cards */}
          <KPICards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <MessageChart />
            </div>
            <div>
              <DeliveryChart />
            </div>
          </div>

          {/* Contact Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CampaignTable />
            </div>
            <div className="kpi-card space-y-4">
              <h3 className="text-white font-semibold">Quick Actions</h3>
              <button onClick={() => navigate('/campaigns')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/15 transition-colors text-left">
                <MessageSquare size={18} className="text-sky-400" />
                <div>
                  <p className="text-white text-sm font-medium">Send Broadcast</p>
                  <p className="text-slate-500 text-xs">Reach all contacts at once</p>
                </div>
              </button>
              <button onClick={() => navigate('/contacts')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15 transition-colors text-left">
                <Users size={18} className="text-violet-400" />
                <div>
                  <p className="text-white text-sm font-medium">Import Contacts</p>
                  <p className="text-slate-500 text-xs">Upload CSV or Excel file</p>
                </div>
              </button>
              <button onClick={() => navigate('/analytics')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors text-left">
                <TrendingUp size={18} className="text-emerald-400" />
                <div>
                  <p className="text-white text-sm font-medium">View Analytics</p>
                  <p className="text-slate-500 text-xs">Deep dive into reports</p>
                </div>
              </button>
            </div>
          </div>

          {/* Leads Table */}
          <ContactGrowthChart />
          <LeadsTable />
        </main>
      </div>
    </div>
  );
}
