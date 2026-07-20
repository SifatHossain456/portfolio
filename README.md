# Developer Portfolio

A premium, interactive portfolio website built with modern web technologies. Features a 3D animated background, smooth page transitions, dark/light mode, and a responsive design that works beautifully across all devices.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) with React Three Fiber
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Features

- Interactive 3D particle background with mouse interaction
- Dark/light mode with system preference detection
- Smooth scroll-triggered animations
- Featured projects showcase with filtering
- Skills grouped by technology category
- Developer journey timeline
- GitHub activity heatmap and stats
- Contact form with mail client integration
- SEO optimized with OpenGraph and Twitter cards
- Fully responsive design
- Fast loading with static generation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SifatHossain456/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is through [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel will automatically detect Next.js and configure the build

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### GitHub Pages

This project can also be deployed to GitHub Pages. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles and Tailwind config
│   │   ├── layout.tsx        # Root layout with SEO metadata
│   │   └── page.tsx          # Main page assembling all sections
│   ├── components/
│   │   ├── about.tsx         # About section
│   │   ├── contact.tsx       # Contact form and social links
│   │   ├── footer.tsx        # Footer with navigation
│   │   ├── github-activity.tsx # GitHub stats and contribution graph
│   │   ├── hero.tsx          # Hero section with intro
│   │   ├── navbar.tsx        # Navigation with theme toggle
│   │   ├── projects.tsx      # Featured projects showcase
│   │   ├── skills.tsx        # Skills grouped by category
│   │   ├── theme-provider.tsx # Theme context provider
│   │   ├── three-background.tsx # 3D particle background
│   │   └── timeline.tsx      # Developer journey timeline
│   └── lib/
│       ├── data.ts           # Centralized profile and project data
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── next.config.mjs          # Next.js configuration
└── package.json             # Dependencies and scripts
```

## Customization

Edit `src/lib/data.ts` to update:
- Profile information (name, bio, social links)
- Projects and their details
- Skills and proficiency levels
- Timeline events
- GitHub username for activity

## License

MIT License - feel free to use this as a template for your own portfolio!