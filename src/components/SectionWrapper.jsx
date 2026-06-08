import React from 'react'

export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative py-24 px-6 md:px-12 lg:px-24 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      {eyebrow && (
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-4xl md:text-5xl text-gold-champagne leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brown-light text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}
