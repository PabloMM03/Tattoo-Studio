import { useState, useEffect } from 'react'
import { base44 } from '@/api/base44Client'
import { CalendarCheck, Clock, CheckCircle } from 'lucide-react'

const TIME_SLOTS = [
  '11:00',
  '12:00',
  '13:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
]

export default function Appointments() {
  const [availability, setAvailability] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    description: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    base44.entities.Availability.list('-date', 200).then(setAvailability)
  }, [])

  const availableSlots = (date) => {
    if (!date) return []
    return availability
      .filter((a) => a.date === date && a.available)
      .map((a) => a.time)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'El nombre es obligatorio'
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Email inválido'
    if (!form.date) e.date = 'Selecciona una fecha'
    if (!form.time) e.time = 'Selecciona un horario'
    if (!form.description.trim()) e.description = 'Describe tu idea'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setErrors(errs)

    // Verificar disponibilidad
    const slot = availability.find(
      (a) => a.date === form.date && a.time === form.time
    )
    if (!slot || !slot.available) {
      return setErrors({ time: 'Este horario ya no está disponible' })
    }

    setLoading(true)
    await base44.entities.Appointment.create({ ...form, status: 'pending' })
    // Marcar como no disponible
    await base44.entities.Availability.update(slot.id, { available: false })
    setSuccess(true)
    setLoading(false)
  }

  const slots = availableSlots(form.date)

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl mb-4">¡Solicitud enviada!</h2>
          <p className="text-white/50 mb-8">
            Te contactaremos en menos de 24h para confirmar tu cita.
          </p>
          <button
            onClick={() => {
              setSuccess(false)
              setForm({
                name: '',
                email: '',
                date: '',
                time: '',
                description: '',
              })
            }}
            className="border border-gold text-gold px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold hover:text-ink transition-colors"
          >
            Nueva reserva
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
          Agenda tu sesión
        </p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">
          Reservar Cita
        </h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Rellena el formulario y te confirmaremos la cita en menos de 24 horas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { Icon: CalendarCheck, label: 'Elige fecha y hora' },
          { Icon: Clock, label: 'Confirmación en 24h' },
          { Icon: CheckCircle, label: 'Sesión confirmada' },
        ].map(({ Icon, label }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-white/40 text-sm"
          >
            <span className="text-gold font-bold">{i + 1}.</span>
            <Icon className="w-4 h-4 text-gold" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Field label="Nombre completo" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tu nombre"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@email.com"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
          />
        </Field>

        <Field label="Fecha" error={errors.date}>
          <input
            type="date"
            value={form.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value, time: '' })
            }
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
          />
        </Field>

        {form.date && (
          <Field label="Horario disponible" error={errors.time}>
            {slots.length === 0 ? (
              <p className="text-white/30 text-sm py-3">
                No hay horarios disponibles para esta fecha.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((t) => {
                  const avail = slots.includes(t)
                  return (
                    <button
                      type="button"
                      key={t}
                      disabled={!avail}
                      onClick={() => avail && setForm({ ...form, time: t })}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        form.time === t
                          ? 'bg-gold text-ink border-gold'
                          : avail
                          ? 'border-white/20 text-white/70 hover:border-gold/50'
                          : 'border-white/10 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            )}
          </Field>
        )}

        <Field label="Describe tu tatuaje" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Cuéntanos tu idea: estilo, tamaño, zona del cuerpo, referencias..."
            rows={5}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-ink py-4 text-sm tracking-widest uppercase font-bold hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Solicitar cita'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-white/50 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}
