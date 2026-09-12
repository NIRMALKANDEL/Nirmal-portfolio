export type ProjectLinks = {
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  live?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: { en: string; hi: string };
  description: { en: string; hi: string };
  problem: { en: string; hi: string };
  technologies: string[];
  features: { en: string[]; hi: string[] };
  implementation: { en: string[]; hi: string[] };
  links: ProjectLinks;
  status: "live" | "in-progress";
  featured: boolean;
  category: "AI / Full Stack" | "Full Stack" | "Full Stack CRUD";
  image: string;
};

// Content verified directly against github.com/NIRMALKANDEL repositories
// (package.json + source tree) and the resume. No invented features,
// metrics, or URLs.
export const projects: Project[] = [
  {
    slug: "netflix-gpt",
    title: "Netflix GPT",
    tagline: {
      en: "A Netflix-style streaming UI with GPT-powered movie search",
      hi: "GPT-संचालित मूवी सर्च के साथ नेटफ्लिक्स-स्टाइल स्ट्रीमिंग UI",
    },
    description: {
      en: "A Netflix-inspired movie browsing app built with React and Firebase. Users sign in with Firebase Authentication, browse Now Playing / Popular / Top Rated / Upcoming titles pulled from the TMDB API, watch trailers, and use an AI-powered search bar (built on Google's Gemini API) to get movie recommendations from natural-language queries.",
      hi: "React और Firebase से बना एक नेटफ्लिक्स-प्रेरित मूवी ब्राउज़िंग ऐप। उपयोगकर्ता Firebase Authentication से साइन इन करते हैं, TMDB API से Now Playing / Popular / Top Rated / Upcoming टाइटल ब्राउज़ करते हैं, ट्रेलर देखते हैं, और प्राकृतिक भाषा क्वेरी से मूवी सिफारिशें पाने के लिए Gemini API पर आधारित AI सर्च बार का उपयोग करते हैं।",
    },
    problem: {
      en: "Recreate a production-grade streaming UI end-to-end — auth, live movie data, and an AI layer on top — rather than a static clone.",
      hi: "एक स्टैटिक क्लोन के बजाय, प्रोडक्शन-ग्रेड स्ट्रीमिंग UI को शुरू से अंत तक फिर से बनाना — ऑथ, लाइव मूवी डेटा, और ऊपर एक AI लेयर।",
    },
    technologies: [
      "React 19",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Firebase Auth",
      "TMDB API",
      "Google Gemini AI",
    ],
    features: {
      en: [
        "Firebase Authentication (sign up, login, protected routes)",
        "Browse Now Playing, Popular, Top Rated & Upcoming movies via TMDB API",
        "AI-powered movie search using Google's Gemini API",
        "Trailer playback for movies and search results",
        "Redux Toolkit for global state (auth, movies, GPT search, UI config)",
        "Responsive, Netflix-style browse UI with header, hero banner and rows",
        "Static Help Center / Terms / Legal Notices pages",
      ],
      hi: [
        "Firebase Authentication (साइन अप, लॉगिन, प्रोटेक्टेड रूट्स)",
        "TMDB API के जरिए Now Playing, Popular, Top Rated और Upcoming मूवीज़ ब्राउज़ करें",
        "Google के Gemini API का उपयोग कर AI-संचालित मूवी सर्च",
        "मूवीज़ और सर्च रिजल्ट्स के लिए ट्रेलर प्लेबैक",
        "ग्लोबल स्टेट के लिए Redux Toolkit (auth, movies, GPT search, UI config)",
        "हेडर, हीरो बैनर और रो के साथ रिस्पॉन्सिव, नेटफ्लिक्स-स्टाइल ब्राउज़ UI",
        "स्टैटिक Help Center / Terms / Legal Notices पेज",
      ],
    },
    implementation: {
      en: [
        "Custom hooks (useNowPlayingMovies, usePopularMovies, useTopRatedMovies, useUpcomingMovies, useMovieTrailer) fetch and cache TMDB data into Redux slices.",
        "geminiAi.js wraps the Gemini API call for the GPT search bar and formats the response into a movie list.",
        "firebase.js initializes Firebase Auth; auth state is synced into a userSlice and gates the Browse route.",
        "Deployed to Firebase Hosting via firebase.json / .firebaserc.",
      ],
      hi: [
        "कस्टम हुक्स (useNowPlayingMovies, usePopularMovies, useTopRatedMovies, useUpcomingMovies, useMovieTrailer) TMDB डेटा को फेच कर Redux स्लाइस में कैश करते हैं।",
        "geminiAi.js, GPT सर्च बार के लिए Gemini API कॉल को रैप करता है और रिस्पॉन्स को मूवी लिस्ट में फॉर्मेट करता है।",
        "firebase.js, Firebase Auth को इनिशियलाइज़ करता है; auth state को userSlice में सिंक किया जाता है और यह Browse रूट को गेट करता है।",
        "firebase.json / .firebaserc के जरिए Firebase Hosting पर डिप्लॉय किया गया।",
      ],
    },
    links: {
      github: "https://github.com/NIRMALKANDEL/netflix-gpt",
      live: "https://netflix-gpt-d8cfb.web.app",
    },
    status: "live",
    featured: true,
    category: "AI / Full Stack",
    image: "/projects/netflix-gpt.svg",
  },
  {
    slug: "devtinder",
    title: "DevTinder",
    tagline: {
      en: "A Tinder-style networking app for developers",
      hi: "डेवलपर्स के लिए एक Tinder-स्टाइल नेटवर्किंग ऐप",
    },
    description: {
      en: "A full-stack developer-networking application — think Tinder, but for developers to discover and connect with each other. The frontend (devTinder-web) is a React + Redux Toolkit SPA; the backend (devTinder) is a Node.js/Express REST API with MongoDB, JWT authentication, and a connection-request system.",
      hi: "एक फुल-स्टैक डेवलपर-नेटवर्किंग एप्लिकेशन — Tinder जैसा, पर डेवलपर्स के एक-दूसरे को खोजने और जुड़ने के लिए। फ्रंटएंड (devTinder-web) एक React + Redux Toolkit SPA है; बैकएंड (devTinder) MongoDB, JWT प्रमाणीकरण, और कनेक्शन-रिक्वेस्ट सिस्टम के साथ एक Node.js/Express REST API है।",
    },
    problem: {
      en: "Build a complete two-sided MERN application — secure auth, a feed with actionable cards, and a request/connection workflow — split cleanly across separate frontend and backend repositories.",
      hi: "एक पूर्ण दो-तरफा MERN एप्लिकेशन बनाना — सुरक्षित ऑथ, एक्शन योग्य कार्ड्स वाला फीड, और एक रिक्वेस्ट/कनेक्शन वर्कफ़्लो — अलग फ्रंटएंड और बैकएंड रिपॉजिटरी में साफ-सुथरे तरीके से विभाजित।",
    },
    technologies: [
      "React 19",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "DaisyUI",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
    ],
    features: {
      en: [
        "JWT-based authentication with protected routes and auth middleware",
        "User signup, login, and profile editing",
        "Developer feed of discoverable profiles (UserCard)",
        "Send, view, and respond to connection requests",
        "Connections list of accepted matches",
        "RESTful API with dedicated auth, profile, request and user routes",
      ],
      hi: [
        "प्रोटेक्टेड रूट्स और ऑथ मिडलवेयर के साथ JWT-आधारित प्रमाणीकरण",
        "उपयोगकर्ता साइनअप, लॉगिन और प्रोफ़ाइल एडिटिंग",
        "खोजे जा सकने वाले प्रोफाइल का डेवलपर फीड (UserCard)",
        "कनेक्शन रिक्वेस्ट भेजें, देखें और जवाब दें",
        "स्वीकृत मैचों की कनेक्शन सूची",
        "समर्पित auth, profile, request और user रूट्स के साथ RESTful API",
      ],
    },
    implementation: {
      en: [
        "Backend: Express app (app.js) wires config/Database.js, models (user.js, connectionRequest.js), middlewares/auth.js, and routes (auth, profile, request, user).",
        "Passwords hashed with bcryptjs; sessions handled via JWT stored in an httpOnly cookie (cookie-parser).",
        "Frontend: Redux Toolkit slices (userSlice, feedSlice, requestSlice, connectionSlice) manage feed, requests and connections, consumed by Feed, Requests, Connections, Profile and EditProfile components.",
        "Currently a work-in-progress project; a production deployment is being finalized before a live demo link is published.",
      ],
      hi: [
        "बैकएंड: Express ऐप (app.js) config/Database.js, मॉडल्स (user.js, connectionRequest.js), middlewares/auth.js, और रूट्स (auth, profile, request, user) को जोड़ता है।",
        "bcryptjs से पासवर्ड हैश किए जाते हैं; सेशन httpOnly कुकी (cookie-parser) में संग्रहीत JWT के माध्यम से हैंडल किए जाते हैं।",
        "फ्रंटएंड: Redux Toolkit स्लाइस (userSlice, feedSlice, requestSlice, connectionSlice) फीड, रिक्वेस्ट और कनेक्शन को मैनेज करते हैं, जिन्हें Feed, Requests, Connections, Profile और EditProfile कंपोनेंट्स इस्तेमाल करते हैं।",
        "यह अभी भी एक निर्माणाधीन प्रोजेक्ट है; लाइव डेमो लिंक प्रकाशित करने से पहले प्रोडक्शन डिप्लॉयमेंट को अंतिम रूप दिया जा रहा है।",
      ],
    },
    links: {
      githubFrontend: "https://github.com/NIRMALKANDEL/devTinder-web",
      githubBackend: "https://github.com/NIRMALKANDEL/devTinder",
    },
    status: "in-progress",
    featured: true,
    category: "Full Stack",
    image: "/projects/devtinder.svg",
  },
  {
    slug: "mern-todo",
    title: "MERN Todo",
    tagline: {
      en: "A full-stack CRUD todo application",
      hi: "एक फुल-स्टैक CRUD टूडू एप्लिकेशन",
    },
    description: {
      en: "A classic full-stack todo app used to practice the MERN fundamentals — a React + Vite frontend talking to a Node/Express + MongoDB Atlas backend with full CRUD and toast notifications.",
      hi: "MERN के बुनियादी सिद्धांतों का अभ्यास करने के लिए एक क्लासिक फुल-स्टैक टूडू ऐप — एक React + Vite फ्रंटएंड जो पूर्ण CRUD और टोस्ट नोटिफिकेशन के साथ Node/Express + MongoDB Atlas बैकएंड से बात करता है।",
    },
    problem: {
      en: "Implement a complete CRUD workflow end-to-end and deploy both the client and API independently.",
      hi: "एक पूर्ण CRUD वर्कफ़्लो को शुरू से अंत तक लागू करना और क्लाइंट व API दोनों को स्वतंत्र रूप से डिप्लॉय करना।",
    },
    technologies: ["React", "Vite", "Node.js", "Express.js", "MongoDB Atlas", "Tailwind CSS"],
    features: {
      en: [
        "Create, edit, delete and toggle-complete todos",
        "Responsive UI with toast notifications",
        "REST API backed by MongoDB Atlas",
      ],
      hi: [
        "टूडू बनाएं, संपादित करें, हटाएं और पूर्ण के रूप में टॉगल करें",
        "टोस्ट नोटिफिकेशन के साथ रिस्पॉन्सिव UI",
        "MongoDB Atlas द्वारा समर्थित REST API",
      ],
    },
    implementation: {
      en: [
        "Client built with React + Vite, styled with Tailwind CSS, deployed on Vercel.",
        "Server built with Express and Mongoose against a MongoDB Atlas cluster.",
      ],
      hi: [
        "क्लाइंट React + Vite से बना, Tailwind CSS से स्टाइल किया गया, Vercel पर डिप्लॉय किया गया।",
        "सर्वर MongoDB Atlas क्लस्टर के विरुद्ध Express और Mongoose से बनाया गया।",
      ],
    },
    links: {
      github: "https://github.com/NIRMALKANDEL/mern-todo",
      live: "https://mern-todo-ashen.vercel.app",
    },
    status: "live",
    featured: false,
    category: "Full Stack CRUD",
    image: "/projects/mern-todo.svg",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
