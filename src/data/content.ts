import type { ApproachStep, Brand, EducationItem, Skill, ToolGroup } from './types';

export const skills: Skill[] = [
  { number: '01', title: 'Social Media Management' },
  { number: '02', title: 'Content Creation & Copywriting' },
  { number: '03', title: 'Content Planning & Calendar Creation' },
  { number: '04', title: 'Content Scheduling' },
  { number: '05', title: 'Competitor Analysis' },
  { number: '06', title: 'Facebook & Instagram Advertising' },
  { number: '07', title: 'Basic Media Buying' },
  { number: '08', title: 'Advertising Performance Analysis' },
  { number: '09', title: 'Creative Campaign Ideation' },
  { number: '10', title: 'Design Briefs & Creative Direction' },
  { number: '11', title: 'Photography & Video Production Coordination' },
  { number: '12', title: 'Video Scriptwriting' },
  { number: '13', title: 'AI-Assisted Video Content Creation' },
  { number: '14', title: 'Website Content Management' },
  { number: '15', title: 'Informative & Medical Content Writing' },
  { number: '16', title: 'Community & Audience Engagement' },
  { number: '17', title: 'Team Coordination & Performance Reporting' },
];

/**
 * Tools are listed without proficiency levels.
 */
export const toolGroups: ToolGroup[] = [
  { label: 'Social & advertising', items: ['Meta Business Suite', 'Meta Ads Manager'] },
  { label: 'Design & documents', items: ['Canva', 'Microsoft Office'] },
  { label: 'Planning', items: ['Notion', 'Trello'] },
  { label: 'AI video & content', items: ['Veo 3', 'Flow', 'Grok'] },
];

export const brands: Brand[] = [
  { name: 'Vet Home', logo: '/images/brands/vet-home.webp' },
  { name: 'Al Mohamadia Medical Complex', logo: '/images/brands/al-mohamadia.webp' },
  { name: 'C.la.v57', logo: '/images/brands/clav57.webp' },
  { name: 'Najm Digital Marketing', logo: '/images/brands/najm.webp' },
  { name: "Zack's Restaurant", logo: '/images/brands/zacks.webp' },
  { name: 'Nusuk', logo: '/images/brands/nusuk.webp', note: 'Campaign with Najm' },
];

export const approach: ApproachStep[] = [
  {
    number: '01',
    title: 'Understand the Brand & Audience',
    description:
      'Review the brand, audience, products or services, communication needs, and objectives.',
  },
  {
    number: '02',
    title: 'Research & Content Planning',
    description:
      'Review competitors, develop content ideas, organize content calendars, and identify relevant content directions.',
  },
  {
    number: '03',
    title: 'Create & Coordinate',
    description:
      'Write captions, promotional copy, website content, and design briefs while coordinating creative development and revisions.',
  },
  {
    number: '04',
    title: 'Support Campaign Execution',
    description:
      'Support social media advertising, content publishing, and campaign activities according to assigned responsibilities.',
  },
  {
    number: '05',
    title: 'Review & Improve',
    description:
      'Analyze available advertising performance data, identify useful observations, and use the findings to inform future content and campaign improvements.',
  },
];

export const education: EducationItem[] = [
  {
    title: 'Bachelor of Laws',
    institution: 'Cairo University',
    period: '2019–2023',
    detail: 'Grade: Good',
  },
  {
    title: 'Digital Marketing Internship',
    institution: 'Shatara Marketing',
    detail: '2 months',
  },
  {
    title: 'Digital Marketing Course',
    institution: 'Abdelrahman Alaa',
    detail: 'In Progress',
  },
];
