import { Link } from 'react-router-dom'

const BENTO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&q=80',
    label: 'Symmetry V.1',
    col: 'md:col-span-8',
  },
  {
    src: 'https://images.unsplash.com/photo-1562962230-15b6b8a5d8a3?w=800&q=80',
    label: 'Botanical Soul',
    col: 'md:col-span-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80',
    label: 'Gothic Vision',
    col: 'md:col-span-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&q=80',
    label: 'The Motion Series',
    col: 'md:col-span-8',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'A deep dive into your vision, placement, and the symbolism behind the mark.',
    icon: '✎',
  },
  {
    num: '02',
    title: 'The Design',
    desc: 'Custom drafting where your ideas are distilled into the sharp Obsidian style.',
    icon: '◈',
  },
  {
    num: '03',
    title: 'The Inking',
    desc: 'A focused session in a sterile, cinematic environment. Precision in every line.',
    icon: '✦',
  },
  {
    num: '04',
    title: 'Aftercare',
    desc: 'Guidance on healing to ensure your art remains vibrant and crisp for decades.',
    icon: '◇',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col font-body">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1600&q=80"
            alt="Tattoo studio"
            className="w-full h-full object-cover grayscale opacity-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="font-headline text-[40vw] font-black leading-none">
            OBSIDIAN
          </span>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="font-headline text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 uppercase leading-none">
            Art <span className="text-red-700">Inked</span>
            <br />
            In Shadow
          </h1>
          <p className="font-body text-xl md:text-3xl italic text-neutral-400 max-w-2xl mx-auto mb-12">
            Specializing in blackwork, surrealism, and the intricate permanence
            of fine-line storytelling.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              to="/appointments"
              className="bg-gradient-to-br from-red-700 to-red-900 px-12 py-5 text-white font-headline font-bold uppercase tracking-widest text-lg transition-transform hover:scale-105 active:scale-95 duration-300"
            >
              Secure Consultation
            </Link>
            <Link
              to="/gallery"
              className="border border-white/20 px-12 py-5 font-headline font-bold uppercase tracking-widest text-lg hover:bg-white/5 transition-colors duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED GALLERY ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="font-headline text-red-700 uppercase tracking-widest font-bold block mb-4">
                Curated Works
              </span>
              <h2 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                The Obsidian
                <br />
                Collection
              </h2>
            </div>
            <p className="font-body text-xl text-neutral-400 max-w-md italic border-l-2 border-red-700 pl-6">
              A selection of custom-designed pieces where geometry meets the
              organic curves of the human canvas.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[1100px]">
            {BENTO_IMAGES.map((img) => (
              <div
                key={img.label}
                className={`${img.col} relative overflow-hidden group`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-headline uppercase font-bold tracking-widest text-red-500">
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ARTIST ────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-ink">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-red-700 z-10" />
            <img
              src="https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80"
              alt="Tattoo artist"
              className="w-full aspect-[4/5] object-cover grayscale brightness-75"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-700 p-8 z-10">
              <span className="font-headline font-bold text-white text-4xl uppercase tracking-tighter">
                Established
                <br />
                2014
              </span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-tight">
              Master of the
              <br />
              <span className="text-red-700 italic">Dark Void</span>
            </h2>
            <div className="space-y-8">
              <p className="font-body text-2xl text-white leading-relaxed">
                I am Julian Thorne, the creative force behind Obsidian. For over
                a decade, I have dedicated my craft to exploring the
                relationship between shadow and skin.
              </p>
              <p className="font-body text-xl text-neutral-400 leading-relaxed italic border-l-2 border-red-700/40 pl-6">
                "Tattooing is not merely an aesthetic choice; it is a ritual of
                transformation. I believe in creating pieces that feel as though
                they were always meant to be there."
              </p>
              <div className="flex gap-12 pt-8">
                <div>
                  <p className="font-headline text-4xl font-bold text-red-600 mb-1">
                    1.2K
                  </p>
                  <p className="font-label uppercase tracking-widest text-xs text-neutral-500">
                    Unique Pieces
                  </p>
                </div>
                <div>
                  <p className="font-headline text-4xl font-bold text-red-600 mb-1">
                    10yr
                  </p>
                  <p className="font-label uppercase tracking-widest text-xs text-neutral-500">
                    Craft Mastery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-neutral-900">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-headline text-5xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              The Ritual Process
            </h2>
            <p className="font-body text-xl italic text-neutral-400">
              From the first spark of an idea to a lifetime of healed art.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {STEPS.map((s) => (
              <div key={s.num} className="relative group">
                <div className="mb-8 h-48 bg-neutral-800 flex items-center justify-center">
                  <span className="text-6xl text-red-700/40 group-hover:text-red-600 transition-colors duration-500">
                    {s.icon}
                  </span>
                </div>
                <div className="absolute -top-4 -left-4 font-headline text-6xl font-black text-white/5 select-none">
                  {s.num}
                </div>
                <h3 className="font-headline text-2xl font-bold uppercase tracking-widest mb-4">
                  {s.title}
                </h3>
                <p className="font-body text-lg text-neutral-400 italic">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 bg-red-800 text-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <h2 className="font-headline text-4xl md:text-6xl font-bold uppercase tracking-tighter text-center md:text-left">
            Ready to begin
            <br />
            your transformation?
          </h2>
          <Link
            to="/appointments"
            className="bg-ink text-white px-16 py-6 font-headline font-bold uppercase tracking-widest text-xl hover:bg-neutral-800 transition-all duration-300 whitespace-nowrap"
          >
            Book My Session
          </Link>
        </div>
      </section>
    </div>
  )
}
