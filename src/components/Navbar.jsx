import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#booking' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navOpaque = scrolled || open

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navOpaque ? 'py-3 bg-night/95 backdrop-blur-md border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col">
          <span className="font-serif text-xl md:text-2xl gold-text tracking-wide leading-none">Doramart</span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-gold/60 font-sans mt-0.5">Cocktail & Drinks</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="text-xs tracking-[0.2em] uppercase text-gold-champagne/70 hover:text-gold transition-colors duration-300 font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#booking" className="hidden md:inline-flex items-center px-6 py-2.5 text-xs tracking-[0.2em] uppercase border border-gold text-gold hover:bg-gold hover:text-night transition-all duration-300 font-medium">
          Book Now
        </a>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gold p-1">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-400 ${open ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-night/98 border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="text-xs tracking-[0.25em] uppercase text-gold-champagne/80 hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)}
            className="mt-2 text-center px-6 py-3 text-xs tracking-[0.2em] uppercase border border-gold text-gold hover:bg-gold hover:text-night transition-all duration-300">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  )
}
