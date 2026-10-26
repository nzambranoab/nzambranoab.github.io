import type { Link, Project, StackGroup } from '../data/profile';

export function Header({ handle, onToggleTheme }: { handle: string; onToggleTheme: () => void }) {
  return (
    <header className="top">
      <div className="wrap">
        <a className="handle" href="#">
          {handle}
          <span>_</span>
        </a>
        <nav aria-label="Sections">
          <a href="#projects">projects</a>
          <a href="#stack">stack</a>
          <a href="#contact">contact</a>
        </nav>
        <button id="theme" type="button" aria-label="Toggle theme" onClick={onToggleTheme}>
          ◐ theme
        </button>
      </div>
    </header>
  );
}

function ExternalLink({ link, className }: { link: Link; className?: string }) {
  const external = link.href.startsWith('http');
  return (
    <a className={className} href={link.href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {link.label}
    </a>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project">
      <div className="meta">
        <span className="label">{project.period}</span>
        <span className="kind">
          {project.context.map((c, i) => (
            <span key={c}>
              {i > 0 && <br />}
              {c}
            </span>
          ))}
        </span>
      </div>
      <div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {project.highlight && <p className="detail">{project.highlight}</p>}
        <ul className="chips">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="links">
          {project.links.map((l) => (
            <ExternalLink key={l.href} link={l} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects">
      <div className="wrap">
        <p className="label">Projects</p>
        <h2>What I have built</h2>
        <div className="projects">
          {projects.map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stack({ groups }: { groups: StackGroup[] }) {
  return (
    <section id="stack">
      <div className="wrap">
        <p className="label">Stack</p>
        <h2>What I work with</h2>
        <div className="stack">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="label">{g.name}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ paragraphs, contacts }: { paragraphs: string[]; contacts: Link[] }) {
  return (
    <section id="contact">
      <div className="wrap about">
        <div>
          <p className="label">About</p>
          <h2>Hi, I'm Nicolás</h2>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="contact">
          <p className="label">Contact</p>
          {contacts.map((c) => (
            <a key={c.href} href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
              {c.label} <span>{c.display}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ name }: { name: string }) {
  return (
    <footer>
      <div className="wrap">
        <p>Built with React and TypeScript · © {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  );
}

export { ExternalLink };
