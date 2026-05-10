import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import StatCard from "../components/StatCard.jsx";
import { getAnalytics } from "../api/analytics.api.js";
import { formatDate } from "../utils/formatDate.js";

const Analytics = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAnalytics(shortCode);
        setData(res.data.data);
      } catch {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-900 transition"
          >
            ← Back
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Analytics — <span className="font-mono">{shortCode}</span>
          </h1>
        </div>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {data && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Clicks" value={data.totalClicks} />
              <StatCard label="Devices Tracked" value={data.deviceBreakdown.length} />
              <StatCard label="Browsers Tracked" value={data.browserBreakdown.length} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Device Breakdown</h2>
                {data.deviceBreakdown.length === 0 ? (
                  <p className="text-sm text-gray-400">No data</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-2 font-medium">Device</th>
                        <th className="pb-2 font-medium">Clicks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {data.deviceBreakdown.map((d) => (
                        <tr key={d._id}>
                          <td className="py-2 text-gray-700 capitalize">{d._id || "Unknown"}</td>
                          <td className="py-2 text-gray-900 font-medium">{d.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Browser Breakdown</h2>
                {data.browserBreakdown.length === 0 ? (
                  <p className="text-sm text-gray-400">No data</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-2 font-medium">Browser</th>
                        <th className="pb-2 font-medium">Clicks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {data.browserBreakdown.map((b) => (
                        <tr key={b._id}>
                          <td className="py-2 text-gray-700">{b._id || "Unknown"}</td>
                          <td className="py-2 text-gray-900 font-medium">{b.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;