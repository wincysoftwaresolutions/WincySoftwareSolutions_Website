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
  { label: 'Projects', href: '#projects' },
    {
    label: 'Tech Stack',
    href: '#',
    children: techStack.map((tech) => ({ label: tech.label, href: `#${tech.id}` })),
  },
  { label: 'About Us', href: '#about' },
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

// Which modern-app illustration a project card shows (see ProjectVisual)
export type ProjectVariant = 'dashboard' | 'services' | 'api' | 'web' | 'containers' | 'docs'

export interface Project {
  category: string
  title: string
  description: string
  legacy: string
  targets: string[]
  variant: ProjectVariant
  href: string
}

export const projects: Project[] = [
  {
    category: 'VB6 Modernization',
    title: 'VB6 Business App to Azure',
    description:
      'VB6 forms and COM components become a React front end on .NET 10 services hosted in Azure, with every business rule preserved.',
    legacy: 'VB6 · Forms',
    targets: ['React', '.NET 10', 'Azure'],
    variant: 'dashboard',
    href: '#vb6',
  },
  {
    category: 'Delphi Modernization',
    title: 'Delphi Desktop to Cloud',
    description:
      'Delphi VCL screens and Pascal business logic move to a React web app backed by modern .NET microservices on Azure.',
    legacy: 'Delphi · VCL',
    targets: ['React', 'Modern .NET', 'Azure'],
    variant: 'services',
    href: '#delphi',
  },
  {
    category: 'PowerBuilder Modernization',
    title: 'PowerBuilder to REST APIs',
    description:
      'DataWindows and embedded SQL are untangled into secure .NET 10 REST APIs, with a responsive React UI on top.',
    legacy: 'PowerBuilder',
    targets: ['React', '.NET 10', 'REST APIs'],
    variant: 'api',
    href: '#powerbuilder',
  },
  {
    category: 'Windows to Web',
    title: 'Windows App to Web App',
    description:
      'WinForms and WPF desktop apps are rebuilt as browser-based React web apps, deployed cloud-native with no client installs.',
    legacy: 'WinForms · WPF',
    targets: ['React Web App', 'Cloud Native'],
    variant: 'web',
    href: '#windows-to-web',
  },
  {
    category: '.NET Upgrade',
    title: '.NET Framework to .NET 10',
    description:
      '.NET Framework 4.x applications are upgraded to .NET 10 for faster performance, long-term support and container-ready deployment.',
    legacy: '.NET Framework 4.x',
    targets: ['.NET 10', 'Containers'],
    variant: 'containers',
    href: '#dotnet',
  },
  {
    category: 'AI Assessment',
    title: 'AI Code Assessment & Documentation',
    description:
      'AI agents scan legacy code to map dependencies, extract business rules and generate architecture docs and test suites before migration.',
    legacy: 'Legacy codebase',
    targets: ['AI Agents', 'Docs', 'Test Suites'],
    variant: 'docs',
    href: '#contact',
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
