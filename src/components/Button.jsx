import React from 'react'

export default function Button({ children, variant = 'primary', onClick, href, className = '' }) {
  const base = 'inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 cursor-pointer'
  const variants = {
    primary: 'bg-gold text-night hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] active:scale-95',
    outline: 'border border-gold text-gold hover:bg-gold hover:text-night hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] active:scale-95',
    ghost: 'text-gold-champagne hover:text-gold border-b border-transparent hover:border-gold pb-0.5',
  }
  const cls = `${base} ${variants[variant]} ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}
