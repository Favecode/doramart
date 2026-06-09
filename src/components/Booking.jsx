import React, { useState } from 'react'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { Phone, Instagram, CheckCircle2, Send } from 'lucide-react'

const eventTypes = [
  'Wedding', 'Birthday', 'Corporate Event', 'Private Party', 'Brand Activation', 'Other'
]

export default function Booking() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <SectionWrapper id="booking" className="bg-night-100">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Reserve Your Experience"
          subtitle="Ready to elevate your next event? Tell us about it and we'll create something extraordinary."
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-gold-champagne mb-6">Let's Talk</h3>
              <p className="text-brown-light text-sm leading-relaxed font-light">
                Whether you're planning an intimate dinner or a grand celebration, we're here to make it exceptional. Reach out and let's begin crafting your experience.
              </p>
            </div>

            <div className="space-y-5">
              <a href="tel:+2347070646467" className="group flex items-center gap-4 p-4 border border-gold/10 hover:border-gold/30 transition-all duration-300 bg-night-200">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-brown-light mb-1">Call Us</div>
                  <div className="text-gold-champagne text-sm font-medium">+234 707 064 6467</div>
                </div>
              </a>

              <a href="https://instagram.com/doramart_cocktail" target="_blank" rel="noreferrer"
                className="group flex items-center gap-4 p-4 border border-gold/10 hover:border-gold/30 transition-all duration-300 bg-night-200">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Instagram size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-brown-light mb-1">Instagram</div>
                  <div className="text-gold-champagne text-sm font-medium">@doramart_cocktail</div>
                </div>
              </a>
            </div>

            {/* Quote */}
            <div className="border-l-2 border-gold/40 pl-5 py-2 mt-8">
              <p className="font-serif italic text-gold-champagne/70 text-sm leading-relaxed">
                "Every great event deserves a drink worth remembering."
              </p>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold mt-2 block">— Doramart</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="border border-gold/20 bg-night-200 p-12 text-center">
                <CheckCircle2 size={40} className="text-gold mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-gold-champagne mb-3">Booking Request Received</h3>
                <p className="text-brown-light text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Thank you! We'll review your request and get back to you within 24 hours to discuss your event.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs tracking-[0.25em] uppercase text-gold border-b border-gold/40 hover:border-gold transition-colors pb-0.5"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-gold/15 bg-night-200 p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-brown-light mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-night-300 border border-gold/15 text-gold-champagne text-sm px-4 py-3 placeholder-brown-light/40 focus:outline-none focus:border-gold/50 focus:bg-night-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-brown-light mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-night-300 border border-gold/15 text-gold-champagne text-sm px-4 py-3 placeholder-brown-light/40 focus:outline-none focus:border-gold/50 focus:bg-night-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-brown-light mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="+234 000 0000 000"
                      className="w-full bg-night-300 border border-gold/15 text-gold-champagne text-sm px-4 py-3 placeholder-brown-light/40 focus:outline-none focus:border-gold/50 focus:bg-night-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-brown-light mb-2">Event Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => update('date', e.target.value)}
                      className="w-full bg-night-300 border border-gold/15 text-gold-champagne text-sm px-4 py-3 focus:outline-none focus:border-gold/50 focus:bg-night-400 transition-all duration-300 [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-brown-light mb-2">Event Type *</label>
                  <select
                    required
                    value={form.eventType}
                    onChange={e => update('eventType', e.target.value)}
                    className="w-full bg-night-300 border border-gold/15 text-gold-champagne text-sm px-4 py-3 focus:outline-none focus:border-gold/50 focus:bg-night-400 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-brown-light/50">Select event type</option>
                    {eventTypes.map(t => <option key={t} value={t} className="bg-night-300">{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-brown-light mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us about your event — date, guest count, special requirements..."
                    className="w-full bg-night-300 border border-gold/15 text-gold-champagne text-sm px-4 py-3 placeholder-brown-light/40 focus:outline-none focus:border-gold/50 focus:bg-night-400 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-night py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] active:scale-[0.99] flex items-center justify-center gap-3"
                >
                  <Send size={14} />
                  Send Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </SectionWrapper>
  )
}