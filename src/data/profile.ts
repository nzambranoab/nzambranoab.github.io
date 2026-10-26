// All the portfolio content lives here, so updating the site means editing this file only.

export interface Link {
  label: string;
  href: string;
  /** Short text shown next to the label in the contact list */
  display?: string;
}

export interface Project {
  title: string;
  period: string;
  context: string[];
  summary: string;
  /** A technical detail worth calling out */
  highlight?: string;
  tech: string[];
  links: Link[];
}

export interface StackGroup {
  name: string;
  items: string[];
}

export const profile = {
  name: 'Nicolás Zambrano Abril',
  nameLines: ['NICOLÁS', 'ZAMBRANO'],
  handle: 'nzambranoab',
  eyebrow: 'Software Engineering · Universidad El Bosque',
  about: [
    'I study Software Engineering at Universidad El Bosque in Bogotá, Colombia. I enjoy well-organized backend work: modules with clear layers, decisions written down, and tests that run on every pull request.',
    "I'm open to internships and junior roles in backend or full-stack development.",
  ],
};

export const links = {
  email: { label: 'Email', href: 'mailto:nzambranoab@gmail.com', display: 'nzambranoab@gmail.com' },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nicol%C3%A1s-zambrano-abril-86ab8a443/',
    display: 'in/nicolás-zambrano-abril',
  },
  github: { label: 'GitHub', href: 'https://github.com/nzambranoab', display: '@nzambranoab' },
} satisfies Record<string, Link>;

export const projects: Project[] = [
  {
    title: 'Lodging Marketplace · Inversiones LR',
    period: '2026 · in progress',
    context: ['Software Engineering II', 'Team of 3'],
    summary:
      'A web platform to list, search, quote, book and cancel short-term lodging, with three roles: guest, host and administrator. All availability comes from a single source, so two bookings never overlap.',
    highlight:
      'PostgreSQL rejects any overlapping booking with an exclusion constraint. A booking starts as pending, payment runs separately, and a reconciliation job settles anything left half-done.',
    tech: ['Java 21', 'Spring Boot 3.3', 'React 18', 'Vite', 'PostgreSQL 16', 'Stripe', 'GitHub Actions', 'SonarCloud'],
    links: [{ label: 'code', href: 'https://github.com/rc-0105/Marketplace-LR' }],
  },
];

export const stack: StackGroup[] = [
  { name: 'Backend', items: ['Java 21', 'Spring Boot', 'Maven', 'OpenAPI'] },
  { name: 'Frontend', items: ['React', 'TypeScript', 'Vite · Vitest', 'HTML · CSS'] },
  { name: 'Data', items: ['PostgreSQL', 'Relational modeling'] },
  { name: 'Workflow', items: ['Git with pull requests', 'GitHub Actions', 'SonarCloud · JaCoCo', 'ADR · Jira'] },
];
