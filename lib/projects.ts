export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  desc: string;
  tech: string[];
  liveUrl: string;
  videoEmbed?: string;
  featured?: boolean;
  challenge?: string;
  approach?: string;
  result?: string;
  metrics?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'shuvasish',
    title: 'Immersive Personal Universe',
    client: 'Shuvasish Bhowmick - Country Director ATEC Australia · TEDx Speaker',
    category: '3D / Creative Web',
    year: '2025',
    desc: "World-class personal brand site for Bangladesh's leading sustainability figure. Full Three.js animated sections, custom 3D gear animation, mobile-responsive, Vercel deployed.",
    tech: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://demo-shuvasish.mh-toha.com',
    videoEmbed: '5wJ2tZLfaWs',
    featured: true,
    challenge: "Build a website that matches the gravitas of a TEDx speaker, mechanical engineer, SDG Champion, and viral content creator - one site, eight distinct identities.",
    approach: '8 unique sections: animated 3D gear canvas (Three.js), oscilloscope identity visualizer, mobile-first responsive CSS grid, custom navigation, IntersectionObserver-triggered reveals, Botpress AI chatbot integration.',
    result: 'Production-deployed on Vercel. Full mobile responsiveness across all 8 sections. Three.js 3D gear system with realistic counter-rotation physics.',
    metrics: ['8 sections', '15+ animations', 'Three.js 3D', 'Vercel deployed', 'Mobile first'],
  },
  {
    id: 'texit',
    title: 'TEX-IT - RMG Digital Partner',
    client: "TEX-IT Agency - Bangladesh's dedicated IT partner for the garment industry",
    category: 'Agency / Brand',
    year: '2024–2025',
    desc: "Founded and built Bangladesh's first dedicated digital transformation studio for the garment industry. Currently serving 18+ RMG clients with a 12-person team.",
    tech: ['Next.js', 'Brand Identity', 'Digital Marketing', 'Business Development'],
    liveUrl: 'https://texit.byv.life',
    videoEmbed: 'NFTP03aGtJ4',
    featured: true,
    challenge: "Bangladesh's 4,500+ garment factories compete for global buyers but lack digital presence. They lose contracts to better-marketed competitors.",
    approach: 'Founded TEX-IT as the dedicated IT partner for RMG. Built buyer-facing websites, company profiles, digital catalogs, and marketing campaigns tailored to international textile buyers.',
    result: 'Multiple factories reporting increased international buyer trust and contract wins. 12-person team. 18+ active clients.',
    metrics: ['18+ clients', '12 team members', '8 services', 'Founded 2024'],
  },
  {
    id: 'ibj',
    title: 'IBJ - Oil & Gas Industrial',
    client: 'IBJ - Oil & gas industrial support & operations',
    category: 'Web / Brand',
    year: '2024',
    desc: 'Professional corporate website for an oil & gas industrial operations company. Clean, authority-driven design targeting international B2B clients.',
    tech: ['WordPress', 'Custom Theme', 'Brand Identity', 'SEO'],
    liveUrl: 'https://binjalawi.com',
    videoEmbed: '5OG56NOp_zw',
    featured: false,
    challenge: 'Oil & gas company needed a corporate-grade web presence to compete internationally and build buyer trust with industrial clients.',
    approach: 'Custom WordPress theme with authority design language, optimised for B2B trust signals, service showcasing, and international SEO.',
    result: 'Live production site with professional brand identity that positions IBJ as a credible industrial partner.',
    metrics: ['Custom WordPress', 'B2B design', 'SEO optimised'],
  },
  {
    id: 'abj',
    title: 'ABJ Apparel - RMG Buying House',
    client: 'ABJ Apparel - Garment export & RMG buying house',
    category: 'Web / RMG',
    year: '2024',
    desc: 'Buyer-facing website for a major RMG buying house targeting international fashion brands from Europe and North America.',
    tech: ['Next.js', 'Custom Design', 'SEO', 'Brand Identity'],
    liveUrl: 'https://apparel.binjalawi.com',
    videoEmbed: '8PRAFjyzzD4',
    featured: false,
    challenge: 'Present a Bangladesh buying house as a world-class RMG partner to skeptical international buyers who judge capability by digital presence.',
    approach: 'Premium Next.js site with product capability showcase, factory credentials, compliance certifications, and streamlined buyer inquiry flow.',
    result: 'Professional digital presence that converts international buyer visits into direct inquiries.',
    metrics: ['Next.js', 'SEO optimised', 'International buyer-targeted'],
  },
  {
    id: 'verdant',
    title: 'Verdant Source - Eco Textile',
    client: 'Verdant Source - Eco-conscious textile sourcing firm',
    category: 'Web / RMG',
    year: '2024',
    desc: 'Sustainability-focused textile sourcing brand. Designed to appeal to eco-conscious European fashion buyers with clean, green brand identity.',
    tech: ['Next.js', 'Custom Design', 'Brand Identity', 'SEO'],
    liveUrl: 'https://verdant.binjalawi.com',
    videoEmbed: 'bS3GluZs9ZM',
    featured: false,
    challenge: 'Eco-conscious buyers from Europe and Scandinavia demand sustainability credentials upfront. Generic RMG websites lose these clients.',
    approach: 'Green-forward brand identity with clear sustainability messaging, certifications display, and eco-credential storytelling throughout.',
    result: 'Distinct positioning in the RMG market targeting the premium sustainable sourcing segment.',
    metrics: ['Sustainability focus', 'EU market targeted', 'Next.js'],
  },
  {
    id: 'nicu',
    title: 'NICU Smart Billing System',
    client: 'Hospital NICU Department - Smart offline billing & patient management',
    category: 'Software / App',
    year: '2025',
    desc: 'Offline-first smart billing and patient management system for a hospital NICU. Handles patient records, daily charges, medicine tracking, and auto-generated bills.',
    tech: ['Python', 'SQLite', 'Offline-first', 'Custom Software', 'Desktop App'],
    liveUrl: '#',
    videoEmbed: 'EItHg9zmN8w',
    featured: true,
    challenge: 'NICU departments in Bangladeshi hospitals track billing in paper ledgers, causing errors, delays, and revenue leakage.',
    approach: 'Python desktop application with SQLite database. Works 100% offline. Auto-calculates daily charges per bed, medicine usage, procedure fees. One-click invoice generation.',
    result: 'Deployed in hospital NICU. Eliminated manual billing errors. Staff generate accurate bills in under 60 seconds.',
    metrics: ['100% offline', 'SQLite database', 'Auto billing', 'Hospital deployed'],
  },
];

export const CATEGORIES = ['All', 'Web / RMG', '3D / Creative Web', 'Agency / Brand', 'Web / Brand', 'Software / App'] as const;
