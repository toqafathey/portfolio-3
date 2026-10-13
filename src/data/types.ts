export type CategoryId = 'healthcare' | 'veterinary' | 'restaurant' | 'marketing';

export interface ProjectVisual {
  /** Path under /public. Only reference files that exist. */
  src: string;
  alt: string;
  caption?: string;
}

/** A titled set of samples inside a case study, e.g. "Designs & campaigns" or "Website articles". */
export interface VisualGroup {
  title: string;
  note?: string;
  /** "portrait" suits tall designs and phone screenshots, "square" suits 1:1 posts. */
  layout: 'square' | 'portrait';
  visuals: ProjectVisual[];
}

export interface Project {
  id: string;
  /** Client or brand name. */
  title: string;
  industry: string;
  categories: CategoryId[];
  /** Logo shown on the case study header (optional). */
  logo?: { src: string; alt: string };
  role: string;
  /** One or two sentences shown on the card. */
  summary: string;
  overview: string;
  goal: string;
  /** May be empty, in which case the block is hidden. */
  approach: string[];
  /** Only verified results. Use null when there are none, and the block is hidden. */
  results: string[] | null;
  groups: VisualGroup[];
  /** Index (group, visual) used as the card cover. */
  cover: { src: string; alt: string; position?: string };
}

export interface CampaignBlock {
  title: string;
  client?: string;
  role: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  title: string;
  /** Employer or brand name. */
  employer: string;
  /** One line describing the business. */
  descriptor: string;
  responsibilities: string[];
  skills: string[];
  /** Optional sub-block, e.g. the Nusuk campaign under Najm Digital Marketing. */
  campaign?: CampaignBlock;
  note?: string;
  /** Hidden entries are not rendered anywhere. */
  hidden?: boolean;
}

export interface Skill {
  number: string;
  title: string;
}

export interface ToolGroup {
  label: string;
  items: string[];
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  detail?: string;
  period?: string;
}

export interface Brand {
  name: string;
  logo: string;
  note?: string;
}
