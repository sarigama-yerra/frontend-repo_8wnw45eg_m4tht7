import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import FieldSelector from './components/FieldSelector'
import QuestionList from './components/QuestionList'

function App() {
  const [started, setStarted] = useState(false)
  const [field, setField] = useState('')
  const [questions, setQuestions] = useState([])
  const [sessions, setSessions] = useState([])

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backend}/api/sessions`)
        const data = await res.json()
        setSessions(data.items || [])
      } catch (e) {
        setSessions([])
      }
    }
    load()
  }, [])

  const handleGenerate = (f, qs) => {
    setField(f)
    setQuestions(qs)
    setStarted(true)
  }

  const handleSaved = async () => {
    const res = await fetch(`${backend}/api/sessions`)
    const data = await res.json()
    setSessions(data.items || [])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {!started && <Hero onStart={() => setStarted(true)} />}

      <main className="mx-auto max-w-6xl px-6 py-10">
        <FieldSelector onGenerate={handleGenerate} />

        {started && (
          <div className="mt-8">
            <QuestionList field={field} questions={questions} onSave={handleSaved} />
          </div>
        )}

        <section id="sessions" className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent sessions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {sessions.map((s) => (
              <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">{new Date(s.created_at).toLocaleString?.() || ''}</p>
                <p className="mt-1 font-medium text-gray-900">{s.field}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{(s.questions || []).slice(0,2).join(' • ')}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
