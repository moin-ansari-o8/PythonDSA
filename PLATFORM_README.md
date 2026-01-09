# Python DSA Learning Platform

> A tool for mastering Data Structures & Algorithms with Python

**Design Philosophy:** Klarheit (clarity) over decoration. Academic, tool-like, made for deep learning.

---

## Project Overview

This is a dark-mode educational web platform built with React + TypeScript + Vite. It provides a systematic approach to learning DSA with Python, featuring:

- **Structured curriculum** - 12-week roadmap from beginner to interview-ready
- **Academic design** - Terminal + textbook aesthetic, no SaaS vibes
- **Progress tracking** - Non-gamified, research log style
- **Markdown-based content** - Easy to read and update
- **Zero bloat** - No gradients, shadows, or unnecessary animations

---

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Markdown:** react-markdown + remark-gfm
- **Syntax Highlighting:** rehype-highlight + highlight.js
- **Styling:** Pure CSS with custom design system

---

## Design System

### Color Palette (Strict)
```
--bg-primary: #0E1117
--bg-secondary: #161B22
--bg-border: #262C36
--text-primary: #E6EDF3
--text-secondary: #9BA4B5
--text-muted: #6B7280
--accent: #F4C430 (amber - only for progress, active states)
```

### Typography
- **Body:** Source Serif 4 (academic, readable for long sessions)
- **Code:** JetBrains Mono
- **Line height:** 1.7 (optimized for reading)
- **Max width:** 75ch (single-column layout)

### Principles
- No gradients
- No shadows
- No glassmorphism
- No rounded SaaS blobs
- Flat buttons with borders
- Feels like a tool, not a product

---

## Project Structure

```
PythonDSA/
├── materials/               # Learning content (markdown files)
│   ├── notes/              # Theory and concepts
│   ├── problems/           # Problem statements
│   ├── solutions/          # Detailed solutions
│   ├── templates/          # Code patterns
│   ├── cheatsheets/        # Quick reference
│   └── progress/           # Tracking documents
│
├── src/
│   ├── components/         # React components
│   │   ├── NavigationRail.tsx      # Sticky left sidebar
│   │   ├── MarkdownRenderer.tsx    # Content renderer
│   │   └── *.css
│   │
│   ├── pages/              # Route pages
│   │   ├── NotesPage.tsx
│   │   ├── ProgressPage.tsx
│   │   └── *.css
│   │
│   ├── App.tsx             # Main app with routing
│   ├── index.css           # Global design system
│   └── main.tsx            # Entry point
│
├── public/materials/       # Served markdown files
└── package.json
```

---

## Features

### 1. Navigation Rail
- Sticky left sidebar (VS Code style)
- Collapsible topic tree
- Active state highlighting
- Keyboard accessible

### 2. Markdown Renderer
- Fetches and renders .md files
- Syntax highlighting for code blocks
- Custom styling for academic feel
- Support for tables, blockquotes, lists

### 3. Progress Tracker
- Non-gamified progress display
- Weekly checklist
- Problem tracking with checkboxes
- Reflection textarea for notes
- Minimal streak counter

### 4. Content Organization
- 00-START-HERE: Entry point
- Notes: 10 topic folders (01-python-basics to 10-sorting-searching)
- Problems: Categorized practice
- Solutions: Detailed explanations
- Templates: Reusable patterns
- Cheatsheets: Quick reference

---

## Development

### Setup
```bash
cd PythonDSA
npm install
```

### Run Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Content Updates

### Adding New Notes
1. Create markdown file in `materials/notes/`
2. Copy to `public/materials/notes/`
3. Update navigation in `NavigationRail.tsx` if needed

### Adding Problems
1. Add problem .md file to `materials/problems/`
2. Copy to `public/materials/problems/`
3. Update progress tracker if needed

### Updating Design
- Global styles: `src/index.css`
- Component styles: respective `.css` files
- Follow strict color system (no deviation)

---

## Design Constraints (NEVER VIOLATE)

❌ **Forbidden:**
- Gradients of any kind
- Drop shadows or box shadows
- Glassmorphism effects
- Marketing hero sections
- Pastel or neon colors
- Feature grid layouts
- Multi-accent color systems
- Rounded SaaS blobs
- Glowing UI elements
- Gamification badges
- Animated counters

✅ **Allowed:**
- Flat rectangles (4-6px border radius max)
- Thin borders
- Inline callouts with left border
- Breadcrumb navigation
- Subtle hover states
- ASCII diagrams
- Monospace inline comments

---

## Performance

- **Vite:** Lightning-fast HMR
- **Lazy Loading:** Components split automatically
- **Optimized Fonts:** Google Fonts with display=swap
- **No Heavy Dependencies:** Minimal bundle size
- **Static Content:** Markdown files cached by browser

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## License

See LICENSE file

---

## Philosophy

> "If it looks good in screenshots, it's wrong.  
> If it feels like a book + terminal, it's correct."

This platform is designed for **serious learners** preparing for interviews, not casual users. Long study sessions (1-3 hours) are the priority. Every design decision optimizes for:
- Reading comprehension
- Focused learning
- Minimal distraction
- Academic credibility

**Ordnung** (order) without polish-overkill.

---

**Status:** ✅ Core platform complete  
**Next Steps:** Add more content to materials folder

// tool, not product
