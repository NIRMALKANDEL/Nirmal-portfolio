export type EducationItem = {
  level: "primary" | "secondary";
  degree: { en: string; hi: string };
  institution: string;
  university?: string;
  duration?: string;
};

// Sourced from resume. Percentages/CGPA are omitted where not provided
// on the resume rather than estimated.
export const education: EducationItem[] = [
  {
    level: "primary",
    degree: { en: "B.Tech, Computer Science Engineering", hi: "बी.टेक, कंप्यूटर साइंस इंजीनियरिंग" },
    institution: "Sushila Devi Bansal College of Technology (SDBCT), Indore",
    university: "RGPV University",
    duration: "2020 – 2024",
  },
  {
    level: "secondary",
    degree: { en: "Class XII", hi: "कक्षा XII" },
    institution: "Carmel Convent Higher Secondary School",
  },
  {
    level: "secondary",
    degree: { en: "Class X", hi: "कक्षा X" },
    institution: "Carmel Convent Higher Secondary School",
  },
];
