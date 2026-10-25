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
      // 2:1 image; widths keep the footer logo's visible size in line with the header logo
      className={`aspect-[2/1] h-auto w-[107px] flex-shrink-0 object-cover sm:w-[142px] xl:w-[178px] ${className}`}
    />
  )
}

export default FooterLogo