import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
        <p className="text-gray-500 mb-8">La página que buscas no existe o fue movida.</p>
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
