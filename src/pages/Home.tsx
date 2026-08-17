import SEO from '../components/SEO'
import Mainframe from '../components/Mainframe'
import Services from '../components/Services'
import About from '../components/About'
import Stats from '../components/Stats'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import WhyChooseUs from '../components/WhyChooseUs'
import CTA from '../components/CTA'
import Contact from '../components/Contact'

function Home() {
  return (
    <>
      <SEO />
      <Mainframe />
      <Services />
      <About />
      <Stats />
      <Projects />
      <Testimonials />
      <WhyChooseUs />
      <CTA />
      <Contact />
    </>
  )
}

export default Home
