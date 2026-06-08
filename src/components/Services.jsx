import React from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { Wine, Grape, Apple, GlassWater, CalendarDays, Users2 } from 'lucide-react'

const services = [
  {
    icon: Wine,
    title: 'Signature Cocktails',
    description: 'Handcrafted cocktails using premium spirits, fresh ingredients, and artistic techniques. Each drink is a masterpiece.',
    tag: 'Most Popular'
  },
  {
    icon: GlassWater,
    title: 'Mocktails',
    description: 'Sophisticated alcohol-free concoctions packed with flavor — because luxury should be enjoyed by everyone.',
    tag: null
  },
  {
    icon: Apple,
    title: 'Fruits Parfaits',
    description: 'Layered seasonal fruits, cream, and gourmet toppings — the perfect elegant accompaniment to any event.',
    tag: null
  },
  {
    icon: Grape,
    title: 'Bar Services',
    description: 'Full-service mobile bar setup with professional bartenders, premium equipment, and tailored drink menus.',
    tag: 'Full Setup'
  },
  {
    icon: CalendarDays,
    title: 'Event Planning',
    description: 'End-to-end event beverage planning from menu curation to on-site execution with flawless professionalism.',
    tag: null
  },
  {
    icon: Users2,
    title: 'Private Events',
    description: 'Exclusive, intimate experiences designed with discretion, bespoke menus, and white-glove service.',
    tag: 'Premium'
  },
]

function ServiceCard({ icon: Icon, title, description, tag }) {
  return (
    <div className="group relative bg-night-200 border border-gold/10 p-8 transition-all duration-400 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(201,168,76,0.12)] cursor-default">
      {/* Corner accents that appear on hover */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-gold/0 group-hover:border-gold/60 transition-all duration-400" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-gold/0 group-hover:border-gold/60 transition-all duration-400" />

      {tag && (
        <span className="absolute top-4 right-4 text-[9px] tracking-[0.3em] uppercase text-gold bg-gold/10 px-2.5 py-1">
          {tag}
        </span>
      )}

      <div className="mb-5">
        <div className="w-12 h-12 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-400">
          <Icon size={22} className="text-gold group-hover:scale-110 transition-transform duration-400" />
        </div>
      </div>

      <h3 className="font-serif text-xl text-gold-champagne mb-3 group-hover:text-gold transition-colors duration-400">
        {title}
      </h3>
      <p className="text-brown-light text-sm leading-relaxed font-light">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-medium">Learn more</span>
        <div className="h-px w-8 bg-gold" />
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-night">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="What We Offer"
          title="Crafted for Every Occasion"
          subtitle="From intimate gatherings to grand celebrations, our services are designed to make every moment unforgettable."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </SectionWrapper>
  )
}
