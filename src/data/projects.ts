import type { CategoryId, Project } from './types';

export const categories: { id: 'all' | CategoryId; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'veterinary', label: 'Veterinary' },
  { id: 'restaurant', label: 'Restaurant & Café' },
  { id: 'marketing', label: 'Marketing' },
];

/**
 * Featured projects. All samples are real work. To add or swap a sample, put the
 * (optimized) image in /public/images/portfolio/... and list it under `groups`.
 * Najm Digital Marketing shows design ideas created for its client LA Marketing.
 */
export const projects: Project[] = [
  {
    id: 'vet-home',
    title: 'Vet Home',
    industry: 'Veterinary equipment & supplies',
    categories: ['veterinary'],
    logo: { src: '/images/brands/vet-home.webp', alt: 'Vet Home logo' },
    role: 'Social Media Management & Content Creation',
    summary:
      'Product-focused content for veterinary doctors and clinic owners, covering equipment, supplies and clinic setup.',
    overview:
      'Vet Home provides veterinary medical equipment, supplies, and clinic setup solutions. The aim was a more consistent social media presence that supports sales by reaching the right professional audience.',
    goal: 'Create a consistent social media presence and support sales by reaching veterinary doctors and clinic owners instead of a general audience.',
    approach: [
      'Refined the content direction to focus on veterinary doctors and clinic owners.',
      'Developed relevant content ideas and product-focused promotional messaging.',
      'Improved visual consistency across the page.',
      'Created content highlighting veterinary equipment, supplies, and clinic setup solutions.',
      'Supported sales efforts through organic content and paid advertising.',
    ],
    results: [
      'Started receiving organic orders through social media.',
      'Improved the consistency and overall appearance of the page.',
      'Developed a clearer content direction for the relevant professional audience.',
      'Supported sales efforts through advertising.',
    ],
    cover: {
      src: '/images/portfolio/veterinary/vet-home-01-otoscope.webp',
      alt: 'Vet Home social media post presenting an otoscope for veterinary clinics',
    },
    groups: [
      {
        title: 'Selected designs',
        layout: 'square',
        visuals: [
          {
            src: '/images/portfolio/veterinary/vet-home-01-otoscope.webp',
            alt: 'Vet Home post presenting an otoscope, with a small dog holding the device',
          },
          {
            src: '/images/portfolio/veterinary/vet-home-02-centrifuge.webp',
            alt: 'Vet Home post about choosing the right centrifuge for a clinic',
          },
          {
            src: '/images/portfolio/veterinary/vet-home-03-diagyl.webp',
            alt: 'Vet Home post presenting Diagyl, a digestive support product, with a puppy',
          },
          {
            src: '/images/portfolio/veterinary/vet-home-04-eid-alcohol.webp',
            alt: 'Vet Home Eid campaign post showing alcohol disinfectant containers in an operating room',
          },
          {
            src: '/images/portfolio/veterinary/vet-home-05-eid-gloves.webp',
            alt: 'Vet Home Eid campaign post showing surgical gloves and clinic consumables',
          },
          {
            src: '/images/portfolio/veterinary/vet-home-06-eid-offer.webp',
            alt: 'Vet Home Eid campaign offer post announcing discounts on consumables',
          },
        ],
      },
    ],
  },
  {
    id: 'al-mohamadia',
    title: 'Al Mohamadia Medical Complex',
    industry: 'Healthcare, Saudi Arabia',
    categories: ['healthcare'],
    logo: { src: '/images/brands/al-mohamadia.webp', alt: 'Al Mohamadia Medical Complex logo' },
    role: 'Social Media Management & Content Creation',
    summary:
      "Informative medical content, campaign designs and website articles for a medical complex in Saudi Arabia.",
    overview:
      'Al Mohamadia Medical Complex is a medical facility in Saudi Arabia. When I started working on its digital presence, the social media page lacked visual consistency, and bookings remained low even with paid advertising.',
    goal: "Strengthen the brand's digital presence, build patient trust, and increase bookings.",
    approach: [
      'Helped organize the content direction and improve visual consistency.',
      "Focused on informative content and photography that highlighted doctors' expertise, rather than relying only on direct promotional posts.",
      'Adapted relevant trends to the medical field.',
      "Created content for the newly launched website, including doctors' profiles and articles.",
      'Supported consistency between the physical brand identity and digital platforms.',
      'Contributed to content related to conference participation and collaborations.',
    ],
    results: [
      'Patient bookings increased, including bookings through the website.',
      'The brand developed a more consistent presence across physical and digital touchpoints.',
      'The tracked search ranking improved from #14 to #3.',
    ],
    cover: {
      src: '/images/portfolio/healthcare/al-mohamadia-04-pink-october-signs.webp',
      alt: 'Al Mohamadia Pink October awareness post about breast cancer warning signs',
    },
    groups: [
      {
        title: 'Designs & campaigns',
        layout: 'portrait',
        visuals: [
          {
            src: '/images/portfolio/healthcare/al-mohamadia-01-dental-awareness.webp',
            alt: 'Dental awareness post showing a man holding a dessert plate',
          },
          {
            src: '/images/portfolio/healthcare/al-mohamadia-02-insurance.webp',
            alt: 'Post explaining that insurance is accepted, with two men holding an insurance card',
          },
          {
            src: '/images/portfolio/healthcare/al-mohamadia-03-digestive-health.webp',
            alt: 'Digestive health awareness post with an illustration of the stomach',
          },
          {
            src: '/images/portfolio/healthcare/al-mohamadia-04-pink-october-signs.webp',
            alt: 'Pink October awareness post listing breast cancer warning signs',
            caption: 'Pink October awareness',
          },
          {
            src: '/images/portfolio/healthcare/al-mohamadia-05-saudi-national-day.webp',
            alt: 'Saudi National Day campaign post announcing offers across all departments',
            caption: 'Saudi National Day campaign',
          },
          {
            src: '/images/portfolio/healthcare/al-mohamadia-06-womens-day.webp',
            alt: "Post marking International Women's Day with a smiling woman",
          },
        ],
      },
      {
        title: 'Website articles',
        note: 'Medical articles and content written for the complex’s website (shown on mobile).',
        layout: 'portrait',
        visuals: [
          {
            src: '/images/portfolio/seo/al-mohamadia-article-01-pink-october.webp',
            alt: 'Website article about Pink October and early breast cancer screening',
          },
          {
            src: '/images/portfolio/seo/al-mohamadia-article-02-bone-health.webp',
            alt: 'Website article about bone health after menopause',
          },
          {
            src: '/images/portfolio/seo/al-mohamadia-article-03-4d-sonar.webp',
            alt: 'Website article about 4D pregnancy sonar',
          },
          {
            src: '/images/portfolio/seo/al-mohamadia-article-04-dental-fillings.webp',
            alt: 'Website article about cosmetic dental fillings',
          },
        ],
      },
    ],
  },
  {
    id: 'clav57',
    title: 'C.la.v57',
    industry: 'Restaurant & café',
    categories: ['restaurant'],
    logo: { src: '/images/brands/clav57.webp', alt: 'C.la.v57 logo' },
    role: 'Social Media Specialist & Content Creator',
    summary:
      'Creative content and campaign ideas for a restaurant and café brand, with direction for food and drink visuals.',
    overview:
      'C.la.v57 is a restaurant and café brand. My work covered social media content, creative concepts for designs and branding, and following up on photography and visual production.',
    goal: 'Keep the brand’s social media content creative, consistent and focused on its food, drinks and delivery offers.',
    approach: [
      'Wrote social media content and captions.',
      'Developed creative concepts for designs and branding.',
      'Contributed campaign and promotional ideas.',
      'Followed up on photography and visual content production.',
      'Provided creative direction for food photography and brand visuals.',
    ],
    results: null,
    cover: {
      src: '/images/portfolio/restaurant/clav57-03-pyramids-drink.webp',
      alt: 'C.la.v57 post showing a colorful signature drink in front of the Pyramids and a city skyline',
    },
    groups: [
      {
        title: 'Selected designs',
        layout: 'square',
        visuals: [
          {
            src: '/images/portfolio/restaurant/clav57-01-delivery-app.webp',
            alt: 'C.la.v57 post showing a smiling man ordering from the brand’s delivery app',
          },
          {
            src: '/images/portfolio/restaurant/clav57-02-prize-wheel.webp',
            alt: 'C.la.v57 promotional post with a prize wheel of menu items',
          },
          {
            src: '/images/portfolio/restaurant/clav57-03-pyramids-drink.webp',
            alt: 'C.la.v57 post showing a colorful signature drink in front of the Pyramids and a city skyline',
          },
          {
            src: '/images/portfolio/restaurant/clav57-04-app-ordering.webp',
            alt: 'C.la.v57 post about easy ordering through the delivery app',
          },
          {
            src: '/images/portfolio/restaurant/clav57-05-ocean-drink.webp',
            alt: 'C.la.v57 post showing a branded drink can floating in the sea',
          },
          {
            src: '/images/portfolio/restaurant/clav57-06-space-drink.webp',
            alt: 'C.la.v57 post showing a branded drink on the moon with an astronaut',
          },
        ],
      },
    ],
  },
  {
    id: 'najm',
    title: 'Najm Digital Marketing',
    industry: 'Digital marketing agency',
    categories: ['marketing'],
    logo: { src: '/images/brands/najm.webp', alt: 'Najm Digital Marketing logo' },
    role: 'Social Media Specialist & Content Creator',
    summary: 'Content and post ideas, design briefs and design reviews for client accounts, including LA Marketing.',
    overview:
      'At Najm Digital Marketing I supported client accounts with social media content, design briefs, design reviews and advertising tasks. The samples below are design ideas for LA Marketing, one of the agency’s clients.',
    goal: 'Turn client needs into clear content and post ideas, and brief designers so the visuals match.',
    approach: [
      'Developed content and post ideas.',
      'Prepared design briefs and written content for designers.',
      'Reviewed designs and provided revisions.',
      'Supported social media advertising campaigns.',
      'Reviewed advertising numbers and analyzed campaign performance.',
    ],
    results: null,
    cover: {
      src: '/images/portfolio/advertising/la-marketing-01-influencers.webp',
      alt: 'Design idea for LA Marketing about making a business stand out with influencers',
    },
    groups: [
      {
        title: 'LA Marketing: design ideas',
        note: 'Design ideas for a client of Najm Digital Marketing. They are concepts, not published campaign results.',
        layout: 'square',
        visuals: [
          {
            src: '/images/portfolio/advertising/la-marketing-01-influencers.webp',
            alt: 'LA Marketing design idea about making a business stand out with influencers',
          },
          {
            src: '/images/portfolio/advertising/la-marketing-02-restaurant.webp',
            alt: 'LA Marketing design idea showing a delivery rider on a scooter, with the message that the restaurant is the first choice',
          },
        ],
      },
    ],
  },
];
