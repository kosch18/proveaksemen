import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn   = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')
      const isLoginPage  = nextUrl.pathname === '/admin/login'

      if (!isAdminRoute) return true
      if (isLoginPage) {
        return isLoggedIn ? Response.redirect(new URL('/admin', nextUrl)) : true
      }
      return isLoggedIn
    },
  },
  providers: [],
}
