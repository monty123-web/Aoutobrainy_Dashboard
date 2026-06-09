import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Messages Sent",
      data: [2400, 3100, 4800, 6200, 7100, 8300, 7600],
      borderColor: "#0ea5e9",
      backgroundColor: "rgba(14,165,233,0.08)",
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: "#0ea5e9",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Messages Delivered",
      data: [2100, 2800, 4400, 5700, 6500, 7800, 7000],
      borderColor: "#8b5cf6",
      backgroundColor: "rgba(139,92,246,0.05)",
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: "#8b5cf6",
      tension: 0.4,
      fill: true,
    }
  ]
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Contacts",
      data: [800, 1200, 950, 1400, 1750, 2100],
      backgroundColor: "rgba(14,165,233,0.7)",
      borderRadius: 6,
      borderSkipped: false,
    }
  ]
};

const doughnutData = {
  labels: ["Delivered", "Read", "Replied", "Failed"],
  datasets: [
    {
      data: [65, 20, 10, 5],
      backgroundColor: ["#0ea5e9", "#8b5cf6", "#10b981", "#ef4444"],
      borderWidth: 0,
      hoverOffset: 6,
    }
  ]
};

const baseOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: "#94a3b8", font: { size: 12 } }
    },
    tooltip: {
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      borderWidth: 1,
      titleColor: "#f1f5f9",
      bodyColor: "#94a3b8",
    }
  },
  scales: {
    x: {
      grid: { color: "rgba(51,65,85,0.4)" },
      ticks: { color: "#64748b" }
    },
    y: {
      grid: { color: "rgba(51,65,85,0.4)" },
      ticks: { color: "#64748b" }
    }
  }
};

export function MessageChart() {
  return (
    <div className="kpi-card">
      <h3 className="text-white font-semibold mb-4">Message Activity (This Week)</h3>
      <Line data={lineData} options={baseOptions} />
    </div>
  );
}

export function ContactGrowthChart() {
  return (
    <div className="kpi-card">
      <h3 className="text-white font-semibold mb-4">Contact Growth</h3>
      <Bar data={barData} options={baseOptions} />
    </div>
  );
}

export function DeliveryChart() {
  return (
    <div className="kpi-card">
      <h3 className="text-white font-semibold mb-4">Delivery Status</h3>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40 flex-shrink-0">
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                  borderWidth: 1,
                  titleColor: "#f1f5f9",
                  bodyColor: "#94a3b8",
                }
              }
            }}
          />
        </div>
        <div className="space-y-3">
          {doughnutData.labels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[i] }}
              />
              <span className="text-slate-400 text-sm">{label}</span>
              <span className="text-white text-sm font-semibold ml-auto pl-4">
                {doughnutData.datasets[0].data[i]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
