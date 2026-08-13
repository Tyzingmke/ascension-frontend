import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, CalendarDays, ChevronDown, FileCheck2, HandHeart, Menu, ShieldCheck, UsersRound, X } from 'lucide-react'
import '../../../packages/shared/src/styles.css'
import {
  footerGroups,
  impactStats,
  navigation,
  organization,
  programs,
  projects,
  stories,
  upcomingEvents,
} from '../../../packages/shared/src/site-data'
import { platformEndpoints } from '../../../packages/shared/src/platform-config'

function useRoute() {
  const [route, setRoute] = useState(location.hash.replace('#', '') || '/')

  useEffect(() => {
    const onHashChange = () => setRoute(location.hash.replace('#', '') || '/')
    addEventListener('hashchange', onHashChange)
    return () => removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

function Header() {
  const [open, setOpen] = useState(false)

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
          {navigation.map((item) => (
            <div className="nav-item" key={item.label}>
              <a href={item.href}>{item.label}</a>
              <button aria-label={`${item.label} menu`}>
                <ChevronDown size={14} />
              </button>
              <div className="dropdown">
                {item.children.map((child) => (
                  <a href={item.href} key={child}>
                    {child}
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
      {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
    </header>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="drawer-head">
        <strong>ASCENSION</strong>
        <button className="icon-button" aria-label="Close menu" onClick={onClose}>
          <X />
        </button>
      </div>
      {navigation.map((item) => (
        <details key={item.label}>
          <summary>
            {item.label}
            <ChevronDown size={16} />
          </summary>
          {item.children.map((child) => (
            <a href={item.href} key={child} onClick={onClose}>
              {child}
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

function HomePage() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Impact. Disrupt. Influence the ecosystem.</p>
          <h1>{organization.tagline}</h1>
          <p className="lead">{organization.description}</p>
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
      <ProgramsPreview />
      <ImpactPreview />
      <FeaturedProjects />
      <StoriesPreview />
      <EventsPreview />
      <FinalCta />
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

function ProgramsPreview() {
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

function ImpactPreview() {
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

function FeaturedProjects() {
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

function StoriesPreview() {
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
          </article>
        ))}
      </div>
    </section>
  )
}

function EventsPreview() {
  return (
    <section className="operations-band">
      {upcomingEvents.map((event) => (
        <div key={event.name}>
          <CalendarDays />
          <h3>{event.name}</h3>
          <p>
            {event.date} / {event.type} / {event.status}
          </p>
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

function PublicPage({ title }: { title: string }) {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{organization.shortName}</p>
        <h1>{title}</h1>
        <p>{organization.description}</p>
      </section>
      <Purpose />
      {title.includes('Work') ? <ProgramsPreview /> : null}
      {title.includes('Impact') ? <ImpactPreview /> : null}
      {title.includes('News') ? <EventsPreview /> : null}
      {title.includes('Get') ? <FinalCta /> : null}
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <h2>{organization.shortName}</h2>
        <p>{organization.tagline}</p>
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
          <span>{organization.location}</span>
          <span>{organization.phone}</span>
          <span>{organization.email}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Facebook / Instagram / LinkedIn / YouTube</span>
        <span>© {new Date().getFullYear()} {organization.name}</span>
      </div>
    </footer>
  )
}

function FinalCta() {
  return (
    <section className="cta-section" id="get-involved">
      <p className="eyebrow">Together, we ascend.</p>
      <h2>Volunteer, partner, give, mentor, serve, and lead.</h2>
      <a className="button primary" href={`mailto:${organization.email}`}>
        Contact Ascension <ArrowRight size={18} />
      </a>
    </section>
  )
}

function App() {
  const route = useRoute()
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
      <Header />
      <main>{pageTitle ? <PublicPage title={pageTitle} /> : <HomePage />}</main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
