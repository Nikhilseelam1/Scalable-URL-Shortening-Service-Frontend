import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import UrlForm from "../components/UrlForm.jsx";
import UrlTable from "../components/UrlTable.jsx";
import StatCard from "../components/StatCard.jsx";
import { getMyUrls } from "../api/url.api.js";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      const res = await getMyUrls();
      setUrls(res.data.data || []);
    } catch {
      setUrls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const totalClicks = urls.reduce((sum, u) => sum + (u.clickCount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total URLs" value={urls.length} />
          <StatCard label="Total Clicks" value={totalClicks} />
          <StatCard label="Active URLs" value={urls.filter((u) => u.isActive).length} />
        </div>
        <div className="mb-6">
          <UrlForm onCreated={fetchUrls} />
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Loading URLs...</p>
        ) : (
          <UrlTable urls={urls} onDeleted={fetchUrls} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;