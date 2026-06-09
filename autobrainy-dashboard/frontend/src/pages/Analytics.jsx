import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { MessageChart, ContactGrowthChart, DeliveryChart } from "../components/Charts";

export default function Analytics() {
  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar title="Analytics" subtitle="Track your WhatsApp marketing performance" />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2"><MessageChart /></div>
            <div><DeliveryChart /></div>
          </div>
          <ContactGrowthChart />
        </main>
      </div>
    </div>
  );
}
