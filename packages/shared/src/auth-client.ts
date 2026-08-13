export type SupabaseSession = {
  access_token: string
  refresh_token?: string
  expires_at?: number
  user?: {
    id: string
    email?: string
    email_confirmed_at?: string | null
    confirmed_at?: string | null
  }
}

const storageKey = 'ascension-supabase-session'

export function supabaseAuthConfigured() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

export function getStoredSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) as SupabaseSession : null
  } catch {
    return null
  }
}

export function storeSession(session: SupabaseSession | null) {
  if (session) localStorage.setItem(storageKey, JSON.stringify(session))
  else localStorage.removeItem(storageKey)
}

export async function signInWithPassword(email: string, password: string) {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) throw new Error('Supabase auth is not configured.')

  const response = await fetch(`${url.replace(/\/$/, '')}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      authorization: `Bearer ${anonKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error('Login failed. Check the email and password.')
  const payload = await response.json()
  if (!payload.user?.email_confirmed_at && !payload.user?.confirmed_at) {
    throw new Error('Please verify your email address before accessing the CMS.')
  }
  const session: SupabaseSession = {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    expires_at: payload.expires_in ? Math.floor(Date.now() / 1000) + Number(payload.expires_in) : undefined,
    user: payload.user,
  }
  storeSession(session)
  return session
}

export function signOut() {
  storeSession(null)
}
