import logoLight from '../assets/logo-light-bg.png'
import logoDark from '../assets/logo-dark-bg.png'

interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <a
      href="#home"
      aria-label="Wincy Software Solutions home"
      className={`inline-flex items-center ${className}`}
    >
      {isLight ? (
        <span className="rounded-lg bg-[#494848] p-1.5">
          <img src={logoDark} alt="Wincy Software Solutions" className="h-9 w-auto sm:h-20" />
        </span>
      ) : (
        <img src={logoLight} alt="Wincy Software Solutions" className="h-9 w-auto sm:h-20" />
      )}
    </a>
  )
}

export default Logo
