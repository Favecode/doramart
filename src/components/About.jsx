import React from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { Award, Star, Users } from 'lucide-react'
import herImage from '../assets/Her.jpg'

const stats = [
  { icon: Award, label: 'Years of Excellence', value: '5+' },
  { icon: Star, label: 'Events Served', value: '800+' },
  { icon: Users, label: 'Happy Clients', value: '2K+' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-night-100">
      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div className="relative">
            {/* Outer gold frame */}
            <div className="absolute -inset-3 border border-gold/20 rounded-sm" />

            {/* Inner image container */}
            <div className="relative overflow-hidden rounded-sm aspect-[4/5] bg-night-300">
              <img
                src={herImage} // ✅ IMAGE ADDED HERE
                alt="Premium wine presentation"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-night/40" />
              <div className="absolute inset-0 bg-gradient-to-br from-brown-dark via-night-300 to-night-400 mix-blend-soft-light" />

              {/* {/* Decorative glassware silhouettes */}
              <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-20">
                <div className="flex gap-8 items-end">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-1 h-20 bg-gold-champagne" />
                    <div className="w-10 h-px bg-gold-champagne" />
                    <div className="w-14 h-16 bg-gold-champagne rounded-b-full" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-1 h-24 bg-gold-champagne" />
                    <div className="w-10 h-px bg-gold-champagne" />
                    <div className="border-l-[20px] border-r-[20px] border-t-[50px] border-l-transparent border-r-transparent border-t-gold-champagne" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-1 h-16 bg-gold-champagne" />
                    <div className="w-8 h-px bg-gold-champagne" />
                    <div className="border-l-[16px] border-r-[16px] border-t-[40px] border-l-transparent border-r-transparent border-t-gold-champagne" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-1 h-20 bg-gold-champagne" />
                    <div className="w-12 h-px bg-gold-champagne" />
                    <div className="border-l-[24px] border-r-[24px] border-t-[60px] border-l-transparent border-r-transparent border-t-gold-champagne" />
                  </div>
                </div>
              </div>

              {/* Center text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="font-serif italic text-gold/40 text-4xl mb-3">"</div>
                  <p className="font-serif italic text-gold-champagne/60 text-lg leading-relaxed">
                    Where every pour tells a story
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-night-200 border border-gold/30 p-5 shadow-xl">
              <div className="text-center">
                <span className="block font-serif text-3xl gold-text font-bold">5★</span>
                <span className="block text-[9px] tracking-[0.3em] uppercase text-brown-light mt-1">
                  Rated Experience
                </span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-gold-champagne leading-tight mb-6">
              We Don't Just Serve Drinks,{' '}
              <em className="text-gold not-italic">We Create Experiences.</em>
            </h2>

            <div className="w-16 h-px bg-gold/50 mb-8" />

            <p className="text-brown-light leading-relaxed mb-5 font-light text-sm md:text-base">
              Founded with a passion for craftsmanship and an eye for elegance, Doramart Cocktail & Drinks has redefined what it means to host in style.
            </p>

            <p className="text-brown-light leading-relaxed mb-10 font-light text-sm md:text-base">
              Our master mixologists blend rare spirits, fresh botanicals, and artistic flair to produce cocktails that become the centerpiece of every memory.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gold/15">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="text-gold mx-auto mb-2 opacity-80" />
                  <div className="font-serif text-2xl gold-text font-bold">{value}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-brown-light mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </SectionWrapper>
  )
}
