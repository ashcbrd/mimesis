export type VoiceQuality = "low" | "medium" | "high";

export interface VoiceOption {
  label: string;
  value: string;
  sample: string;
  sampleFile: string;
  quality: VoiceQuality;
}

export const voiceOptions: VoiceOption[] = [
  {
    label: "Amy (US)",
    value: "amy-medium/en_US-amy-medium.onnx",
    sample: "Hey there! I’m Amy, your cheerful voice buddy.",
    sampleFile: "amy.wav",
    quality: "medium",
  },
  {
    label: "Bryce (US)",
    value: "bryce-medium/en_US-bryce-medium.onnx",
    sample: "What’s up? Bryce here — let’s rock this text!",
    sampleFile: "bryce.wav",
    quality: "medium",
  },
  {
    label: "Danny (US)",
    value: "danny-low/en_US-danny-low.onnx",
    sample: "Yo! Danny in the house. Smooth and low, ready to go.",
    sampleFile: "danny.wav",
    quality: "low",
  },
  {
    label: "Joe (US)",
    value: "joe-medium/en_US-joe-medium.onnx",
    sample: "Hey, I’m Joe. Just keeping it cool and clear.",
    sampleFile: "joe.wav",
    quality: "medium",
  },
  {
    label: "John (US)",
    value: "john-medium/en_US-john-medium.onnx",
    sample: "Hi, John here. Ready when you are!",
    sampleFile: "john.wav",
    quality: "medium",
  },
  {
    label: "Kathleen (US)",
    value: "kathleen-low/en_US-kathleen-low.onnx",
    sample: "Need a calm and cozy vibe? Kathleen’s got you.",
    sampleFile: "kathleen.wav",
    quality: "low",
  },
  {
    label: "Kristin (US)",
    value: "kristin-medium/en_US-kristin-medium.onnx",
    sample: "Kristin speaking! Let’s make your words sparkle.",
    sampleFile: "kristin.wav",
    quality: "medium",
  },
  {
    label: "Kusal (US)",
    value: "kusal-medium/en_US-kusal-medium.onnx",
    sample: "Hi, I’m Kusal — crisp, clear, and confident.",
    sampleFile: "kusal.wav",
    quality: "medium",
  },
  {
    label: "L2Arctic (US)",
    value: "l2arctic-medium/en_US-l2arctic-medium.onnx",
    sample: "Arctic breeze incoming! I’m L2, ready to voice your script.",
    sampleFile: "l2arctic.wav",
    quality: "medium",
  },
  {
    label: "Lessac (US)",
    value: "lessac-high/en_US-lessac-high.onnx",
    sample: "Lessac here — a bit dramatic, always dynamic.",
    sampleFile: "lessac.wav",
    quality: "high",
  },
  {
    label: "LibriTTS R (US)",
    value: "libritts_r-medium/en_US-libritts_r-medium.onnx",
    sample: "I’m LibriTTS R — robotic but reliable!",
    sampleFile: "libritts_r.wav",
    quality: "medium",
  },
  {
    label: "LibriTTS High (US)",
    value: "libritts-high/en_US-libritts-high.onnx",
    sample: "Hello from LibriTTS High! Fast, fun, and fearless.",
    sampleFile: "libritts.wav",
    quality: "high",
  },
  {
    label: "Norman (US)",
    value: "norman-medium/en_US-norman-medium.onnx",
    sample: "Hey, Norman here — steady and smooth.",
    sampleFile: "norman.wav",
    quality: "medium",
  },
  {
    label: "Reza (US)",
    value: "reza_ibrahim-medium/en_US-reza_ibrahim-medium.onnx",
    sample: "Reza at your service — smooth delivery guaranteed!",
    sampleFile: "reza.wav",
    quality: "medium",
  },
  {
    label: "Ryan (US)",
    value: "ryan-high/en_US-ryan-high.onnx",
    sample: "I’m Ryan — upbeat and ready to go!",
    sampleFile: "ryan.wav",
    quality: "high",
  },
];
