import React, { useEffect, useState } from 'react'
import Button from './Button'

const WHATSAPP_NUMBER = '2347070646467' // international format, no +
const WHATSAPP_MESSAGE = encodeURIComponent('Hello Doramart! I\'d like to make an enquiry.')

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const [waBounce, setWaBounce] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Gentle bounce every 4 seconds to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      setWaBounce(true)
      setTimeout(() => setWaBounce(false), 700)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      <img
        src="https://images.unsplash.com/photo-1485792533214-9e7b283f557c?auto=format&fit=crop&w=1800&q=80"
        alt="Cocktail bar ambience"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
      />

      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-night via-night-200 to-brown-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(74,55,40,0.4)_0%,transparent_50%)]" />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/8 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/10 pointer-events-none" />

      {/* Vertical accent lines */}
      <div className="absolute left-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />
      <div className="absolute right-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-2">
          <span className="font-serif text-gold/30 text-xl md:text-2xl italic tracking-wider">The Art of</span>
        </div>

        <h1 className="font-serif font-bold leading-none mb-4">
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl gold-text tracking-tight">Doramart</span>
          <span className="block text-lg sm:text-2xl md:text-3xl text-gold-champagne/90 tracking-[0.15em] font-light mt-2">
            Cocktail <span className="text-gold/50 mx-3 font-serif italic">&</span> Drinks
          </span>
        </h1>

        <div className="my-8 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="font-serif italic text-gold-champagne/70 text-lg md:text-xl tracking-wide">
            Sip. Savor. Celebrate Life.
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <p className="text-brown-light font-light text-sm md:text-base max-w-md mx-auto leading-relaxed mb-12 tracking-wide">
          Premium cocktail experiences crafted for those who appreciate the finer things — from intimate gatherings to grand celebrations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#booking" variant="primary">Book an Event</Button>
          <Button href="#services" variant="outline">View Services</Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>

      {/* ── Floating WhatsApp Button ── */}
      {/* Fixed to bottom-right, visible on every section of the page */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 group transition-transform duration-300 ${waBounce ? 'translate-y-[-6px]' : 'translate-y-0'}`}
      >
        {/* Tooltip label — slides in on hover */}
        <span className="
          hidden sm:flex items-center
          bg-[#075E54] text-white text-xs font-medium tracking-wide
          px-3 py-1.5 rounded-sm shadow-lg
          opacity-0 group-hover:opacity-100
          translate-x-2 group-hover:translate-x-0
          transition-all duration-300 pointer-events-none
          whitespace-nowrap
        ">
          Chat with us
        </span>

        {/* Icon button */}
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)] flex items-center justify-center hover:scale-110 transition-transform duration-300">
          {/* Outer pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          {/* WhatsApp SVG icon */}
          <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.347.636 4.609 1.84 6.587L2.667 29.333l6.933-1.813A13.267 13.267 0 0 0 16.003 29.333c7.364 0 13.33-5.97 13.33-13.333 0-7.364-5.966-13.333-13.33-13.333zm0 24.267a11.04 11.04 0 0 1-5.627-1.547l-.403-.24-4.117 1.08 1.097-4.003-.264-.413A11.04 11.04 0 0 1 4.936 16c0-6.107 4.96-11.067 11.067-11.067S27.067 9.893 27.067 16 22.11 26.934 16.003 26.934zm6.08-8.294c-.333-.166-1.97-.973-2.276-1.083-.306-.11-.53-.167-.753.167-.224.333-.863 1.083-1.057 1.306-.194.224-.39.25-.723.084-.333-.167-1.407-.52-2.68-1.654-.99-.883-1.657-1.973-1.853-2.307-.194-.333-.02-.513.147-.68.15-.15.333-.39.5-.583.167-.194.223-.334.333-.557.11-.223.057-.417-.027-.583-.083-.167-.753-1.817-1.033-2.487-.273-.653-.55-.563-.753-.573-.194-.01-.417-.013-.64-.013-.223 0-.583.083-.89.417-.306.333-1.167 1.14-1.167 2.78s1.194 3.226 1.36 3.45c.167.223 2.35 3.59 5.693 5.033.797.344 1.417.55 1.9.703.797.254 1.524.218 2.097.133.64-.094 1.97-.806 2.247-1.584.277-.777.277-1.443.194-1.583-.083-.14-.307-.224-.64-.39z"/>
          </svg>
        </div>
      </a>

    </section>
  )
}
