"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaDownload, FaHeadphones } from "react-icons/fa";

export default function GeneratedAudios() {
  const [audios, setAudios] = useState<string[]>([]);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const fetchAudios = async () => {
    const res = await fetch("/api/generated-audios");
    const data = await res.json();
    setAudios(data.files);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await fetch(`/api/generated-audios?name=${encodeURIComponent(toDelete)}`, {
      method: "DELETE",
    });
    setToDelete(null);
    fetchAudios();
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fcff] via-[#eaf4ff] to-[#d9ebff] text-gray-900 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-16">
        <h1 className="text-5xl font-extrabold text-center tracking-tight">
          🎧 Generated Audios
        </h1>

        <div className="grid gap-8">
          {audios.length === 0 && (
            <p className="text-center text-gray-600 italic">
              No audio files found.
            </p>
          )}

          {audios.map((file) => (
            <div
              key={file}
              className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-md px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition hover:shadow-lg"
            >
              <div className="flex-1 space-y-2">
                <p className="font-semibold text-blue-700 break-words text-sm sm:text-base flex items-center gap-2">
                  <FaHeadphones className="text-blue-500" />
                  {file}
                </p>
                <audio
                  controls
                  src={`/api/audio?path=${file}`}
                  className="w-full rounded-md"
                />
              </div>

              <div className="flex gap-3 sm:flex-col sm:items-end">
                <a
                  href={`/api/audio?path=${file}`}
                  download
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition"
                >
                  <FaDownload /> Download
                </a>
                <button
                  onClick={() => setToDelete(file)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {toDelete && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-xl border border-blue-100 space-y-6">
              <h2 className="text-2xl font-bold text-red-600">Delete Audio?</h2>
              <p className="text-gray-600 text-sm">
                Are you sure you want to permanently delete{" "}
                <span className="font-semibold text-red-700 break-words">
                  {toDelete}
                </span>
                ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setToDelete(null)}
                  className="bg-gray-200 hover:bg-gray-300 px-5 py-2.5 rounded-full text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
