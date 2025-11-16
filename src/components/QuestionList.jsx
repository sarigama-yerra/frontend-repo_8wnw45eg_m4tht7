import { useState } from 'react'

export default function QuestionList({ field, questions, onSave }) {
  const [answers, setAnswers] = useState({})
  const [saving, setSaving] = useState(false)

  const handleChange = (idx, val) => {
    setAnswers((prev) => ({ ...prev, [idx]: val }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const orderedAnswers = questions.map((_, i) => answers[i] || '')
      const base = import.meta.env.VITE_BACKEND_URL || ''
      const res = await fetch(`${base}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, questions, answers: orderedAnswers }),
      })
      const data = await res.json()
      onSave(data.id)
    } catch (e) {
      console.error(e)
      onSave(null)
    } finally {
      setSaving(false)
    }
  }

  if (!questions?.length) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Your practice set</h3>
        <button onClick={handleSave} disabled={saving} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
          {saving ? 'Saving…' : 'Save session'}
        </button>
      </div>
      <ol className="space-y-6">
        {questions.map((q, idx) => (
          <li key={idx} className="rounded-lg border border-gray-100 p-4">
            <p className="mb-3 font-medium text-gray-800">{idx + 1}. {q}</p>
            <textarea
              rows={3}
              className="w-full resize-y rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Type your answer here…"
              value={answers[idx] || ''}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
