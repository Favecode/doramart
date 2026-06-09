import React from 'react'
import { Instagram } from 'lucide-react'

function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.89a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
    </svg>
  )
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book Now', href: '#booking' },
]

export default function Footer() {
  return (
    <footer className="relative bg-night border-t border-gold/10">
      {/* Top gold line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">

          {/* Brand column */}
          <div>
            <div className="mb-4">
              <span className="font-serif text-3xl gold-text tracking-wide">Doramart</span>
              <div className="text-[9px] tracking-[0.4em] uppercase text-gold/50 font-sans mt-1">Cocktail & Drinks</div>
            </div>
            <p className="font-serif italic text-gold-champagne/50 text-sm leading-relaxed mb-6">
              "Sip. Savor. Celebrate Life."
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/doramart_cocktail" target="_blank" rel="noreferrer"
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-gold/60 hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-300">
                <Instagram size={15} />
              </a>
              <a href="https://tiktok.com/@doramart_cocktail" target="_blank" rel="noreferrer"
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-gold/60 hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-300">
                <TikTokIcon size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[9px] tracking-[0.4em] uppercase text-gold font-medium mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-brown-light hover:text-gold transition-colors duration-300 font-light tracking-wide">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] tracking-[0.4em] uppercase text-gold font-medium mb-5">Reach Us</h4>
            <div className="space-y-3">
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-brown-light/50 mb-1">Phone</div>
                <a href="tel:+2347070646467" className="text-sm text-gold-champagne/70 hover:text-gold transition-colors">+234 707 064 6467</a>
              </div>
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-brown-light/50 mb-1">Instagram</div>
                <a href="https://instagram.com/doramart_cocktail" className="text-sm text-gold-champagne/70 hover:text-gold transition-colors">@doramart_cocktail</a>
              </div>
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-brown-light/50 mb-1">TikTok</div>
                <a href="https://tiktok.com/@doramart_cocktail" className="text-sm text-gold-champagne/70 hover:text-gold transition-colors">@doramart_cocktail</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.2em] text-brown-light/40 uppercase">
            © {new Date().getFullYear()} Doramart Cocktail & Drinks. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.15em] text-brown-light/30 uppercase">
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}
