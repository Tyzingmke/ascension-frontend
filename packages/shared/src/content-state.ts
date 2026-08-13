export type Program = {
  index: string
  slug: string
  title: string
  summary: string
  status?: string
  settings: PageSettings
  images: string[]
  blocks: ContentBlock[]
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
  settings: PageSettings
  blocks: ContentBlock[]
}

export type PageSettings = {
  pageStyle: 'standard' | 'editorial' | 'leadership' | 'resource'
  contentWidth: 'narrow' | 'standard' | 'wide'
  textAlign: 'left' | 'center'
  heroImages: string[]
  heroImageOpacity: number
  heroCarousel: boolean
  backgroundImages: string[]
  backgroundOpacity: number
  backgroundCarousel: boolean
  titleFont?: string
  titleSize?: number
  titleColor?: string
  titleAlign?: 'left' | 'center' | 'right'
}

export type MenuGroup = {
  label: string
}

export type Person = {
  id: string
  name: string
  role: string
  profileType: 'founder' | 'leadership' | 'board' | 'staff' | 'mentor'
  bio: string
  bioSegments?: TextSegment[]
  photo: string
  frameStyle: 'circle' | 'soft-square' | 'arch' | 'diamond'
  photoCrop: {
    x: number
    y: number
    zoom: number
  }
  images: string[]
  imageCrops: Array<{
    x: number
    y: number
    zoom: number
  }>
  carouselSpeed: number
  capabilities: string[]
  capabilitySegments?: TextSegment[]
  reportsTo: string
}

export type AppearanceSettings = {
  mode: 'light' | 'dark'
  themeName:
    | 'ascension'
    | 'rachni'
    | 'golden'
    | 'hacker'
    | 'royal'
    | 'ocean'
    | 'forest'
    | 'sunrise'
    | 'graphite'
    | 'crimson'
    | 'lavender'
    | 'custom'
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  h1Font: string
  h2Font: string
  h3Font: string
  bodyFont: string
  transitionDelay: number
  transitionDuration: number
  transitionStyle:
    | 'fade'
    | 'sweep-left'
    | 'sweep-right'
    | 'sweep-up'
    | 'sweep-down'
    | 'random-sweep'
    | 'zoom'
    | 'blur'
    | 'iris-open'
    | 'grid'
    | 'curtain'
    | 'bars'
    | 'slide-scale'
  transitionQuotes: string[]
}

export type BlockPlacement = {
  blockMarginTop?: number
  blockMarginBottom?: number
  blockMaxWidth?: number
  blockAlign?: 'left' | 'center' | 'right' | 'wide'
  blockOffsetX?: number
  blockOffsetY?: number
  titleFont?: string
  titleSize?: number
  titleColor?: string
  titleAlign?: 'left' | 'center' | 'right'
  blockBackgroundImage?: string
  blockBackgroundOpacity?: number
  blockBackgroundBlur?: number
  blockBackgroundFit?: 'cover' | 'contain' | 'stretch'
  pairWithPrevious?: boolean
  pairSide?: 'left' | 'right'
  pairWidth?: number
  pairHeight?: number
  pairCombinedWidth?: number
  pairCombinedHeight?: number
  pairGap?: number
  pairOffset?: number
  pairAlign?: 'start' | 'center' | 'end' | 'stretch'
  pairSeparator?: 'none' | 'line' | 'dashed' | 'curved' | 'glow'
  pairSeparatorSize?: number
  pairSeparatorColor?: string
  pairSeparatorOffset?: number
}

export type ContentBlock = (
  | {
      type: 'hero'
      eyebrow: string
      title: string
      text: string
      textSegments?: TextSegment[]
      titleFont?: string
      titleSize?: number
      textFont?: string
      textSize?: number
      minHeight?: number
      imageUrls?: string[]
      imageOpacity?: number
      carousel?: boolean
    }
  | {
      type: 'heading'
      level: 2 | 3
      text: string
      align?: 'left' | 'center'
      icon?: string
    }
  | {
      type: 'paragraph'
      text: string
      align?: 'left' | 'center'
      fontFamily?: string
      fontSize?: number
      lineHeight?: number
      spacing?: number
      weight?: 'regular' | 'semibold' | 'bold'
      icon?: string
      segments?: TextSegment[]
    }
  | {
      type: 'link'
      label: string
      href: string
      variant?: 'primary' | 'secondary'
      align?: 'left' | 'center'
      icon?: string
      size?: 'small' | 'medium' | 'large'
    }
  | {
      type: 'heroActions'
      align?: 'left' | 'center'
      actions: Array<{
        label: string
        href: string
        variant: 'primary' | 'secondary'
        size?: 'small' | 'medium' | 'large'
        icon?: string
      }>
    }
  | {
      type: 'hierarchy'
      title: string
      intro: string
      introSegments?: TextSegment[]
      icon?: string
    }
  | {
      type: 'document'
      title: string
      fileName: string
      url: string
      description: string
      descriptionSegments?: TextSegment[]
      icon?: string
    }
  | {
      type: 'embeddedPage'
      title: string
      slug: string
      summary: string
      linkLabel: string
      cardImage?: string
      blocks: ContentBlock[]
    }
  | {
      type: 'video'
      title: string
      url: string
      caption: string
      provider?: 'auto' | 'youtube' | 'tiktok' | 'instagram' | 'direct'
    }
  | {
      type: 'cards'
      title: string
      intro: string
      introSegments?: TextSegment[]
      layout?: 'grid' | 'carousel'
      hoverEffect?: 'lift' | 'zoom' | 'glow' | 'none'
      cardHeight?: number
      cardRadius?: 'square' | 'soft' | 'rounded' | 'arch'
      textAlign?: 'left' | 'center' | 'right' | 'justify'
      source?: 'manual' | 'pages' | 'programs' | 'stories' | 'news' | 'events'
      sourceGroup?: string
      cards: Array<{
        title: string
        text: string
        textSegments?: TextSegment[]
        href: string
        image: string
        icon?: string
        align?: 'left' | 'center' | 'right' | 'justify'
      }>
    }
  | {
      type: 'form'
      title: string
      intro: string
      introSegments?: TextSegment[]
      submitLabel: string
      formKind?: 'contact' | 'volunteer' | 'mentor' | 'partnership' | 'event'
      actionType?: 'email' | 'whatsapp' | 'none'
      actionTarget?: string
      fields: Array<{
        label: string
        type: 'text' | 'email' | 'tel' | 'textarea'
        required: boolean
      }>
    }
  | {
      type: 'callout'
      eyebrow: string
      title: string
      text: string
      textSegments?: TextSegment[]
      primaryLabel: string
      primaryHref: string
      primarySize?: 'small' | 'medium' | 'large'
      secondaryLabel: string
      secondaryHref: string
      secondarySize?: 'small' | 'medium' | 'large'
      align?: 'left' | 'center'
      style?: 'standard' | 'banner' | 'split'
    }
  | {
      type: 'focusItems'
      title: string
      layout: 'stack' | 'grid' | 'inline'
      tableWidth?: number
      tableHeight?: number
      tableColumns?: number
      itemOrientation?: 'icon-left' | 'icon-top' | 'icon-right'
      itemHeight?: number
      itemGap?: number
      attachToPrevious?: boolean
      columnSide?: 'left' | 'right'
      columnWidth?: number
      items: Array<{
        label: string
        icon: string
        href?: string
      }>
    }
  | {
      type: 'socialLinks'
      title: string
      intro: string
      introSegments?: TextSegment[]
      links: Array<{
        label: string
        url: string
        icon: string
        emoji?: string
      }>
    }
  | {
      type: 'columns'
      title: string
      columnCount: 2 | 3
      columnHeight?: number
      verticalAlign?: 'start' | 'center' | 'stretch'
      columns: ContentBlock[][]
    }
  | {
      type: 'sectionRef'
      section: 'purpose' | 'programs' | 'impact' | 'projects' | 'stories' | 'events' | 'cta' | 'leadership'
    }
  | {
      type: 'image'
      url: string
      alt: string
      caption: string
      align?: 'left' | 'center' | 'wide'
      width?: number
      height?: number
      fit?: 'cover' | 'contain'
      positionX?: number
      positionY?: number
      radius?: 'square' | 'soft' | 'rounded' | 'circle'
    }
) & BlockPlacement

export type TextSegment = {
  text: string
  align: 'left' | 'center' | 'right'
  bold: boolean
  italic: boolean
  underline?: boolean
  href?: string
}

export type MediaAsset = {
  id: string
  type: 'image' | 'video' | 'socialVideo' | 'document'
  title: string
  url: string
  fileName?: string
  provider?: 'auto' | 'youtube' | 'tiktok' | 'instagram' | 'direct'
  source?: string
  archivedAt: string
}

export type EngagementSubmission = {
  id: string
  kind: 'contact' | 'volunteer' | 'mentor' | 'partnership' | 'event'
  source: string
  status: 'New' | 'Reviewed' | 'Archived'
  submittedAt: string
  fields: Record<string, string>
}

export type FooterSettings = {
  groups: Array<{
    title: string
    links: Array<{
      label: string
      href: string
      icon: string
    }>
  }>
  socialLinks: Array<{
    label: string
    url: string
    icon: string
    emoji?: string
  }>
}

export type AdminUser = {
  name: string
  email: string
  role: 'Developer' | 'Super Admin' | 'Administrator' | 'Publisher' | 'Editor' | 'Viewer'
  protected?: boolean
  emailVerification: 'Required' | 'Optional'
  mfa: 'Required' | 'Optional'
  accessAreas: string[]
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
  appearance: AppearanceSettings
  menuGroups: MenuGroup[]
  programs: Program[]
  pages: Page[]
  peopleRoles: string[]
  people: Person[]
  projects: Project[]
  stories: Story[]
  news: NewsItem[]
  upcomingEvents: EventItem[]
  impactStats: Array<{ label: string; value: string }>
  mediaLibrary: {
    images: MediaAsset[]
    videos: MediaAsset[]
    socialVideos: MediaAsset[]
    documents: MediaAsset[]
  }
  engagement: EngagementSubmission[]
  footer: FooterSettings
  adminUsers: AdminUser[]
}
