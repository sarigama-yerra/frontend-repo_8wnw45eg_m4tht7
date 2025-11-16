import { useState } from 'react'

const FIELDS = [
  'Software Engineering',
  'Data Science',
  'Product Management',
]

export default function FieldSelector({ onGenerate }) {
  const [field, setField] = useState(FIELDS[0])
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || ''
      const res = await fetch(`${base}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, count: 6 }),
      })
      const data = await res.json()
      onGenerate(field, data.questions || [])
    } catch (e) {
      console.error(e)
      onGenerate(field, [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Select your field</h3>
          <p className="text-sm text-gray-500">We’ll generate a tailored question set.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select value={field} onChange={(e) => setField(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-64">
            {FIELDS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <button onClick={handleGenerate} disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
            {loading ? 'Generating…' : 'Generate questions'}
          </button>
        </div>
      </div>
    </div>
  )
}
