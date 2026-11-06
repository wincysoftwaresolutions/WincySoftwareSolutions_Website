// Open real external links in a new tab; placeholder or in-page links ("#", "#contact") stay in place
export function externalLinkProps(href: string) {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
