import { useSEO } from '../hooks/useSEO'

interface SEOProps {
  title?: string
  description?: string
  path?: string
}

const SITE_URL = 'https://wincysoftwaresolutions.net'
const SITE_NAME = 'Wincy Software Solutions'

function SEO({
  title = `${SITE_NAME} | AI-Powered Legacy System Modernization`,
  description = 'Accelerate enterprise digital transformation with AI-powered legacy application modernization, cloud migration, code transformation, and automated documentation.',
  path = '/',
}: SEOProps) {
  useSEO({ title, description, url: `${SITE_URL}${path}` })
  return null
}

export default SEO
