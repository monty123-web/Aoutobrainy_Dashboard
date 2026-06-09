import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <MessageSquare size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-none">Autobrainy</h1>
              <p className="text-slate-500 text-xs">WhatsApp Marketing Platform</p>
            </div>
          </div>

          <h2 className="text-white font-bold text-2xl mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-6">Sign in to your dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm block mb-1.5">Email</label>
              <input
                type="email"
                placeholder="admin@autobrainy.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none focus:border-sky-500 transition-colors"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none focus:border-sky-500 transition-colors pr-12"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-slate-600 text-xs text-center mt-6">
            Demo: Use any email & password to login
          </p>
        </div>
      </div>
    </div>
  );
}
