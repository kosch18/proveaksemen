import Link from 'next/link'
import Image from 'next/image'

// ── Configure your logo here ────────────────────────────────────────────────
// Drop your file into /public and update the constants below.
//   - For SVG:  /public/logo.svg
//   - For PNG/JPG: /public/logo.png  (use 2× resolution for sharp display)
const LOGO_SRC   = '/11111.png'
const LOGO_ALT   = 'Nordic Devices'
const BRAND_NAME = 'Nordic Devices'
// Tweak these if your logo aspect ratio is different.
const LOGO_WIDTH  = 40
const LOGO_HEIGHT = 40

interface Props {
  /** Hide the company name text — show icon only. */
  iconOnly?: boolean
  /** Override colour of the brand text. */
  textColor?: string
}

export function Logo({ iconOnly = false, textColor }: Props) {
  return (
    <Link href="/" className="flex w-fit shrink-0 items-center gap-3">
      <Image
        src={LOGO_SRC}
        alt={LOGO_ALT}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="h-10 w-10 shrink-0 object-contain"
      />
      {!iconOnly && (
        <span
          className="font-heading text-[20px] font-semibold tracking-tight"
          style={{ color: textColor ?? 'var(--fg)' }}
        >
          {BRAND_NAME}
        </span>
      )}
    </Link>
  )
}
