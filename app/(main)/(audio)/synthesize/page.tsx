"use client";

import { useState, useRef } from "react";
import { voiceOptions, VoiceOption } from "@/lib/voice-options";

export default function SynthesizePage() {
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  const togglePlay = (voice: VoiceOption) => {
    const audio = audioRefs.current[voice.value];
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      initVisualizer(voice);
    } else {
      audio.pause();
    }
  };

  const initVisualizer = (voice: VoiceOption) => {
    const audio = audioRefs.current[voice.value];
    const canvas = canvasRefs.current[voice.value];
    if (!audio || !canvas) return;

    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      requestAnimationFrame(render);
      analyser.getByteTimeDomainData(dataArray);

      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "#ffffff10";
      ctx!.fillRect(0, 0, width, height);

      ctx!.lineWidth = 2;
      ctx!.strokeStyle = "#1D4ED8";
      ctx!.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;
        if (i === 0) {
          ctx!.moveTo(x, y);
        } else {
          ctx!.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx!.lineTo(width, height / 2);
      ctx!.stroke();
    };

    render();
  };

  const handleSubmit = async () => {
    if (!selectedVoice) return;

    const formData = new FormData();
    formData.append("model", selectedVoice.value);
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("text", text);
    }

    setIsLoading(true);
    setAudioUrl("");
    setDownloadName("");

    const res = await fetch("/api/synthesize", {
      method: "POST",
      body: formData,
    });

    setIsLoading(false);

    if (res.ok) {
      const { audioPath } = await res.json();
      const url = `/api/audio?path=${encodeURIComponent(audioPath)}`;
      setAudioUrl(url);
      setDownloadName(audioPath);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fcff] via-[#e7f3ff] to-[#d4eaff] text-gray-900 px-6 py-16 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        <h1 className="text-5xl font-extrabold text-center tracking-tight leading-tight">
          🎤 Generate AI Teachers Instantly
        </h1>

        {!selectedVoice && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {voiceOptions.map((voice) => (
              <div
                key={voice.value}
                className="group relative rounded-2xl bg-white/70 backdrop-blur-lg border border-white/30 p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="mb-4 space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {voice.label}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${
                      voice.quality === "high"
                        ? "bg-green-100 text-green-800"
                        : voice.quality === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {voice.quality.toUpperCase()} QUALITY
                  </span>
                  <p className="text-sm italic text-gray-600">
                    “{voice.sample}”
                  </p>
                </div>

                <audio
                  ref={(el) => {
                    audioRefs.current[voice.value] = el;
                  }}
                  src={`/api/audio?path=voice-samples/${voice.sampleFile}`}
                  className="hidden"
                />
                <button
                  onClick={() => togglePlay(voice)}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-full transition"
                >
                  ▶️ / ⏸️ Play Sample
                </button>
                <canvas
                  ref={(el) => {
                    canvasRefs.current[voice.value] = el;
                  }}
                  width={250}
                  height={60}
                  className="mt-4 bg-white border border-gray-200 rounded-lg w-full"
                />
                <button
                  onClick={() => setSelectedVoice(voice)}
                  className="mt-5 w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 rounded-full transition"
                >
                  ✅ Use This Voice
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedVoice && (
          <div className="space-y-10">
            <div className="text-center">
              <p className="text-xl font-medium">
                🎤 Using voice:{" "}
                <span className="text-blue-700 font-semibold">
                  {selectedVoice.label}
                </span>
              </p>
              <button
                onClick={() => setSelectedVoice(null)}
                className="mt-1 text-sm text-blue-500 underline"
              >
                🔁 Pick a Different Voice
              </button>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              <textarea
                placeholder="Type your script here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-800 p-4 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={5}
              />

              <input
                type="file"
                accept=".txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-700 file:bg-blue-600 file:text-white file:rounded-full file:px-4 file:py-2 file:border-0"
              />

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full text-white font-bold py-3 rounded-full ${
                  isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                } transition`}
              >
                {isLoading ? "🔄 Generating..." : "🔊 Generate Speech"}
              </button>

              {isLoading && (
                <div className="w-full bg-blue-100 border border-blue-300 mt-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 text-white text-xs font-bold text-center py-1 animate-pulse">
                    🔄 Generating speech, please wait...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {audioUrl && (
          <div className="mt-16 text-center space-y-4">
            <audio
              controls
              src={audioUrl}
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
            <a
              href={audioUrl}
              download={downloadName}
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-full transition"
            >
              ⬇️ Download Speech
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
