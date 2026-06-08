import React, { useState } from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { X, ZoomIn } from 'lucide-react'

// Realistic cocktail & drinks gallery items using gradient placeholders
const galleryItems = [
  { id: 1, label: 'Signature Martini', color: 'from-amber-900 via-yellow-900 to-night-300', accent: 'rgba(180,120,30,0.4)' },
  { id: 2, label: 'Rose Champagne Tower', color: 'from-pink-900 via-rose-900 to-night-300', accent: 'rgba(180,60,80,0.3)' },
  { id: 3, label: 'Tropical Mocktail', color: 'from-green-900 via-teal-900 to-night-300', accent: 'rgba(30,120,90,0.4)' },
  { id: 4, label: 'Premium Whiskey', color: 'from-yellow-900 via-amber-800 to-night-300', accent: 'rgba(160,90,20,0.4)' },
  { id: 5, label: 'Fruit Parfait', color: 'from-red-900 via-orange-900 to-night-300', accent: 'rgba(180,60,30,0.4)' },
  { id: 6, label: 'Midnight Negroni', color: 'from-indigo-900 via-purple-900 to-night-300', accent: 'rgba(80,40,140,0.4)' },
  { id: 7, label: 'Citrus Spritz', color: 'from-yellow-800 via-lime-900 to-night-300', accent: 'rgba(140,140,20,0.4)' },
  { id: 8, label: 'Berry Sangria', color: 'from-purple-900 via-pink-900 to-night-300', accent: 'rgba(120,40,100,0.4)' },
  { id: 9, label: 'Golden Fizz', color: 'from-yellow-800 via-amber-700 to-night-300', accent: 'rgba(200,150,20,0.5)' },
]

function GalleryItem({ item, onClick }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer aspect-square bg-night-300"
      onClick={() => onClick(item)}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-700 group-hover:scale-110`} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at center, ${item.accent} 0%, transparent 70%)` }} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-night/40 group-hover:bg-night/20 transition-colors duration-400" />

      {/* Cocktail glass silhouette decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-400">
        <div className="w-16 h-20 border-2 border-gold-champagne rounded-t-full" />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
        <ZoomIn size={28} className="text-gold mb-3" />
        <span className="text-gold-champagne text-xs tracking-[0.25em] uppercase font-medium text-center px-4">{item.label}</span>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-2" />
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-gold font-medium">{item.label}</p>
      </div>
    </div>
  )
}

function Lightbox({ item, onClose }) {
  if (!item) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
      >
        <X size={18} />
      </button>
      <div
        className="relative w-full max-w-lg mx-6 border border-gold/20 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className={`aspect-square bg-gradient-to-br ${item.color} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-night/30" />
          <div className="relative text-center px-8">
            <div className="w-px h-16 bg-gold/30 mx-auto mb-4" />
            <p className="font-serif italic text-gold-champagne/80 text-2xl">{item.label}</p>
            <div className="w-px h-16 bg-gold/30 mx-auto mt-4" />
          </div>
        </div>
        <div className="bg-night-200 border-t border-gold/20 p-4 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-medium">{item.label}</p>
          <p className="text-brown-light text-xs mt-1">Doramart Cocktail & Drinks</p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <SectionWrapper id="gallery" className="bg-night">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Gallery"
          title="Moments Crafted in Every Glass"
          subtitle="A visual journey through the drinks, events, and experiences we've created."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map(item => (
            <GalleryItem key={item.id} item={item} onClick={setSelected} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-brown-light text-xs tracking-[0.3em] uppercase">
            Follow us on <a href="#" className="text-gold hover:text-gold-light transition-colors">@doramart_drinks</a> for more
          </p>
        </div>
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  )
}
