import React from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { Heart, Crown, Briefcase, Lock, Megaphone } from 'lucide-react'

const events = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Toast to forever with exquisite signature cocktails and champagne service. We craft custom drink menus to match your love story.',
    number: '01',
    src: 'https://pictures-nigeria.jijistatic.net/123053192_NzIwLTcyMC1hNTkyZjM3Yjdm.webp'
  },
  {
    icon: Crown,
    title: 'Birthdays',
    description: 'Make your milestone moments shine with personalized cocktail bars, festive mocktails, and beautiful fruit displays.',
    number: '02',
    src: 'https://pictures-nigeria.jijistatic.net/109539092_NjkzLTc1OS1kYjQxM2QzZjQwLTE.webp'
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    description: 'Impress clients and reward teams with sophisticated bar service and curated drink selections that reflect your brand.',
    number: '03',
    src: 'https://naphtalirentals.com/wp-content/uploads/2019/08/40098555_235944060427640_1832242098263161353_n.jpg'
  },
  {
    icon: Lock,
    title: 'Private Parties',
    description: 'Invite-only exclusivity meets premium hospitality. We bring the luxury lounge experience directly to your space.',
    number: '04',
    src: 'https://cms.forbesafrica.com/wp-content/uploads/2025/02/GettyImages-521899444.jpg'
  },
  {
    icon: Megaphone,
    title: 'Brand Activations',
    description: 'Create buzz and memorable interactions with branded cocktail stations, customized menus, and immersive drink experiences.',
    number: '05',
    src: 'https://www.exposebrands.com/wp-content/uploads/2025/07/IMG_7436-1536x1024.jpg'
  },
]

function EventCard({ icon: Icon, title, description, number, src }) {
  return (
    <div className="group relative bg-night-100 border border-gold/10 hover:bg-night-200 hover:border-gold/30 transition-all duration-400 cursor-default overflow-hidden">
      {src && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={src} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-night/50 group-hover:bg-night/30 transition-colors duration-400" />
        </div>
      )}
      <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-400">
          <Icon size={22} className="text-gold" />
        </div>
        <span className="font-serif text-5xl text-gold/8 group-hover:text-gold/15 transition-colors duration-400 font-bold leading-none">
          {number}
        </span>
      </div>
      <h3 className="font-serif text-2xl text-gold-champagne mb-3 group-hover:text-gold transition-colors duration-400">
        {title}
      </h3>
      <p className="text-brown-light text-sm leading-relaxed font-light">
        {description}
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/0 via-gold/0 to-gold/0 group-hover:via-gold/40 transition-all duration-400" />
      </div>
    </div>
  )
}

export default function Events() {
  return (
    <SectionWrapper id="events" className="bg-night-100">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Events We Serve"
          title="Every Celebration Deserves Perfection"
          subtitle="We specialize in elevating every type of gathering with premium bar services and unforgettable drink experiences."
        />

        {/* Large feature card + grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(e => <EventCard key={e.title} {...e} />)}

          {/* CTA card */}
          <div className="relative bg-gradient-to-br from-gold/15 via-gold/8 to-transparent border border-gold/30 p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.15)_0%,transparent_60%)]" />
            <div className="relative">
              <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-medium">Don't see yours?</span>
              <h3 className="font-serif text-2xl text-gold-champagne mt-3 mb-3">We Handle Custom Events Too</h3>
              <p className="text-brown-light text-sm leading-relaxed font-light">
                Every gathering is unique. Reach out and let us design a bespoke beverage experience tailored to your vision.
              </p>
            </div>
            <a href="#booking" className="relative mt-8 inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-gold font-medium group">
              <span>Get in Touch</span>
              <div className="h-px w-8 bg-gold group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </SectionWrapper>
  )
}