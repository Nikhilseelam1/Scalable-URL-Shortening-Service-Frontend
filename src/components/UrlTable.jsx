import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUrl } from "../api/url.api.js";
import { copyToClipboard } from "../utils/clipboard.js";
import { formatDate } from "../utils/formatDate.js";

const UrlTable = ({ urls, onDeleted }) => {
  const [copiedCode, setCopiedCode] = useState(null);
  const navigate = useNavigate();

  const handleCopy = async (shortUrl, shortCode) => {
    await copyToClipboard(shortUrl);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDelete = async (shortCode) => {
    if (!confirm("Delete this URL?")) return;
    try {
      await deleteUrl(shortCode);
      onDeleted();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  if (!urls.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-500">
        No URLs yet. Shorten your first URL above.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">Original URL</th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">Short Code</th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">Clicks</th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">Expires</th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {urls.map((url) => (
            <tr key={url._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 max-w-xs truncate text-gray-700">{url.originalUrl}</td>
              <td className="px-4 py-3 font-mono text-gray-900">{url.shortCode}</td>
              <td className="px-4 py-3 text-gray-700">{url.clickCount}</td>
              <td className="px-4 py-3 text-gray-500">{formatDate(url.expiresAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(`${window.location.origin}/api/${url.shortCode}`, url.shortCode)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                  >
                    {copiedCode === url.shortCode ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => navigate(`/analytics/${url.shortCode}`)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => handleDelete(url.shortCode)}
                    className="text-xs px-2 py-1 border border-red-200 text-red-500 rounded hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;