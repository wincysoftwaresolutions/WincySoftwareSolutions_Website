import logoIcon from '../assets/logo-icon.png'
import logoText from '../assets/logo-text.png'

interface LogoProps {
  className?: string
}

// Icon and wordmark are separate crops of logo-light-bg.png so each can be sized on its own.
// The wordmark sits slightly below the icon's centre, as in the original artwork.
function Logo({ className = '' }: LogoProps) {
  return (
    <a
      href="#home"
      aria-label="Wincy Software Solutions home"
      className={`inline-flex w-max flex-shrink-0 items-center gap-px bg-white sm:gap-0.5 ${className}`}
    >
      <img src={logoIcon} alt="" className="h-14 w-auto sm:h-[4.5rem] xl:h-[5.5rem]" />
      <img
        src={logoText}
        alt="Wincy Software Solutions"
        className="relative top-[3px] h-[22px] w-auto sm:top-[4px] sm:h-[28px] xl:top-[5px] xl:h-[33px]"
      />
    </a>
  )
}

export default Logo
