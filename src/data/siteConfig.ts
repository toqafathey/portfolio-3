/**
 * Central, editable site configuration.
 * Empty strings mean "not supplied": the site then hides the matching link
 * instead of showing a fake or broken one.
 */
export const siteConfig = {
  name: 'Toqa Fathey',
  title: 'Social Media Specialist & Content Creator',
  headline: 'Creative Content. Consistent Presence. Clear Communication.',
  intro:
    'I manage social media content, write captions and copy, plan content calendars, and develop creative ideas that fit each business and its audience.',

  portrait: {
    src: '/images/profile/toqa-fathey-profile.webp',
    alt: 'Portrait of Toqa Fathey, Social Media Specialist & Content Creator',
  },

  contact: {
    // Taken from the CV.
    email: 'toqafathey98@gmail.com',
    linkedin: 'https://www.linkedin.com/in/toqa-fathey-b9865b238',
    phones: ['01151711768', '01055932350'],
    location: 'Cairo, Egypt',
    cvPath: '/documents/Toqa-Fathey-CV.pdf',
  },

  /** Verified profiles only, e.g. { label: 'Instagram', url: 'https://...' } */
  social: [] as { label: string; url: string }[],

  about: {
    heading: 'A Little About Me',
    paragraphs: [
      "I'm a Social Media Specialist and Content Creator with hands-on experience managing social media content, writing captions and copy, and planning content calendars for healthcare, veterinary, and restaurant and café brands.",
      "I enjoy turning a brand's services and audience into clear content ideas, creative briefs for designers, and consistent content plans, from the first idea to the published post.",
      'I also develop AI-assisted video and Reel concepts, support Meta advertising campaigns, and write website content and SEO-focused articles.',
      "I'm looking to keep growing my research, content strategy, and paid advertising skills inside a larger team.",
    ],
    focus: [
      'Social media management',
      'Content creation and copywriting',
      'Content planning and content calendars',
      'Creative ideas and promotional content',
      'Content suited to different businesses and audiences',
    ],
  },

  seo: {
    title: 'Toqa Fathey | Social Media Specialist & Content Creator',
    description:
      'Portfolio of Toqa Fathey, Social Media Specialist & Content Creator: social media management, content planning, copywriting, creative direction and selected client work.',
  },
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Selected Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
