import logoLight from '../assets/logo-light-bg.png'

interface LogoProps {
  className?: string
}

function Logo({ className = '' }: LogoProps) {
  return (
    <a
      href="#home"
      aria-label="Wincy Software Solutions home"
      className={`inline-flex items-center ${className}`}
    >
      <img src={logoLight} alt="Wincy Software Solutions" className="h-9 w-auto sm:h-16 lg:h-24" />
    </a>
  )
}

export default Logo
