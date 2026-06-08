import React, { useEffect, useState } from 'react'
import Button from './Button'

export default function Hero() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <span className="inline-block text-[10px] tracking-[0.5em] uppercase text-gold font-sans font-medium mb-8 opacity-80">
          Est. 2020 · Lagos, Nigeria
        </span>

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
    </section>
  )
}
