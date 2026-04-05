import { useState, useEffect } from 'react'
import { base44 } from '@/api/base44Client'
import { useCart } from '../components/Layout'
import { ShoppingBag, X, Plus, Minus, CheckCircle } from 'lucide-react'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    customer_email: '',
  })
  const [orderErrors, setOrderErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const { cart, setCart } = useCart()

  useEffect(() => {
    base44.entities.Product.list('-created_date', 50).then((d) => {
      setProducts(d)
      setLoading(false)
    })
  }, [])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prev
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    )
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  const validateOrder = () => {
    const e = {}
    if (!orderForm.customer_name.trim()) e.customer_name = 'Nombre obligatorio'
    if (!orderForm.customer_email.match(/^[^@]+@[^@]+\.[^@]+$/))
      e.customer_email = 'Email inválido'
    return e
  }

  const placeOrder = async () => {
    const errs = validateOrder()
    if (Object.keys(errs).length > 0) return setOrderErrors(errs)
    if (cart.length === 0) return

    setPlacing(true)

    // Verificar stock y calcular total en "backend" (lógica de negocio)
    const freshProducts = await Promise.all(
      cart.map((i) => base44.entities.Product.filter({ id: i.id }))
    )
    let calculatedTotal = 0
    for (let idx = 0; idx < cart.length; idx++) {
      const fresh = freshProducts[idx][0]
      if (!fresh || fresh.stock < cart[idx].quantity) {
        setOrderErrors({
          general: `Stock insuficiente para: ${cart[idx].name}`,
        })
        setPlacing(false)
        return
      }
      calculatedTotal += fresh.price * cart[idx].quantity
    }

    // Crear pedido
    const order = await base44.entities.Order.create({
      ...orderForm,
      total: calculatedTotal,
      status: 'pending',
      items_snapshot: JSON.stringify(
        cart.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))
      ),
    })

    // Descontar stock
    await Promise.all(
      cart.map((i) => {
        const fresh = freshProducts[cart.indexOf(i)][0]
        return base44.entities.Product.update(i.id, {
          stock: fresh.stock - i.quantity,
        })
      })
    )

    setCart([])
    setCartOpen(false)
    setOrderSuccess(true)
    setPlacing(false)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl mb-4">¡Pedido realizado!</h2>
          <p className="text-white/50 mb-8">
            Te enviaremos la confirmación por email. ¡Gracias!
          </p>
          <button
            onClick={() => setOrderSuccess(false)}
            className="border border-gold text-gold px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold hover:text-ink transition-colors"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
          Merch exclusivo
        </p>
        <h1 className="font-display text-4xl md:text-5xl">Tienda</h1>
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setCartOpen(true)}
            className="bg-gold text-ink px-6 py-3 flex items-center gap-3 font-bold shadow-xl hover:bg-gold/90 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>
              {cart.reduce((s, i) => s + i.quantity, 0)} items —{' '}
              {total.toFixed(2)}€
            </span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 text-white/30">
          <p className="font-display text-xl mb-2">Tienda próximamente</p>
          <p className="text-sm">Estamos preparando productos exclusivos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => {
            const inCart = cart.find((i) => i.id === p.id)
            const outOfStock = p.stock === 0
            return (
              <div key={p.id} className="group flex flex-col">
                <div className="relative overflow-hidden aspect-square bg-white/5 mb-4">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-display text-4xl">
                      ✦
                    </div>
                  )}
                  {outOfStock && (
                    <div className="absolute inset-0 bg-ink/70 flex items-center justify-center">
                      <span className="text-white/50 text-xs tracking-widest uppercase">
                        Agotado
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display text-lg mb-1">{p.name}</h3>
                  {p.description && (
                    <p className="text-white/40 text-sm mb-3 flex-1">
                      {p.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-gold font-bold text-lg">
                      {p.price?.toFixed(2)}€
                    </span>
                    <button
                      disabled={outOfStock}
                      onClick={() => addToCart(p)}
                      className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
                        outOfStock
                          ? 'border-white/10 text-white/20 cursor-not-allowed'
                          : inCart
                          ? 'bg-gold text-ink border-gold'
                          : 'border-white/20 text-white/60 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {inCart ? `En cesta (${inCart.quantity})` : 'Añadir'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-ink/60"
            onClick={() => setCartOpen(false)}
          />
          <div className="w-full max-w-md bg-ink border-l border-white/10 flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="font-display text-xl">Tu cesta</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <p className="text-white/30 text-sm py-8 text-center">
                  La cesta está vacía
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/5 flex-shrink-0 overflow-hidden">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-gold text-sm">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="text-white/40 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="text-white/40 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6 flex flex-col gap-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total</span>
                  <span className="font-bold text-gold text-lg">
                    {total.toFixed(2)}€
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={orderForm.customer_name}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      customer_name: e.target.value,
                    })
                  }
                  className="bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                {orderErrors.customer_name && (
                  <p className="text-red-400 text-xs -mt-2">
                    {orderErrors.customer_name}
                  </p>
                )}

                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={orderForm.customer_email}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      customer_email: e.target.value,
                    })
                  }
                  className="bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                {orderErrors.customer_email && (
                  <p className="text-red-400 text-xs -mt-2">
                    {orderErrors.customer_email}
                  </p>
                )}
                {orderErrors.general && (
                  <p className="text-red-400 text-xs">{orderErrors.general}</p>
                )}

                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="bg-gold text-ink py-3 text-sm tracking-widest uppercase font-bold hover:bg-gold/90 transition-colors disabled:opacity-50"
                >
                  {placing ? 'Procesando...' : 'Finalizar pedido'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
