export type TimelineEntry = {
  period: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  skills: string[];
};

// Built from GitHub repository dates and the resume. Oldest first.
export const skillsTimeline: TimelineEntry[] = [
  {
    period: "Aug 2024",
    title: { en: "Web fundamentals", hi: "वेब की बुनियाद" },
    description: {
      en: "First portfolio, an Amazon landing page clone and a tic-tac-toe game.",
      hi: "पहला पोर्टफोलियो, Amazon लैंडिंग पेज क्लोन और एक टिक-टैक-टो गेम।",
    },
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    period: "Sept 2024 – Jan 2025",
    title: { en: "MERN Stack Intern", hi: "MERN स्टैक इंटर्न" },
    description: {
      en: "Built React UIs and integrated REST APIs in Agile sprints at Startappss System.",
      hi: "Startappss System में Agile स्प्रिंट्स में React UI बनाए और REST API इंटीग्रेट किए।",
    },
    skills: ["React", "Tailwind CSS", "REST APIs", "Agile"],
  },
  {
    period: "Feb – Mar 2025",
    title: { en: "Full-stack MERN — DevTinder", hi: "फुल-स्टैक MERN — DevTinder" },
    description: {
      en: "Designed a backend from scratch: auth, database models and a connection-request system.",
      hi: "शुरू से बैकएंड डिज़ाइन किया: ऑथ, डेटाबेस मॉडल्स और कनेक्शन-रिक्वेस्ट सिस्टम।",
    },
    skills: ["Node.js", "Express.js", "MongoDB", "JWT", "Redux Toolkit"],
  },
  {
    period: "Mar – Oct 2025",
    title: { en: "Associate Software Engineer", hi: "एसोसिएट सॉफ्टवेयर इंजीनियर" },
    description: {
      en: "Production UIs at GammaEdge Technologies with TypeScript and Material UI, shipped through CI/CD.",
      hi: "GammaEdge Technologies में TypeScript और Material UI के साथ प्रोडक्शन UI, CI/CD के जरिए शिप किए।",
    },
    skills: ["TypeScript", "Material UI", "GitLab", "CI/CD"],
  },
  {
    period: "Feb 2026",
    title: { en: "Full-stack Next.js", hi: "फुल-स्टैक Next.js" },
    description: {
      en: "A video-sharing app with NextAuth, protected API routes and ImageKit uploads.",
      hi: "NextAuth, सुरक्षित API रूट्स और ImageKit अपलोड के साथ एक वीडियो-शेयरिंग ऐप।",
    },
    skills: ["Next.js", "NextAuth.js", "Mongoose", "ImageKit"],
  },
  {
    period: "Jul – Aug 2026",
    title: { en: "AI integrations", hi: "AI इंटीग्रेशन" },
    description: {
      en: "Netflix GPT with AI movie search on the Gemini API, and a deployed MERN Todo app.",
      hi: "Gemini API पर AI मूवी सर्च वाला Netflix GPT, और डिप्लॉय किया गया MERN Todo ऐप।",
    },
    skills: ["Gemini API", "Firebase", "React 19", "Vite"],
  },
  {
    period: "Sept 2026 – Now",
    title: { en: "Building with Claude Code", hi: "Claude Code के साथ बनाना" },
    description: {
      en: "Using Claude Code to build multiple websites — Nibblr, Brightway Solar and this portfolio — and experimenting with new AI-assisted workflows.",
      hi: "Claude Code से कई वेबसाइट्स बना रहा हूं — Nibblr, Brightway Solar और यह पोर्टफोलियो — और नए AI-असिस्टेड वर्कफ़्लो के साथ प्रयोग कर रहा हूं।",
    },
    skills: ["Claude Code", "Next.js 16", "Leaflet", "Jest", "Vercel"],
  },
];
