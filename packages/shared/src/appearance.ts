import type { AppearanceSettings } from './content-state'

const fallbackFont = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
const systemFonts = new Set(['Arial', 'Georgia', 'Inter'])
type ThemePalette = {
  label: string
  light: Record<string, string>
  dark: Record<string, string>
}

export const themePresets: Record<AppearanceSettings['themeName'], ThemePalette> = {
  ascension: {
    label: 'Ascension',
    light: { ink: '#18201d', muted: '#5f6863', paper: '#fbfaf6', surface: '#ffffff', line: '#d9ded5', moss: '#466450', blue: '#44667a', clay: '#a65f3b', gold: '#d5a037', softGreen: '#eef3e8', softGold: '#f7ecd0', adminBg: '#f4f6f5', adminInk: '#17201c' },
    dark: { ink: '#f5f7f2', muted: '#bac6bd', paper: '#101512', surface: '#17201c', line: '#2d3931', moss: '#82a98f', blue: '#82a9bd', clay: '#d69470', gold: '#ecc565', softGreen: '#18241e', softGold: '#2a2416', adminBg: '#101512', adminInk: '#f5f7f2' },
  },
  rachni: {
    label: 'Rachni',
    light: { ink: '#1d1822', muted: '#665c6f', paper: '#fdf8fb', surface: '#ffffff', line: '#e4d8e4', moss: '#7f426b', blue: '#4f6a8f', clay: '#bd6b6b', gold: '#cc9b45', softGreen: '#f4e8f0', softGold: '#f8eed7', adminBg: '#f8f2f7', adminInk: '#211724' },
    dark: { ink: '#fff5fb', muted: '#d0bfd0', paper: '#160f18', surface: '#221426', line: '#3d2a42', moss: '#d175b0', blue: '#8eacd6', clay: '#e18b8b', gold: '#efc66d', softGreen: '#2c1830', softGold: '#332719', adminBg: '#120d14', adminInk: '#fff5fb' },
  },
  golden: {
    label: 'Golden',
    light: { ink: '#211b0f', muted: '#706650', paper: '#fffaf0', surface: '#ffffff', line: '#e6d8b6', moss: '#725b18', blue: '#516b86', clay: '#aa6b22', gold: '#c9961a', softGreen: '#f3ead1', softGold: '#fff0bf', adminBg: '#faf4e5', adminInk: '#211b0f' },
    dark: { ink: '#fff7de', muted: '#d5c397', paper: '#151006', surface: '#211909', line: '#3d3115', moss: '#e0bd43', blue: '#8bb0d4', clay: '#db9141', gold: '#ffd35a', softGreen: '#2f260e', softGold: '#3a2c09', adminBg: '#120d05', adminInk: '#fff7de' },
  },
  hacker: {
    label: 'Hacker',
    light: { ink: '#092014', muted: '#496356', paper: '#f3fff8', surface: '#ffffff', line: '#c6ecd8', moss: '#108743', blue: '#097a70', clay: '#4b7d23', gold: '#8fab18', softGreen: '#ddfae9', softGold: '#eef7cc', adminBg: '#effbf5', adminInk: '#092014' },
    dark: { ink: '#d7ffe7', muted: '#79c99a', paper: '#030805', surface: '#07140b', line: '#143e23', moss: '#27f173', blue: '#22d7c5', clay: '#9eee3f', gold: '#d9ff57', softGreen: '#071f10', softGold: '#182109', adminBg: '#020604', adminInk: '#d7ffe7' },
  },
  royal: {
    label: 'Royal',
    light: { ink: '#19172a', muted: '#605d78', paper: '#f9f7ff', surface: '#ffffff', line: '#ddd8f2', moss: '#6046a6', blue: '#315c9a', clay: '#8d5687', gold: '#c19a32', softGreen: '#ece7fb', softGold: '#f7ecd0', adminBg: '#f4f1fb', adminInk: '#19172a' },
    dark: { ink: '#f7f2ff', muted: '#c5bcdd', paper: '#0f0b1d', surface: '#18122b', line: '#332852', moss: '#a98cff', blue: '#7facf0', clay: '#ce7fc3', gold: '#e8c75d', softGreen: '#22183d', softGold: '#302715', adminBg: '#0b0817', adminInk: '#f7f2ff' },
  },
  ocean: {
    label: 'Ocean',
    light: { ink: '#0d1d23', muted: '#51676e', paper: '#f2fbfd', surface: '#ffffff', line: '#cde2e8', moss: '#1d7d8c', blue: '#2666a3', clay: '#3e8a80', gold: '#c19a36', softGreen: '#dff3f4', softGold: '#f3edcf', adminBg: '#edf7fa', adminInk: '#0d1d23' },
    dark: { ink: '#e8fbff', muted: '#a8c9d2', paper: '#061217', surface: '#0c1e25', line: '#1b414d', moss: '#49c2d1', blue: '#6ab0ff', clay: '#5bd0bd', gold: '#e4c65b', softGreen: '#0d2b31', softGold: '#28240e', adminBg: '#041015', adminInk: '#e8fbff' },
  },
  forest: {
    label: 'Forest',
    light: { ink: '#132016', muted: '#58665b', paper: '#f6fbf4', surface: '#ffffff', line: '#d2e1cf', moss: '#2d7041', blue: '#416f74', clay: '#8a6540', gold: '#b69338', softGreen: '#e5f2df', softGold: '#f3edcf', adminBg: '#f1f7ef', adminInk: '#132016' },
    dark: { ink: '#effbe9', muted: '#b6cbb1', paper: '#091109', surface: '#121f12', line: '#2b3d29', moss: '#6ec184', blue: '#76b4bd', clay: '#c69564', gold: '#ddbd54', softGreen: '#192819', softGold: '#2b2510', adminBg: '#080f08', adminInk: '#effbe9' },
  },
  sunrise: {
    label: 'Sunrise',
    light: { ink: '#26170f', muted: '#715f55', paper: '#fff8f2', surface: '#ffffff', line: '#ead6c8', moss: '#bd5f3b', blue: '#6b7894', clay: '#df7348', gold: '#e4a23a', softGreen: '#fae9df', softGold: '#fff0c8', adminBg: '#fbf0e8', adminInk: '#26170f' },
    dark: { ink: '#fff4eb', muted: '#d7b9a8', paper: '#170b06', surface: '#24120b', line: '#44281b', moss: '#ff9465', blue: '#9cadcf', clay: '#ff7d4f', gold: '#ffc85a', softGreen: '#32190f', softGold: '#38280c', adminBg: '#130905', adminInk: '#fff4eb' },
  },
  graphite: {
    label: 'Graphite',
    light: { ink: '#17191b', muted: '#5f6368', paper: '#f7f8f8', surface: '#ffffff', line: '#d8dcde', moss: '#4d5b63', blue: '#506f8a', clay: '#80645c', gold: '#aa8b3d', softGreen: '#e9ecee', softGold: '#f1ead5', adminBg: '#f0f2f3', adminInk: '#17191b' },
    dark: { ink: '#f3f5f5', muted: '#bbc3c7', paper: '#0e1011', surface: '#171a1c', line: '#30363a', moss: '#91a0a8', blue: '#8db5d8', clay: '#b8958c', gold: '#d4b965', softGreen: '#202426', softGold: '#282314', adminBg: '#0b0d0e', adminInk: '#f3f5f5' },
  },
  crimson: {
    label: 'Crimson',
    light: { ink: '#261315', muted: '#70585c', paper: '#fff7f7', surface: '#ffffff', line: '#ead2d5', moss: '#a63f4d', blue: '#536b90', clay: '#b85f46', gold: '#c99c3c', softGreen: '#f8e5e8', softGold: '#f7ecd0', adminBg: '#fbf0f1', adminInk: '#261315' },
    dark: { ink: '#fff1f3', muted: '#d9b8bd', paper: '#17080a', surface: '#251014', line: '#44242a', moss: '#ef7182', blue: '#8faee1', clay: '#e4896c', gold: '#e7c561', softGreen: '#33151b', softGold: '#302510', adminBg: '#130608', adminInk: '#fff1f3' },
  },
  lavender: {
    label: 'Lavender',
    light: { ink: '#20182a', muted: '#665f72', paper: '#fbf8ff', surface: '#ffffff', line: '#e2d8ee', moss: '#8864a8', blue: '#5d78a6', clay: '#a8668c', gold: '#bf9a44', softGreen: '#f0e8f8', softGold: '#f6ecd3', adminBg: '#f6f0fb', adminInk: '#20182a' },
    dark: { ink: '#fbf4ff', muted: '#ccbfd7', paper: '#130d18', surface: '#1f1527', line: '#3a2948', moss: '#c391ea', blue: '#91abe2', clay: '#d98abd', gold: '#e3c66f', softGreen: '#2a1b35', softGold: '#302614', adminBg: '#100a14', adminInk: '#fbf4ff' },
  },
  custom: {
    label: 'Custom',
    light: { ink: '#18201d', muted: '#5f6863', paper: '#fbfaf6', surface: '#ffffff', line: '#d9ded5', moss: '#466450', blue: '#44667a', clay: '#a65f3b', gold: '#d5a037', softGreen: '#eef3e8', softGold: '#f7ecd0', adminBg: '#f4f6f5', adminInk: '#17201c' },
    dark: { ink: '#f5f7f2', muted: '#bac6bd', paper: '#101512', surface: '#17201c', line: '#2d3931', moss: '#82a98f', blue: '#82a9bd', clay: '#d69470', gold: '#ecc565', softGreen: '#18241e', softGold: '#2a2416', adminBg: '#101512', adminInk: '#f5f7f2' },
  },
}

function fontStack(font: string) {
  return font ? `"${font}", ${fallbackFont}` : fallbackFont
}

export function appearanceVariables(appearance: AppearanceSettings) {
  const theme = themePresets[appearance.themeName || 'ascension']
  const palette = { ...theme[appearance.mode || 'light'] }
  if (appearance.themeName === 'custom') {
    palette.moss = appearance.primaryColor
    palette.blue = appearance.secondaryColor
    palette.clay = appearance.accentColor
  }
  return {
    '--ink': palette.ink,
    '--muted': palette.muted,
    '--paper': palette.paper,
    '--surface': palette.surface,
    '--line': palette.line,
    '--moss': palette.moss,
    '--blue': palette.blue,
    '--clay': palette.clay,
    '--gold': palette.gold,
    '--soft-green': palette.softGreen,
    '--soft-gold': palette.softGold,
    '--admin-bg': palette.adminBg,
    '--admin-ink': palette.adminInk,
    '--body-font': fontStack(appearance.bodyFont),
    '--h1-font': fontStack(appearance.h1Font),
    '--h2-font': fontStack(appearance.h2Font),
    '--h3-font': fontStack(appearance.h3Font),
  } as Record<string, string>
}

export function setFavicon(favicon: string) {
  if (!favicon) return
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = favicon
}

export function loadGoogleFonts(fonts: string[]) {
  const uniqueFonts = [...new Set(fonts.filter((font) => font && !systemFonts.has(font)))]
  if (!uniqueFonts.length) return
  const id = 'aes-google-fonts'
  const families = uniqueFonts.map((font) => `family=${font.replaceAll(' ', '+')}:wght@400;600;700;800;900`).join('&')
  const href = `https://fonts.googleapis.com/css2?${families}&display=swap`
  let link = document.querySelector<HTMLLinkElement>(`#${id}`)
  if (!link) {
    link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  link.href = href
}

export async function waitForFontsReady(timeout = 1800) {
  if (!('fonts' in document)) return
  await Promise.race([
    document.fonts.ready,
    new Promise((resolve) => window.setTimeout(resolve, timeout)),
  ])
}
