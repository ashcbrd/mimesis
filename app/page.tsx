"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/synthesize");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0faff] via-[#e6f2ff] to-[#d4e7ff] flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
        Generate AI Teachers Instantly
      </h1>

      <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700">
        Create virtual instructors that speak your script, perfect for training,
        e-learning, and classroom simulation.
      </p>

      <button
        onClick={handleGetStarted}
        className="mt-10 bg-white/80 hover:bg-white text-gray-900 font-semibold text-base px-8 py-4 rounded-xl shadow-md backdrop-blur-sm transition-transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
}
