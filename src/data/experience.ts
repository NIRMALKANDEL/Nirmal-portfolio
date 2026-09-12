export type Experience = {
  role: string;
  company: string;
  duration: string;
  location?: string;
  bullets: { en: string; hi: string };
  bulletList: { en: string[]; hi: string[] };
  isEngineering: boolean;
  featuredOnHome: boolean;
};

// Sourced directly from resume. Reverse-chronological order.
export const experience: Experience[] = [
  {
    role: "Recruiter",
    company: "LanceSoft Inc.",
    duration: "Dec 2025 – Apr 2026",
    bullets: { en: "", hi: "" },
    bulletList: {
      en: [
        "Managed end-to-end recruitment for US healthcare professionals.",
        "Sourced, screened, and coordinated candidates through the hiring pipeline.",
      ],
      hi: [
        "US स्वास्थ्य सेवा पेशेवरों के लिए एंड-टू-एंड भर्ती का प्रबंधन किया।",
        "हायरिंग पाइपलाइन के माध्यम से उम्मीदवारों को सोर्स, स्क्रीन और समन्वित किया।",
      ],
    },
    isEngineering: false,
    featuredOnHome: false,
  },
  {
    role: "Associate Software Engineer",
    company: "GammaEdge Technologies",
    duration: "Mar 2025 – Oct 2025",
    bullets: { en: "", hi: "" },
    bulletList: {
      en: [
        "Developed production-ready, responsive UIs using React, TypeScript, and Material UI.",
        "Integrated backend APIs for seamless data retrieval and updates.",
        "Collaborated closely with backend developers to optimize API structure and performance.",
        "Used GitLab and CI/CD pipelines for deployment and version control.",
      ],
      hi: [
        "React, TypeScript और Material UI का उपयोग करके प्रोडक्शन-रेडी, रिस्पॉन्सिव UI विकसित किए।",
        "डेटा रिट्रीवल और अपडेट के लिए बैकएंड API को इंटीग्रेट किया।",
        "API संरचना और परफॉर्मेंस को ऑप्टिमाइज़ करने के लिए बैकएंड डेवलपर्स के साथ मिलकर काम किया।",
        "डिप्लॉयमेंट और वर्जन कंट्रोल के लिए GitLab और CI/CD पाइपलाइन का उपयोग किया।",
      ],
    },
    isEngineering: true,
    featuredOnHome: true,
  },
  {
    role: "MERN Stack Intern (Full-time)",
    company: "Startappss System",
    duration: "Sept 2024 – Jan 2025",
    bullets: { en: "", hi: "" },
    bulletList: {
      en: [
        "Designed and implemented REST API integration between frontend and backend services.",
        "Built responsive UI components in React.js and Tailwind CSS.",
        "Participated in Agile sprints, working on both frontend and backend enhancements.",
      ],
      hi: [
        "फ्रंटएंड और बैकएंड सेवाओं के बीच REST API इंटीग्रेशन को डिज़ाइन और लागू किया।",
        "React.js और Tailwind CSS में रिस्पॉन्सिव UI कंपोनेंट्स बनाए।",
        "फ्रंटएंड और बैकएंड दोनों एन्हांसमेंट्स पर काम करते हुए Agile स्प्रिंट्स में भाग लिया।",
      ],
    },
    isEngineering: true,
    featuredOnHome: true,
  },
];
