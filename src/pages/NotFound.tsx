import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-orange-gradient-soft px-5 py-24">
      <SEO title="Page Not Found | Wincy Software Solutions" path="/404" />
      <div className="text-center">
        <p className="font-heading text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-ink-gray">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
