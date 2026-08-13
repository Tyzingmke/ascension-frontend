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

export const navigation = [
  {
    label: 'About',
    href: '#/about',
    children: ['Who We Are', 'Our Story', 'Vision & Mission', 'What We Believe', 'Our Values', 'Leadership', 'Transparency'],
  },
  {
    label: 'Our Work',
    href: '#/work',
    children: ['Student & Youth Development', 'Women Empowerment', 'Leadership Development', 'Hospital Outreach', 'Missions', 'Environment'],
  },
  { label: 'Impact', href: '#/impact', children: ['Our Impact', 'Projects', 'Stories of Change', 'Reports'] },
  { label: 'News & Events', href: '#/news-events', children: ['News', 'Events', 'Gallery'] },
  { label: 'Resources', href: '#/resources', children: ['Publications', 'Training Materials', 'Downloads'] },
  { label: 'Get Involved', href: '#/get-involved', children: ['Volunteer', 'Mentor', 'Partner', 'Sponsor', 'Donate'] },
]

export const programs = [
  {
    index: '01',
    slug: 'student-youth-development',
    title: 'Student & Youth Development',
    summary: 'Leadership training, mentorship, life skills, career awareness, academic support, and personal development.',
  },
  {
    index: '02',
    slug: 'women-empowerment',
    title: 'Women Empowerment',
    summary: 'Opportunities for women to learn, lead, contribute, and strengthen families and communities.',
  },
  {
    index: '03',
    slug: 'leadership-development',
    title: 'Leadership Development',
    summary: 'Practical leadership formation rooted in service, responsibility, integrity, and community transformation.',
  },
  {
    index: '04',
    slug: 'hospital-outreach',
    title: 'Hospital Outreach',
    summary: 'Compassionate visits, support, prayer, encouragement, and practical care for vulnerable patients and families.',
  },
  {
    index: '05',
    slug: 'missions-discipleship',
    title: 'Missions & Discipleship',
    summary: 'Faith-inspired service, spiritual growth, compassion, truth, and human dignity in action.',
  },
  {
    index: '06',
    slug: 'environmental-conservation',
    title: 'Environmental Conservation',
    summary: 'Community responsibility, sustainability, care for creation, and practical conservation activities.',
  },
  {
    index: '07',
    slug: 'helping-the-needy',
    title: 'Helping the Needy',
    summary: 'Practical support for vulnerable individuals, families, and communities with dignity and compassion.',
  },
  {
    index: '08',
    slug: 'advocacy-peace-building',
    title: 'Advocacy & Peace Building',
    summary: 'Civic responsibility, dialogue, peaceful coexistence, and community participation in solving shared challenges.',
  },
]

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
  },
  {
    title: 'Support that restores dignity',
    summary: 'A vulnerable family is met with compassion, practical help, and a pathway toward stability.',
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
  { name: 'Student Leadership Training', date: '20 Aug 2026', type: 'Physical', status: 'Published' },
  { name: 'Women Empowerment Forum', date: '28 Aug 2026', type: 'Hybrid', status: 'Draft' },
]

export const footerGroups = [
  { title: 'Quick Links', links: ['About', 'Impact', 'Projects', 'News', 'Events', 'Resources'] },
  { title: 'Our Work', links: ['Youth', 'Women', 'Leadership', 'Hospital Outreach', 'Missions', 'Environment'] },
  { title: 'Get Involved', links: ['Volunteer', 'Mentor', 'Partner', 'Sponsor a Project', 'Donate'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Safeguarding', 'Cookies'] },
]

export const adminSections = [
  { title: 'Content', items: ['Pages', 'Programs', 'Projects', 'Stories', 'News', 'Events', 'Resources'] },
  { title: 'Impact', items: ['Impact Statistics', 'Beneficiaries', 'Projects', 'Stories of Change', 'Reports'] },
  { title: 'People', items: ['Leadership', 'Board', 'Volunteers', 'Mentors', 'Partners'] },
  { title: 'Media', items: ['Images', 'Videos', 'Documents', 'Gallery'] },
  {
    title: 'Engagement',
    items: ['Contact Inquiries', 'Volunteer Applications', 'Mentor Applications', 'Partnership Inquiries', 'Event Registrations'],
  },
  { title: 'Website', items: ['Navigation', 'Footer', 'Homepage', 'Page Builder', 'SEO', 'Redirects'] },
  { title: 'System', items: ['Users', 'Roles', 'Permissions', 'Activity Log', 'Git History', 'Deployment', 'Settings'] },
]

export const roles = [
  { role: 'Super Admin', email: 'Required', mfa: 'Required', access: 'Full system access' },
  { role: 'Administrator', email: 'Required', mfa: 'Required', access: 'Content, users, media, publishing' },
  { role: 'Publisher', email: 'Required', mfa: 'Required', access: 'Review, approve, publish' },
  { role: 'Editor', email: 'Required', mfa: 'Required', access: 'Draft and submit for review' },
  { role: 'Viewer', email: 'Required', mfa: 'Optional', access: 'Read only' },
]

export const activity = [
  'Youth program updated',
  'Women Empowerment Forum saved as draft',
  'Annual report uploaded for approval',
  'Navigation menu synchronized',
  'Deployment completed from main',
]
