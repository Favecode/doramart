import React, { useState } from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { X, ZoomIn, Share2, Check, Copy, MessageCircle } from 'lucide-react'

const galleryItems = [
  { id: 1, label: 'Signature Martini', price: '₦8,500', src: 'https://www.dashofjazz.com/wp-content/uploads/2024/10/Dash-of-Jazz-Nigerian-Chapman-Drink-9.jpg', alt: 'Signature martini', color: 'from-amber-900 via-yellow-900 to-night-300' },
  { id: 2, label: 'Rose Champagne Tower', price: '₦45,000', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhyEmJKxYm2_PP67pUxloYeRX7e5tu7Z5hg&s', alt: 'Champagne tower', color: 'from-pink-900 via-rose-900 to-night-300' },
  { id: 3, label: 'Tropical Mocktail', price: '₦5,000', src: 'https://images.squarespace-cdn.com/content/v1/54222358e4b0ef23d87a996b/1580196278885-B2D24QBR5DPI0CUTENH2/strawberry.jpg', alt: 'Tropical mocktail', color: 'from-green-900 via-teal-900 to-night-300' },
  { id: 4, label: 'Premium Whiskey', price: '₦12,000', src: 'https://files.selar.co/product-images/2022/products/LolasPatisserie/greek-yoghurt-and-parfait-selar.co-62f3faa38d0c8.jpeg', alt: 'Premium whiskey', color: 'from-yellow-900 via-amber-800 to-night-300' },
  { id: 5, label: 'Fruit Parfait', price: '₦6,500', src: 'https://www.nairaland.com/attachments/19689009_img6365_jpegc4248d041fad01cfe29d86d7c2e07fcb', alt: 'Fruit parfait', color: 'from-red-900 via-orange-900 to-night-300' },
  { id: 6, label: 'Midnight Negroni', price: '₦9,000', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hTUzenf2BdX16Z8bwSheZUeBS4vFJIHxUg&s', alt: 'Midnight Negroni', color: 'from-indigo-900 via-purple-900 to-night-300' },
  { id: 7, label: 'Citrus Spritz', price: '₦7,000', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVK9A8sGF4yU5w0c-J-Fliu0QO9uIDGqX3yw&s', alt: 'Citrus spritz', color: 'from-yellow-800 via-lime-900 to-night-300' },
  { id: 8, label: 'Berry Sangria', price: '₦8,000', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAS5xPRvFT3HHnp0tXYHP1L6vxqMksfEWxwA&s', alt: 'Berry sangria', color: 'from-purple-900 via-pink-900 to-night-300' },
  { id: 9, label: 'Golden Fizz', price: '₦10,500', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKhszwO2ToBNSrgJQhVQKaIfGco2SLBTBIw&s', alt: 'Golden fizz cocktail', color: 'from-yellow-800 via-amber-700 to-night-300' },
]

function ShareMenu({ item, onClose }) {
  const [copied, setCopied] = useState(false)
  const shareText = `Check out ${item.label} at Doramart Cocktail & Drinks — only ${item.price}!`
  const shareUrl = window.location.href

  const handleCopy = async (e) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async (e) => {
    e.stopPropagation()
    if (navigator.share) {
      try { await navigator.share({ title: item.label, text: shareText, url: shareUrl }) } catch (_) {}
    }
    onClose()
  }

  const handleWhatsApp = (e) => {
    e.stopPropagation()
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
    onClose()
  }

  const handleInstagram = (e) => {
    e.stopPropagation()
    window.open('https://instagram.com/doramart_drinks', '_blank')
    onClose()
  }

  return (
    <div
      className="absolute top-12 right-0 z-30 bg-night-200 border border-gold/40 shadow-2xl shadow-black/80 w-52 overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="px-4 py-3 border-b border-gold/15 bg-night-300">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Share This Drink</p>
      </div>

      {typeof navigator !== 'undefined' && navigator.share && (
        <button onClick={handleNativeShare}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left border-b border-gold/10">
          <Share2 size={16} className="text-gold shrink-0" />
          Share via...
        </button>
      )}

      <button onClick={handleWhatsApp}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left border-b border-gold/10">
        <MessageCircle size={16} className="text-green-400 shrink-0" />
        WhatsApp
      </button>

      <button onClick={handleInstagram}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left border-b border-gold/10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ color: '#E1306C' }}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
        </svg>
        Instagram
      </button>

      <button onClick={handleCopy}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left">
        {copied ? <Check size={16} className="text-gold shrink-0" /> : <Copy size={16} className="text-gold shrink-0" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

function GalleryItem({ item, onClick }) {
  const [shareOpen, setShareOpen] = useState(false)

  const handleShare = (e) => {
    e.stopPropagation()
    setShareOpen(prev => !prev)
  }

  return (
    <div
      className="group relative overflow-hidden cursor-pointer bg-night-300"
      style={{ aspectRatio: '4/5' }}
      onClick={() => { if (!shareOpen) onClick(item); setShareOpen(false) }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
      {/* Persistent dark gradient at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

      {/* Share button — top right */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={handleShare}
          className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${shareOpen ? 'bg-gold text-night border-gold' : 'bg-black/50 border-gold/40 text-gold hover:bg-gold/20 hover:border-gold'}`}
        >
          <Share2 size={16} />
        </button>
        {shareOpen && <ShareMenu item={item} onClose={() => setShareOpen(false)} />}
      </div>

      {/* Zoom icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
        <div className="w-14 h-14 border border-gold/50 flex items-center justify-center bg-black/30">
          <ZoomIn size={22} className="text-gold" />
        </div>
      </div>

      {/* Bottom info bar — always visible */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-3" />
        <div className="flex items-end justify-between gap-2">
          <p className="text-sm font-medium text-gold-champagne leading-tight flex-1 min-w-0 truncate">{item.label}</p>
          <span className="font-serif text-lg font-bold text-gold whitespace-nowrap shrink-0">{item.price}</span>
        </div>
      </div>

      {/* Click-outside overlay when share menu open */}
      {shareOpen && (
        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShareOpen(false) }} />
      )}
    </div>
  )
}

function Lightbox({ item, onClose }) {
  const [copied, setCopied] = useState(false)
  if (!item) return null

  const shareText = `Check out ${item.label} at Doramart Cocktail & Drinks — only ${item.price}!`

  const handleWhatsApp = (e) => {
    e.stopPropagation()
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`, '_blank')
  }

  const handleCopy = async (e) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors z-10">
        <X size={20} />
      </button>

      <div
        className="relative w-full max-w-md border border-gold/25 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img src={item.src} alt={item.alt} className="w-full object-cover" style={{ aspectRatio: '4/5', maxHeight: '55vh' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Price overlay on image */}
          <div className="absolute top-4 left-4 bg-black/75 border border-gold/50 px-4 py-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold/70 block leading-none mb-1">Starting from</span>
            <span className="font-serif text-2xl font-bold text-gold">{item.price}</span>
          </div>
        </div>

        {/* Info + share footer */}
        <div className="bg-night-200 border-t border-gold/20 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-base font-medium text-gold-champagne">{item.label}</p>
              <p className="text-xs text-brown-light mt-0.5 tracking-wide">Doramart Cocktail & Drinks</p>
            </div>
            <span className="font-serif text-2xl font-bold text-gold">{item.price}</span>
          </div>

          <div className="h-px bg-gold/10 mb-4" />

          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] uppercase text-brown-light/60 shrink-0">Share:</span>
            <button onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/40 text-green-400 text-xs tracking-wider uppercase hover:bg-green-900/50 transition-colors font-medium">
              <MessageCircle size={14} /> WhatsApp
            </button>
            <button onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/25 text-gold text-xs tracking-wider uppercase hover:bg-gold/20 transition-colors font-medium">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {galleryItems.map(item => (
            <GalleryItem key={item.id} item={item} onClick={setSelected} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-brown-light text-sm tracking-[0.2em] uppercase">
            Follow us on{' '}
            <a href="https://instagram.com/doramart_drinks" target="_blank" rel="noreferrer"
              className="text-gold hover:text-gold-light transition-colors">
              @doramart_drinks
            </a>{' '}
            for more
          </p>
        </div>
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  )
}
