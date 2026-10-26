# nzambranoab.github.io

Personal portfolio of **Nicolás Zambrano Abril**, Software Engineering student at Universidad El Bosque (Bogotá, Colombia).

**Live site:** https://nzambranoab.github.io

## Features

- Interactive hero where my name is drawn with code characters that scatter when you hover or swipe over them
- Projects, the stack I work with, and contact links
- Light and dark themes that follow the system, with a toggle that remembers your choice
- Responsive layout for phones and desktops, and support for reduced motion

## Tech stack

- [React 18](https://react.dev) with [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) for development and builds
- Canvas 2D for the ASCII hero
- GitHub Actions to build and deploy to GitHub Pages on every push to `main`

## Project structure

```
src/
├── App.tsx                 page layout
├── components/
│   ├── AsciiName.tsx       interactive ASCII name (canvas)
│   └── Sections.tsx        header, projects, stack, about, footer
├── data/profile.ts         all the site content (edit this to update the portfolio)
├── hooks/useTheme.ts       light/dark theme
└── styles.css              design tokens and styles
```

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build into dist/
npm run preview   # serve the production build
```

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every push to `main`. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

## Contact

- Email: nzambranoab@gmail.com
- LinkedIn: [Nicolás Zambrano Abril](https://www.linkedin.com/in/nicol%C3%A1s-zambrano-abril-86ab8a443/)
- GitHub: [@nzambranoab](https://github.com/nzambranoab)
