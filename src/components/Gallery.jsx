import React, { useState } from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { X, ZoomIn } from 'lucide-react'

// Realistic cocktail & drinks gallery items using gradient placeholders
const galleryItems = [
  { id: 1, label: 'Signature Martini', src: 'https://www.dashofjazz.com/wp-content/uploads/2024/10/Dash-of-Jazz-Nigerian-Chapman-Drink-9.jpg', alt: 'Signature martini', color: 'from-amber-900 via-yellow-900 to-night-300' },
  { id: 2, label: 'Rose Champagne Tower', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhyEmJKxYm2_PP67pUxloYeRX7e5tu7Z5hg&s', alt: 'Champagne tower', color: 'from-pink-900 via-rose-900 to-night-300' },
  { id: 3, label: 'Tropical Mocktail', src: 'https://images.squarespace-cdn.com/content/v1/54222358e4b0ef23d87a996b/1580196278885-B2D24QBR5DPI0CUTENH2/strawberry.jpg', alt: 'Tropical mocktail', color: 'from-green-900 via-teal-900 to-night-300' },
  { id: 4, label: 'Premium Whiskey', src: 'https://files.selar.co/product-images/2022/products/LolasPatisserie/greek-yoghurt-and-parfait-selar.co-62f3faa38d0c8.jpeg', alt: 'Premium whiskey', color: 'from-yellow-900 via-amber-800 to-night-300' },
  { id: 5, label: 'Fruit Parfait', src: 'https://www.nairaland.com/attachments/19689009_img6365_jpegc4248d041fad01cfe29d86d7c2e07fcb', alt: 'Fruit parfait', color: 'from-red-900 via-orange-900 to-night-300' },
  { id: 6, label: 'Midnight Negroni', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hTUzenf2BdX16Z8bwSheZUeBS4vFJIHxUg&s', alt: 'Midnight Negroni', color: 'from-indigo-900 via-purple-900 to-night-300' },
  { id: 7, label: 'Citrus Spritz', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVK9A8sGF4yU5w0c-J-Fliu0QO9uIDGqX3yw&s', alt: 'Citrus spritz', color: 'from-yellow-800 via-lime-900 to-night-300' },
  { id: 8, label: 'Berry Sangria', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAS5xPRvFT3HHnp0tXYHP1L6vxqMksfEWxwA&s', alt: 'Berry sangria', color: 'from-purple-900 via-pink-900 to-night-300' },
  { id: 9, label: 'Golden Fizz', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKhszwO2ToBNSrgJQhVQKaIfGco2SLBTBIw&s', alt: 'Golden fizz cocktail', color: 'from-yellow-800 via-amber-700 to-night-300' },
]

function GalleryItem({ item, onClick }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer aspect-square bg-night-300"
      onClick={() => onClick(item)}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 transition-transform duration-700 group-hover:scale-105`} />
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
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full object-cover aspect-square"
        />
        <div className="absolute inset-0 bg-night/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <div className="w-px h-16 bg-gold/30 mx-auto mb-4" />
          <p className="font-serif italic text-gold-champagne/80 text-2xl">{item.label}</p>
          <div className="w-px h-16 bg-gold/30 mx-auto mt-4" />
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
