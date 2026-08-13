import { StrictMode, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode, TouchEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, BookOpen, CalendarDays, ChevronDown, Church, FileCheck2, FileText, Globe2, HandHeart, HeartHandshake, Mail, Megaphone, Menu, Moon, Phone, ShieldCheck, Sparkles, Sun, Target, UsersRound } from 'lucide-react'
import '../../../packages/shared/src/styles.css'
import { defaultSiteContent } from '../../../packages/shared/src/site-data'
import { platformEndpoints } from '../../../packages/shared/src/platform-config'
import { loadSiteContent, submitEngagement } from '../../../packages/shared/src/content-client'
import { appearanceVariables, loadGoogleFonts, setFavicon, waitForFontsReady } from '../../../packages/shared/src/appearance'
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

function useScrolledPast(offset = 420) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > offset)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [offset])
  return visible
}

function BackToTopButton() {
  const visible = useScrolledPast()
  return (
    <button className={`back-to-top ${visible ? 'visible' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ChevronDown size={22} />
    </button>
  )
}

function Header({ content, onToggleTheme }: { content: SiteContent; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const drawerTouchStart = useRef<number | null>(null)
  const route = useRoute()
  const organization = content.organization
  const navItems = content.menuGroups.map((item) => ({
    label: item.label,
    children: uniqueLinks([
      ...(item.label === 'Our Work'
        ? content.programs.map((program) => ({ label: program.title, href: `#/work/${program.slug}` }))
        : []),
      ...content.pages
        .filter((page) => item.label !== 'Our Work' && page.menuGroup === item.label)
        .map((page) => ({ label: page.title, href: `#/${page.slug}` })),
    ]),
  }))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [route])

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
          {content.appearance.logo ? <img className="brand-logo" src={content.appearance.logo} alt="" /> : <span className="brand-mark">AES</span>}
          <span>
            <strong>{organization.name}</strong>
            <small>{organization.tagline}</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <div className="nav-item" key={item.label}>
              <button className="nav-label" aria-label={`${item.label} menu`}>
                {item.label}
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
          <button className="theme-toggle" aria-label={`Switch to ${content.appearance.mode === 'dark' ? 'light' : 'dark'} mode`} onClick={onToggleTheme}>
            <span className="theme-toggle-track" data-mode={content.appearance.mode}>
              <Sun size={13} />
              <Moon size={13} />
              <span className="theme-toggle-knob" />
            </span>
          </button>
          <button className="icon-button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>
      {open ? <button className="mobile-drawer-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
      <MobileMenu
        open={open}
        mode={content.appearance.mode}
        navItems={navItems}
        onToggleTheme={onToggleTheme}
        onClose={() => setOpen(false)}
        onTouchStart={(event) => {
          drawerTouchStart.current = event.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          if (drawerTouchStart.current === null) return
          const endX = event.changedTouches[0]?.clientX ?? drawerTouchStart.current
          if (drawerTouchStart.current - endX > 56) setOpen(false)
          drawerTouchStart.current = null
        }}
      />
    </header>
  )
}

function uniqueLinks<T extends { href: string }>(items: T[]) {
  return items.filter((item, index) => items.findIndex((value) => value.href === item.href) === index)
}

function MobileMenu({ open, mode, navItems, onToggleTheme, onClose, onTouchStart, onTouchEnd }: { open: boolean; mode: 'light' | 'dark'; navItems: Array<{ label: string; children: Array<{ label: string; href: string }> }>; onToggleTheme: () => void; onClose: () => void; onTouchStart: (event: TouchEvent<HTMLDivElement>) => void; onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void }) {
  return (
    <div className={`mobile-drawer ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="drawer-edge-button" aria-label="Retract menu" onClick={onClose} />
      <div className="drawer-head">
        <a className="brand" href="#/" onClick={onClose}><span className="brand-mark">AES</span></a>
        <button className="theme-toggle" aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} onClick={onToggleTheme}>
          <span className="theme-toggle-track" data-mode={mode}>
            <Sun size={13} />
            <Moon size={13} />
            <span className="theme-toggle-knob" />
          </span>
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
  const homePage = content.pages.find((page) => page.slug === '' || page.menuGroup === 'Homepage')
  return (
    <>
      {homePage ? (
        <ContentBlocks blocks={homePage.blocks} settings={homePage.settings} content={content} />
      ) : (
        <>
          <Purpose />
          <ProgramsPreview programs={content.programs} />
          <ImpactPreview impactStats={content.impactStats} />
          <FeaturedProjects projects={content.projects} />
          <StoriesPreview stories={content.stories} />
          <EventsPreview upcomingEvents={content.upcomingEvents} />
          <FinalCta content={content} />
        </>
      )}
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
  const embedded = findEmbeddedPage(content, route)
  if (embedded) {
    return (
      <>
        <PageHero eyebrow="More Details" title={embedded.page.title} description={embedded.page.summary} />
        <section className="section article-body">
          <a className="button secondary" href={embedded.parentHref}>Back to {embedded.parentTitle}</a>
        </section>
        <ContentBlocks blocks={embedded.page.blocks || []} content={content} />
      </>
    )
  }
  const title = story?.title || newsItem?.title || eventItem?.name || program?.title || route.split('/').filter(Boolean).map((part) => part.replaceAll('-', ' ')).join(' / ')
  const blocks = page?.blocks || story?.blocks || newsItem?.blocks || eventItem?.blocks || program?.blocks

  if (page && !program) {
    return (
      <>
        <PageHero settings={page.settings} eyebrow={page.menuGroup} title={page.title} description={page.blocks.find((block) => block.type === 'paragraph')?.text || content.organization.description} />
        <ContentBlocks blocks={page.blocks} settings={page.settings} content={content} />
      </>
    )
  }

  return (
    <>
      <PageHero settings={program?.settings || page?.settings} eyebrow={program ? 'Our Work' : content.organization.shortName} title={title} description={page?.blocks.find((block) => block.type === 'paragraph')?.text || story?.summary || newsItem?.excerpt || program?.summary || content.organization.description} />
      <ContentBlocks blocks={blocks || []} settings={program?.settings || page?.settings} content={content} />
      {program?.images.length ? <ProgramGallery program={program} /> : null}
      {route.startsWith('/about') || route === '/leadership' ? <FoundersSection content={content} /> : null}
      {route.includes('projects') ? <FeaturedProjects projects={content.projects} /> : null}
      {route.includes('stories') ? <StoriesPreview stories={content.stories} /> : null}
      {route === '/news' ? <NewsPreview news={content.news} /> : null}
      {route === '/events' ? <EventsPreview upcomingEvents={content.upcomingEvents} /> : null}
      {route.includes('reports') || route.includes('resources') ? <EventsPreview upcomingEvents={content.upcomingEvents} /> : null}
    </>
  )
}

function PageHero({ settings, eyebrow, title, description }: { settings?: SiteContent['pages'][number]['settings']; eyebrow: string; title: string; description: string }) {
  const heroImages = settings?.heroImages.filter(Boolean) || []
  const backgroundImages = settings?.backgroundImages.filter(Boolean) || []
  const visibleImages = heroImages.length ? heroImages : backgroundImages
  const imageOpacity = heroImages.length ? settings?.heroImageOpacity ?? 0.35 : settings?.backgroundOpacity ?? 0.18
  return (
    <section className={`page-hero ${visibleImages.length > 1 && (heroImages.length ? settings?.heroCarousel : settings?.backgroundCarousel) ? 'image-carousel' : ''}`}>
      {visibleImages.map((image, index) => (
        <img className="page-hero-image" src={image} alt="" key={index} style={{ opacity: imageOpacity, animationDelay: `${index * 5}s`, '--target-opacity': imageOpacity } as CSSProperties} />
      ))}
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 style={{ fontFamily: settings?.titleFont || undefined, fontSize: settings?.titleSize ? `${settings.titleSize}px` : undefined, color: settings?.titleColor || undefined, textAlign: settings?.titleAlign || undefined }}>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

function ProgramGallery({ program }: { program: SiteContent['programs'][number] }) {
  return (
    <section className="section program-gallery">
      {program.images.map((image, index) => (
        <img src={image} alt={`${program.title} ${index + 1}`} key={index} />
      ))}
    </section>
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
            {person.photo ? <span className={`person-card-photo frame-${person.frameStyle || 'circle'}`}><img src={person.photo} alt={person.name} style={photoCropStyle(person)} /></span> : <div className="image-slot">Founder image</div>}
            <h3>{person.name}</h3>
            <strong>{person.role}</strong>
            <RichTextSegments fallback={person.bio} segments={person.bioSegments} />
          </article>
        ))}
      </div>
      <OrganizationTree content={content} />
    </section>
  )
}

function OrganizationTree({ content }: { content: SiteContent }) {
  const topLevel = content.people.filter((person) => !person.reportsTo)
  const [openPersonId, setOpenPersonId] = useState<string | null>(null)

  function renderNode(personId: string, level = 1) {
    const person = content.people.find((item) => item.id === personId)
    if (!person) return null
    const children = content.people.filter((item) => item.reportsTo === person.id)

    return (
      <li key={person.id}>
        <button className={`tree-person level-${Math.min(level, 5)}`} onClick={() => setOpenPersonId(openPersonId === person.id ? null : person.id)}>
          <div className={`tree-photo frame-${person.frameStyle || 'circle'}`}>
            {person.photo ? <img src={person.photo} alt={person.name} style={photoCropStyle(person)} /> : <span>{person.name.slice(0, 1)}</span>}
          </div>
          <div>
            <strong>{person.role}</strong>
            <span>{person.name}</span>
          </div>
        </button>
        {openPersonId === person.id ? <PersonProfile person={person} /> : null}
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

function photoCropStyle(person: SiteContent['people'][number]) {
  const crop = person.photoCrop || { x: 50, y: 50, zoom: 1 }
  return { objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.zoom})` }
}

function PersonProfile({ person }: { person: SiteContent['people'][number] }) {
  const images = [person.photo, ...(person.images || [])].filter(Boolean)
  const speed = person.carouselSpeed || 4
  const duration = Math.max(images.length * speed, speed)

  return (
    <article className="tree-profile">
      {images.length > 1 ? (
        <div className="profile-carousel">
          {images.map((image, index) => (
            <img src={image} alt={`${person.name} ${index + 1}`} key={index} style={{ ...personCarouselCropStyle(person, index), animationDelay: `${index * speed}s`, animationDuration: `${duration}s` }} />
          ))}
        </div>
      ) : images.length === 1 ? (
        <span className={`profile-single-frame frame-${person.frameStyle || 'circle'}`}><img className="profile-single-image" src={images[0]} alt={person.name} style={photoCropStyle(person)} /></span>
      ) : null}
      <h3>{person.name}</h3>
      <strong>{person.role}</strong>
      <RichTextSegments fallback={person.bio} segments={person.bioSegments} />
      {person.capabilities?.length ? (
        <ul>
          {person.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function personCarouselCropStyle(person: SiteContent['people'][number], index: number) {
  const crop = index === 0 ? person.photoCrop || { x: 50, y: 50, zoom: 1 } : person.imageCrops?.[index - 1] || { x: 50, y: 50, zoom: 1 }
  return { objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.zoom})` }
}

function ContentBlocks({ blocks, settings, content, suppressBlockBackgrounds = false }: { blocks: ContentBlock[]; settings?: SiteContent['pages'][number]['settings']; content: SiteContent; suppressBlockBackgrounds?: boolean }) {
  const backgroundImages = settings?.backgroundImages.filter(Boolean) || []
  const backgroundOpacity = settings?.backgroundOpacity ?? 0.08
  if (!blocks.length) {
    return <EmptyContentState />
  }
  return (
    <section className={`section article-body style-${settings?.pageStyle || 'standard'} ${backgroundImages.length ? 'has-page-background' : ''} ${blocks.some((block) => block.blockBackgroundImage) ? 'has-block-backgrounds' : ''} ${backgroundImages.length > 1 && settings?.backgroundCarousel ? 'image-carousel' : ''}`}>
      {backgroundImages.map((image, index) => (
        <img className="article-bg-image" src={image} alt="" key={index} style={{ opacity: backgroundOpacity, animationDelay: `${index * 6}s`, '--target-opacity': backgroundOpacity } as CSSProperties} />
      ))}
      {blocks.map((block, index) => {
        const renderedBlock =
        isPairedWithPrevious(blocks[index + 1]) ? (
          null
        ) : isPairedWithPrevious(block) && index > 0 ? (
          <PairedBlockColumns previousBlock={blocks[index - 1]} pairedBlock={block} content={content} key={index} />
        ) : block.type === 'hero' ? (
          <section className={`hero-section hero-panel-hidden ${block.imageUrls?.filter(Boolean).length && block.carousel ? 'image-carousel' : ''}`} id="home" key={index} style={{ minHeight: block.minHeight ? `${block.minHeight}px` : undefined }}>
            {block.imageUrls?.filter(Boolean).map((image, imageIndex) => (
              <img className="page-hero-image" src={image} alt="" key={imageIndex} style={{ opacity: block.imageOpacity ?? 0.35, animationDelay: `${imageIndex * 5}s`, '--target-opacity': block.imageOpacity ?? 0.35 } as CSSProperties} />
            ))}
            <div className="hero-copy">
              {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
              <h1 style={blockTitleStyle(block)}>{block.title}</h1>
              <div className="hero-rich-text" style={{ fontFamily: block.textFont || undefined, fontSize: block.textSize ? `${block.textSize}px` : undefined }}>
                <RichTextSegments fallback={block.text} segments={block.textSegments} />
              </div>
            </div>
          </section>
        ) : block.type === 'heading' ? (
          block.level === 2 ? <h2 className={`block-align-${block.align || settings?.textAlign || 'left'}`} key={index} style={blockTitleStyle(block)}>{block.icon ? <BlockIcon name={block.icon} /> : null}{block.text}</h2> : <h3 className={`block-align-${block.align || settings?.textAlign || 'left'}`} key={index} style={blockTitleStyle(block)}>{block.icon ? <BlockIcon name={block.icon} /> : null}{block.text}</h3>
        ) : block.type === 'paragraph' ? (
          <div className={`paragraph-block block-align-${block.align || settings?.textAlign || 'left'}`} key={index} style={{ fontFamily: block.fontFamily || undefined, fontSize: block.fontSize ? `${block.fontSize}px` : undefined, lineHeight: block.lineHeight || undefined, marginBottom: block.spacing ? `${block.spacing}px` : undefined, fontWeight: block.weight === 'bold' ? 800 : block.weight === 'semibold' ? 650 : undefined }}>
            {block.icon ? <BlockIcon name={block.icon} /> : null}
            {block.segments?.length ? block.segments.map((segment, segmentIndex) => (
              <p key={segmentIndex} style={{ textAlign: segment.align, fontWeight: segment.bold ? 800 : undefined, fontStyle: segment.italic ? 'italic' : undefined, textDecoration: segment.underline ? 'underline' : undefined }}>{segment.href ? <a href={segment.href}>{renderInlineText(segment.text)}</a> : renderInlineText(segment.text)}</p>
            )) : <p>{renderInlineText(block.text)}</p>}
          </div>
        ) : block.type === 'link' ? (
          <a className={`button ${block.variant || 'secondary'} button-${block.size || 'medium'} inline-link-block block-align-${block.align || 'left'}`} href={block.href} key={index}>{block.icon ? <BlockIcon name={block.icon} /> : null}{block.label}</a>
        ) : block.type === 'heroActions' ? (
          block.actions.length ? <div className={`hero-actions hero-actions-block block-align-${block.align || 'left'}`} key={index}>
            {block.actions.map((action) => (
              <a className={`button ${action.variant} button-${action.size || 'medium'}`} href={action.href} key={action.label}>
                {action.label} {action.icon ? <BlockIcon name={action.icon} /> : null}
              </a>
            ))}
          </div> : null
        ) : block.type === 'hierarchy' ? (
          <div className="embedded-hierarchy" key={index}>
            <div className="section-heading">
              <p className="eyebrow">Leadership</p>
              <h2 style={blockTitleStyle(block)}>{block.icon ? <BlockIcon name={block.icon} /> : null}{block.title}</h2>
              <RichTextSegments fallback={block.intro} segments={block.introSegments} />
            </div>
            <OrganizationTree content={content} />
          </div>
        ) : block.type === 'document' ? (
          <article className="document-block" key={index}>
            <h3 style={blockTitleStyle(block)}>{block.icon ? <BlockIcon name={block.icon} /> : null}{block.title}</h3>
            <RichTextSegments fallback={block.description} segments={block.descriptionSegments} />
            {block.url ? <a className="button primary" href={block.url} download={block.fileName || undefined}>{block.fileName || 'Download file'}</a> : <span>No file uploaded</span>}
          </article>
        ) : block.type === 'embeddedPage' ? (
          <article className="embedded-page-card" key={index}>
            {block.cardImage ? <img src={block.cardImage} alt={block.title} /> : null}
            <h3 style={blockTitleStyle(block)}>{block.title}</h3>
            <p>{block.summary}</p>
            <a className="button secondary" href={`#/embedded/${block.slug}`}>{block.linkLabel || 'Read more'}</a>
          </article>
        ) : block.type === 'video' ? (
          <figure className="video-block" key={index}>
            <h3>{block.title}</h3>
            {renderVideo(block.url, block.title)}
            <figcaption>{block.caption}</figcaption>
          </figure>
        ) : block.type === 'cards' ? (
          <section className={`custom-card-section card-layout-${block.layout || 'grid'} card-hover-${block.hoverEffect || 'lift'} card-radius-${block.cardRadius || 'soft'}`} key={index}>
            <div className="section-heading">
              <h2 style={blockTitleStyle(block)}>{block.title}</h2>
              <RichTextSegments fallback={block.intro} segments={block.introSegments} />
            </div>
            <div className={`custom-card-grid ${block.layout === 'carousel' ? 'custom-card-carousel' : ''}`}>
              {resolveCardItems(block, content).map((card, cardIndex) => (
                <article className={`custom-card card-text-${card.align || block.textAlign || 'left'}`} key={`${card.title}-${cardIndex}`} style={{ minHeight: block.cardHeight ? `${block.cardHeight}px` : undefined }}>
                  {card.image ? <img src={card.image} alt={card.title} /> : null}
                  <h3>{card.icon ? <BlockIcon name={card.icon} /> : null}{card.title}</h3>
                  <RichTextSegments fallback={card.text} segments={card.textSegments} />
                  {card.href ? <a href={card.href}>Open</a> : null}
                </article>
              ))}
            </div>
          </section>
        ) : block.type === 'columns' ? (
          <section className={`content-columns columns-${block.columnCount} columns-align-${block.verticalAlign || 'start'}`} key={index}>
            {block.title ? <h2 style={blockTitleStyle(block)}>{block.title}</h2> : null}
            <div className="content-column-grid">
              {block.columns.map((columnBlocks, columnIndex) => (
                <div className="content-column" key={columnIndex} style={{ minHeight: block.columnHeight ? `${block.columnHeight}px` : undefined }}>
                  <ContentBlocks blocks={columnBlocks} content={content} />
                </div>
              ))}
            </div>
          </section>
        ) : block.type === 'form' ? (
          <CustomFormBlock block={block} content={content} key={index} />
        ) : block.type === 'callout' ? (
          <section className={`final-cta callout-${block.style || 'banner'} block-align-${block.align || 'center'}`} key={index}>
            <p className="eyebrow">{block.eyebrow}</p>
            <h2 style={blockTitleStyle(block)}>{block.title}</h2>
            <RichTextSegments fallback={block.text} segments={block.textSegments} />
            <div className="hero-actions">
              {block.primaryLabel ? <a className={`button primary button-${block.primarySize || 'medium'}`} href={block.primaryHref}>{block.primaryLabel}</a> : null}
              {block.secondaryLabel ? <a className={`button secondary button-${block.secondarySize || 'medium'}`} href={block.secondaryHref}>{block.secondaryLabel}</a> : null}
            </div>
          </section>
        ) : block.type === 'focusItems' ? (
          <FocusItemsBlock block={block} key={index} />
        ) : block.type === 'socialLinks' ? (
          <section className="social-link-block" key={index}>
            <div className="section-heading">
              <h2>{block.title}</h2>
              <RichTextSegments fallback={block.intro} segments={block.introSegments} />
            </div>
            <div className="social-link-grid">
              {block.links.map((link, linkIndex) => (
                <a href={normalizeSocialUrl(link)} target="_blank" rel="noreferrer" key={`${link.label}-${linkIndex}`}>
                  <span>{socialGlyph(link)}</span>
                  <strong>{link.label}</strong>
                </a>
              ))}
            </div>
          </section>
        ) : block.type === 'sectionRef' ? (
          <SectionReference section={block.section} content={content} key={index} />
        ) : (
          <figure className={`content-image image-align-${block.align || 'wide'}`} key={index}>
            {block.url ? <img className={`image-radius-${block.radius || 'soft'}`} src={block.url} alt={block.alt} style={{ width: `${block.width || 100}%`, height: block.height ? `${block.height}px` : undefined, objectFit: block.fit || 'cover', objectPosition: `${block.positionX || 50}% ${block.positionY || 50}%` }} /> : <div className="image-slot">{block.alt || 'Image placeholder'}</div>}
            <figcaption>{block.caption}</figcaption>
          </figure>
        )
        return renderedBlock ? <BlockPositionShell block={block} suppressBackground={suppressBlockBackgrounds} key={index}>{renderedBlock}</BlockPositionShell> : null
      })}
    </section>
  )
}

function EmptyContentState() {
  return (
    <section className="section article-body">
      <div className="empty-content-state">
        <p className="eyebrow">Coming Soon</p>
        <h2>There is nothing posted here yet.</h2>
        <p>Updates, resources, and stories will appear here as soon as they are published.</p>
      </div>
    </section>
  )
}

function BlockPositionShell({ block, suppressBackground = false, children }: { block: ContentBlock; suppressBackground?: boolean; children: ReactNode }) {
  const justifySelf = block.blockAlign === 'left' ? 'start' : block.blockAlign === 'right' ? 'end' : block.blockAlign === 'center' ? 'center' : 'stretch'
  const hasBackground = Boolean(block.blockBackgroundImage && !suppressBackground)
  return (
    <div
      className={`block-position-shell block-position-${block.blockAlign || 'wide'} ${hasBackground ? 'has-block-background' : ''}`}
      style={{
        justifySelf,
        marginTop: block.blockMarginTop ? `${block.blockMarginTop}px` : undefined,
        marginBottom: block.blockMarginBottom ? `${block.blockMarginBottom}px` : undefined,
        maxWidth: block.blockMaxWidth ? `${block.blockMaxWidth}px` : undefined,
        transform: block.blockOffsetX || block.blockOffsetY ? `translate(${block.blockOffsetX || 0}px, ${block.blockOffsetY || 0}px)` : undefined,
        width: block.blockAlign === 'wide' || !block.blockAlign ? '100%' : undefined,
      }}
    >
      {hasBackground ? <img className="block-bg-image" src={block.blockBackgroundImage} alt="" style={{ opacity: block.blockBackgroundOpacity ?? 0.28, filter: block.blockBackgroundBlur ? `blur(${block.blockBackgroundBlur}px)` : undefined, objectFit: block.blockBackgroundFit === 'stretch' ? 'fill' : block.blockBackgroundFit || 'cover' }} /> : null}
      {children}
    </div>
  )
}

function blockTitleStyle(block: ContentBlock): CSSProperties {
  return {
    color: block.titleColor || undefined,
    fontFamily: block.titleFont || undefined,
    fontSize: block.titleSize ? `${block.titleSize}px` : undefined,
    textAlign: block.titleAlign || undefined,
    overflowWrap: 'anywhere',
  }
}

function isPairedWithPrevious(block: ContentBlock | undefined) {
  return Boolean(block?.pairWithPrevious || (block?.type === 'focusItems' && block.attachToPrevious))
}

function PairedBlockColumns({
  previousBlock,
  pairedBlock,
  content,
}: {
  previousBlock: ContentBlock
  pairedBlock: ContentBlock
  content: SiteContent
}) {
  const pairWidth = Math.min(Math.max(pairedBlock.pairWidth || (pairedBlock.type === 'focusItems' ? pairedBlock.columnWidth : undefined) || 40, 25), 70)
  const mainWidth = 100 - pairWidth
  const pairSide = pairedBlock.pairSide || (pairedBlock.type === 'focusItems' ? pairedBlock.columnSide : undefined) || 'right'
  const columns = pairSide === 'left'
    ? `${pairWidth}fr ${mainWidth}fr`
    : `${mainWidth}fr ${pairWidth}fr`
  const alignItems = pairedBlock.pairAlign === 'start' ? 'start' : pairedBlock.pairAlign === 'center' ? 'center' : pairedBlock.pairAlign === 'end' ? 'end' : 'stretch'
  const pairBackground = previousBlock.blockBackgroundImage || pairedBlock.blockBackgroundImage
  const pairBackgroundSource = previousBlock.blockBackgroundImage ? previousBlock : pairedBlock
  return (
    <section className={`paired-block-columns ${pairBackground ? 'has-block-background' : ''} pair-side-${pairSide} pair-separator-${pairedBlock.pairSeparator || 'none'}`} style={{ gridTemplateColumns: columns, gap: pairedBlock.pairGap !== undefined ? `${pairedBlock.pairGap}px` : undefined, maxWidth: pairedBlock.pairCombinedWidth ? `${pairedBlock.pairCombinedWidth}px` : undefined, minHeight: (pairedBlock.pairCombinedHeight || pairedBlock.pairHeight) ? `${pairedBlock.pairCombinedHeight || pairedBlock.pairHeight}px` : undefined, transform: pairedBlock.pairOffset ? `translateX(${pairedBlock.pairOffset}px)` : undefined, alignItems, '--separator-size': `${pairedBlock.pairSeparatorSize || 2}px`, '--separator-color': pairedBlock.pairSeparatorColor || 'var(--line)', '--separator-offset': `${pairedBlock.pairSeparatorOffset || 0}px`, '--separator-position': pairSide === 'left' ? `${pairWidth}%` : `${mainWidth}%` } as CSSProperties}>
      {pairBackground ? <img className="block-bg-image" src={pairBackground} alt="" style={{ opacity: pairBackgroundSource.blockBackgroundOpacity ?? 0.28, filter: pairBackgroundSource.blockBackgroundBlur ? `blur(${pairBackgroundSource.blockBackgroundBlur}px)` : undefined, objectFit: pairBackgroundSource.blockBackgroundFit === 'stretch' ? 'fill' : pairBackgroundSource.blockBackgroundFit || 'cover' }} /> : null}
      {pairSide === 'left' ? <div className="paired-block-item"><ContentBlocks blocks={[pairedBlock]} content={content} suppressBlockBackgrounds /></div> : null}
      <div className="paired-block-main">
        <ContentBlocks blocks={[previousBlock]} content={content} suppressBlockBackgrounds />
      </div>
      {pairSide !== 'left' ? <div className="paired-block-item"><ContentBlocks blocks={[pairedBlock]} content={content} suppressBlockBackgrounds /></div> : null}
    </section>
  )
}

function FocusItemsBlock({ block, compact = false }: { block: Extract<ContentBlock, { type: 'focusItems' }>; compact?: boolean }) {
  if (!block.items.length) return null
  const columns = block.tableColumns || (block.layout === 'stack' ? 1 : 3)
  return (
    <section className={`focus-items-block focus-layout-${block.layout} focus-orientation-${block.itemOrientation || 'icon-left'} ${compact ? 'focus-compact' : ''}`} style={{ width: `${block.tableWidth || 100}%`, minHeight: block.tableHeight ? `${block.tableHeight}px` : undefined }}>
      {block.title ? <h2>{block.title}</h2> : null}
      <div style={{ gridTemplateColumns: block.layout === 'stack' ? undefined : `repeat(${columns}, minmax(0, 1fr))`, gap: block.itemGap !== undefined ? `${block.itemGap}px` : undefined }}>
        {block.items.map((item) => {
          const body = (
            <>
              <BlockIcon name={item.icon} />
              <span>{item.label}</span>
            </>
          )
          const itemStyle = { minHeight: block.itemHeight ? `${block.itemHeight}px` : undefined }
          return item.href ? <a href={item.href} key={item.label} style={itemStyle}>{body}</a> : <article key={item.label} style={itemStyle}>{body}</article>
        })}
      </div>
    </section>
  )
}

function findEmbeddedPage(content: SiteContent, route: string) {
  const targetSlug = route.replace(/^\/embedded\//, '')
  if (targetSlug === route) return null
  const containers = [
    ...content.pages.map((item) => ({ title: item.title, href: item.slug ? `#/${item.slug}` : '#/', blocks: item.blocks })),
    ...content.programs.map((item) => ({ title: item.title, href: `#/work/${item.slug}`, blocks: item.blocks })),
    ...content.news.map((item) => ({ title: item.title, href: `#/news/${item.slug}`, blocks: item.blocks })),
    ...content.stories.map((item) => ({ title: item.title, href: `#/stories/${item.title.toLowerCase().replaceAll(' ', '-')}`, blocks: item.blocks || [] })),
    ...content.upcomingEvents.map((item) => ({ title: item.name, href: `#/events/${item.name.toLowerCase().replaceAll(' ', '-')}`, blocks: item.blocks || [] })),
  ]
  for (const container of containers) {
    const page = findEmbeddedPageInBlocks(container.blocks, targetSlug)
    if (page) return { page, parentTitle: container.title, parentHref: container.href }
  }
  return null
}

function findEmbeddedPageInBlocks(blocks: ContentBlock[], slug: string): Extract<ContentBlock, { type: 'embeddedPage' }> | null {
  for (const block of blocks) {
    if (block.type === 'embeddedPage') {
      if (block.slug === slug) return block
      const nested = findEmbeddedPageInBlocks(block.blocks, slug)
      if (nested) return nested
    }
    if (block.type === 'columns') {
      for (const column of block.columns) {
        const nested = findEmbeddedPageInBlocks(column, slug)
        if (nested) return nested
      }
    }
  }
  return null
}

type CardRenderItem = {
  title: string
  text: string
  textSegments?: Extract<ContentBlock, { type: 'cards' }>['cards'][number]['textSegments']
  href: string
  image: string
  icon?: string
  align?: 'left' | 'center' | 'right' | 'justify'
}

function resolveCardItems(block: Extract<ContentBlock, { type: 'cards' }>, content: SiteContent): CardRenderItem[] {
  const source = block.source || 'manual'
  if (source === 'pages') {
    return content.pages
      .filter((page) => page.slug && (!block.sourceGroup || page.menuGroup.toLowerCase() === block.sourceGroup.toLowerCase()))
      .map((page) => ({
        title: page.title,
        text: page.blocks.find((item) => item.type === 'paragraph')?.text || `${page.title} page.`,
        href: `#/${page.slug}`,
        image: page.settings.heroImages.find(Boolean) || page.settings.backgroundImages.find(Boolean) || '',
        icon: 'file',
        textSegments: page.blocks.find((item) => item.type === 'paragraph')?.segments,
      }))
  }
  if (source === 'programs') return content.programs.map((program) => ({ title: program.title, text: program.summary, href: `#/work/${program.slug}`, image: program.images[0] || program.settings.heroImages.find(Boolean) || '', icon: 'target' }))
  if (source === 'stories') return content.stories.map((story) => ({ title: story.title, text: story.summary, href: '#/stories', image: '', icon: 'heart' }))
  if (source === 'news') return content.news.map((item) => ({ title: item.title, text: item.excerpt, href: `#/news/${item.slug}`, image: '', icon: 'file' }))
  if (source === 'events') return content.upcomingEvents.map((event) => ({ title: event.name, text: `${event.date} - ${event.status}`, href: '#/events', image: '', icon: 'star' }))
  return block.cards
}

function formAction(block: Extract<ContentBlock, { type: 'form' }>, content: SiteContent, fields: Record<string, string> = {}) {
  const target = block.actionTarget || (block.actionType === 'whatsapp' ? content.organization.phone : content.organization.email)
  const message = encodeURIComponent(`${block.title}\n\n${Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join('\n')}`)
  if (block.actionType === 'whatsapp') return `https://wa.me/${target.replace(/\D/g, '')}?text=${message}`
  if (block.actionType === 'email') return `mailto:${target}?subject=${encodeURIComponent(block.title)}&body=${message}`
  return undefined
}

function CustomFormBlock({ block, content }: { block: Extract<ContentBlock, { type: 'form' }>; content: SiteContent }) {
  const [status, setStatus] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const fields = Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value)]))
    try {
      await submitEngagement(platformEndpoints.cmsApiUrl, {
        kind: block.formKind || 'contact',
        source: block.title,
        fields,
      })
      setStatus('Thank you. Your submission has been received.')
      form.reset()
      const action = formAction(block, content, fields)
      if (action && block.actionType !== 'none') window.open(action, '_blank', 'noopener,noreferrer')
    } catch {
      setStatus('We could not save this submission. Please try again.')
    }
  }

  return (
    <form className="custom-form" onSubmit={onSubmit}>
      <h2 style={blockTitleStyle(block)}>{block.title}</h2>
      <RichTextSegments fallback={block.intro} segments={block.introSegments} />
      {block.fields.map((field, fieldIndex) => (
        <label key={`${field.label}-${fieldIndex}`}>{field.label}{field.type === 'textarea' ? <textarea name={field.label} required={field.required} /> : <input name={field.label} type={field.type} required={field.required} />}</label>
      ))}
      <button className="button primary" type="submit">{block.submitLabel}</button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  )
}

function renderVideo(url: string, title: string) {
  if (!url) return <div className="image-slot">Video URL or upload needed</div>
  if (url.startsWith('data:video')) return <video controls src={url} />
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  if (youtube) return <iframe title={title} src={`https://www.youtube.com/embed/${youtube[1]}`} allowFullScreen />
  const tiktok = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/)
  if (tiktok) return <iframe title={title} src={`https://www.tiktok.com/embed/v2/${tiktok[1]}`} allowFullScreen />
  const instagram = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?]+)/)
  if (instagram) return <iframe title={title} src={`https://www.instagram.com/p/${instagram[1]}/embed`} allowFullScreen />
  return <iframe title={title} src={url} allowFullScreen />
}

function normalizeSocialUrl(link: Extract<ContentBlock, { type: 'socialLinks' }>['links'][number]) {
  if (link.icon === 'email' && !link.url.startsWith('mailto:')) return `mailto:${link.url}`
  if (link.icon === 'whatsapp' && !link.url.startsWith('http')) return `https://wa.me/${link.url.replace(/\D/g, '')}`
  return link.url
}

function socialGlyph(link: Extract<ContentBlock, { type: 'socialLinks' }>['links'][number] | SiteContent['footer']['socialLinks'][number]) {
  if (link.icon === 'emoji') return link.emoji || '★'
  const glyphs = {
    facebook: 'f',
    instagram: '◎',
    youtube: '▶',
    tiktok: '♪',
    x: 'X',
    linkedin: 'in',
    whatsapp: '☎',
    email: '@',
    website: '↗',
  }
  return glyphs[link.icon as keyof typeof glyphs] || (/\p{Extended_Pictographic}/u.test(link.icon) ? link.icon : '↗')
}

function SectionReference({ section, content }: { section: Extract<ContentBlock, { type: 'sectionRef' }>['section']; content: SiteContent }) {
  if (section === 'purpose') return <Purpose />
  if (section === 'programs') return <ProgramsPreview programs={content.programs} />
  if (section === 'impact') return <ImpactPreview impactStats={content.impactStats} />
  if (section === 'projects') return <FeaturedProjects projects={content.projects} />
  if (section === 'stories') return <StoriesPreview stories={content.stories} />
  if (section === 'events') return <EventsPreview upcomingEvents={content.upcomingEvents} />
  if (section === 'leadership') return <FoundersSection content={content} />
  return <FinalCta content={content} />
}

function RichTextSegments({ fallback, segments }: { fallback: string; segments?: Array<{ text: string; align: 'left' | 'center' | 'right'; bold: boolean; italic: boolean; underline?: boolean; href?: string }> }) {
  if (!segments?.length) return <p>{renderInlineText(fallback)}</p>
  return (
    <div className="paragraph-block">
      {segments.map((segment, index) => (
        <p key={index} style={{ textAlign: segment.align, fontWeight: segment.bold ? 800 : undefined, fontStyle: segment.italic ? 'italic' : undefined, textDecoration: segment.underline ? 'underline' : undefined }}>{segment.href ? <a href={segment.href}>{renderInlineText(segment.text)}</a> : renderInlineText(segment.text)}</p>
      ))}
    </div>
  )
}

function BlockIcon({ name }: { name: string }) {
  if (!name) return null
  if (name === 'emoji' || /\p{Extended_Pictographic}/u.test(name)) return <span className="block-icon block-emoji-icon">{name === 'emoji' ? '✨' : name}</span>
  if (name === 'facebook') return <span className="block-icon brand-glyph">f</span>
  if (name === 'instagram') return <span className="block-icon brand-glyph">◎</span>
  if (name === 'youtube') return <span className="block-icon brand-glyph">▶</span>
  if (name === 'tiktok') return <span className="block-icon brand-glyph">♪</span>
  if (name === 'x') return <span className="block-icon brand-glyph">X</span>
  if (name === 'linkedin') return <span className="block-icon brand-glyph">in</span>
  if (name === 'whatsapp') return <span className="block-icon brand-glyph">WA</span>
  const icons = {
    star: Sparkles,
    heart: HeartHandshake,
    'hand-heart': HandHeart,
    users: UsersRound,
    shield: ShieldCheck,
    file: FileText,
    target: Target,
    arrow: ArrowRight,
    book: BookOpen,
    calendar: CalendarDays,
    church: Church,
    megaphone: Megaphone,
    website: Globe2,
    email: Mail,
  }
  const Icon = icons[name as keyof typeof icons] || Sparkles
  return <Icon className="block-icon" size={22} />
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part)
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
        {content.footer.groups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <a href={link.href || footerHref(link.label, content)} key={link.label}>
                <FooterLinkIcon link={link.label} icon={link.icon} />
                {link.label}
              </a>
            ))}
          </div>
        ))}
        <div>
          <h3>Contact</h3>
          <span>{content.organization.location}</span>
          <a href={`tel:${content.organization.phone.replaceAll(' ', '')}`}><Phone size={16} />{content.organization.phone}</a>
          <a href={`mailto:${content.organization.email}`}><Mail size={16} />{content.organization.email}</a>
          <a href={`https://wa.me/${content.organization.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><span>WA</span>WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-socials">
          {content.footer.socialLinks.filter((link) => link.url).map((link) => (
            <a href={normalizeFooterSocialUrl(link, content)} target="_blank" rel="noreferrer" key={link.label}>{socialGlyph(link)}{link.label}</a>
          ))}
        </span>
        <span>© {new Date().getFullYear()} {content.organization.name}</span>
      </div>
    </footer>
  )
}

function footerHref(label: string, content: SiteContent) {
  const normalized = label.toLowerCase()
  const page = content.pages.find((item) => item.title.toLowerCase() === normalized)
  const program = content.programs.find((item) => item.title.toLowerCase() === normalized)
  if (program) return `#/work/${program.slug}`
  if (page) return page.slug ? `#/${page.slug}` : '#/'
  if (normalized.includes('volunteer')) return '#/volunteer'
  if (normalized.includes('mentor')) return '#/mentor'
  if (normalized.includes('partner')) return '#/partner'
  if (normalized.includes('donate')) return '#/donate'
  if (normalized.includes('project')) return '#/projects'
  if (normalized.includes('story')) return '#/stories'
  if (normalized.includes('report')) return '#/reports'
  if (normalized.includes('publication')) return '#/resources/publications'
  if (normalized.includes('download')) return '#/resources/downloads'
  if (normalized.includes('privacy')) return '#/privacy'
  if (normalized.includes('terms')) return '#/terms'
  return '#/'
}

function FooterLinkIcon({ link, icon }: { link: string; icon?: string }) {
  if (icon && icon !== 'arrow') return <BlockIcon name={icon} />
  const normalized = link.toLowerCase()
  if (normalized.includes('volunteer') || normalized.includes('mentor')) return <UsersRound size={16} />
  if (normalized.includes('donate') || normalized.includes('sponsor')) return <HeartHandshake size={16} />
  if (normalized.includes('event')) return <CalendarDays size={16} />
  if (normalized.includes('report') || normalized.includes('publication') || normalized.includes('download')) return <FileText size={16} />
  return <ArrowRight size={16} />
}

function normalizeFooterSocialUrl(link: SiteContent['footer']['socialLinks'][number], content: SiteContent) {
  if (link.icon === 'email') return link.url.startsWith('mailto:') ? link.url : `mailto:${link.url || content.organization.email}`
  if (link.icon === 'whatsapp') return link.url.startsWith('http') ? link.url : `https://wa.me/${(link.url || content.organization.phone).replace(/\D/g, '')}`
  return link.url
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
  const [displayRoute, setDisplayRoute] = useState(route)
  const [ready, setReady] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [modeOverride, setModeOverride] = useState<'light' | 'dark' | null>(() => {
    const saved = window.localStorage.getItem('ascension-theme-mode')
    return saved === 'light' || saved === 'dark' ? saved : null
  })
  const contentSnapshotRef = useRef('')
  const renderedContent = modeOverride ? { ...content, appearance: { ...content.appearance, mode: modeOverride } } : content

  function toggleThemeMode() {
    const nextMode = renderedContent.appearance.mode === 'dark' ? 'light' : 'dark'
    setModeOverride(nextMode)
    window.localStorage.setItem('ascension-theme-mode', nextMode)
  }

  useEffect(() => {
    let alive = true
    loadSiteContent(platformEndpoints.cmsApiUrl).then(async (nextContent) => {
      if (!alive) return
      loadGoogleFonts([nextContent.appearance.h1Font, nextContent.appearance.h2Font, nextContent.appearance.h3Font, nextContent.appearance.bodyFont, ...collectBlockFonts(nextContent)])
      await waitForFontsReady()
      if (!alive) return
      contentSnapshotRef.current = JSON.stringify(nextContent)
      setContent(nextContent)
      setDisplayRoute(route)
      setReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!ready || route === displayRoute) return
    setTransitioning(true)
    const delay = Math.max(content.appearance.transitionDelay ?? 650, 0)
    const timer = window.setTimeout(() => {
      setDisplayRoute(route)
      setTransitioning(false)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [content.appearance.transitionDelay, displayRoute, ready, route])

  useEffect(() => {
    let alive = true

    async function refreshContent() {
      const nextContent = await loadSiteContent(platformEndpoints.cmsApiUrl)
      if (!alive) return
      const snapshot = JSON.stringify(nextContent)
      if (snapshot !== contentSnapshotRef.current) {
        contentSnapshotRef.current = snapshot
        setTransitioning(true)
        const delay = Math.max(nextContent.appearance.transitionDelay ?? content.appearance.transitionDelay ?? 650, 0)
        window.setTimeout(async () => {
          if (!alive) return
          loadGoogleFonts([nextContent.appearance.h1Font, nextContent.appearance.h2Font, nextContent.appearance.h3Font, nextContent.appearance.bodyFont, ...collectBlockFonts(nextContent)])
          await waitForFontsReady()
          if (!alive) return
          setContent(nextContent)
          setTransitioning(false)
        }, delay)
      }
    }

    const refreshTimer = window.setInterval(refreshContent, 2500)
    return () => {
      alive = false
      window.clearInterval(refreshTimer)
    }
  }, [])

  useEffect(() => {
    setFavicon(renderedContent.appearance.favicon)
    loadGoogleFonts([renderedContent.appearance.h1Font, renderedContent.appearance.h2Font, renderedContent.appearance.h3Font, renderedContent.appearance.bodyFont, ...collectBlockFonts(renderedContent)])
  }, [renderedContent])

  useEffect(() => {
    const firstProgram = content.programs[0]?.slug
    const redirects: Record<string, string> = {
      '/about': '/about/who-we-are',
      '/work': firstProgram ? `/work/${firstProgram}` : '/',
      '/news-events': '/news',
      '/resources': '/resources/publications',
      '/get-involved': '/volunteer',
    }
    const nextRoute = redirects[route]
    if (nextRoute && nextRoute !== route) {
      location.hash = nextRoute
    }
  }, [content.programs, route])

  const pageTitle =
    displayRoute === '/donate'
      ? 'Donate'
      : ''

  if (!ready) {
    return <TransitionScreen content={content} />
  }

  if (transitioning) {
    return (
      <div className={`theme-root ${renderedContent.appearance.mode}`} style={appearanceVariables(renderedContent.appearance)}>
        <TransitionScreen content={renderedContent} />
      </div>
    )
  }

  return (
    <div className={`theme-root ${renderedContent.appearance.mode}`} style={appearanceVariables(renderedContent.appearance)}>
      <Header content={renderedContent} onToggleTheme={toggleThemeMode} />
      <main>
        {pageTitle ? (
          <PublicPage title={pageTitle} content={renderedContent} />
        ) : displayRoute === '/' ? (
          <HomePage content={renderedContent} />
        ) : (
          <DetailPage route={displayRoute} content={renderedContent} />
        )}
      </main>
      <Footer content={renderedContent} />
      <BackToTopButton />
    </div>
  )
}

function TransitionScreen({ content }: { content: SiteContent }) {
  const quotes = content.appearance.transitionQuotes?.length ? content.appearance.transitionQuotes : ['Transformation begins with people.']
  const quoteIndex = Math.abs(location.hash.length) % quotes.length
  const randomStyles = ['sweep-left', 'sweep-right', 'sweep-up', 'sweep-down', 'zoom', 'blur', 'iris-open', 'grid', 'curtain', 'bars', 'slide-scale']
  const transitionStyle = content.appearance.transitionStyle === 'random-sweep'
    ? randomStyles[Math.abs(location.hash.length) % randomStyles.length]
    : content.appearance.transitionStyle || 'fade'
  return (
    <div className={`transition-screen transition-${transitionStyle}`} style={{ '--transition-duration': `${content.appearance.transitionDuration || 360}ms` } as CSSProperties}>
      <div>
        <span className="brand-mark">AES</span>
        <p className="eyebrow">{content.organization.shortName}</p>
        <h2>{quotes[quoteIndex]}</h2>
      </div>
    </div>
  )
}

function collectBlockFonts(content: SiteContent) {
  const allBlocks = [
    ...content.pages.flatMap((page) => page.blocks),
    ...content.programs.flatMap((program) => program.blocks),
    ...content.stories.flatMap((story) => story.blocks || []),
    ...content.news.flatMap((item) => item.blocks),
    ...content.upcomingEvents.flatMap((item) => item.blocks || []),
  ]
  return [
    ...content.pages.map((page) => page.settings.titleFont || ''),
    ...content.programs.map((program) => program.settings.titleFont || ''),
  ].filter(Boolean)
    .concat(allBlocks.flatMap((block) => block.type === 'paragraph' && block.fontFamily ? [block.fontFamily] : []))
    .concat(
      [
        ...content.pages.flatMap((page) => page.blocks),
        ...content.programs.flatMap((program) => program.blocks),
      ].flatMap((block) => block.type === 'hero' ? [block.titleFont, block.textFont].filter(Boolean) as string[] : []),
    )
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
