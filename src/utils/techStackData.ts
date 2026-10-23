import { AppWindow, Code, Database, Layers, Server, type LucideIcon } from 'lucide-react'

export interface TechStackItem {
  id: string
  label: string
  icon: LucideIcon
  title: string
  description: string
  points: string[]
  target: string
}

export const techStack: TechStackItem[] = [
  {
    id: 'vb6',
    label: 'VB6',
    icon: Code,
    title: 'Visual Basic 6 Modernization',
    description:
      'VB6 applications are out of mainstream support yet still run critical business processes. We migrate them to modern, supported platforms without losing the business logic built up over the years.',
    points: [
      'Automated code analysis and business-rule extraction',
      'Forms, COM components and data access converted to modern equivalents',
      'Phased migration so users keep working during the transition',
    ],
    target: '.NET / C#, web front ends and REST APIs',
  },
  {
    id: 'delphi',
    label: 'Delphi',
    icon: Layers,
    title: 'Delphi Modernization',
    description:
      'Delphi desktop applications often hold years of proven logic but are hard to extend and integrate. We modernize them into maintainable, cloud-ready applications.',
    points: [
      'Unit and form analysis with dependency mapping',
      'Database and third-party component migration',
      'UI rebuilt for web and mobile access',
    ],
    target: '.NET, modern web apps and microservices',
  },
  {
    id: 'powerbuilder',
    label: 'Power Builder',
    icon: Database,
    title: 'PowerBuilder Modernization',
    description:
      'PowerBuilder and DataWindow-based systems are data-heavy and tightly coupled. We untangle them into clean, layered architectures that are easier to scale and support.',
    points: [
      'DataWindow and embedded SQL logic analysis',
      'Business logic separated from the UI layer',
      'Database-backed services exposed through secure APIs',
    ],
    target: '.NET, React front ends and cloud databases',
  },
  {
    id: 'windows-to-web',
    label: 'Windows App to Web App',
    icon: AppWindow,
    title: 'Windows App to Web App Migration',
    description:
      'Desktop Windows applications tie users to installed machines and make updates slow to roll out. We convert them into secure, browser-based web applications that run anywhere and deploy centrally.',
    points: [
      'WinForms and WPF screens mapped to responsive web interfaces',
      'Business logic moved into reusable services and APIs',
      'Centralized deployment with no client installs to manage',
    ],
    target: 'Modern web apps, REST APIs and cloud hosting',
  },
  {
    id: 'dotnet',
    label: '.NET Framework',
    icon: Server,
    title: '.NET Framework Upgrade',
    description:
      'Older .NET Framework applications can be upgraded to current .NET for better performance, security and cloud deployment, with far less rewriting than a full rebuild.',
    points: [
      'Compatibility assessment and upgrade planning',
      'Migration to modern .NET with containerized deployment',
      'Monoliths split into scalable services where it makes sense',
    ],
    target: '.NET, containers and cloud platforms',
  },
]