import logoDark from '../assets/logo-dark-bg.png'

interface FooterLogoProps {
  className?: string
}

function FooterLogo({ className = '' }: FooterLogoProps) {
  return (
    <img
      src={logoDark}
      alt=""
      aria-hidden="true"
      // Source is a square canvas with the logo centred; crop to 2:1 and size it so the visible
      // logo matches the banner logo (h-12 / sm:h-16 / xl:h-20 in Logo.tsx)
      className={`aspect-[2/1] h-auto w-[107px] flex-shrink-0 object-cover sm:w-[142px] xl:w-[178px] ${className}`}
    />
  )
}

export default FooterLogo