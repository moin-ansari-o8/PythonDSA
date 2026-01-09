# Development Guide

Quick reference for working on this project.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Adding Content

### New Note/Topic

1. **Create markdown file:**
   ```bash
   # In materials/notes/
   touch materials/notes/11-new-topic/README.md
   ```

2. **Copy to public:**
   ```bash
   Copy-Item -Path "materials/notes/11-new-topic" -Destination "public/materials/notes/11-new-topic" -Recurse
   ```

3. **Update navigation:**
   Edit `src/components/NavigationRail.tsx`:
   ```typescript
   children: [
     // ... existing items
     { id: 'new-topic', title: '11-new-topic', path: '/notes/11-new-topic' },
   ]
   ```

### New Problem

1. **Create problem file:**
   ```bash
   touch materials/problems/arrays/two-sum.md
   ```

2. **Copy to public:**
   ```bash
   Copy-Item -Path "materials/problems" -Destination "public/materials/problems" -Recurse -Force
   ```

---

## Design System Reference

### CSS Variables

```css
/* Colors */
--bg-primary: #0E1117
--bg-secondary: #161B22
--bg-border: #262C36
--text-primary: #E6EDF3
--text-secondary: #9BA4B5
--text-muted: #6B7280
--accent: #F4C430

/* Typography */
--font-body: 'Source Serif 4', serif
--font-code: 'JetBrains Mono', monospace

/* Spacing */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px

/* Layout */
--nav-width: 280px
--content-max-width: 75ch
--border-radius: 4px
```

### Typography Scale

```
h1: 2.25rem (36px)
h2: 1.75rem (28px)
h3: 1.375rem (22px)
h4: 1.125rem (18px)
body: 1rem (16px)
code: 0.9em
```

---

## Component Guidelines

### Button Pattern

```tsx
<button className="flat-btn">
  Action Text
</button>
```

```css
.flat-btn {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--bg-border);
  border-radius: var(--border-radius);
  padding: 8px 16px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.flat-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

### Callout Pattern

```tsx
<div className="callout">
  <p>Important note</p>
</div>
```

```css
.callout {
  padding: var(--spacing-md);
  border-left: 3px solid var(--accent);
  background-color: var(--accent-muted);
  margin: var(--spacing-md) 0;
}
```

---

## Common Tasks

### Sync Materials to Public

After editing any markdown files:

```bash
Copy-Item -Path "materials" -Destination "public\materials" -Recurse -Force
```

### Add New Route

1. **Create page component:**
   ```tsx
   // src/pages/NewPage.tsx
   export function NewPage() {
     return <div>Content</div>;
   }
   ```

2. **Add route in App.tsx:**
   ```tsx
   <Route path="/new" element={<NewPage />} />
   ```

3. **Update navigation:**
   Add to `NavigationRail.tsx` navigationData array

### Change Accent Color

1. Open `src/index.css`
2. Find `--accent` variable
3. Change to desired color (keep it muted!)
4. Update `--accent-muted` to rgba version

---

## Debugging

### Content Not Loading

1. Check file exists in `public/materials/`
2. Check file path in MarkdownRenderer
3. Check dev server is running
4. Check browser console for 404 errors

### Styling Issues

1. Check CSS specificity
2. Verify CSS variables are defined
3. Check for typos in class names
4. Use browser DevTools inspector

### Navigation Not Working

1. Check route definition in App.tsx
2. Verify path in NavigationRail.tsx
3. Check React Router is properly imported
4. Look for console errors

---

## Best Practices

### DO:
- Use CSS variables for colors
- Follow spacing scale
- Keep components simple
- Test on multiple screen sizes
- Write semantic HTML
- Use TypeScript types properly

### DON'T:
- Add gradients or shadows
- Use inline styles (except dynamic values)
- Add unnecessary animations
- Deviate from color system
- Over-engineer components
- Add external UI libraries

---

## File Naming

- Components: `PascalCase.tsx` + `PascalCase.css`
- Pages: `PageName.tsx` + `PageName.css`
- Utils: `kebab-case.ts`
- Types: `types.ts` or inline in components

---

## Testing Checklist

Before committing:

- [ ] Dev server runs without errors
- [ ] All routes work correctly
- [ ] Navigation highlights active page
- [ ] Markdown renders properly
- [ ] Code blocks have syntax highlighting
- [ ] Progress tracker updates persist
- [ ] No console errors or warnings
- [ ] Design system not violated
- [ ] Mobile responsive (basic)

---

## Deployment

```bash
# Build production bundle
npm run build

# Output in dist/ folder
# Deploy dist/ to any static host
# (Netlify, Vercel, GitHub Pages, etc.)
```

---

**Remember:** Tool, not product. Clarity over decoration. Academic feel.

// consistency builds trust
