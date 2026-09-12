export type SkillGroup = {
  key: "frontend" | "backend" | "database" | "tools";
  items: string[];
};

// Verified against resume + NIRMALKANDEL GitHub repositories (devTinder,
// devTinder-web, netflix-gpt, mern-todo, NEXT-project-imagekit).
export const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    items: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
    ],
  },
  {
    key: "backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    key: "database",
    items: ["MongoDB", "Firebase"],
  },
  {
    key: "tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "CI/CD",
      "Jest",
      "Postman",
      "Jira",
      "Figma",
    ],
  },
];
