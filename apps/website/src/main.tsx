import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, CalendarDays, ChevronDown, FileCheck2, HandHeart, Menu, ShieldCheck, UsersRound, X } from 'lucide-react'
import '../../../packages/shared/src/styles.css'
import {
  footerGroups,
  navigation,
  defaultSiteContent,
} from '../../../packages/shared/src/site-data'
import { platformEndpoints } from '../../../packages/shared/src/platform-config'
import { loadSiteContent } from '../../../packages/shared/src/content-client'
import type { ContentBlock, SiteContent } from '../../../packages/shared/src/content-state'

function useRoute() {
  const [route, setRoute] = useState(location.hash.replace('#', '') || '/')

  useEffect(() => {
    const onHashChange = () => setRoute(location.hash.replace('#', '') || '/')
    addEventListener('hashchange', onHashChange)
    return () => removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

function Header({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false)
  const organization = defaultSiteContent.organization
  const navItems = navigation.map((item) => ({
    ...item,
    children: [
      ...item.children,
      ...content.pages
        .filter((page) => page.menuGroup === item.label)
        .map((page) => ({ label: page.title, href: `#/${page.slug}` })),
    ],
  }))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="top-strip">
        <span>{organization.phone}</span>
        <span>{organization.email}</span>
        <span>CMS: {platformEndpoints.contentMode}</span>
        <span>Facebook / Instagram / LinkedIn / YouTube</span>
      </div>
      <div className="main-nav-row">
        <a className="brand" href="#/" aria-label="Ascension Experience Society home">
          <span className="brand-mark">AES</span>
          <span>
            <strong>{organization.name}</strong>
            <small>{organization.tagline}</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <div className="nav-item" key={item.label}>
              <a href={item.href}>{item.label}</a>
              <button aria-label={`${item.label} menu`}>
                <ChevronDown size={14} />
              </button>
              <div className="dropdown">
                {item.children.map((child) => (
                  <a href={child.href} key={child.label}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <a className="donate-button" href="#/donate">
            Donate
          </a>
          <button className="icon-button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>
      {open ? <MobileMenu navItems={navItems} onClose={() => setOpen(false)} /> : null}
    </header>
  )
}

function MobileMenu({ navItems, onClose }: { navItems: typeof navigation; onClose: () => void }) {
  return (
    <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="drawer-head">
        <strong>ASCENSION</strong>
        <button className="icon-button" aria-label="Close menu" onClick={onClose}>
          <X />
        </button>
      </div>
      {navItems.map((item) => (
        <details key={item.label}>
          <summary>
            {item.label}
            <ChevronDown size={16} />
          </summary>
          {item.children.map((child) => (
            <a href={child.href} key={child.label} onClick={onClose}>
              {child.label}
            </a>
          ))}
        </details>
      ))}
      <a className="button primary" href="#/donate" onClick={onClose}>
        Donate
      </a>
    </div>
  )
}

function HomePage({ content }: { content: SiteContent }) {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Impact. Disrupt. Influence the ecosystem.</p>
          <h1>{content.organization.tagline}</h1>
          <p className="lead">{content.organization.description}</p>
          <div className="hero-actions">
            <a className="button primary" href="#/get-involved">
              Get involved <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#/donate">
              Support our work
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Platform focus areas">
          <div>
            <UsersRound />
            <span>Youth and student development</span>
          </div>
          <div>
            <HandHeart />
            <span>Community outreach and care</span>
          </div>
          <div>
            <ShieldCheck />
            <span>Faith, integrity, governance, and trust</span>
          </div>
        </div>
      </section>
      <Purpose />
      <ProgramsPreview programs={content.programs} />
      <ImpactPreview impactStats={content.impactStats} />
      <FeaturedProjects projects={content.projects} />
      <StoriesPreview stories={content.stories} />
      <EventsPreview upcomingEvents={content.upcomingEvents} />
      <FinalCta content={content} />
    </>
  )
}

function Purpose() {
  return (
    <section className="purpose-band" id="about">
      <div>
        <p className="eyebrow">Our purpose</p>
        <h2>We believe transformation begins with people.</h2>
      </div>
      <p>
        Every community has people with potential, ideas, gifts, and dreams. Ascension creates platforms where people can
        learn, grow, serve, lead, and contribute to the transformation of their communities.
      </p>
    </section>
  )
}

function ProgramsPreview({ programs }: { programs: SiteContent['programs'] }) {
  return (
    <section className="section" id="work">
      <div className="section-heading">
        <p className="eyebrow">Our work</p>
        <h2>Program pages are dynamic, reusable, and ready for CMS editing.</h2>
      </div>
      <div className="program-grid">
        {programs.map((program) => (
          <article className="program-card" key={program.slug}>
            <span>{program.index}</span>
            <h3>{program.title}</h3>
            <p>{program.summary}</p>
            <a href={`#/work/${program.slug}`}>Explore Program</a>
          </article>
        ))}
      </div>
    </section>
  )
}

function ImpactPreview({ impactStats }: { impactStats: SiteContent['impactStats'] }) {
  return (
    <section className="impact-section" id="impact">
      <div className="section-heading">
        <p className="eyebrow">Impact dashboard</p>
        <h2>Structured statistics the CMS can update without touching code.</h2>
      </div>
      <div className="stats-grid">
        {impactStats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturedProjects({ projects }: { projects: SiteContent['projects'] }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2>Active projects show status, location, goals, and real progress.</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className="image-slot">Project image</div>
            <span>{project.status}</span>
            <h3>{project.name}</h3>
            <p>{project.goal}</p>
            <small>{project.location}</small>
            <div className="progress">
              <i style={{ width: `${project.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function StoriesPreview({ stories }: { stories: SiteContent['stories'] }) {
  return (
    <section className="section split-section" id="stories">
      <div>
        <p className="eyebrow">Stories of change</p>
        <h2>Challenge, response, journey, transformation.</h2>
        <p>Story content will keep consent, program links, images, and videos organized as the archive grows.</p>
      </div>
      <div className="story-list">
        {stories.map((story) => (
          <article key={story.title}>
            <h3>{story.title}</h3>
            <p>{story.summary}</p>
            <a href={`#/stories/${story.title.toLowerCase().replaceAll(' ', '-')}`}>Read Story</a>
          </article>
        ))}
      </div>
    </section>
  )
}

function EventsPreview({ upcomingEvents }: { upcomingEvents: SiteContent['upcomingEvents'] }) {
  return (
    <section className="operations-band">
      {upcomingEvents.map((event) => (
        <div key={event.name}>
          <CalendarDays />
          <h3>{event.name}</h3>
          <p>
            {event.date} / {event.type} / {event.status}
          </p>
          <a href={`#/events/${event.name.toLowerCase().replaceAll(' ', '-')}`}>View Event</a>
        </div>
      ))}
      <div>
        <FileCheck2 />
        <h3>Reports & transparency</h3>
        <p>Only approved public documents should appear in the public resource center.</p>
      </div>
    </section>
  )
}

function PublicPage({ title, content }: { title: string; content: SiteContent }) {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{content.organization.shortName}</p>
        <h1>{title}</h1>
        <p>{content.organization.description}</p>
      </section>
      <Purpose />
      {title.includes('About') ? <FoundersSection content={content} /> : null}
      {title.includes('Work') ? <ProgramsPreview programs={content.programs} /> : null}
      {title.includes('Impact') ? <ImpactPreview impactStats={content.impactStats} /> : null}
      {title.includes('News') ? <EventsPreview upcomingEvents={content.upcomingEvents} /> : null}
      {title.includes('Get') ? <FinalCta content={content} /> : null}
    </>
  )
}

function DetailPage({ route, content }: { route: string; content: SiteContent }) {
  const program = content.programs.find((item) => route === `/work/${item.slug}`)
  const page = content.pages.find((item) => route === `/${item.slug}`)
  const story = content.stories.find((item) => route === `/stories/${item.title.toLowerCase().replaceAll(' ', '-')}`)
  const newsItem = content.news.find((item) => route === `/news/${item.slug}`)
  const eventItem = content.upcomingEvents.find((item) => route === `/events/${item.name.toLowerCase().replaceAll(' ', '-')}`)
  const child = navigation.flatMap((item) => item.children).find((item) => item.href === `#${route}`)
  const title = page?.title || story?.title || newsItem?.title || eventItem?.name || program?.title || child?.label || route.split('/').filter(Boolean).map((part) => part.replaceAll('-', ' ')).join(' / ')
  const blocks = page?.blocks || story?.blocks || newsItem?.blocks || eventItem?.blocks

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{program ? 'Program' : content.organization.shortName}</p>
        <h1>{title}</h1>
        <p>{page?.blocks.find((block) => block.type === 'paragraph')?.text || story?.summary || newsItem?.excerpt || program?.summary || content.organization.description}</p>
      </section>
      {blocks ? <ContentBlocks blocks={blocks} /> : null}
      {route.startsWith('/about') || route === '/leadership' ? <FoundersSection content={content} /> : null}
      {program ? <ProgramsPreview programs={[program]} /> : null}
      {route.includes('projects') ? <FeaturedProjects projects={content.projects} /> : null}
      {route.includes('stories') ? <StoriesPreview stories={content.stories} /> : null}
      {route === '/news' ? <NewsPreview news={content.news} /> : null}
      {route === '/events' ? <EventsPreview upcomingEvents={content.upcomingEvents} /> : null}
      {route.includes('reports') || route.includes('resources') ? <EventsPreview upcomingEvents={content.upcomingEvents} /> : null}
    </>
  )
}

function FoundersSection({ content }: { content: SiteContent }) {
  const founders = content.people.filter((person) => person.profileType === 'founder')

  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Founders</p>
        <h2>Organization founders and leadership.</h2>
      </div>
      <div className="people-grid">
        {founders.map((person) => (
          <article className="person-card" key={person.name}>
            {person.photo ? <img src={person.photo} alt={person.name} /> : <div className="image-slot">Founder image</div>}
            <h3>{person.name}</h3>
            <strong>{person.role}</strong>
            <p>{person.bio}</p>
          </article>
        ))}
      </div>
      <OrganizationTree content={content} />
    </section>
  )
}

function OrganizationTree({ content }: { content: SiteContent }) {
  const topLevel = content.people.filter((person) => !person.reportsTo)

  function renderNode(personId: string, level = 1) {
    const person = content.people.find((item) => item.id === personId)
    if (!person) return null
    const children = content.people.filter((item) => item.reportsTo === person.id)

    return (
      <li key={person.id}>
        <div className={`tree-person level-${Math.min(level, 5)}`}>
          <div className="tree-photo">
            {person.photo ? <img src={person.photo} alt={person.name} /> : <span>{person.name.slice(0, 1)}</span>}
          </div>
          <div>
            <strong>{person.role}</strong>
            <span>{person.name}</span>
          </div>
        </div>
        {children.length ? <ul>{children.map((child) => renderNode(child.id, level + 1))}</ul> : null}
      </li>
    )
  }

  return (
    <div className="org-tree">
      <div className="section-heading">
        <p className="eyebrow">Governance flow</p>
        <h2>Organization hierarchy</h2>
      </div>
      <ul>{topLevel.map((person) => renderNode(person.id))}</ul>
    </div>
  )
}

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <section className="section article-body">
      {blocks.map((block, index) =>
        block.type === 'paragraph' ? (
          <p key={index}>{block.text}</p>
        ) : (
          <figure className="content-image" key={index}>
            {block.url ? <img src={block.url} alt={block.alt} /> : <div className="image-slot">{block.alt || 'Image placeholder'}</div>}
            <figcaption>{block.caption}</figcaption>
          </figure>
        ),
      )}
    </section>
  )
}

function NewsPreview({ news }: { news: SiteContent['news'] }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">News</p>
        <h2>Updates from Ascension Experience Society.</h2>
      </div>
      <div className="story-list">
        {news.map((item) => (
          <article key={item.slug}>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
            <a href={`#/news/${item.slug}`}>Read News</a>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <h2>{content.organization.shortName}</h2>
        <p>{content.organization.tagline}</p>
      </div>
      <div className="footer-grid">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <a href="#/" key={link}>
                {link}
              </a>
            ))}
          </div>
        ))}
        <div>
          <h3>Contact</h3>
          <span>{content.organization.location}</span>
          <span>{content.organization.phone}</span>
          <span>{content.organization.email}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Facebook / Instagram / LinkedIn / YouTube</span>
        <span>© {new Date().getFullYear()} {content.organization.name}</span>
      </div>
    </footer>
  )
}

function FinalCta({ content }: { content: SiteContent }) {
  return (
    <section className="cta-section" id="get-involved">
      <p className="eyebrow">Together, we ascend.</p>
      <h2>Volunteer, partner, give, mentor, serve, and lead.</h2>
      <a className="button primary" href={`mailto:${content.organization.email}`}>
        Contact Ascension <ArrowRight size={18} />
      </a>
    </section>
  )
}

function App() {
  const route = useRoute()
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)

  useEffect(() => {
    loadSiteContent(platformEndpoints.cmsApiUrl).then(setContent)
  }, [route])

  const pageTitle =
    route === '/about'
      ? 'About Ascension'
      : route === '/work'
        ? 'Our Work'
        : route === '/impact'
          ? 'Impact'
          : route === '/news-events'
            ? 'News & Events'
            : route === '/resources'
              ? 'Resources'
              : route === '/get-involved'
                ? 'Get Involved'
                : route === '/donate'
                  ? 'Donate'
                  : ''

  return (
    <>
      <Header content={content} />
      <main>
        {pageTitle ? (
          <PublicPage title={pageTitle} content={content} />
        ) : route === '/' ? (
          <HomePage content={content} />
        ) : (
          <DetailPage route={route} content={content} />
        )}
      </main>
      <Footer content={content} />
    </>
  )
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
