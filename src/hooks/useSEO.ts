import { useEffect } from 'react'

interface SEOOptions {
  title: string
  description: string
  url: string
}

function setMeta(selector: string, attribute: string, value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attribute, value)
}

export function useSEO({ title, description, url }: SEOOptions) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)

    return () => {
      document.title = previousTitle
    }
  }, [title, description, url])
}
