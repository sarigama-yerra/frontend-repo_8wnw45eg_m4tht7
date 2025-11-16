import Spline from '@splinetool/react-spline'

export default function Hero({ onStart }) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Ace your next interview with an AI coach
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          Choose your field, practice with curated questions, jot down answers, and get organized.
        </p>
        <div className="mt-8 flex gap-4">
          <button onClick={onStart} className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg backdrop-blur hover:bg-white">
            Start practicing
          </button>
          <a href="#sessions" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10">
            View sessions
          </a>
        </div>
      </div>
    </section>
  )
}
