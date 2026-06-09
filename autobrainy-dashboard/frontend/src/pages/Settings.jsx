import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { User, Smartphone } from "lucide-react";

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const [whatsapp, setWhatsapp] = useState({
    phoneNumberId: "",
    accessToken: "",
    businessAccountId: "",
    webhookVerifyToken: "",
  });

  useEffect(() => {
    loadWhatsappSettings();
  }, []);

  async function loadWhatsappSettings() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/settings/whatsapp"
      );

      setWhatsapp(res.data);
    } catch (err) {
      console.error("Load Error:", err);
    }
  }

  async function saveWhatsappSettings() {
    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/settings/whatsapp",
        whatsapp
      );

      alert("WhatsApp settings saved successfully");
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <Navbar
          title="Settings"
          subtitle="Manage your account and preferences"
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Profile */}
          <div className="kpi-card space-y-4 p-6">
            <div className="flex items-center gap-2">
              <User size={17} className="text-sky-400" />
              <h3 className="text-white font-semibold">Profile</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Admin User"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />

              <input
                type="email"
                placeholder="admin@autobrainy.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />

              <input
                type="text"
                placeholder="+91 9876543210"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />

              <input
                type="text"
                placeholder="My Business"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>
          </div>

          {/* WhatsApp Configuration */}
          <div className="kpi-card space-y-4 p-6">
            <div className="flex items-center gap-2">
              <Smartphone size={17} className="text-emerald-400" />
              <h3 className="text-white font-semibold">
                WhatsApp Configuration
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Phone Number ID
                </label>

                <input
                  type="text"
                  value={whatsapp.phoneNumberId}
                  onChange={(e) =>
                    setWhatsapp({
                      ...whatsapp,
                      phoneNumberId: e.target.value,
                    })
                  }
                  placeholder="Enter Phone Number ID"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Access Token
                </label>

                <input
                  type="password"
                  value={whatsapp.accessToken}
                  onChange={(e) =>
                    setWhatsapp({
                      ...whatsapp,
                      accessToken: e.target.value,
                    })
                  }
                  placeholder="Enter Access Token"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Business Account ID
                </label>

                <input
                  type="text"
                  value={whatsapp.businessAccountId}
                  onChange={(e) =>
                    setWhatsapp({
                      ...whatsapp,
                      businessAccountId: e.target.value,
                    })
                  }
                  placeholder="Enter WABA ID"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Webhook Verify Token
                </label>

                <input
                  type="text"
                  value={whatsapp.webhookVerifyToken}
                  onChange={(e) =>
                    setWhatsapp({
                      ...whatsapp,
                      webhookVerifyToken: e.target.value,
                    })
                  }
                  placeholder="autobrainy123"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
            </div>

            <button
              onClick={saveWhatsappSettings}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl"
            >
              {loading ? "Saving..." : "Save WhatsApp Settings"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}