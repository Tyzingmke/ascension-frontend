import { defaultSiteContent } from './site-data'
import type { SiteContent } from './content-state'

export async function loadSiteContent(apiUrl: string): Promise<SiteContent> {
  try {
    const response = await fetch(`${apiUrl}/content`)
    if (!response.ok) return defaultSiteContent
    const payload = (await response.json()) as { content: SiteContent | null }
    return payload.content ? { ...defaultSiteContent, ...payload.content } : defaultSiteContent
  } catch {
    return defaultSiteContent
  }
}

export async function saveSiteContent(apiUrl: string, content: SiteContent) {
  const response = await fetch(`${apiUrl}/content`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Content could not be saved')
  }

  return response.json() as Promise<{ ok: true; content: SiteContent }>
}
