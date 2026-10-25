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
  CloudCog,
  Workflow,
  LockKeyhole,
  type LucideIcon,
} from 'lucide-react'

import { techStack } from './techStackData'

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
    {
    label: 'Tech Stack',
    href: '#tech-stack',
    children: techStack.map((tech) => ({ label: tech.label, href: `#${tech.id}` })),
  },
  { label: 'About Us', href: '#about' },
  { label: 'How We Work', href: '#how-we-work' },
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
    title: 'Legacy Application Assessment / Documentation',
    description: 'Analyze existing systems to surface risks, dependencies and high-value modernization opportunities.',
  },
  {
    icon: Wand2,
    title: 'AI-Assisted Code Transformation',
    description: 'Convert legacy codebases into modern architectures while preserving core business logic.',
  },
  {
    icon: Cloud,
    title: 'Cloud Migration / Modernization',
    description: 'Migrate applications to AWS, Azure or Google Cloud with minimal disruption to the business.',
  },
  {
    icon: RefreshCcw,
    title: 'Application Reengineering / Rearchitecting',
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
  { value: 10, suffix: '+', label: 'Applications Assessed' },
  { value: 3, suffix: '+', label: 'Modernization Projects' },
  { value: 5, suffix: '+', label: 'Enterprise Clients' },
  { value: 100, suffix: '%', label: 'Customer Satisfaction' },
]

export interface Testimonial {
  name: string
  designation: string
  comment: string
  rating: number
  avatar: 'male' | 'female'
}

// DRAFT: confirm each quote's wording and attribution with the named person before publishing.
export const testimonials: Testimonial[] = [
  {
    name: 'Thomas Thanaraj',
    designation: 'IT Engineering Delivery Head',
    comment:
      'Their AI-powered tools improved engineering productivity by automating complex analysis and accelerating delivery while maintaining quality and reliability.',
    rating: 5,
    avatar: 'male',
  },
  {
    name: 'Veni Jasmine',
    designation: 'Founder and Managing Director',
    comment:
      'Their Azure cloud modernization approach helped us transform legacy workloads into scalable, secure, and future-ready cloud solutions.',
    rating: 5,
    avatar: 'female',
  },
  {
    name: 'Christian Hild',
    designation: 'Founder and IT Director',
    comment:
      'Their legacy technology expertise enabled a smooth modernization journey while preserving critical business logic and reducing operational risk.',
    rating: 5,
    avatar: 'male',
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
    title: 'AI-Empowered Toolkit',
    description:
      'Our AI agents analyze legacy code, extract business rules, convert code and generate tests and documentation automatically.',
  },
  {
    icon: Rocket,
    title: 'Faster Delivery',
    description: 'AI-driven automation and structured frameworks compress delivery timelines without cutting corners.',
  },
  {
    icon: CloudCog,
    title: 'Azure Cloud Expertise',
    description:
      'Modernize onto Microsoft Azure with App Service, AKS, Azure SQL and Azure Functions on landing zones built for scale.',
  },
  {
    icon: Workflow,
    title: 'Automated CI/CD & Testing',
    description: 'Azure DevOps and GitHub Actions pipelines run AI-generated test suites to validate every release.',
  },
  {
    icon: Wallet,
    title: 'Lower Modernization Costs',
    description: 'Automation, reusable patterns and right-sized Azure resources reduce the cost of large-scale transformation.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Reduction',
    description: 'Phased, well-tested migrations protect business continuity at every step.',
  },
  {
    icon: LockKeyhole,
    title: 'Secure & Compliant Cloud',
    description: 'Microsoft Entra ID, Azure Key Vault and Defender for Cloud are built into every migration from day one.',
  },
  {
    icon: Layers,
    title: 'Future Ready Architecture',
    description: 'Cloud-native, modular architectures on Azure, ready to adopt AI services like Azure OpenAI as you grow.',
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
