import AsciiName from './components/AsciiName';
import { About, ExternalLink, Footer, Header, Projects, Stack } from './components/Sections';
import { links, profile, projects, stack } from './data/profile';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Header handle={profile.handle} onToggleTheme={toggle} />

      <main>
        <div className="hero wrap">
          <p className="label eyebrow">{profile.eyebrow}</p>
          <h1 className="sr">{profile.name}</h1>
          <AsciiName lines={profile.nameLines} theme={theme} />
          <p className="lede">
            I build backends with <em>Java and Spring</em> and interfaces with React, with written decisions and
            tests on every change.
          </p>
          <div className="cta">
            <a className="btn solid" href="#projects">
              See projects
            </a>
            <ExternalLink className="btn" link={links.github} />
            <ExternalLink className="btn" link={links.linkedin} />
          </div>
          <p className="hint">swipe or hover over the name</p>
        </div>

        <Projects projects={projects} />
        <Stack groups={stack} />
        <About paragraphs={profile.about} contacts={[links.email, links.linkedin, links.github]} />
      </main>

      <Footer name={profile.name} />
    </>
  );
}
