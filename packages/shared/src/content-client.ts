import { defaultPageSettings, defaultSiteContent } from './site-data'
import type { AdminUser, ContentBlock, EngagementSubmission, EventItem, NewsItem, Page, Person, Program, SiteContent, Story } from './content-state'

function normalizeBlocks(blocks: ContentBlock[] | undefined, fallback: string): ContentBlock[] {
  return blocks?.length ? blocks : [{ type: 'paragraph', text: fallback }]
}

function normalizeContent(content: Partial<SiteContent> | null): SiteContent {
  if (!content) return defaultSiteContent
  const protectedUsers = defaultSiteContent.adminUsers.filter((user) => user.protected)
  const editableUsers = (content.adminUsers || []).filter((user: AdminUser) => !protectedUsers.some((protectedUser) => protectedUser.email.toLowerCase() === user.email.toLowerCase()))

  return {
    ...defaultSiteContent,
    ...content,
    organization: { ...defaultSiteContent.organization, ...content.organization },
    appearance: { ...defaultSiteContent.appearance, ...content.appearance },
    menuGroups: content.menuGroups?.length ? content.menuGroups : defaultSiteContent.menuGroups,
    programs: (content.programs || defaultSiteContent.programs).map((program: Program) => ({
      ...program,
      status: program.status || 'Published',
      settings: { ...defaultPageSettings, ...program.settings },
      images: program.images || [],
      blocks: normalizeBlocks(program.blocks, program.summary),
    })),
    pages: (content.pages || defaultSiteContent.pages).map((page: Page) => ({
      ...page,
      settings: { ...defaultPageSettings, ...page.settings },
      blocks: normalizeBlocks(page.blocks, `${page.title} content.`),
    })),
    peopleRoles: content.peopleRoles || defaultSiteContent.peopleRoles,
    people: (content.people || defaultSiteContent.people).map((person: Person) => ({
      ...person,
      frameStyle: person.frameStyle || 'circle',
      photoCrop: {
        x: person.photoCrop?.x ?? 50,
        y: person.photoCrop?.y ?? 50,
        zoom: person.photoCrop?.zoom ?? 1,
      },
      images: person.images || [],
      imageCrops: (person.images || []).map((_, index) => ({
        x: person.imageCrops?.[index]?.x ?? 50,
        y: person.imageCrops?.[index]?.y ?? 50,
        zoom: person.imageCrops?.[index]?.zoom ?? 1,
      })),
      carouselSpeed: person.carouselSpeed || 4,
      capabilities: person.capabilities || [],
      reportsTo: person.reportsTo || '',
    })),
    projects: content.projects || defaultSiteContent.projects,
    stories: (content.stories || defaultSiteContent.stories).map((story: Story) => ({
      ...story,
      blocks: normalizeBlocks(story.blocks, story.summary),
    })),
    news: (content.news || defaultSiteContent.news).map((item: NewsItem) => ({
      ...item,
      blocks: normalizeBlocks(item.blocks, item.excerpt),
    })),
    upcomingEvents: (content.upcomingEvents || defaultSiteContent.upcomingEvents).map((item: EventItem) => ({
      ...item,
      blocks: normalizeBlocks(item.blocks, `${item.name} details.`),
    })),
    impactStats: content.impactStats || defaultSiteContent.impactStats,
    mediaLibrary: {
      images: content.mediaLibrary?.images || defaultSiteContent.mediaLibrary.images,
      videos: content.mediaLibrary?.videos || defaultSiteContent.mediaLibrary.videos,
      socialVideos: content.mediaLibrary?.socialVideos || defaultSiteContent.mediaLibrary.socialVideos,
      documents: content.mediaLibrary?.documents || defaultSiteContent.mediaLibrary.documents,
    },
    engagement: content.engagement || defaultSiteContent.engagement,
    footer: {
      groups: content.footer?.groups?.length ? content.footer.groups : defaultSiteContent.footer.groups,
      socialLinks: content.footer?.socialLinks || defaultSiteContent.footer.socialLinks,
    },
    adminUsers: [...protectedUsers, ...editableUsers],
  }
}

export async function loadSiteContent(apiUrl: string): Promise<SiteContent> {
  try {
    const response = await fetch(`${apiUrl}/content`)
    if (!response.ok) return defaultSiteContent
    const payload = (await response.json()) as { content: Partial<SiteContent> | null }
    return normalizeContent(payload.content)
  } catch {
    return defaultSiteContent
  }
}

export async function saveSiteContent(apiUrl: string, content: SiteContent, token?: string) {
  const response = await fetch(`${apiUrl}/content`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Content could not be saved')
  }

  return response.json() as Promise<{ ok: true; content: SiteContent }>
}

export async function submitEngagement(apiUrl: string, submission: Omit<EngagementSubmission, 'id' | 'status' | 'submittedAt'>) {
  const response = await fetch(`${apiUrl}/engagement`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ submission }),
  })

  if (!response.ok) {
    throw new Error('Submission could not be saved')
  }

  return response.json() as Promise<{ ok: true; submission: EngagementSubmission }>
}
