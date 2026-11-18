/**
 * All site copy lives here. Sections only render what this file describes,
 * so updating the portfolio means editing data, not components.
 */

export type Accent = 'indigo' | 'emerald' | 'amber' | 'sky' | 'rose' | 'violet';

export interface Link {
  label: string;
  href: string;
}

export interface Highlight {
  title: string;
  body: string;
}

export interface Role {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: Highlight[];
  stack: string[];
  current?: boolean;
}

export type ProjectStatus = 'Live' | 'In progress' | 'Private';

export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  year: string;
  accent: Accent;
  live?: string;
  code?: string;
}

export interface ArchiveProject {
  name: string;
  description: string;
  stack: string[];
  year: string;
  code: string;
}

export const profile = {
  name: 'Sibin Silu',
  firstName: 'Sibin',
  role: 'Backend Engineer',
  company: 'Magadh Industries',
  location: 'India',
  email: 'sibinthekkel@gmail.com',
  phone: '+91 95670 49403',
  phoneHref: 'tel:+919567049403',
  github: 'https://github.com/sibin12',
  linkedin: 'https://www.linkedin.com/in/sibin-silu-375938257',
  currently: 'Building AI-assisted backend workflows',
  headline: 'I build the backend that runs',
  headlineAccent: 'real operations.',
  intro:
    'Software engineer at Magadh Industries, building the internal systems a manufacturing business runs on: orders, procurement, payments and reporting.',
  summary: [
    'I started in 2022 as a MERN developer, shipping an e-commerce store and a video platform end to end. Since 2024 I have been at Magadh, where the work is less about pages and more about real operations running correctly every day.',
    'Day to day I write TypeScript on Bun, Hono and PostgreSQL, keep older Node and MongoDB services healthy, and lately build AI-assisted features that cut down manual work.',
  ],
};

export const stats = [
  { value: '2+', label: 'Years building production ERP' },
  { value: '4+', label: 'Years writing JavaScript & TypeScript' },
  { value: '15+', label: 'Side projects built' },
];

export const focusAreas = [
  {
    icon: 'server',
    title: 'APIs & services',
    body: 'Bun, Hono and oRPC with Zod contracts and generated OpenAPI docs.',
  },
  {
    icon: 'database',
    title: 'Data & jobs',
    body: 'PostgreSQL with Drizzle, MongoDB, Redis caching and BullMQ queues.',
  },
  {
    icon: 'layers',
    title: 'Integrations',
    body: 'Accounting software, cloud storage, payment gateways and third-party APIs.',
  },
  {
    icon: 'bot',
    title: 'Applied AI',
    body: 'Language and vision models wired into everyday business workflows.',
  },
] as const;

export const experience: Role[] = [
  {
    company: 'Magadh Industries',
    role: 'Software Engineer',
    period: 'Jun 2024 — Present',
    current: true,
    summary:
      'I work across the company’s internal platform, from order management and procurement to finance tooling and reporting, building the backend services and the admin screens on top of them.',
    highlights: [
      {
        title: 'AI-assisted workflows',
        body: 'Features that use vision and language models to sort and check uploaded documents, with a human review step before anything is approved.',
      },
      {
        title: 'Backend services',
        body: 'REST and RPC services on Bun, Hono and PostgreSQL with typed contracts, request validation and generated API docs.',
      },
      {
        title: 'Integrations & jobs',
        body: 'Connections to accounting software, cloud storage and other third-party services, with scheduled jobs and queues for background work.',
      },
      {
        title: 'Established platform',
        body: 'Maintaining and extending a long-running Node.js and MongoDB API alongside the newer services, and keeping both reliable in production.',
      },
      {
        title: 'Reporting',
        body: 'Reports and exports that operations and finance teams rely on day to day.',
      },
      {
        title: 'Admin dashboards',
        body: 'React screens for internal teams: data uploads, review queues, filters and reports.',
      },
    ],
    stack: ['Bun', 'Hono', 'PostgreSQL', 'Drizzle', 'oRPC', 'Zod', 'Node.js', 'MongoDB', 'Redis', 'BullMQ', 'React'],
  },
  {
    company: 'Brototype',
    role: 'MERN Stack Developer, Trainee',
    period: 'Nov 2022 — Dec 2023',
    summary:
      'An intensive, self-driven full-stack program. I built and deployed two complete MERN products and a set of smaller apps.',
    highlights: [
      {
        title: 'GadgetGalaxy',
        body: 'E-commerce for electronics with Twilio OTP sign-in, Razorpay payments, coupons and offers, stock management and an admin dashboard with sales charts.',
      },
      {
        title: 'LoopNet',
        body: 'Video sharing with likes, comments, replies and reports, plus real-time one-to-one and group chat over Socket.io and Google sign-in.',
      },
      {
        title: 'Deployment',
        body: 'Ran both on AWS EC2 behind Nginx, with Route 53 and Cloudflare in front.',
      },
    ],
    stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Firebase', 'AWS'],
  },
];

export const education = {
  degree: 'Bachelor of Computer Applications',
  school: 'Mahatma Gandhi University, Kerala',
  period: '2018 — 2021',
};

export const featuredProjects: Project[] = [
  {
    name: 'BrainPlay Kids',
    tagline: '3D memory and brain games for every age',
    description:
      'Twenty-plus games grouped by age, from bubble pop for babies to N-Back and Stroop for adults. Installable PWA that works offline, with no ads and no tracking.',
    stack: ['Three.js', 'PWA', 'Service Worker', 'JavaScript'],
    status: 'Live',
    year: '2026',
    accent: 'amber',
    live: 'https://sibin12.github.io/brainplay/',
    code: 'https://github.com/sibin12/brainplay',
  },
  {
    name: 'Jetpack Arena',
    tagline: 'A Mini Militia style browser shooter',
    description:
      'The whole game in a single HTML file: canvas rendering, commented physics, and peer-to-peer multiplayer over WebRTC so friends can play without a game server.',
    stack: ['Canvas', 'WebRTC', 'PeerJS', 'JavaScript'],
    status: 'Live',
    year: '2026',
    accent: 'rose',
    live: 'https://sibin12.github.io/jetpack-arena/',
    code: 'https://github.com/sibin12/jetpack-arena',
  },
  {
    name: 'Wardrobe Intelligence',
    tagline: 'Buy smarter, wear more, waste less',
    description:
      'A shopping assistant that checks whether a new piece of clothing adds anything to the wardrobe you already own, using a rule-based engine shared by API and web.',
    stack: ['Bun', 'Hono', 'Drizzle', 'PostgreSQL', 'React 19', 'Cloudflare R2'],
    status: 'In progress',
    year: '2026',
    accent: 'violet',
  },
  {
    name: 'SiteSketch',
    tagline: 'From satellite map to 3D property model',
    description:
      'Trace a property on a satellite map, sketch its buildings and landscape in 2D, and get an editable 3D model. One canonical JSONB model with optimistic revisions.',
    stack: ['Bun', 'Hono', 'Drizzle', 'PostgreSQL', 'React', 'Zustand'],
    status: 'In progress',
    year: '2026',
    accent: 'emerald',
  },
  {
    name: 'Pulsepath',
    tagline: 'Routine and workout tracker',
    description:
      'Calendar-first tracker with a custom session builder and a markdown diary on every date. Go REST API with JWT, Postgres JSONB, and an in-memory store for demos.',
    stack: ['Go', 'PostgreSQL', 'React', 'Tailwind CSS'],
    status: 'In progress',
    year: '2026',
    accent: 'sky',
  },
  {
    name: 'Go Visualizers',
    tagline: 'See Go memory and concurrency move',
    description:
      'Two interactive explainers I built while learning Go. Step through code to watch stack frames, pointers and heap escapes, or tune a worker pool and buffered channel and simulate a traffic spike.',
    stack: ['Go', 'React', 'TypeScript', 'Vite'],
    status: 'In progress',
    year: '2026',
    accent: 'indigo',
  },
];

export const archiveProjects: ArchiveProject[] = [
  {
    name: 'GadgetGalaxy',
    description: 'Full e-commerce store with OTP, Razorpay and an admin dashboard.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    year: '2023',
    code: 'https://github.com/sibin12/gadgetECom',
  },
  {
    name: 'LoopNet',
    description: 'Video sharing platform with real-time chat.',
    stack: ['React', 'Socket.io', 'Firebase'],
    year: '2023',
    code: 'https://github.com/sibin12/Video_Sharing_Platform',
  },
  {
    name: 'Book Store API',
    description: 'Users, books, purchase history and author revenue tracking.',
    stack: ['Node.js', 'MongoDB'],
    year: '2024',
    code: 'https://github.com/sibin12/Book_Store_Backend',
  },
  {
    name: 'Blog API',
    description: 'Auth, posts, categories, comments and likes.',
    stack: ['Django REST'],
    year: '2024',
    code: 'https://github.com/sibin12/Blog_API',
  },
  {
    name: 'WeatherNow',
    description: 'Location-aware forecasts from public weather APIs.',
    stack: ['React', 'Tailwind CSS'],
    year: '2024',
    code: 'https://github.com/sibin12/WeatherNow',
  },
  {
    name: 'OLX Clone',
    description: 'Listings marketplace with Firebase and React context.',
    stack: ['React', 'Firebase'],
    year: '2023',
    code: 'https://github.com/sibin12/Olx_Clone',
  },
  {
    name: 'Netflix Clone',
    description: 'Movie and TV browsing on the TMDB API.',
    stack: ['React', 'Axios'],
    year: '2023',
    code: 'https://github.com/sibin12/Netflix_Clone',
  },
];

export const skillGroups = [
  { title: 'Backend', items: ['Bun', 'Hono', 'Node.js', 'Express', 'oRPC', 'REST', 'Socket.io', 'BullMQ'] },
  { title: 'Data', items: ['PostgreSQL', 'Drizzle ORM', 'MongoDB', 'Mongoose', 'Redis'] },
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL', 'Go (learning)'] },
  { title: 'Frontend', items: ['React', 'TanStack Query', 'Redux Toolkit', 'MUI', 'Tailwind CSS'] },
  { title: 'Cloud & tooling', items: ['Docker', 'Google Cloud', 'AWS EC2', 'Nginx', 'Cloudflare', 'Git'] },
  { title: 'AI', items: ['Claude API', 'Vercel AI SDK', 'Vision models'] },
];

export const navLinks: Link[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];
