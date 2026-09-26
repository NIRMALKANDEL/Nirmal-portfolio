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
  status: "live" | "completed" | "in-progress";
  featured: boolean;
  category: "AI / Full Stack" | "Full Stack" | "Full Stack CRUD" | "Frontend";
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
        "Containerized and deployed on AWS ECS.",
      ],
      hi: [
        "बैकएंड: Express ऐप (app.js) config/Database.js, मॉडल्स (user.js, connectionRequest.js), middlewares/auth.js, और रूट्स (auth, profile, request, user) को जोड़ता है।",
        "bcryptjs से पासवर्ड हैश किए जाते हैं; सेशन httpOnly कुकी (cookie-parser) में संग्रहीत JWT के माध्यम से हैंडल किए जाते हैं।",
        "फ्रंटएंड: Redux Toolkit स्लाइस (userSlice, feedSlice, requestSlice, connectionSlice) फीड, रिक्वेस्ट और कनेक्शन को मैनेज करते हैं, जिन्हें Feed, Requests, Connections, Profile और EditProfile कंपोनेंट्स इस्तेमाल करते हैं।",
        "कंटेनराइज़ करके AWS ECS पर डिप्लॉय किया गया।",
      ],
    },
    links: {
      githubFrontend: "https://github.com/NIRMALKANDEL/devTinder-web",
      githubBackend: "https://github.com/NIRMALKANDEL/devTinder",
      live: "http://13.51.194.164",
    },
    status: "live",
    featured: true,
    category: "Full Stack",
    image: "/projects/devtinder.svg",
  },  {
    slug: "nibblr",
    title: "Nibblr",
    tagline: {
      en: "A food-delivery app covering the full ordering flow",
      hi: "पूरे ऑर्डरिंग फ्लो को कवर करने वाला एक फूड-डिलीवरी ऐप",
    },
    description: {
      en: "A food-delivery web app built with React 18, Redux Toolkit and Tailwind CSS. Users discover restaurants with search, filters and sorting, browse menus, manage a persistent cart, check out with an interactive delivery-address map and coupon codes, and view their order history — backed by live restaurant data with an offline-friendly sample-data fallback.",
      hi: "React 18, Redux Toolkit और Tailwind CSS से बना एक फूड-डिलीवरी वेब ऐप। उपयोगकर्ता सर्च, फ़िल्टर और सॉर्टिंग से रेस्टोरेंट खोजते हैं, मेन्यू ब्राउज़ करते हैं, सेव रहने वाला कार्ट मैनेज करते हैं, इंटरैक्टिव डिलीवरी-एड्रेस मैप और कूपन कोड के साथ चेकआउट करते हैं, और अपनी ऑर्डर हिस्ट्री देखते हैं — लाइव रेस्टोरेंट डेटा के साथ, और ऑफ़लाइन-फ्रेंडली सैंपल-डेटा फॉलबैक के साथ।",
    },
    problem: {
      en: "Build a complete, resilient ordering experience on the frontend alone — real third-party data that can fail at any time, a cart and orders that survive reloads, and a checkout that feels real without a backend.",
      hi: "सिर्फ फ्रंटएंड पर एक पूर्ण और भरोसेमंद ऑर्डरिंग अनुभव बनाना — असली थर्ड-पार्टी डेटा जो कभी भी फेल हो सकता है, रीलोड के बाद भी बने रहने वाले कार्ट और ऑर्डर, और बिना बैकएंड के असली जैसा लगने वाला चेकआउट।",
    },
    technologies: [
      "React 18",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Leaflet / OpenStreetMap",
      "Parcel",
      "Jest",
      "React Testing Library",
    ],
    features: {
      en: [
        "Restaurant search with combinable filters (rating, pure veg, fast delivery), sorting and cuisine chips",
        "Location picker using browser geolocation or manual search",
        "Restaurant menus with a top-picks carousel and a veg-only toggle",
        "Cart with live subtotal / fees / GST breakdown, persisted to localStorage",
        "Checkout with a Leaflet map address picker, coupon validation and a mock COD / card payment flow",
        "Order confirmation, order history and one-click reorder",
        "Favorites, recently viewed restaurants and a demo login gating checkout",
        "Shimmer loaders, offline banner, error boundary and 404 page",
      ],
      hi: [
        "जोड़े जा सकने वाले फ़िल्टर (रेटिंग, प्योर वेज, फ़ास्ट डिलीवरी), सॉर्टिंग और क्यूज़ीन चिप्स के साथ रेस्टोरेंट सर्च",
        "ब्राउज़र जियोलोकेशन या मैन्युअल सर्च से लोकेशन पिकर",
        "टॉप-पिक्स कैरोसेल और वेज-ओनली टॉगल के साथ रेस्टोरेंट मेन्यू",
        "लाइव सबटोटल / फीस / GST ब्रेकडाउन वाला कार्ट, localStorage में सेव",
        "Leaflet मैप एड्रेस पिकर, कूपन वैलिडेशन और मॉक COD / कार्ड पेमेंट फ्लो के साथ चेकआउट",
        "ऑर्डर कन्फर्मेशन, ऑर्डर हिस्ट्री और वन-क्लिक री-ऑर्डर",
        "फ़ेवरेट्स, हाल ही में देखे गए रेस्टोरेंट और चेकआउट के लिए डेमो लॉगिन",
        "शिमर लोडर, ऑफ़लाइन बैनर, एरर बाउंड्री और 404 पेज",
      ],
    },
    implementation: {
      en: [
        "Redux Toolkit slices manage cart, favorites, orders and location; state is persisted to localStorage with every read/write wrapped in try/catch.",
        "Utils/api.js fetches live restaurant data directly, falls back through CORS proxies, and finally to bundled sample data with a visible banner — so the UI never gets stuck.",
        "Menu parsing handles both flat and nested category response shapes.",
        "Card details in the mock payment flow are format-validated (Luhn check, expiry, CVV) and then discarded — never stored or sent anywhere.",
        "Unit tests with Jest + React Testing Library; deployed on Vercel as a static SPA.",
      ],
      hi: [
        "Redux Toolkit स्लाइस कार्ट, फ़ेवरेट्स, ऑर्डर और लोकेशन मैनेज करते हैं; स्टेट localStorage में सेव होती है और हर रीड/राइट try/catch में रैप है।",
        "Utils/api.js लाइव रेस्टोरेंट डेटा सीधे फेच करता है, फिर CORS प्रॉक्सी पर, और अंत में दिखने वाले बैनर के साथ बंडल किए गए सैंपल डेटा पर फॉलबैक करता है — ताकि UI कभी अटके नहीं।",
        "मेन्यू पार्सिंग फ्लैट और नेस्टेड दोनों तरह के कैटेगरी रिस्पॉन्स को हैंडल करती है।",
        "मॉक पेमेंट फ्लो में कार्ड डिटेल्स का फॉर्मेट वैलिडेट (Luhn चेक, एक्सपायरी, CVV) होता है और फिर उन्हें हटा दिया जाता है — कभी सेव या कहीं भेजा नहीं जाता।",
        "Jest + React Testing Library से यूनिट टेस्ट; Vercel पर स्टैटिक SPA के रूप में डिप्लॉय।",
      ],
    },
    links: {
      github: "https://github.com/NIRMALKANDEL/Food-dilivery-app-",
      live: "https://nibblr-azure.vercel.app",
    },
    status: "live",
    featured: true,
    category: "Frontend",
    image: "/projects/nibblr.svg",
  },
  {
    slug: "brightway-solar",
    title: "Brightway Solar",
    tagline: {
      en: "A lead-generation website for a solar company, with a chatbot",
      hi: "चैटबॉट के साथ एक सोलर कंपनी के लिए लीड-जनरेशन वेबसाइट",
    },
    description: {
      en: "A client-style MERN website for a (fictional) solar installation company, designed around lead generation. It has 13+ pages, a free-quote form on every key page, a savings calculator, a government-subsidy (PM Surya Ghar) page, and a chatbot that answers from real site data. Every enquiry is saved to MongoDB along with the page it came from.",
      hi: "एक (काल्पनिक) सोलर इंस्टॉलेशन कंपनी के लिए क्लाइंट-स्टाइल MERN वेबसाइट, जिसे लीड जनरेशन को ध्यान में रखकर बनाया गया। इसमें 13+ पेज, हर मुख्य पेज पर फ्री-कोट फ़ॉर्म, सेविंग्स कैलकुलेटर, सरकारी सब्सिडी (PM Surya Ghar) पेज, और एक चैटबॉट है जो साइट के असली डेटा से जवाब देता है। हर पूछताछ, जिस पेज से आई उसके साथ MongoDB में सेव होती है।",
    },
    problem: {
      en: "Turn a basic template site into something that actually brings a local business customers — clear calls to action, plain-language pricing help, and instant answers for visitors.",
      hi: "एक साधारण टेम्पलेट साइट को ऐसी वेबसाइट में बदलना जो किसी लोकल बिज़नेस को सच में ग्राहक दिलाए — साफ कॉल-टू-एक्शन, आसान भाषा में कीमत की जानकारी, और विज़िटर्स के लिए तुरंत जवाब।",
    },
    technologies: [
      "React 18",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "Axios",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Nodemailer",
    ],
    features: {
      en: [
        "13+ pages: Home, About, Products (list + detail), Services, Projects, Gallery, Government Schemes, Blog, Testimonials, FAQ, Contact",
        "\"Get Free Quote\" lead form on every key page, saved to MongoDB with its source page",
        "Savings calculator that explains the benefit in plain language",
        "Keyword-matching chatbot that answers from company info, products and FAQs — with an honest fallback",
        "WhatsApp button and mobile-first responsive layout",
        "Accessibility basics: semantic HTML, skip link, focus states, labelled forms, ARIA on widgets",
      ],
      hi: [
        "13+ पेज: होम, अबाउट, प्रोडक्ट्स (लिस्ट + डिटेल), सर्विसेज़, प्रोजेक्ट्स, गैलरी, सरकारी योजनाएं, ब्लॉग, टेस्टिमोनियल्स, FAQ, कॉन्टैक्ट",
        "हर मुख्य पेज पर \"Get Free Quote\" लीड फ़ॉर्म, सोर्स पेज के साथ MongoDB में सेव",
        "आसान भाषा में फ़ायदा समझाने वाला सेविंग्स कैलकुलेटर",
        "कंपनी जानकारी, प्रोडक्ट्स और FAQ से जवाब देने वाला कीवर्ड-मैचिंग चैटबॉट — ईमानदार फॉलबैक के साथ",
        "WhatsApp बटन और मोबाइल-फर्स्ट रिस्पॉन्सिव लेआउट",
        "एक्सेसिबिलिटी की बुनियादी बातें: सेमांटिक HTML, स्किप लिंक, फोकस स्टेट, लेबल वाले फ़ॉर्म, विजेट्स पर ARIA",
      ],
    },
    implementation: {
      en: [
        "Express REST API for leads, products, testimonials, projects, blog, FAQs, contact and the chatbot, with Mongoose models and a seed script.",
        "express-rate-limit protects form endpoints; Nodemailer is wired for new-lead email notifications.",
        "React + Vite frontend with React Router; the Vite dev server proxies /api to the backend.",
        "Company details are kept in one config file so the site can be rebranded for a real client.",
      ],
      hi: [
        "लीड्स, प्रोडक्ट्स, टेस्टिमोनियल्स, प्रोजेक्ट्स, ब्लॉग, FAQ, कॉन्टैक्ट और चैटबॉट के लिए Express REST API, Mongoose मॉडल्स और सीड स्क्रिप्ट के साथ।",
        "express-rate-limit फ़ॉर्म एंडपॉइंट्स को सुरक्षित रखता है; नई लीड पर ईमेल के लिए Nodemailer जुड़ा है।",
        "React Router के साथ React + Vite फ्रंटएंड; Vite डेव सर्वर /api को बैकएंड पर प्रॉक्सी करता है।",
        "कंपनी की जानकारी एक कॉन्फ़िग फ़ाइल में है, ताकि साइट को किसी असली क्लाइंट के लिए आसानी से रीब्रांड किया जा सके।",
      ],
    },
    links: {
      github: "https://github.com/NIRMALKANDEL/DUMMY-client-website-",
    },
    status: "completed",
    featured: false,
    category: "Full Stack",
    image: "/projects/brightway-solar.svg",
  },
  {
    slug: "nextjs-video-app",
    title: "Next.js Video App",
    tagline: {
      en: "A full-stack Next.js video-sharing app with ImageKit uploads",
      hi: "ImageKit अपलोड के साथ एक फुल-स्टैक Next.js वीडियो-शेयरिंग ऐप",
    },
    description: {
      en: "A full-stack video-sharing app built entirely in Next.js with TypeScript. Users register and log in with NextAuth, upload vertical videos to ImageKit, and browse a feed of the latest uploads. User and video data are stored in MongoDB through Mongoose, and routes are protected by middleware.",
      hi: "TypeScript के साथ पूरी तरह Next.js में बना एक फुल-स्टैक वीडियो-शेयरिंग ऐप। उपयोगकर्ता NextAuth से रजिस्टर और लॉगिन करते हैं, ImageKit पर वर्टिकल वीडियो अपलोड करते हैं, और नए अपलोड्स का फीड देखते हैं। यूज़र और वीडियो डेटा Mongoose के जरिए MongoDB में सेव होता है, और रूट्स मिडलवेयर से सुरक्षित हैं।",
    },
    problem: {
      en: "Learn full-stack Next.js end-to-end — auth, protected API routes, a database, and secure direct-to-CDN media uploads — in a single TypeScript codebase.",
      hi: "एक ही TypeScript कोडबेस में फुल-स्टैक Next.js को शुरू से अंत तक सीखना — ऑथ, सुरक्षित API रूट्स, डेटाबेस, और CDN पर सीधे सुरक्षित मीडिया अपलोड।",
    },
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "NextAuth.js",
      "MongoDB",
      "Mongoose",
      "ImageKit",
      "bcrypt",
      "Tailwind CSS",
    ],
    features: {
      en: [
        "Register and login with NextAuth credentials (bcrypt-hashed passwords)",
        "Middleware-protected pages and API routes",
        "Video upload to ImageKit with server-generated auth parameters",
        "Video feed sorted by newest, with title, description and thumbnail",
        "Vertical 1080×1920 video format with configurable quality",
      ],
      hi: [
        "NextAuth क्रेडेंशियल्स से रजिस्टर और लॉगिन (bcrypt-हैश पासवर्ड)",
        "मिडलवेयर से सुरक्षित पेज और API रूट्स",
        "सर्वर-जनरेटेड ऑथ पैरामीटर के साथ ImageKit पर वीडियो अपलोड",
        "टाइटल, डिस्क्रिप्शन और थंबनेल के साथ नए वीडियो पहले दिखाने वाला फीड",
        "कॉन्फ़िगर की जा सकने वाली क्वालिटी के साथ वर्टिकल 1080×1920 वीडियो फॉर्मेट",
      ],
    },
    implementation: {
      en: [
        "App Router API routes: /api/auth (register + NextAuth), /api/imageKit-auth (upload signatures) and /api/Video (GET feed, POST new video behind getServerSession).",
        "Typed Mongoose models (User, Video) with a shared database connection helper.",
        "next-auth middleware (withAuth) guards every route except login, register and auth endpoints.",
        "Work in progress — the core flow is built; UI polish and deployment are next.",
      ],
      hi: [
        "App Router API रूट्स: /api/auth (रजिस्टर + NextAuth), /api/imageKit-auth (अपलोड सिग्नेचर) और /api/Video (GET फीड, getServerSession के पीछे POST नया वीडियो)।",
        "साझा डेटाबेस कनेक्शन हेल्पर के साथ टाइप्ड Mongoose मॉडल्स (User, Video)।",
        "next-auth मिडलवेयर (withAuth) लॉगिन, रजिस्टर और ऑथ एंडपॉइंट्स को छोड़कर हर रूट को सुरक्षित रखता है।",
        "निर्माणाधीन — मुख्य फ्लो बन चुका है; UI सुधार और डिप्लॉयमेंट अगले कदम हैं।",
      ],
    },
    links: {
      github: "https://github.com/NIRMALKANDEL/NEXT-project-imagekit",
    },
    status: "in-progress",
    featured: false,
    category: "Full Stack",
    image: "/projects/nextjs-video-app.svg",
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
