'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className="sticky top-0 z-50 w-full transition-shadow duration-200"
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? '0 1px 12px rgba(15,20,25,0.06)' : 'none',
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                className="relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 hover:opacity-100"
                style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3.5 -bottom-[17px] h-px"
                    style={{ backgroundColor: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Theme toggle + Hamburger */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

        {/* Hamburger button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          style={{ color: 'var(--fg)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="flex"
              >
                <X size={20} strokeWidth={1.75} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="flex"
              >
                <Menu size={20} strokeWidth={1.75} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 top-16 z-40 md:hidden"
              style={{ backgroundColor: 'rgba(15,20,25,0.25)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu */}
            <motion.div
              key="menu"
              className="absolute inset-x-0 top-full z-50 overflow-hidden md:hidden"
              style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <nav
                className="flex flex-col px-4 py-3"
                aria-label="Mobile navigation"
              >
                {navLinks.map(({ href, label }, i) => {
                  const active = pathname === href || pathname.startsWith(`${href}/`)
                  return (
                    <motion.div
                      key={href}
                      initial={{ x: -12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.045, duration: 0.18 }}
                    >
                      <Link
                        href={href}
                        className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                        style={{
                          color: active ? 'var(--accent)' : 'var(--fg)',
                          backgroundColor: active ? 'rgba(45,95,93,0.07)' : 'transparent',
                        }}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
