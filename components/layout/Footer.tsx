'use client'

import Link from 'next/link'
import { Linkedin, Github, Twitter, MapPin, Mail, Phone } from 'lucide-react'
import { company } from '@/lib/data/company'
import { Logo } from './Logo'

const resourceLinks = [
  { href: '/docs', label: 'Documentation' },
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/support', label: 'Technical Support' },
  { href: '/changelog', label: 'Changelog' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/careers', label: 'Careers' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto w-full"
      style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Company */}
          <div className="flex flex-col gap-5">
            <Logo />

            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {company.tagline}. Founded {company.founded} in {company.headquarters}.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { href: company.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: company.socials.github, Icon: Github, label: 'GitHub' },
                { href: company.socials.twitter, Icon: Twitter, label: 'Twitter' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                  style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <Icon size={15} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--fg)' }}
            >
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--fg)' }}
            >
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--fg)' }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={15}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0"
                  style={{ color: 'var(--accent)' }}
                />
                <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {company.contact.address}
                  <br />
                  {company.contact.city}, {company.contact.country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail
                  size={15}
                  strokeWidth={1.75}
                  className="shrink-0"
                  style={{ color: 'var(--accent)' }}
                />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  size={15}
                  strokeWidth={1.75}
                  className="shrink-0"
                  style={{ color: 'var(--accent)' }}
                />
                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                  className="text-sm font-mono transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
                >
                  {company.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-3 pt-6 text-xs sm:flex-row"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <span>
            © {year} Nordic Devices AS. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:underline"
              style={{ color: 'var(--muted)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:underline"
              style={{ color: 'var(--muted)' }}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
