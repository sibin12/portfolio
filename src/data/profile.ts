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
  role: 'Software Engineer',
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
    'Full-stack engineer at Magadh Industries with a backend focus. I build the APIs, data and React apps a manufacturing business runs on, with MERN and with Bun and PostgreSQL, and add AI where it saves people time.',
  summary: [
    'I started in 2022 as a MERN developer, building an e-commerce store and a video platform end to end. Since June 2024 I have been at Magadh Industries, where that same stack, Node.js, Express, MongoDB and React, runs a large part of the business, and where I have grown into newer services on Bun, Hono and PostgreSQL.',
    'The backend is where I am happiest: data models, APIs, background jobs and integrations, plus a small Go service. Lately I add AI where it saves people time, with models that read documents or suggest the next step and a person who approves the result.',
  ],
};

/**
 * Chips that bounce beside the hero portrait, most important first.
 * Smaller screens show only as many as fit, starting from the top of this list.
 */
export const heroChips = [
  { icon: 'server', label: 'Node.js' },
  { icon: 'leaf', label: 'MongoDB' },
  { icon: 'sparkles', label: 'AI features' },
  { icon: 'atom', label: 'React' },
  { icon: 'braces', label: 'TypeScript' },
  { icon: 'database', label: 'PostgreSQL' },
  { icon: 'zap', label: 'Bun · Hono' },
  { icon: 'gauge', label: 'Go' },
  { icon: 'route', label: 'Express' },
  { icon: 'layers', label: 'Redis' },
] as const;

export const stats = [
  { value: '2+', label: 'Years building production systems' },
  { value: '4+', label: 'Years writing JavaScript & TypeScript' },
  { value: '15+', label: 'Side projects built' },
];

export const focusAreas = [
  {
    icon: 'server',
    title: 'APIs & services',
    body: 'Node.js with Express, and Bun with Hono, with typed contracts and OpenAPI docs.',
  },
  {
    icon: 'database',
    title: 'Data & jobs',
    body: 'MongoDB and PostgreSQL, Mongoose and Drizzle, Redis caching and BullMQ queues.',
  },
  {
    icon: 'layers',
    title: 'React apps',
    body: 'Data-heavy admin apps with TanStack Query and Table, MUI and Chakra UI.',
  },
  {
    icon: 'bot',
    title: 'AI features',
    body: 'Language and vision models inside real workflows, with a person approving the result.',
  },
] as const;

export const experience: Role[] = [
  {
    company: 'Magadh Industries',
    role: 'Software Engineer',
    period: 'Jun 2024 — Present',
    current: true,
    summary:
      'I work across the company’s internal platform on two stacks: a long-running MERN system, with a Node.js, Express and MongoDB API and a separate React admin app, and newer services on Bun, Hono and PostgreSQL. Most of my time goes to the backend, and I build the screens on top too.',
    highlights: [
      {
        title: 'MERN platform',
        body: 'My main codebase since 2024: a TypeScript Node.js, Express and MongoDB API and its React admin app. New features, data syncs, scheduled jobs and production fixes.',
      },
      {
        title: 'Bun & PostgreSQL services',
        body: 'Newer services on Bun, Hono and Drizzle with typed contracts, request validation and OpenAPI docs, plus a shared schema package they all build on.',
      },
      {
        title: 'AI-powered features',
        body: 'Language and vision models that read and check uploaded documents and suggest matches, with a person reviewing before anything is approved.',
      },
      {
        title: 'Data imports & reporting',
        body: 'Spreadsheet and file importers with locks so runs never overlap, plus the reports and Excel exports that teams use every day.',
      },
      {
        title: 'Integrations in Go',
        body: 'A Go service that connects internal systems to accounting software through PostgreSQL, with filters, pagination and CSV exports.',
      },
      {
        title: 'React admin apps',
        body: 'Data-heavy screens with TanStack Query, Router and Table, MUI and Chakra UI: uploads, review queues, filters and approval flows.',
      },
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'React', 'TypeScript', 'Bun', 'Hono', 'PostgreSQL', 'Drizzle', 'Redis', 'BullMQ', 'Go', 'AI SDK'],
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

/** Ranked best first: live projects people can open, then work in progress. */
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
    name: 'Go Memory Visualizer',
    tagline: 'See where Go keeps your values',
    description:
      'Run real Go functions and watch values land on the stack or escape to the heap, then trigger the garbage collector. A plain-language guide explains every idea for beginners.',
    stack: ['Go', 'React', 'TypeScript', 'Vite'],
    status: 'Live',
    year: '2026',
    accent: 'indigo',
    live: 'https://sibin12.github.io/go-visualizers/',
    code: 'https://github.com/sibin12/go-visualizers',
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
  { title: 'Backend', items: ['Node.js', 'Express', 'Bun', 'Hono', 'REST & OpenAPI', 'oRPC', 'Socket.io', 'BullMQ'] },
  { title: 'Data', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Drizzle ORM', 'Redis'] },
  { title: 'Frontend', items: ['React', 'Redux Toolkit', 'TanStack Query', 'TanStack Table', 'MUI', 'Chakra UI', 'Tailwind CSS'] },
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'SQL'] },
  { title: 'AI', items: ['LLM APIs (Claude)', 'Vercel AI SDK', 'Vision models', 'Prompt design'] },
  { title: 'Cloud & tooling', items: ['Docker', 'Google Cloud', 'AWS EC2', 'Nginx', 'Cloudflare', 'Git & GitHub'] },
];

export const navLinks: Link[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];
