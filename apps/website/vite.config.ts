import { defineConfig } from 'vite'

export default defineConfig({
  root: 'apps/website',
  base: process.env.GITHUB_PAGES === 'true' ? '/ascension-frontend/' : '/',
  publicDir: '../../public',
  server: {
    fs: {
      allow: ['../..'],
    },
  },
  build: {
    outDir: '../../dist/website',
    emptyOutDir: true,
  },
})
