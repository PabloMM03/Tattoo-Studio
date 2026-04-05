import { useState, useEffect } from 'react'
import { base44 } from '@/api/base44Client'
import { X } from 'lucide-react'

const CATEGORIES = [
  'All Works',
  'blackwork',
  'realismo',
  'tradicional',
  'geométrico',
  'acuarela',
  'japonés',
  'minimalista',
  'otro',
]

const PAGE_SIZE = 9

// Demo images shown when no tattoos exist in DB
const DEMO_TATTOOS = [
  {
    id: 'd1',
    title: 'The Monarch',
    category: 'realismo',
    image_url:
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80',
    demo: true,
  },
  {
    id: 'd2',
    title: 'Geometric Abyss',
    category: 'blackwork',
    image_url:
      'https://images.unsplash.com/photo-1562962230-15b6b8a5d8a3?w=800&q=80',
    demo: true,
  },
  {
    id: 'd3',
    title: 'Ephemeral Flora',
    category: 'minimalista',
    image_url:
      'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80',
    demo: true,
  },
  {
    id: 'd4',
    title: 'Crimson Edge',
    category: 'tradicional',
    image_url:
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80',
    demo: true,
  },
  {
    id: 'd5',
    title: 'Stone Silence',
    category: 'realismo',
    image_url:
      'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80',
    demo: true,
  },
  {
    id: 'd6',
    title: 'Dark Symmetry',
    category: 'geométrico',
    image_url:
      'https://images.unsplash.com/photo-1590246814883-55516d9d77d5?w=800&q=80',
    demo: true,
  },
]

export default function Gallery() {
  const [tattoos, setTattoos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All Works')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    base44.entities.Tattoo.list('-created_date', 200).then((data) => {
      setTattoos(data.length > 0 ? data : DEMO_TATTOOS)
      setLoading(false)
    })
  }, [])

  const filtered =
    filter === 'All Works'
      ? tattoos
      : tattoos.filter((t) => t.category === filter)
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleFilter = (cat) => {
    setFilter(cat)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background watermark */}
      <div className="fixed -bottom-20 -right-20 opacity-[0.03] pointer-events-none select-none z-0">
        <h2 className="text-[25rem] font-headline font-black uppercase leading-none">
          OB
        </h2>
      </div>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-20 space-y-4">
          <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
            The{' '}
            <span className="text-red-700 italic font-body font-normal normal-case">
              Obsidian
            </span>
            <br />
            Collection
          </h1>
          <p className="text-neutral-400 max-w-xl text-lg md:text-xl font-light opacity-80 leading-relaxed font-body">
            A definitive archive of permanent artistry. Where precision meets
            the permanence of ink.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-16 border-b border-white/10 pb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`font-headline uppercase text-sm tracking-widest font-bold transition-colors ${
                filter === cat
                  ? 'text-red-600'
                  : 'text-neutral-500 hover:text-white font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 text-neutral-500">
            <p className="font-headline text-2xl uppercase tracking-widest mb-2">
              No works found
            </p>
            <p className="font-body italic">Try a different category.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {visible.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelected(t)}
                className="break-inside-avoid mb-8 group relative overflow-hidden bg-neutral-900 cursor-crosshair"
              >
                <img
                  src={t.image_url}
                  alt={t.title}
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="font-label text-xs uppercase tracking-[0.2em] text-red-500 mb-2">
                    {t.category}
                  </span>
                  <h3 className="font-headline text-2xl font-bold uppercase tracking-tighter text-white">
                    {t.title}
                  </h3>
                  {t.description && (
                    <p className="font-body italic text-neutral-400 mt-1 text-sm">
                      {t.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="group flex flex-col items-center gap-4 py-8 px-16 border border-white/10 hover:border-red-700 transition-colors duration-500"
            >
              <span className="font-headline uppercase text-sm tracking-[0.3em] font-bold text-neutral-400 group-hover:text-white transition-colors">
                Load More Works
              </span>
              <span className="text-red-600 text-2xl animate-pulse">↓</span>
            </button>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 text-neutral-500 hover:text-red-600 transition-colors">
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image_url}
              alt={selected.title}
              className="w-full max-h-[75vh] object-contain"
            />
            <div className="mt-6">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-red-600 block mb-2">
                {selected.category}
              </span>
              <p className="font-headline text-3xl font-bold uppercase tracking-tighter">
                {selected.title}
              </p>
              {selected.description && (
                <p className="font-body italic text-neutral-400 mt-2">
                  {selected.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
