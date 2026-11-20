/**
 * All site copy lives here. Sections only render what this file describes,
 * so updating the portfolio means editing data, not components.
 */

import brainplayShot from '../public/assets/images/projects/brainplay.webp';
import govisShot from '../public/assets/images/projects/govis.webp';

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
  /** Kind of engagement, shown next to the role, e.g. "Full-time". */
  type: string;
  period: string;
  summary: string;
  highlights: Highlight[];
  stack: string[];
  current?: boolean;
}

export const profile = {
  name: 'Sibin Silu',
  firstName: 'Sibin',
  role: 'Full-Stack Software Engineer',
  company: 'Magadh Industries',
  location: 'India',
  email: 'sibinthekkel@gmail.com',
  phone: '+91 95670 49403',
  phoneHref: 'tel:+919567049403',
  github: 'https://github.com/sibin12',
  linkedin: 'https://www.linkedin.com/in/sibin-silu-375938257',
  headline: 'Full-Stack Software Engineer focused on building',
  headlineAccent: 'reliable backend systems.',
  intro:
    'I build complete web applications, scalable backend APIs and data-driven business systems using modern technologies. My primary focus is backend engineering, while also bringing practical experience in frontend development and application delivery.',
  availability: ['Open to backend & full-stack roles', 'Available for freelance projects'],
  summary: [
    'I’m a backend-focused software engineer who builds and maintains production applications: REST APIs, database-driven systems and the internal tools a business depends on. I work across the stack, from data models to the React screens people use, and can take a project from development through to deployment.',
    'I started out with the MERN stack, building full-stack applications end to end. Since joining Magadh Industries in June 2024, I’ve worked on production business systems built with Node.js, Express, MongoDB and React, and expanded into newer backend services using Bun, Hono, PostgreSQL and Drizzle ORM.',
    'My work covers API development, database design, data synchronization, scheduled jobs, third-party integrations, reporting workflows and AI-assisted document processing.',
    'I’m currently strengthening my Go and distributed systems knowledge, with a focus on building backend services that stay reliable and easy to maintain.',
  ],
};

/**
 * Chips that bounce beside the hero portrait, most important first.
 * Smaller screens show only as many as fit, starting from the top of this list.
 */
export const heroChips = [
  { icon: 'server', label: 'Node.js' },
  { icon: 'database', label: 'PostgreSQL' },
  { icon: 'leaf', label: 'MongoDB' },
  { icon: 'braces', label: 'TypeScript' },
  { icon: 'zap', label: 'Bun · Hono' },
  { icon: 'route', label: 'Express' },
  { icon: 'atom', label: 'React' },
  { icon: 'sparkles', label: 'AI integrations' },
  { icon: 'container', label: 'Docker' },
  { icon: 'gauge', label: 'Go' },
] as const;

export const stats = [
  { value: '2+', label: 'Years building production systems' },
  { value: '4+', label: 'Years writing JavaScript & TypeScript' },
  { value: '15+', label: 'Side projects built' },
];

/** Short, scannable facts beside the About text. */
export const quickFacts = [
  { label: 'Current role', value: 'Software Engineer, Magadh Industries', note: 'Since June 2024' },
  { label: 'Primary focus', value: 'Backend: APIs, databases and business logic' },
  { label: 'Also builds', value: 'React interfaces and deployments' },
  { label: 'Currently learning', value: 'Go and distributed systems' },
  { label: 'Based in', value: 'India' },
  { label: 'Open to', value: 'Full-time roles and freelance projects' },
];

export const experience: Role[] = [
  {
    company: 'Magadh Industries',
    role: 'Software Engineer',
    type: 'Full-time',
    period: 'Jun 2024 — Present',
    current: true,
    summary:
      'I work on the company’s internal business platform across two stacks: a long-running MERN system, with a Node.js, Express and MongoDB API and a separate React admin app, and newer services on Bun, Hono and PostgreSQL. Most of my time goes to the backend, and I build the screens on top of it too.',
    highlights: [
      {
        title: 'Backend APIs',
        body: 'Build and maintain REST APIs in TypeScript with Node.js, Express and MongoDB for the main business platform.',
      },
      {
        title: 'Production business applications',
        body: 'Ship new features and production fixes for internal systems that teams across the business use every day.',
      },
      {
        title: 'Bun & PostgreSQL services',
        body: 'Newer services on Bun, Hono and Drizzle ORM with typed contracts, request validation and OpenAPI docs, built on a shared schema package.',
      },
      {
        title: 'Database design & integration',
        body: 'Model data in MongoDB with Mongoose and in PostgreSQL with Drizzle, and integrate both into the services that use them.',
      },
      {
        title: 'Data processing & automation',
        body: 'Spreadsheet and file importers with locks so runs never overlap, data syncs, scheduled jobs, and the reports and Excel exports teams rely on.',
      },
      {
        title: 'Third-party integrations',
        body: 'Connect internal systems with external services and keep data synchronized between them.',
      },
      {
        title: 'AI-assisted document processing',
        body: 'Language and vision models that read and check uploaded documents and suggest matches, with a person reviewing before anything is approved.',
      },
      {
        title: 'Go-based integration',
        body: 'A Go service that connects internal systems to accounting software through PostgreSQL, with filters, pagination and CSV exports.',
      },
      {
        title: 'React admin interfaces',
        body: 'Data-heavy screens with TanStack Query and TanStack Table: uploads, review queues, filters and approval flows.',
      },
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Bun',
      'Hono',
      'PostgreSQL',
      'Drizzle ORM',
      'OpenAPI',
      'Go',
      'React',
      'TanStack Query',
      'LLM APIs',
    ],
  },
  {
    company: 'Brototype',
    role: 'MERN Stack Developer, Trainee',
    type: 'Training program',
    period: 'Nov 2022 — Dec 2023',
    summary:
      'An intensive, self-driven full-stack training program. I built and deployed two complete full-stack products and a set of smaller apps.',
    highlights: [
      {
        title: 'GadgetGalaxy',
        body: 'Server-rendered Express and MongoDB store with OTP sign-in, Razorpay payments, coupons, stock management and sales reports.',
      },
      {
        title: 'LoopNet',
        body: 'MERN video sharing with JWT auth, comments and replies, plus real-time one-to-one and group chat over Socket.io.',
      },
      {
        title: 'Deployment',
        body: 'Ran both on AWS EC2 behind Nginx, with Route 53 and Cloudflare in front.',
      },
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'React', 'Redux Toolkit', 'Socket.io', 'AWS EC2', 'Nginx'],
  },
];

export const education = {
  degree: 'Bachelor of Computer Applications',
  school: 'Mahatma Gandhi University, Kerala',
  period: '2018 — 2021',
};

/** "How I can help": backend work first, full-stack last. */
export const services = [
  {
    icon: 'server',
    title: 'Backend API Development',
    body: 'REST API development, authentication, validation, API documentation and backend integrations.',
  },
  {
    icon: 'database',
    title: 'Database Development',
    body: 'PostgreSQL and MongoDB schema design, database integration, query optimization and data migration.',
  },
  {
    icon: 'plug',
    title: 'Third-party Integrations',
    body: 'Payment gateway integration, external API integrations, automation and data synchronization.',
  },
  {
    icon: 'wrench',
    title: 'Backend Maintenance',
    body: 'Debugging, fixing existing APIs, improving performance and maintaining backend applications.',
  },
  {
    icon: 'layers',
    title: 'Full-Stack Application Development',
    body: 'Complete web applications with React frontends and backend services.',
  },
] as const;

/** Live: anyone can open it. Completed: finished, code public, no longer hosted. In progress: still being built. */
export type ProjectStatus = 'Live' | 'Completed' | 'In progress';

/** Where most of the engineering in a project sits. */
export type ProjectFocus = 'Backend' | 'Full-stack' | 'Frontend';

export interface ProjectFeature {
  /** Short lead-in such as "Auth" or "Payments", so readers can scan for the topics they care about. */
  label: string;
  text: string;
}

/** One line of a data-model diagram: `from` relates to `to` with the given cardinality. */
export interface Relation {
  from: string;
  kind: '1:1' | '1:n' | 'n:1' | 'n:n';
  to: string;
  note?: string;
}

export type ProjectVisual =
  | { kind: 'model'; relations: Relation[] }
  | { kind: 'screenshot'; image: string; alt: string };

export interface Project {
  name: string;
  tagline: string;
  /** The problem the project solves. */
  problem: string;
  /** My technical contribution and how it is built. */
  built: string;
  features: ProjectFeature[];
  stack: string[];
  status: ProjectStatus;
  focus: ProjectFocus;
  year: string;
  accent: Accent;
  visual: ProjectVisual;
  links: { live?: string; code?: string; docs?: string };
  /** Shown when there are no public links, e.g. why the code isn't public yet. */
  note?: string;
}

export interface ArchiveProject {
  name: string;
  description: string;
  stack: string[];
  year: string;
  code?: string;
  live?: string;
  /** Shown instead of links when the project has none. */
  note?: string;
}

/**
 * Featured projects, backend-heavy work first. Every claim here is checked against the project's code;
 * keep it that way when editing.
 */
export const featuredProjects: Project[] = [
  {
    name: 'GadgetGalaxy',
    tagline: 'E-commerce platform for electronics',
    problem:
      'An electronics store needs secure sign-in and checkout, accurate stock, and tools for staff to run promotions and track sales.',
    built:
      'Built solo: a server-rendered Express and MongoDB app with an MVC structure and separate user and admin areas, deployed on AWS EC2 behind Nginx.',
    features: [
      { label: 'Auth', text: 'Session login with bcrypt, mobile OTP through Twilio Verify, and separate route guards for users and admins.' },
      { label: 'Payments', text: 'Razorpay orders with HMAC-SHA256 signature verification, plus cash on delivery.' },
      { label: 'Orders & stock', text: 'Stock is reserved on add-to-cart and restored on cancellation or approved return.' },
      { label: 'Admin', text: 'Coupons with expiry and minimum-purchase rules, category offers, and date-range sales reports with PDF and Excel export.' },
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'EJS', 'Razorpay', 'Twilio'],
    status: 'Completed',
    focus: 'Full-stack',
    year: '2023',
    accent: 'emerald',
    visual: {
      kind: 'model',
      relations: [
        { from: 'User', kind: '1:n', to: 'Order', note: 'places' },
        { from: 'Order', kind: 'n:n', to: 'Product', note: 'line items' },
        { from: 'Product', kind: 'n:1', to: 'Category' },
        { from: 'Offer', kind: 'n:1', to: 'Category', note: 'category offers' },
      ],
    },
    links: { code: 'https://github.com/sibin12/gadgetECom' },
  },
  {
    name: 'Book Store API',
    tagline: 'REST API for an online bookstore',
    problem:
      'A bookstore with authors and buyers needs role-based access, reliable purchase records and automatic email updates.',
    built:
      'A REST API in Express and Mongoose, layered into routes, controllers, models and middleware, with background jobs for email.',
    features: [
      { label: 'Auth & roles', text: 'JWT and bcrypt, with role middleware that limits actions to authors or buyers.' },
      { label: 'Purchases', text: 'Purchase IDs are generated under a mutex lock, so concurrent requests never collide; sales counts update on each purchase.' },
      { label: 'Background jobs', text: 'MongoDB-backed Agenda jobs email users about new books; a node-cron job sends a monthly revenue summary.' },
      { label: 'Search & reviews', text: 'Search by title, author and price range; one review per user per book.' },
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Agenda', 'node-cron', 'Nodemailer'],
    status: 'Completed',
    focus: 'Backend',
    year: '2024',
    accent: 'amber',
    visual: {
      kind: 'model',
      relations: [
        { from: 'User', kind: '1:n', to: 'Purchase', note: 'buys' },
        { from: 'Book', kind: '1:n', to: 'Purchase' },
        { from: 'Book', kind: '1:n', to: 'Review', note: 'embedded' },
        { from: 'User', kind: '1:n', to: 'Review', note: 'writes' },
      ],
    },
    links: {
      code: 'https://github.com/sibin12/Book_Store_Backend',
      docs: 'https://www.postman.com/galactic-station-687459/workspace/book-store-application',
    },
  },
  {
    name: 'Wardrobe Intelligence',
    tagline: 'Shopping assistant that checks your wardrobe first',
    problem:
      'People buy clothes that duplicate what they own or match nothing in it. This checks a new item against your wardrobe before you buy.',
    built:
      'Building it end to end: a Bun and Hono API in feature modules, a PostgreSQL schema with Drizzle migrations, and a React 19 web app.',
    features: [
      { label: 'API design', text: 'Each module is a routes and service pair, validated with Zod schemas from a shared package.' },
      { label: 'Data', text: '19 PostgreSQL tables covering wardrobe items, outfits, wear logs, shopping analyses and an admin audit log.' },
      { label: 'Auth', text: 'Cookie sessions with hashed tokens, Argon2id passwords, origin checks and rate limiting.' },
      { label: 'Logic & AI', text: 'Rule-based buy, consider or skip verdicts, outfit and gap analysis, and optional AI auto-fill with API keys encrypted at rest.' },
      { label: 'Testing', text: 'Around 120 automated tests, including API integration tests against PostgreSQL.' },
    ],
    stack: ['Bun', 'Hono', 'Drizzle ORM', 'PostgreSQL', 'Zod', 'React 19', 'TanStack Query'],
    status: 'In progress',
    focus: 'Full-stack',
    year: '2026',
    accent: 'violet',
    visual: {
      kind: 'model',
      relations: [
        { from: 'Outfit', kind: 'n:n', to: 'ClothingItem', note: 'outfit_items' },
        { from: 'ClothingItem', kind: '1:n', to: 'WearLog' },
        { from: 'ShoppingProduct', kind: '1:n', to: 'Analysis' },
        { from: 'ShoppingProduct', kind: 'n:1', to: 'ClothingItem', note: 'once bought' },
      ],
    },
    links: {},
    note: 'Private repository while in progress',
  },
  {
    name: 'SiteSketch',
    tagline: 'From satellite map to editable 3D property model',
    problem:
      'Sketching a property’s buildings and landscape usually takes CAD tools. Here you trace it on a satellite map and get an editable 3D model.',
    built:
      'A Bun and Hono API with PostgreSQL and Drizzle, a shared package for geometry and validation, and a React editor with 2D and 3D views.',
    features: [
      { label: 'Data design', text: 'Each property’s plan is one JSONB document with a revision number; stale saves are rejected with 409 Conflict.' },
      { label: 'History', text: 'Model versions that can be listed and restored.' },
      { label: 'Access', text: 'Cookie sessions with Argon2id and per-property viewer, editor and owner roles.' },
      { label: 'API', text: 'Property CRUD with cursor pagination, file uploads and Zod validation, covered by around 90 automated tests.' },
    ],
    stack: ['Bun', 'Hono', 'Drizzle ORM', 'PostgreSQL', 'Zod', 'React', 'three.js'],
    status: 'In progress',
    focus: 'Full-stack',
    year: '2026',
    accent: 'sky',
    visual: {
      kind: 'model',
      relations: [
        { from: 'Organization', kind: '1:n', to: 'Property' },
        { from: 'Property', kind: 'n:n', to: 'User', note: 'members with roles' },
        { from: 'Property', kind: '1:1', to: 'Model', note: 'JSONB + revision' },
        { from: 'Property', kind: '1:n', to: 'ModelVersion', note: 'snapshots' },
      ],
    },
    links: {},
    note: 'Not deployed yet; code is private',
  },
  {
    name: 'Go Memory Visualizer',
    tagline: 'Interactive guide to Go’s stack, heap and GC',
    problem:
      'Escape analysis and garbage collection are hard to picture from compiler output alone. This makes them visible for Go learners.',
    built:
      'A React and TypeScript simulation built from hand-written scenarios that model Go’s behaviour (it doesn’t run Go code), deployed to GitHub Pages with GitHub Actions.',
    features: [
      { label: 'Scenarios', text: 'Ten examples where values stay on the stack or escape to the heap, with simulated escape-analysis output.' },
      { label: 'What if', text: 'Shows the code change that moves a value from the stack to the heap.' },
      { label: 'GC', text: 'Mark-and-sweep: popping a frame drops its pointers, then unreachable objects are freed.' },
      { label: 'Learning', text: 'Guided lessons, a plain-language primer for beginners and keyboard shortcuts.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'GitHub Actions'],
    status: 'Live',
    focus: 'Frontend',
    year: '2026',
    accent: 'indigo',
    visual: { kind: 'screenshot', image: govisShot, alt: 'Go Memory Visualizer showing the stack, heap and escape-analysis panels' },
    links: { live: 'https://sibin12.github.io/go-visualizers/', code: 'https://github.com/sibin12/go-visualizers' },
  },
  {
    name: 'BrainPlay Kids',
    tagline: '3D memory and brain games for every age',
    problem: 'Most brain-training games for children come with ads and tracking. BrainPlay is free, works offline and collects nothing.',
    built:
      'Vanilla JavaScript and three.js with a shared game base class and registry, packaged as an installable PWA with a service worker.',
    features: [
      { label: 'Games', text: 'Twenty-plus games grouped by age, from bubble pop for toddlers to N-Back and Stroop for adults.' },
      { label: 'Structure', text: 'Every game extends one base class (start, update, destroy) and joins a single registry, so new games plug in cleanly.' },
      { label: 'Offline', text: 'Service-worker caching and an install prompt; no ads and no tracking.' },
    ],
    stack: ['JavaScript', 'Three.js', 'PWA', 'Service Worker'],
    status: 'Live',
    focus: 'Frontend',
    year: '2026',
    accent: 'rose',
    visual: { kind: 'screenshot', image: brainplayShot, alt: 'BrainPlay home screen with age groups and game cards' },
    links: { live: 'https://sibin12.github.io/brainplay/', code: 'https://github.com/sibin12/brainplay' },
  },
];

export const archiveProjects: ArchiveProject[] = [
  {
    name: 'LoopNet',
    description: 'MERN video-sharing platform with JWT auth, Google sign-in, comments and replies, and real-time chat over Socket.io.',
    stack: ['React', 'Express', 'MongoDB', 'Socket.io'],
    year: '2023',
    code: 'https://github.com/sibin12/Video_Sharing_Platform',
  },
  {
    name: 'Pulsepath',
    description: 'Workout and routine tracker: a Go API on the standard library with JWT auth, PostgreSQL JSONB and an in-memory demo store.',
    stack: ['Go', 'PostgreSQL', 'React'],
    year: '2026',
    note: 'In progress',
  },
  {
    name: 'Jetpack Arena',
    description: 'Browser shooter in a single HTML file, with peer-to-peer multiplayer over WebRTC.',
    stack: ['Canvas', 'WebRTC', 'PeerJS'],
    year: '2026',
    live: 'https://sibin12.github.io/jetpack-arena/',
    code: 'https://github.com/sibin12/jetpack-arena',
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

export interface SkillGroup {
  title: string;
  icon: 'server' | 'database' | 'layout' | 'code' | 'cloud' | 'sparkles';
  /** Primary groups get the most visual weight; the rest support them. */
  tier: 'primary' | 'secondary' | 'supporting';
  items: { name: string; note?: string }[];
}

const list = (...names: string[]) => names.map((name) => ({ name }));

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend Development',
    icon: 'server',
    tier: 'primary',
    items: list('Node.js', 'Express.js', 'Bun', 'Hono', 'REST APIs', 'OpenAPI / Swagger'),
  },
  {
    title: 'Databases',
    icon: 'database',
    tier: 'primary',
    items: list('PostgreSQL', 'MongoDB', 'SQL', 'Drizzle ORM', 'Mongoose'),
  },
  {
    title: 'Frontend Development',
    icon: 'layout',
    tier: 'secondary',
    items: list('React', 'Redux Toolkit', 'TanStack Query', 'TanStack Table', 'Tailwind CSS', 'HTML', 'CSS'),
  },
  {
    title: 'Programming Languages',
    icon: 'code',
    tier: 'supporting',
    items: [{ name: 'TypeScript' }, { name: 'JavaScript' }, { name: 'Go', note: 'Learning' }],
  },
  {
    title: 'DevOps & Infrastructure',
    icon: 'cloud',
    tier: 'supporting',
    items: list('Docker', 'Linux', 'Ubuntu', 'Nginx', 'Git', 'GitHub', 'AWS EC2', 'Cloudflare'),
  },
  {
    title: 'AI Integrations',
    icon: 'sparkles',
    tier: 'supporting',
    items: list('LLM API integration', 'Vision model integration', 'AI-assisted workflows'),
  },
];

export const navLinks: Link[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
