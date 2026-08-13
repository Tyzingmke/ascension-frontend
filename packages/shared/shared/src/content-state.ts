export type Program = {
  index: string
  slug: string
  title: string
  summary: string
}

export type Project = {
  name: string
  location: string
  status: string
  progress: number
  goal: string
}

export type EventItem = {
  name: string
  date: string
  type: string
  status: string
  blocks?: ContentBlock[]
}

export type Story = {
  title: string
  summary: string
  blocks?: ContentBlock[]
}

export type NewsItem = {
  title: string
  slug: string
  excerpt: string
  status: string
  blocks: ContentBlock[]
}

export type Page = {
  title: string
  slug: string
  menuGroup: string
  status: string
  blocks: ContentBlock[]
}

export type Person = {
  id: string
  name: string
  role: string
  profileType: 'founder' | 'leadership' | 'board' | 'staff' | 'mentor'
  bio: string
  photo: string
  reportsTo: string
}

export type ContentBlock =
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'image'
      url: string
      alt: string
      caption: string
    }

export type SiteContent = {
  organization: {
    name: string
    tagline: string
    shortName: string
    location: string
    phone: string
    email: string
    description: string
  }
  programs: Program[]
  pages: Page[]
  peopleRoles: string[]
  people: Person[]
  projects: Project[]
  stories: Story[]
  news: NewsItem[]
  upcomingEvents: EventItem[]
  impactStats: Array<{ label: string; value: string }>
}
