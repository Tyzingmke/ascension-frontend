import type { SiteContent } from './content-state'

export const organization = {
  name: 'Ascension Experience Society',
  tagline: 'Transforming People. Strengthening Communities. Creating Lasting Impact.',
  shortName: 'Ascension',
  location: 'Nairobi, Kenya',
  phone: '+254 000 000 000',
  email: 'info@ascensionexperience.org',
  description:
    'A community-based organization committed to empowering people, developing responsible leaders, supporting vulnerable communities, and creating sustainable social impact.',
}

export const appearance = {
  mode: 'light' as const,
  themeName: 'ascension' as const,
  logo: '',
  favicon: '',
  primaryColor: '#466450',
  secondaryColor: '#44667a',
  accentColor: '#a65f3b',
  h1Font: 'Inter',
  h2Font: 'Inter',
  h3Font: 'Inter',
  bodyFont: 'Inter',
  transitionDelay: 650,
  transitionDuration: 360,
  transitionStyle: 'fade' as const,
  transitionQuotes: [
    'Transformation begins with people.',
    'Every community carries gifts worth growing.',
    'Service, leadership, and compassion create lasting impact.',
  ],
}

export const defaultPageSettings = {
  pageStyle: 'standard' as const,
  contentWidth: 'standard' as const,
  textAlign: 'left' as const,
  heroImages: [],
  heroImageOpacity: 0.35,
  heroCarousel: false,
  backgroundImages: [],
  backgroundOpacity: 0.08,
  backgroundCarousel: false,
  titleFont: '',
  titleSize: 0,
  titleColor: '',
  titleAlign: 'left' as const,
}

export const navigation = [
  {
    label: 'About',
    href: '#/about',
    children: [
      { label: 'Who We Are', href: '#/about/who-we-are' },
      { label: 'Our Story', href: '#/about/story' },
      { label: 'Vision & Mission', href: '#/about/vision-mission' },
      { label: 'What We Believe', href: '#/about/beliefs' },
      { label: 'Our Values', href: '#/about/values' },
      { label: 'Leadership', href: '#/leadership' },
      { label: 'Transparency', href: '#/transparency' },
    ],
  },
  {
    label: 'Our Work',
    href: '#/work',
    children: [
      { label: 'Student & Youth Development', href: '#/work/student-youth-development' },
      { label: 'Women Empowerment', href: '#/work/women-empowerment' },
      { label: 'Leadership Development', href: '#/work/leadership-development' },
      { label: 'Hospital Outreach', href: '#/work/hospital-outreach' },
      { label: 'Missions', href: '#/work/missions-discipleship' },
      { label: 'Environment', href: '#/work/environmental-conservation' },
    ],
  },
  {
    label: 'Impact',
    href: '#/impact',
    children: [
      { label: 'Our Impact', href: '#/impact' },
      { label: 'Projects', href: '#/projects' },
      { label: 'Stories of Change', href: '#/stories' },
      { label: 'Reports', href: '#/reports' },
    ],
  },
  {
    label: 'News & Events',
    href: '#/news-events',
    children: [
      { label: 'News', href: '#/news' },
      { label: 'Events', href: '#/events' },
      { label: 'Gallery', href: '#/gallery' },
    ],
  },
  {
    label: 'Resources',
    href: '#/resources',
    children: [
      { label: 'Publications', href: '#/resources/publications' },
      { label: 'Training Materials', href: '#/resources/training-materials' },
      { label: 'Downloads', href: '#/resources/downloads' },
    ],
  },
  {
    label: 'Get Involved',
    href: '#/get-involved',
    children: [
      { label: 'Volunteer', href: '#/volunteer' },
      { label: 'Mentor', href: '#/mentor' },
      { label: 'Partner', href: '#/partner' },
      { label: 'Sponsor', href: '#/sponsor' },
      { label: 'Donate', href: '#/donate' },
    ],
  },
]

export const menuGroups = navigation.map((item) => ({ label: item.label }))

export const programs = [
  {
    index: '01',
    slug: 'student-youth-development',
    title: 'Student & Youth Development',
    summary: 'Leadership training, mentorship, life skills, career awareness, academic support, and personal development.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed student and youth development information from the CMS.' }],
  },
  {
    index: '02',
    slug: 'women-empowerment',
    title: 'Women Empowerment',
    summary: 'Opportunities for women to learn, lead, contribute, and strengthen families and communities.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed women empowerment information from the CMS.' }],
  },
  {
    index: '03',
    slug: 'leadership-development',
    title: 'Leadership Development',
    summary: 'Practical leadership formation rooted in service, responsibility, integrity, and community transformation.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed leadership development information from the CMS.' }],
  },
  {
    index: '04',
    slug: 'hospital-outreach',
    title: 'Hospital Outreach',
    summary: 'Compassionate visits, support, prayer, encouragement, and practical care for vulnerable patients and families.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed hospital outreach information from the CMS.' }],
  },
  {
    index: '05',
    slug: 'missions-discipleship',
    title: 'Missions & Discipleship',
    summary: 'Faith-inspired service, spiritual growth, compassion, truth, and human dignity in action.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed missions and discipleship information from the CMS.' }],
  },
  {
    index: '06',
    slug: 'environmental-conservation',
    title: 'Environmental Conservation',
    summary: 'Community responsibility, sustainability, care for creation, and practical conservation activities.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed environmental conservation information from the CMS.' }],
  },
  {
    index: '07',
    slug: 'helping-the-needy',
    title: 'Helping the Needy',
    summary: 'Practical support for vulnerable individuals, families, and communities with dignity and compassion.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed helping the needy information from the CMS.' }],
  },
  {
    index: '08',
    slug: 'advocacy-peace-building',
    title: 'Advocacy & Peace Building',
    summary: 'Civic responsibility, dialogue, peaceful coexistence, and community participation in solving shared challenges.',
    settings: defaultPageSettings,
    images: [],
    blocks: [{ type: 'paragraph' as const, text: 'Add detailed advocacy and peace building information from the CMS.' }],
  },
]

const navigationPages = navigation
  .filter((group) => group.label !== 'Our Work')
  .flatMap((group) =>
    group.children.map((child) => {
      const slug = child.href.replace('#/', '')
      return {
        title: child.label,
        slug,
        menuGroup: group.label,
        status: 'Published',
        settings: defaultPageSettings,
        blocks: [
          {
            type: 'paragraph' as const,
            text:
              slug === 'about/who-we-are'
                ? 'Ascension Experience Society is a community-based organization built around people, service, leadership, compassion, and sustainable impact.'
                : `${child.label} content can be edited from the CMS Pages section.`,
          },
        ],
      }
    }),
  )

export const pages = [
  {
    title: 'Homepage',
    slug: '',
    menuGroup: 'Homepage',
    status: 'Published',
    settings: defaultPageSettings,
    blocks: [
      {
        type: 'hero' as const,
        eyebrow: 'Impact. Disrupt. Influence the ecosystem.',
        title: 'Transforming People. Strengthening Communities. Creating Lasting Impact.',
        text: organization.description,
        imageUrls: [],
        imageOpacity: 0.35,
        carousel: false,
      },
      {
        type: 'heroActions' as const,
        align: 'left' as const,
        actions: [
          { label: 'Get involved', href: '#/volunteer', variant: 'primary' as const, size: 'medium' as const, icon: 'arrow' },
          { label: 'Support our work', href: '#/donate', variant: 'secondary' as const, size: 'medium' as const, icon: '' },
        ],
      },
      {
        type: 'focusItems' as const,
        title: '',
        layout: 'grid' as const,
        items: [
          { label: 'Youth and student development', icon: 'users', href: '#/work' },
          { label: 'Community outreach and care', icon: 'heart', href: '#/work' },
          { label: 'Faith, integrity, governance, and trust', icon: 'shield', href: '#/about/what-we-believe' },
        ],
      },
      { type: 'sectionRef' as const, section: 'purpose' as const },
      { type: 'sectionRef' as const, section: 'programs' as const },
      { type: 'sectionRef' as const, section: 'impact' as const },
      { type: 'sectionRef' as const, section: 'projects' as const },
      { type: 'sectionRef' as const, section: 'stories' as const },
      { type: 'sectionRef' as const, section: 'events' as const },
      {
        type: 'callout' as const,
        eyebrow: 'Get involved',
        title: 'Volunteer, partner, give, or help us build the next platform for transformation.',
        text: 'Ascension Experience Society is designed for collaboration. Join a program, support a project, share a resource, or connect with us about partnership.',
        primaryLabel: 'Volunteer',
        primaryHref: '#/volunteer',
        primarySize: 'medium' as const,
        secondaryLabel: 'Contact us',
        secondaryHref: '#/contact',
        secondarySize: 'medium' as const,
        align: 'center' as const,
        style: 'banner' as const,
      },
    ],
  },
  ...navigationPages,
]

export const people = [
  {
    id: 'founder',
    name: 'Founder Name',
    role: 'Founder',
    profileType: 'founder' as const,
    bio: 'Founder profile and biography will be added by the organization.',
    photo: '',
    frameStyle: 'circle' as const,
    photoCrop: { x: 50, y: 50, zoom: 1 },
    images: [],
    imageCrops: [],
    carouselSpeed: 4,
    capabilities: ['Vision', 'Leadership', 'Representation'],
    reportsTo: '',
  },
  {
    id: 'co-founder',
    name: 'Co-Founder Name',
    role: 'Co-Founder',
    profileType: 'founder' as const,
    bio: 'Co-founder profile and biography will be added by the organization.',
    photo: '',
    frameStyle: 'circle' as const,
    photoCrop: { x: 50, y: 50, zoom: 1 },
    images: [],
    imageCrops: [],
    carouselSpeed: 4,
    capabilities: ['Strategy', 'Mentorship', 'Community building'],
    reportsTo: 'founder',
  },
]

export const peopleRoles = ['Founder', 'Co-Founder', 'Executive Director', 'Program Lead', 'Board Member', 'Team Member']

export const impactStats = [
  { label: 'People reached', value: '1,000+' },
  { label: 'Students trained', value: '500+' },
  { label: 'Leaders developed', value: '200+' },
  { label: 'Outreach activities', value: '50+' },
  { label: 'Volunteers', value: '40+' },
  { label: 'Partnerships', value: '15+' },
]

export const stories = [
  {
    title: 'From potential to participation',
    summary: 'A young person receives mentorship, finds confidence, and begins serving their community.',
    blocks: [
      { type: 'paragraph' as const, text: 'The challenge began with limited access to mentorship and confidence-building opportunities.' },
      { type: 'image' as const, url: '', alt: 'Story image placeholder', caption: 'Image to be added from the CMS media library.' },
      { type: 'paragraph' as const, text: 'Through consistent support, the participant found a path toward service and leadership.' },
    ],
  },
  {
    title: 'Support that restores dignity',
    summary: 'A vulnerable family is met with compassion, practical help, and a pathway toward stability.',
    blocks: [
      { type: 'paragraph' as const, text: 'Ascension responds to vulnerable families with dignity, compassion, and practical care.' },
    ],
  },
]

export const news = [
  {
    title: 'Ascension prepares new youth leadership activities',
    slug: 'youth-leadership-activities',
    excerpt: 'The team is preparing youth-centered leadership and mentorship activities.',
    status: 'Draft',
    blocks: [
      { type: 'paragraph' as const, text: 'The upcoming activities will focus on leadership, public speaking, mentorship, and personal development.' },
      { type: 'image' as const, url: '', alt: 'Youth training image placeholder', caption: 'Add training image later.' },
    ],
  },
]

export const projects = [
  {
    name: 'Youth Leadership Mentorship Cohort',
    location: 'Nairobi',
    status: 'Active',
    progress: 62,
    goal: 'Equip students with leadership, communication, and life skills.',
  },
  {
    name: 'Hospital Outreach Care Visits',
    location: 'Community hospitals',
    status: 'Fundraising',
    progress: 38,
    goal: 'Provide encouragement and practical support to vulnerable patients and families.',
  },
]

export const upcomingEvents = [
  {
    name: 'Student Leadership Training',
    date: '20 Aug 2026',
    type: 'Physical',
    status: 'Published',
    blocks: [
      { type: 'paragraph' as const, text: 'A practical leadership training for students and young people.' },
      { type: 'image' as const, url: '', alt: 'Event image placeholder', caption: 'Event image to be added later.' },
    ],
  },
  {
    name: 'Women Empowerment Forum',
    date: '28 Aug 2026',
    type: 'Hybrid',
    status: 'Draft',
    blocks: [{ type: 'paragraph' as const, text: 'A forum for women to learn, lead, and connect.' }],
  },
]

export const footerGroups = [
  { title: 'Quick Links', links: ['About', 'Impact', 'Projects', 'News', 'Events', 'Resources'] },
  { title: 'Our Work', links: ['Youth', 'Women', 'Leadership', 'Hospital Outreach', 'Missions', 'Environment'] },
  { title: 'Get Involved', links: ['Volunteer', 'Mentor', 'Partner', 'Sponsor a Project', 'Donate'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Safeguarding', 'Cookies'] },
]

export const footer = {
  groups: footerGroups.map((group) => ({
    title: group.title,
    links: group.links.map((label) => ({ label, href: '', icon: 'arrow' })),
  })),
  socialLinks: [
    { label: 'Facebook', url: '', icon: 'facebook' as const },
    { label: 'Instagram', url: '', icon: 'instagram' as const },
    { label: 'LinkedIn', url: '', icon: 'linkedin' as const },
    { label: 'YouTube', url: '', icon: 'youtube' as const },
    { label: 'WhatsApp', url: '', icon: 'whatsapp' as const },
  ],
}

export const adminSections = [
  { title: 'Content', items: ['Pages', 'Our Work'] },
  { title: 'Organization', items: ['Leadership'] },
  { title: 'Media', items: ['Images', 'Videos', 'Social Videos', 'Documents'] },
  {
    title: 'Engagement',
    items: ['Contact Inquiries', 'Volunteer Applications', 'Mentor Applications', 'Partnership Inquiries', 'Event Registrations'],
  },
  { title: 'Website', items: ['Footer', 'Page Transitions', 'SEO', 'Redirects'] },
  { title: 'System', items: ['Users & Permissions', 'Activity Log', 'Git History', 'Deployment', 'Settings'] },
]

export const roles = [
  { role: 'Developer', email: 'Required', mfa: 'Required', access: 'Protected full system access' },
  { role: 'Super Admin', email: 'Required', mfa: 'Required', access: 'Full system access' },
  { role: 'Administrator', email: 'Required', mfa: 'Required', access: 'Content, users, media, publishing' },
  { role: 'Publisher', email: 'Required', mfa: 'Required', access: 'Review, approve, publish' },
  { role: 'Editor', email: 'Required', mfa: 'Required', access: 'Draft and submit for review' },
  { role: 'Viewer', email: 'Required', mfa: 'Optional', access: 'Read only' },
]

export const adminUsers = [
  {
    name: 'Tony Mburu',
    email: 'antonymburu379@gmail.com',
    role: 'Developer' as const,
    protected: true,
    emailVerification: 'Required' as const,
    mfa: 'Required' as const,
    accessAreas: adminSections.map((section) => section.title),
  },
]

export const defaultSiteContent: SiteContent = {
  organization,
  appearance,
  menuGroups,
  programs,
  pages,
  peopleRoles,
  people,
  projects,
  stories,
  news,
  upcomingEvents,
  impactStats,
  mediaLibrary: {
    images: [],
    videos: [],
    socialVideos: [],
    documents: [],
  },
  engagement: [],
  footer,
  adminUsers,
}

export const activity = [
  'Youth program updated',
  'Women Empowerment Forum saved as draft',
  'Annual report uploaded for approval',
  'Navigation menu synchronized',
  'Deployment completed from main',
]
