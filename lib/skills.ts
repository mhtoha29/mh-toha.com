export type SkillCategory = 'Frontend' | 'AI/ML' | 'Design' | 'Marketing' | 'Engineering';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0–100
}

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  Frontend:    '#0EA5E9',
  'AI/ML':     '#6366F1',
  Design:      '#06B6D4',
  Marketing:   '#10B981',
  Engineering: '#F59E0B',
};

export const SKILLS: Skill[] = [
  { name: 'Next.js',       category: 'Frontend',    level: 70 },
  { name: 'React',         category: 'Frontend',    level: 72 },
  { name: 'TypeScript',    category: 'Frontend',    level: 55 },
  { name: 'Three.js',      category: 'Frontend',    level: 58 },
  { name: 'WordPress',     category: 'Frontend',    level: 85 },
  { name: 'HTML / CSS',    category: 'Frontend',    level: 90 },
  { name: 'JavaScript',    category: 'Frontend',    level: 75 },
  { name: 'Python',        category: 'AI/ML',       level: 72 },
  { name: 'Machine Learning', category: 'AI/ML',    level: 68 },
  { name: 'ChatGPT API',   category: 'AI/ML',       level: 80 },
  { name: 'Claude API',    category: 'AI/ML',       level: 80 },
  { name: 'Automation',    category: 'AI/ML',       level: 75 },
  { name: 'Figma',         category: 'Design',      level: 65 },
  { name: 'Illustrator',   category: 'Design',      level: 70 },
  { name: 'Photoshop',     category: 'Design',      level: 72 },
  { name: 'After Effects', category: 'Design',      level: 65 },
  { name: 'Canva',         category: 'Design',      level: 85 },
  { name: 'SEO',           category: 'Marketing',   level: 75 },
  { name: 'Meta Ads',      category: 'Marketing',   level: 70 },
  { name: 'Social Media',  category: 'Marketing',   level: 72 },
  { name: 'Video Editing', category: 'Marketing',   level: 75 },
  { name: 'Brand Identity',category: 'Marketing',   level: 68 },
  { name: 'AutoCAD',       category: 'Engineering', level: 65 },
  { name: 'PLC Automation',category: 'Engineering', level: 60 },
  { name: 'Mechanical',    category: 'Engineering', level: 70 },
  { name: 'Shipbuilding',  category: 'Engineering', level: 72 },
];

export const TOP_SKILLS: Skill[] = [
  { name: 'HTML / CSS',    category: 'Frontend',    level: 90 },
  { name: 'WordPress',     category: 'Frontend',    level: 85 },
  { name: 'JavaScript',    category: 'Frontend',    level: 75 },
  { name: 'Next.js',       category: 'Frontend',    level: 70 },
  { name: 'AI Tools',      category: 'AI/ML',       level: 82 },
  { name: 'Photoshop',     category: 'Design',      level: 72 },
  { name: 'Illustrator',   category: 'Design',      level: 70 },
  { name: 'SEO',           category: 'Marketing',   level: 75 },
];
