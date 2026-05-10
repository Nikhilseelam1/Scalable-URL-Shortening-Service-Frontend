import { useState } from "react";
import { shortenUrl } from "../api/url.api.js";

const UrlForm = ({ onCreated }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { originalUrl };
      if (customAlias) payload.customAlias = customAlias;
      if (expiresAt) payload.expiresAt = expiresAt;
      await shortenUrl(payload);
      setOriginalUrl("");
      setCustomAlias("");
      setExpiresAt("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Shorten a URL</h2>
      <div className="flex flex-col gap-3">
        <input
          type="url"
          placeholder="https://example.com"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 w-full"
          />
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition disabled:opacity-50 self-start"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>
    </form>
  );
};

export default UrlForm;