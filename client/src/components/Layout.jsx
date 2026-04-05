import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useState, createContext, useContext } from 'react'

export const CartContext = createContext({ cart: [], setCart: () => {} })
export const useCart = () => useContext(CartContext)

export default function Layout() {
  const [cart, setCart] = useState([])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <div className="min-h-screen bg-ink text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <footer className="w-full py-16 px-8 bg-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left max-w-screen-2xl mx-auto">
            <div>
              <p className="text-xl font-black text-neutral-200 opacity-20 font-headline uppercase tracking-tighter mb-4">
                OBSIDIAN
              </p>
              <p className="font-body italic text-lg text-neutral-500">
                © 2026 OBSIDIAN GALLERY. ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-headline font-bold text-red-600 uppercase tracking-widest text-sm mb-2">
                Connect
              </p>
              <div className="flex justify-center md:justify-start gap-8">
                <a
                  className="font-body italic text-lg text-neutral-500 hover:text-red-600 transition-colors"
                  href="#"
                >
                  Instagram
                </a>
                <a
                  className="font-body italic text-lg text-neutral-500 hover:text-red-600 transition-colors"
                  href="#"
                >
                  Twitter
                </a>
                <a
                  className="font-body italic text-lg text-neutral-500 hover:text-red-600 transition-colors"
                  href="#"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="md:text-right">
              <p className="font-headline font-bold text-red-600 uppercase tracking-widest text-sm mb-2">
                Location
              </p>
              <p className="font-body italic text-lg text-neutral-400">
                1042 Shadow Lane, Arts District
                <br />
                Los Angeles, CA
              </p>
            </div>
          </div>
        </footer>
      </div>
    </CartContext.Provider>
  )
}
