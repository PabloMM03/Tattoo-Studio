import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/shop', label: 'Merch' },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl">
      <nav className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-red-600 font-headline uppercase"
        >
          OBSIDIAN
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-headline uppercase tracking-tight font-medium transition-colors ${
                location.pathname === l.to
                  ? 'text-red-600 font-bold border-b-2 border-red-600 pb-1'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/appointments"
          className="hidden md:block bg-gradient-to-br from-red-700 to-red-900 px-8 py-3 text-white font-headline font-bold uppercase tracking-widest text-sm transition-transform active:scale-95 hover:opacity-90 duration-150"
        >
          Book Now
        </Link>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-neutral-950 border-t border-white/10 px-8 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-headline uppercase tracking-widest text-sm text-neutral-400 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/appointments"
            onClick={() => setOpen(false)}
            className="bg-gradient-to-br from-red-700 to-red-900 px-6 py-3 text-white font-headline font-bold uppercase tracking-widest text-sm text-center"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  )
}
