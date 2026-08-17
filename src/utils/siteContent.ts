import {
  ClipboardCheck,
  Wand2,
  Cloud,
  RefreshCcw,
  Network,
  FileText,
  BrainCircuit,
  Building2,
  ShieldCheck,
  Bot,
  Rocket,
  Wallet,
  Layers,
  type LucideIcon,
} from 'lucide-react'

export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: ClipboardCheck,
    title: 'Legacy Application Assessment',
    description: 'Analyze existing systems to surface risks, dependencies and high-value modernization opportunities.',
  },
  {
    icon: Wand2,
    title: 'AI-Assisted Code Transformation',
    description: 'Convert legacy codebases into modern architectures while preserving core business logic.',
  },
  {
    icon: Cloud,
    title: 'Cloud Migration',
    description: 'Migrate applications to AWS, Azure or Google Cloud with minimal disruption to the business.',
  },
  {
    icon: RefreshCcw,
    title: 'Application Reengineering',
    description: 'Refactor monolithic applications into scalable, maintainable, and testable systems.',
  },
  {
    icon: Network,
    title: 'API & Microservices Modernization',
    description: 'Transform legacy integrations into secure, well-documented RESTful APIs and microservices.',
  },
  {
    icon: FileText,
    title: 'Automated Documentation',
    description: 'Generate up-to-date technical documentation, architecture diagrams and business rules automatically.',
  },
]

export interface AboutFeature {
  icon: LucideIcon
  title: string
  description: string
}

export const aboutFeatures: AboutFeature[] = [
  {
    icon: BrainCircuit,
    title: 'AI-Driven Analysis',
    description: 'AI-assisted scans of legacy codebases surface risk and modernization opportunity fast.',
  },
  {
    icon: Cloud,
    title: 'Cloud Ready Architecture',
    description: 'Every transformation is designed for elastic, cloud-native deployment from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Modernization',
    description: 'Security and compliance are built into every migration and refactoring step.',
  },
  {
    icon: Building2,
    title: 'Enterprise Scale Delivery',
    description: 'Proven delivery frameworks for mission-critical systems at enterprise scale.',
  },
]

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export const stats: StatItem[] = [
  { value: 1, suffix: '+', label: 'Applications Assessed' },
  { value: 1, suffix: '+', label: 'Modernization Projects' },
  { value: 2, suffix: '+', label: 'Enterprise Clients' },
  { value: 100, suffix: '%', label: 'Customer Satisfaction' },
]

export interface Project {
  category: string
  title: string
  description: string
  image: string
}

export const projects: Project[] = [
  {
    category: 'Cloud Migration',
    title: 'Mainframe to Cloud Migration',
    description: 'Migrated legacy COBOL applications into cloud-native services while maintaining business continuity.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=60',
  },
  {
    category: 'Application Modernization',
    title: 'ERP Modernization',
    description: 'Refactored an enterprise ERP platform into a scalable, service-oriented microservices architecture.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60',
  },
  {
    category: 'API Modernization',
    title: 'Legacy API Transformation',
    description: 'Built secure REST APIs on top of legacy business applications to enable modern digital integration.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=60',
  },
  {
    category: 'Documentation',
    title: 'Automated Documentation',
    description: 'Generated architecture diagrams, API references and business process docs directly from legacy code using AI.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=60',
  },
]

export interface Testimonial {
  name: string
  designation: string
  comment: string
  rating: number
  image: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Thomas',
    designation: 'Enterprise Architect',
    comment:
      'The modernization assessment gave our team a clear roadmap that significantly reduced project risk from day one.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=33',
  },
  {
    name: 'Thomas',
    designation: 'IT Director',
    comment:
      'Our legacy platform was transformed into scalable cloud services far faster than we expected.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=44',
  },
  {
    name: 'Thomas',
    designation: 'Engineering Manager',
    comment:
      'The AI-generated documentation alone saved our engineers hundreds of hours of manual work.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=14',
  },
]

export interface WhyChooseItem {
  icon: LucideIcon
  title: string
  description: string
}

export const whyChooseUs: WhyChooseItem[] = [
  {
    icon: Building2,
    title: 'Enterprise Expertise',
    description: 'Deep experience modernizing mission-critical systems for large organizations.',
  },
  {
    icon: Bot,
    title: 'AI Powered Automation',
    description: 'AI accelerates assessment, transformation and documentation across every engagement.',
  },
  {
    icon: Rocket,
    title: 'Faster Delivery',
    description: 'Structured modernization frameworks compress delivery timelines without cutting corners.',
  },
  {
    icon: Wallet,
    title: 'Lower Modernization Costs',
    description: 'Automation and reusable patterns reduce the cost of large-scale transformation.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Reduction',
    description: 'Phased, well-tested migrations protect business continuity at every step.',
  },
  {
    icon: Layers,
    title: 'Future Ready Architecture',
    description: 'Modern, modular architectures that are built to evolve with your business.',
  },
]

export const contactInfo = {
  address: 'Chennai, Tamil Nadu, India',
  phone: '+91 994 156 0814',
  email: 'wincysoftwaresolutions@gmail.com',//wincysoftwaresolutions@gmail.com
}

export interface SocialLink {
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
]
