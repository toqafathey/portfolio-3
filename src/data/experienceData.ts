import type { ExperienceEntry } from './types';

/**
 * Single source of truth for professional experience. It feeds the 3D timeline
 * and the 2D fallback.
 *
 * Dates are intentionally not shown on the website; they are in the CV.
 * The order below is the order on the timeline.
 * Set `hidden: true` on an entry to remove it from the site.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'vet-home',
    title: 'Social Media Specialist & Content Creator',
    employer: 'Vet Home',
    descriptor:
      'Veterinary medical equipment, supplies and clinic setup solutions for veterinary doctors and clinic owners.',
    responsibilities: [
      'Developing relevant content ideas and promotional messaging',
      'Creating social media content, captions, hooks, and calls to action',
      'Supporting content planning and visual consistency',
      'Creating product-focused content for veterinary equipment, supplies, and clinic setup solutions',
      'Contributing to AI-assisted video and Reel concepts',
      'Supporting sales efforts through organic content and paid advertising',
    ],
    skills: ['B2B content', 'Copywriting', 'Content planning', 'AI-assisted video', 'Paid social support'],
  },
  {
    id: 'al-mohamadia',
    title: 'Social Media Specialist & Content Creator',
    employer: 'Al Mohamadia Medical Complex',
    descriptor: 'A medical complex in Saudi Arabia.',
    responsibilities: [
      'Managing, planning, creating, and scheduling social media content',
      "Developing informative medical content that highlights doctors' expertise",
      'Coordinating photography and providing creative direction for shoots',
      'Preparing video scripts and Reel references',
      'Coordinating with designers and video editors',
      "Creating website content, including doctors' profiles, articles, and supporting images",
      'Writing informative and SEO-oriented medical articles',
      'Supporting consistency between the physical brand presence and digital platforms',
    ],
    skills: [
      'Content scheduling',
      'Medical content writing',
      'Shoot direction',
      'Video scriptwriting',
      'Website content',
      'SEO articles',
    ],
  },
  {
    id: 'clav57',
    title: 'Social Media Specialist & Content Creator',
    employer: 'C.la.v57',
    descriptor: 'A restaurant and café brand.',
    responsibilities: [
      'Creating social media content and captions',
      'Developing creative concepts for designs and branding',
      'Contributing campaign and promotional ideas',
      'Following up on photography and visual content production',
      'Providing creative direction for food photography and brand visuals',
    ],
    skills: ['Social content', 'Creative concepts', 'Campaign ideas', 'Photography direction'],
  },
  {
    id: 'najm',
    title: 'Social Media Specialist & Content Creator',
    employer: 'Najm Digital Marketing',
    descriptor: 'A digital marketing agency working with multiple client accounts.',
    responsibilities: [
      'Developing content and post ideas',
      'Preparing design briefs and written content for designers',
      'Reviewing designs and providing revisions',
      'Supporting social media advertising campaigns',
      'Reviewing advertising numbers and analyzing campaign performance',
    ],
    skills: ['Design briefs', 'Design review', 'Ads support', 'Performance analysis'],
    campaign: {
      title: 'Nusuk campaign',
      role: 'A client campaign delivered through Najm Digital Marketing.',
      items: [
        'Coordinating communication with influencers',
        'Handling campaign content and design materials',
        'Supervising video production and photography',
        'Following up on creative materials for the campaign',
      ],
    },
  },
  {
    id: 'el-joker',
    title: 'Social Media Team Leader',
    employer: 'El Joker Store',
    descriptor: 'A store selling Apple products through social media.',
    responsibilities: [
      'Supporting social media sales of Apple products',
      'Following up on orders and customer-related tasks',
      "Preparing daily reports on my work and the team's activities",
      'Reviewing work quality and identifying areas for improvement',
      'Discussing workflow and performance improvements with management',
    ],
    skills: ['Social selling', 'Order follow-up', 'Performance reporting', 'Team coordination'],
  },
  {
    id: 'zacks',
    title: 'Customer Service Representative',
    employer: "Zack's Restaurant",
    descriptor: 'A restaurant taking orders by phone and through delivery platforms.',
    responsibilities: [
      'Handling customer service and call center tasks',
      'Following up on online food orders',
      'Working with delivery platforms including Marsool, Menus, Akelni, and Talabat',
    ],
    skills: ['Customer communication', 'Order follow-up', 'Call center support'],
  },
];

/** Entries that appear on the timeline (everything not hidden). */
export const getTimelineEntries = (): ExperienceEntry[] => experience.filter((e) => !e.hidden);
