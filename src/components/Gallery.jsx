import React, { useState } from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { X, ZoomIn, Share2, Check, Copy, MessageCircle, Download, Loader2 } from 'lucide-react'

// Local product images — place these in src/assets/
import product1 from '../assets/Product1.jpg'
import product2 from '../assets/Product2.jpg'
import product3 from '../assets/Product3.jpg'
import product4 from '../assets/Product4.jpg'
import product5 from '../assets/Product5.jpg'
import product6 from '../assets/Product6.jpg'
import birthday from '../assets/birthday.jpg'

const galleryItems = [
  { id: 1, label: 'Raspberry Mix',    price: '₦3,500',  src: product1, alt: 'Raspberry mix',     color: 'from-amber-900 via-yellow-900 to-night-300' },
  { id: 2, label: 'Tequila Sunrise', price: '₦3,500', src: product2, alt: 'Tequila sunrise',        color: 'from-pink-900 via-rose-900 to-night-300'   },
  { id: 3, label: 'Pouch Cocktail/Mocktail',    price: '₦3,000',  src: product3, alt: 'Pouch cocktail/mocktail',      color: 'from-green-900 via-teal-900 to-night-300'  },
  { id: 4, label: 'Milkshake',      price: '₦5,000', src: product4, alt: 'Milkshake',        color: 'from-yellow-900 via-amber-800 to-night-300'},
  { id: 5, label: ' Fruit Salad',     price: '₦2,000',  src: product5, alt: 'Fruit salad',       color: 'from-indigo-900 via-purple-900 to-night-300'},
  { id: 6, label: 'Frozen Blue Moon',          price: '₦5,000', src: product6, alt: 'Frozen blue moon',   color: 'from-yellow-800 via-amber-700 to-night-300'},
  { id: 7, label: 'Parfait',          price: '₦2,000', src: birthday, alt: 'Birthday parfait',   color: 'from-yellow-800 via-amber-700 to-night-300'},
]

// ─── Canvas branding ──────────────────────────────────────────────────────────
// Draws the local product image onto a 1080×1080 canvas with a Doramart
// branded overlay, then resolves to a File blob for the Web Share API.
// Local assets are same-origin so the canvas is never tainted.

async function buildShareImage(item) {
  const img = new Image()
  img.src = item.src

  await new Promise((resolve, reject) => {
    img.onload  = resolve
    img.onerror = () => reject(new Error('Image failed to load'))
  })

  const SIZE = 1080
  const canvas = document.createElement('canvas')
  canvas.width  = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')

  // Cover-fit
  const scale = Math.max(SIZE / img.naturalWidth, SIZE / img.naturalHeight)
  const w = img.naturalWidth  * scale
  const h = img.naturalHeight * scale
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h)

  // Dark gradient overlay (bottom 45%)
  const grad = ctx.createLinearGradient(0, SIZE * 0.52, 0, SIZE)
  grad.addColorStop(0, 'rgba(10,8,6,0)')
  grad.addColorStop(1, 'rgba(10,8,6,0.93)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Gold divider line
  const lineGrad = ctx.createLinearGradient(60, 0, SIZE - 60, 0)
  lineGrad.addColorStop(0,   'rgba(201,168,76,0)')
  lineGrad.addColorStop(0.5, 'rgba(201,168,76,0.8)')
  lineGrad.addColorStop(1,   'rgba(201,168,76,0)')
  ctx.fillStyle = lineGrad
  ctx.fillRect(60, SIZE - 235, SIZE - 120, 1)

  // Drink name
  ctx.fillStyle = '#F5E6C8'
  ctx.font      = 'bold 54px Georgia, serif'
  ctx.textAlign = 'left'
  ctx.fillText(item.label, 60, SIZE - 178)

  // Price
  ctx.fillStyle = '#C9A84C'
  ctx.font      = 'bold 48px Georgia, serif'
  ctx.fillText(item.price, 60, SIZE - 115)

  // Brand name
  ctx.fillStyle = 'rgba(201,168,76,0.7)'
  ctx.font      = '300 28px Georgia, serif'
  ctx.fillText('Doramart Cocktail & Drinks', 60, SIZE - 60)

  // Top-left logo mark
  ctx.fillStyle = 'rgba(201,168,76,0.9)'
  ctx.font      = 'italic 30px Georgia, serif'
  ctx.fillText('Doramart', 40, 60)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error('Canvas toBlob failed')); return }
      resolve(new File(
        [blob],
        `doramart-${item.label.replace(/\s+/g, '-').toLowerCase()}.jpg`,
        { type: 'image/jpeg' }
      ))
    }, 'image/jpeg', 0.92)
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Try native share with a file; fall back to text-only share; then to a URL.
async function nativeShareWithFile(file, text, fallbackUrl) {
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); return 'file' } catch (err) {
      if (err.name === 'AbortError') return 'abort'
    }
  }
  if (navigator.share) {
    try { await navigator.share({ text, url: fallbackUrl }); return 'text' } catch (err) {
      if (err.name === 'AbortError') return 'abort'
    }
  }
  return 'unsupported'
}

// ─── Share Menu ───────────────────────────────────────────────────────────────

function ShareMenu({ item, onClose }) {
  const [loading, setLoading] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const [error,   setError]   = useState('')

  const shareText = `✨ ${item.label} — ${item.price}\n\nOrder from Doramart Cocktail & Drinks 🍹\n📞 +234 800 000 0000\n📸 @doramart_drinks`

  const getFile = async () => {
    setLoading(true)
    setError('')
    try   { return await buildShareImage(item) }
    catch (e) { console.error(e); setError('Image build failed. Try "Save Image" instead.'); return null }
    finally   { setLoading(false) }
  }

  // ── WhatsApp ────────────────────────────────────────────────────────────────
  // Mobile: Web Share API → OS share sheet → user picks WhatsApp (image + caption)
  // Desktop: wa.me deep-link (text caption only — WhatsApp Web can't receive files)
  const handleWhatsApp = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return

    const result = await nativeShareWithFile(file, shareText, window.location.href)
    if (result === 'unsupported' || result === 'file' === false) {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
    }
    if (result !== 'abort') onClose()
  }

  // ── Instagram ───────────────────────────────────────────────────────────────
  // Mobile: Web Share API with image file → user picks Instagram from sheet
  // Desktop: opens instagram.com profile (IG has no web upload share target)
  const handleInstagram = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return

    const result = await nativeShareWithFile(file, shareText, window.location.href)
    if (result === 'unsupported') {
      window.open('https://instagram.com/doramart_cocktail_and_drinks', '_blank')
    }
    if (result !== 'abort') onClose()
  }

  // ── More apps (generic native share) ────────────────────────────────────────
  // Opens OS share sheet with image attached — user picks any installed app.
  const handleMoreApps = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return

    const result = await nativeShareWithFile(file, shareText, window.location.href)
    if (result === 'unsupported') {
      // Last resort: copy caption so the user has something useful
      await navigator.clipboard.writeText(shareText).catch(() => {})
      setError('Your browser can\'t open a share sheet. Caption copied!')
      return
    }
    if (result !== 'abort') onClose()
  }

  // ── Download ─────────────────────────────────────────────────────────────────
  const handleDownload = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return
    const url = URL.createObjectURL(file)
    const a   = document.createElement('a')
    a.href = url; a.download = file.name; a.click()
    URL.revokeObjectURL(url)
    onClose()
  }

  // ── Copy caption ─────────────────────────────────────────────────────────────
  const handleCopyText = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Clipboard access denied.')
    }
  }

  const Row = ({ onClick, icon, label, sublabel }) => (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left border-b border-gold/10 disabled:opacity-50"
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        {sublabel && <span className="text-[10px] text-brown-light/50 mt-0.5">{sublabel}</span>}
      </span>
    </button>
  )

  return (
    <div
      className="absolute top-12 right-0 z-30 bg-night-200 border border-gold/40 shadow-2xl shadow-black/80 w-64 overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gold/15 bg-night-300 flex items-center justify-between">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Share with Image</p>
        {loading && <Loader2 size={14} className="text-gold animate-spin" />}
      </div>

      {error && (
        <p className="text-xs text-red-400 px-4 py-2 bg-red-900/10 border-b border-red-800/20">{error}</p>
      )}

      {/* WhatsApp */}
      <Row
        onClick={handleWhatsApp}
        icon={<MessageCircle size={16} className="text-green-400" />}
        label="WhatsApp"
        sublabel="Sends image + caption"
      />

      {/* Instagram */}
      <Row
        onClick={handleInstagram}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#E1306C' }}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
          </svg>
        }
        label="Instagram"
        sublabel="Sends image to share sheet"
      />

      {/* More apps */}
      <Row
        onClick={handleMoreApps}
        icon={<Share2 size={16} className="text-gold" />}
        label="More apps..."
        sublabel="Share image to any app"
      />

      {/* Download */}
      <Row
        onClick={handleDownload}
        icon={<Download size={16} className="text-gold" />}
        label="Save Image"
        sublabel="Download branded photo"
      />

      {/* Copy caption */}
      <button
        onClick={handleCopyText}
        disabled={loading}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-gold-champagne/80 hover:bg-gold/10 hover:text-gold transition-colors text-left disabled:opacity-50"
      >
        {copied
          ? <Check size={16} className="text-gold shrink-0" />
          : <Copy  size={16} className="text-gold shrink-0" />
        }
        <span className="flex flex-col leading-tight">
          <span>{copied ? 'Copied!' : 'Copy Caption'}</span>
          <span className="text-[10px] text-brown-light/50 mt-0.5">Text only</span>
        </span>
      </button>
    </div>
  )
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────

function GalleryItem({ item, onClick }) {
  const [shareOpen, setShareOpen] = useState(false)

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

      {/* Share button + dropdown */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); setShareOpen(p => !p) }}
          className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
            shareOpen
              ? 'bg-gold text-night border-gold'
              : 'bg-black/50 border-gold/40 text-gold hover:bg-gold/20 hover:border-gold'
          }`}
        >
          <Share2 size={16} />
        </button>
        {shareOpen && <ShareMenu item={item} onClose={() => setShareOpen(false)} />}
      </div>

      {/* Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
        <div className="w-14 h-14 border border-gold/50 flex items-center justify-center bg-black/30">
          <ZoomIn size={22} className="text-gold" />
        </div>
      </div>

      {/* Label + price */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-3" />
        <div className="flex items-end justify-between gap-2">
          <p className="text-sm font-medium text-gold-champagne leading-tight flex-1 min-w-0 truncate">{item.label}</p>
          <span className="font-serif text-lg font-bold text-gold whitespace-nowrap shrink-0">{item.price}</span>
        </div>
      </div>

      {/* Click-away backdrop */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={(e) => { e.stopPropagation(); setShareOpen(false) }}
        />
      )}
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ item, onClose }) {
  const [loading, setLoading] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const [error,   setError]   = useState('')

  if (!item) return null

  const shareText = `✨ ${item.label} — ${item.price}\n\nOrder from Doramart Cocktail & Drinks 🍹\n📞 +234 707 064 6467\n📸 @doramart_cocktail_drinks`

  const getFile = async () => {
    setLoading(true)
    setError('')
    try   { return await buildShareImage(item) }
    catch (e) { console.error(e); setError('Could not build image.'); return null }
    finally   { setLoading(false) }
  }

  const handleWhatsApp = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return
    const result = await nativeShareWithFile(file, shareText, window.location.href)
    if (result === 'unsupported') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
    }
  }

  const handleDownload = async (e) => {
    e.stopPropagation()
    const file = await getFile()
    if (!file) return
    const url = URL.createObjectURL(file)
    const a   = document.createElement('a')
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors z-10"
      >
        <X size={20} />
      </button>

      <div
        className="relative w-full max-w-md border border-gold/25 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full object-cover"
            style={{ aspectRatio: '4/5', maxHeight: '55vh' }}
          />
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

          {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

          <p className="text-xs text-brown-light/50 mb-3 tracking-wide">Share with image:</p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleWhatsApp}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-900/30 border border-green-700/40 text-green-400 text-xs tracking-wider uppercase hover:bg-green-900/50 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <MessageCircle size={14} />}
              WhatsApp
            </button>
            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-gold/10 border border-gold/25 text-gold text-xs tracking-wider uppercase hover:bg-gold/20 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Save
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 bg-night-300 border border-gold/15 text-gold-champagne/70 text-xs tracking-wider uppercase hover:bg-gold/10 transition-colors font-medium"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Caption'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

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
            <a
              href="https://instagram.com/doramart_cocktail_and_drinks"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              @doramart_cocktail_and_drinks
            </a>{' '}
            for more
          </p>
        </div>
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  )
}
