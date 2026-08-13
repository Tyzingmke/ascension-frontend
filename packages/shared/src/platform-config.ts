export const platformEndpoints = {
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || 'http://127.0.0.1:5173',
  cmsUrl: import.meta.env.VITE_CMS_URL || 'http://127.0.0.1:5174',
  contentMode: import.meta.env.VITE_PUBLIC_CONTENT_MODE || 'git-static',
  cmsRepository: import.meta.env.VITE_CONTENT_REPOSITORY || 'Tyzingmke/ascension-cms',
  frontendRepository: import.meta.env.VITE_FRONTEND_REPOSITORY || 'Tyzingmke/ascension-frontend',
}
