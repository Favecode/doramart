import React, { useState } from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { X, ZoomIn, Share2, Check, Copy, MessageCircle, Download, Loader2 } from 'lucide-react'

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

// Draws the image onto a canvas with branded overlay, returns a File blob
async function buildShareImage(item) {
  // Fetch image through a CORS proxy so canvas doesn't get tainted
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(item.src)}`
  const resp = await fetch(proxyUrl)
  const blob = await resp.blob()
  const imgBitmap = await createImageBitmap(blob)

  const SIZE = 1080
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')

  // Draw image, cover-fit
  const scale = Math.max(SIZE / imgBitmap.width, SIZE / imgBitmap.height)
  const w = imgBitmap.width * scale
  const h = imgBitmap.height * scale
  ctx.drawImage(imgBitmap, (SIZE - w) / 2, (SIZE - h) / 2, w, h)

  // Dark gradient overlay (bottom 40%)
  const grad = ctx.createLinearGradient(0, SIZE * 0.55, 0, SIZE)
  grad.addColorStop(0, 'rgba(10,8,6,0)')
  grad.addColorStop(1, 'rgba(10,8,6,0.92)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Gold divider line
  const lineGrad = ctx.createLinearGradient(60, 0, SIZE - 60, 0)
  lineGrad.addColorStop(0, 'rgba(201,168,76,0)')
  lineGrad.addColorStop(0.5, 'rgba(201,168,76,0.8)')
  lineGrad.addColorStop(1, 'rgba(201,168,76,0)')
  ctx.fillStyle = lineGrad
  ctx.fillRect(60, SIZE - 230, SIZE - 120, 1)

  // Drink name
  ctx.fillStyle = '#F5E6C8'
  ctx.font = `bold 52px Georgia, serif`
  ctx.textAlign = 'left'
  ctx.fillText(item.label, 60, SIZE - 175)

  // Price
  ctx.fillStyle = '#C9A84C'
  ctx.font = `bold 48px Georgia, serif`
  ctx.fillText(item.price, 60, SIZE - 112)

  // Brand name
  ctx.fillStyle = 'rgba(201,168,76,0.7)'
  ctx.font = `300 28px Georgia, serif`
  ctx.fillText('Doramart Cocktail & Drinks', 60, SIZE - 58)

  // Top-left logo mark
  ctx.fillStyle = 'rgba(201,168,76,0.9)'
  ctx.font = `italic 30px Georgia, serif`
  ctx.textAlign = 'left'
  ctx.fillText('Doramart', 40, 60)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob], `doramart-${item.label.replace(/\s+/g, '-').toLowerCase()}.jpg`, { type: 'image/jpeg' }))
    }, 'image/jpeg', 0.92)
  })
}

function ShareMenu({ item, onClose }) {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const shareText = `✨ ${item.label} — ${item.price}\n\nOrder from Doramart Cocktail & Drinks 🍹\n📞 +234 800 000 0000\n📸 @doramart_drinks`

  const getImageFile = async () => {
    setLoading(true)
    setError('')
    try {
      const file = await buildShareImage(item)
      return file
    } catch (e) {
      setError('Could not load image. Try "Download" instead.')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Native share WITH image file (works on mobile: WhatsApp, IG, etc.)
  const handleNativeShare = async (e) => {
    e.stopPropagation()
    const file = await getImageFile()
    if (!file) return
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
      } else if (navigator.share) {
        await navigator.share({ text: shareText, url: window.location.href })
      }
    } catch (_) {}
    onClose()
  }

  // WhatsApp: share image file via native share targeted to WhatsApp
  const handleWhatsApp = async (e) => {
    e.stopPropagation()
    const file = await getImageFile()
    if (!file) return
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
      } else {
        // Desktop fallback: open WhatsApp web with text
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      }
    } catch (_) {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
    }
    onClose()
  }

  // Instagram: share image file via native share (routes to IG on mobile)
  const handleInstagram = async (e) => {
    e.stopPropagation()
    const file = await getImageFile()
    if (!file) return
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
      } else {
        window.open('https://instagram.com/doramart_drinks', '_blank')
      }
    } catch (_) {}
    onClose()
  }

  // Download the branded image
  const handleDownload = async (e) => {
    e.stopPropagation()
    const file = await getImageFile()
    if (!file) return
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
    onClose()
  }

  const handleCopyText = async (e) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const Row = ({ onClick, icon, label, sublabel }) => (
    <button onClick={onClick} disabled={loading}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left border-b border-gold/10 disabled:opacity-50">
      <span className="shrink-0">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        {sublabel && <span className="text-[10px] text-brown-light/50 mt-0.5">{sublabel}</span>}
      </span>
    </button>
  )

  return (
    <div className="absolute top-12 right-0 z-30 bg-night-200 border border-gold/40 shadow-2xl shadow-black/80 w-60 overflow-hidden"
      onClick={e => e.stopPropagation()}>
      <div className="px-4 py-3 border-b border-gold/15 bg-night-300 flex items-center justify-between">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Share with Image</p>
        {loading && <Loader2 size={14} className="text-gold animate-spin" />}
      </div>

      {error && <p className="text-xs text-red-400 px-4 py-2 bg-red-900/10 border-b border-red-800/20">{error}</p>}

      <Row onClick={handleWhatsApp}
        icon={<MessageCircle size={16} className="text-green-400" />}
        label="WhatsApp"
        sublabel="Sends image + caption" />

      <Row onClick={handleInstagram}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#E1306C' }}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
          </svg>
        }
        label="Instagram"
        sublabel="Sends image to share sheet" />

      <Row onClick={handleNativeShare}
        icon={<Share2 size={16} className="text-gold" />}
        label="More apps..."
        sublabel="Share image to any app" />

      <Row onClick={handleDownload}
        icon={<Download size={16} className="text-gold" />}
        label="Save Image"
        sublabel="Download branded photo" />

      <button onClick={handleCopyText} disabled={loading}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left disabled:opacity-50">
        {copied ? <Check size={16} className="text-gold shrink-0" /> : <Copy size={16} className="text-gold shrink-0" />}
        <span className="flex flex-col leading-tight">
          <span>{copied ? 'Copied!' : 'Copy Caption'}</span>
          <span className="text-[10px] text-brown-light/50 mt-0.5">Text only</span>
        </span>
      </button>
    </div>
  )
}

function GalleryItem({ item, onClick }) {
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <div
      className="group relative overflow-hidden cursor-pointer bg-night-300"
      style={{ aspectRatio: '4/5' }}
      onClick={() => { if (!shareOpen) onClick(item); setShareOpen(false) }}
    >
      <img src={item.src} alt={item.alt} loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

      {/* Share button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); setShareOpen(p => !p) }}
          className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${shareOpen ? 'bg-gold text-night border-gold' : 'bg-black/50 border-gold/40 text-gold hover:bg-gold/20 hover:border-gold'}`}>
          <Share2 size={16} />
        </button>
        {shareOpen && <ShareMenu item={item} onClose={() => setShareOpen(false)} />}
      </div>

      {/* Zoom on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
        <div className="w-14 h-14 border border-gold/50 flex items-center justify-center bg-black/30">
          <ZoomIn size={22} className="text-gold" />
        </div>
      </div>

      {/* Bottom label + price */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-3" />
        <div className="flex items-end justify-between gap-2">
          <p className="text-sm font-medium text-gold-champagne leading-tight flex-1 min-w-0 truncate">{item.label}</p>
          <span className="font-serif text-lg font-bold text-gold whitespace-nowrap shrink-0">{item.price}</span>
        </div>
      </div>

      {shareOpen && (
        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShareOpen(false) }} />
      )}
    </div>
  )
}

function Lightbox({ item, onClose }) {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  if (!item) return null

  const shareText = `✨ ${item.label} — ${item.price}\n\nOrder from Doramart Cocktail & Drinks 🍹\n📞 +234 800 000 0000\n📸 @doramart_drinks`

  const getFile = async () => {
    setLoading(true)
    try { return await buildShareImage(item) }
    catch { return null }
    finally { setLoading(false) }
  }

  const handleWhatsApp = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text: shareText }); return } catch (_) {}
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  }

  const handleDownload = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url; a.download = file.name; a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async (e) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm p-4" onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors z-10">
        <X size={20} />
      </button>

      <div className="relative w-full max-w-md border border-gold/25 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={item.src} alt={item.alt} className="w-full object-cover" style={{ aspectRatio: '4/5', maxHeight: '55vh' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute top-4 left-4 bg-black/75 border border-gold/50 px-4 py-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold/70 block leading-none mb-1">Starting from</span>
            <span className="font-serif text-2xl font-bold text-gold">{item.price}</span>
          </div>
        </div>

        <div className="bg-night-200 border-t border-gold/20 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-base font-medium text-gold-champagne">{item.label}</p>
              <p className="text-xs text-brown-light mt-0.5 tracking-wide">Doramart Cocktail & Drinks</p>
            </div>
            <span className="font-serif text-2xl font-bold text-gold">{item.price}</span>
          </div>

          <div className="h-px bg-gold/10 mb-4" />

          <p className="text-xs text-brown-light/50 mb-3 tracking-wide">Share with image:</p>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={handleWhatsApp} disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-900/30 border border-green-700/40 text-green-400 text-xs tracking-wider uppercase hover:bg-green-900/50 transition-colors font-medium disabled:opacity-50">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <MessageCircle size={14} />}
              WhatsApp
            </button>
            <button onClick={handleDownload} disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-gold/10 border border-gold/25 text-gold text-xs tracking-wider uppercase hover:bg-gold/20 transition-colors font-medium disabled:opacity-50">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Save
            </button>
            <button onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 bg-night-300 border border-gold/15 text-gold-champagne/70 text-xs tracking-wider uppercase hover:bg-gold/10 transition-colors font-medium">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Caption'}
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
