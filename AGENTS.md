# AGENTS.md - Zola 90s Print Magazine Theme

## Project Overview

This is a Zola static site generator theme inspired by 90s print magazines. The project consists of:
- **Zola config**: `zola.toml`
- **Templates**: Tera (HTML) templates in `templates/`
- **Styles**: Sass partials in `sass/`
- **Content**: Markdown files in `content/`

## Build Commands

### Zola CLI (requires Zola 0.22+)

```bash
# Serve locally (development)
zola serve

# Serve on all interfaces (for mobile testing)
zola serve --interface 0.0.0.0 --port 1111

# Build for production
zola build

# Check for errors (fast)
zola check

# Verify site links
zola check --links
```

### Sass Compilation

Sass is compiled automatically by Zola when `compile_sass = true` in `zola.toml`. The entry point is `sass/main.scss` which imports partials.

## Project Structure

```
├── zola.toml              # Zola configuration
├── templates/            # Tera HTML templates
│   ├── base.html          # Base template (extends by all)
│   ├── home.html          # Homepage
│   ├── list.html          # Archive/list page
│   ├── page.html          # Single post + static pages
│   ├── section.html       # Section index
│   ├── taxonomy_list.html # Category/tag list
│   ├── taxonomy_term.html # Category/tag term
│   └── taxonomy_single.html
├── sass/                 # Sass stylesheets
│   ├── main.scss          # Entry point (imports all)
│   ├── _variables.scss    # Design tokens (colors, fonts, spacing)
│   ├── _base.scss        # Reset, typography, body
│   ├── _components.scss   # UI components (nav, cards, buttons)
│   ├── _layout.scss      # Page layouts (home grid, post layout)
│   └── _marquee.scss     # Marquee ticker animation
└── content/              # Markdown content
    ├── _index.md         # Homepage content
    ├── archives.md        # Archive page
    ├── about.md          # About page
    ├── contact.md        # Contact page
    └── posts/            # Blog posts
```

## Code Style Guidelines

### Tera Templates (HTML)

- Use Tera template syntax: `{% ... %}` for logic, `{{ ... }}` for variables
- Always extend `base.html` for new page templates
- Use `{% block content %}{% endblock %}` for content areas
- Access config via `config.title`, `config.extra.*`
- Access page data via `page.*` (title, date, content, permalink, taxonomies)
- Use `get_url(path="...")` for internal links
- Use `now() | date(format="%Y")` for dynamic year
- Prefer semantic HTML: `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`
- Include `aria-label` on buttons and icon-only elements
- Mobile navigation toggle uses class `nav-toggle` + `nav-links`

### Sass/CSS

- **Variables prefix**: `$` (colors, fonts, spacing, borders, shadows)
- **BEM naming**: `.block`, `.block__element`, `.block--modifier`
- **Component classes**: `.nav`, `.nav-container`, `.nav-link`, `.card`, `.card-title`
- **Animation easing**: Use `cubic-bezier(0.4, 0.0, 0.2, 1)` for smooth, `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce
- **Transition properties**: Always specify exact properties, avoid `transition: all`
- **GPU acceleration**: Use `will-change` for animated elements
- **Responsive**: Use `@media (max-width: 768px)` for mobile breakpoint
- **Prefer**: `transform` and `opacity` for animations (GPU accelerated)
- **Avoid**: `transition: all` which causes performance issues

### Zola Configuration (TOML)

- Taxonomies use array syntax: `taxonomies = [{ name = "categories" }, { name = "tags" }]`
- Extra variables in `[extra]` section for theme customization
- Site title in `title` field
- Base URL in `base_url` field

### Markdown Content

- Front matter uses `+++` delimiters (Zola native)
- Required front matter: `title`, `date`
- Optional: `template`, `description`, `[taxonomies]`
- Content below `+++` is Markdown with HTML support

### Git Commit Messages

- Use imperative mood: "Add feature" not "Added feature"
- First line: brief summary (50 chars or less)
- Body: explain what and why (optional)
- Reference issues: "Fixes #123" or "Closes #456"

### JavaScript (minimal)

- Only for mobile nav toggle
- Use vanilla JS, no frameworks
- Wait for `DOMContentLoaded` before manipulating DOM
- Use `classList.toggle()` for state changes

## Design Tokens

```scss
// Colors
$bg-color: #f5f0e6;        // Cream paper
$primary-color: #2563eb;    // Royal blue
$accent-color: #ff6b35;    // Warm orange
$text-color: #000000;
$white: #ffffff;
$border-color: #000000;

// Typography
$font-heading: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
$font-body: 'Noto Serif SC', Georgia, serif;

// Borders
$border-width: 3px;
$border: 3px solid #000000;

// Shadows (hard offset, no blur)
$shadow-sm: 4px 4px 0 $border-color;
$shadow-md: 6px 6px 0 $border-color;
$shadow-lg: 8px 8px 0 $border-color;
```

## Accessibility

- Always include `aria-label` on buttons and icon-only elements
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`)
- Support `prefers-reduced-motion` for animations
- Ensure color contrast meets WCAG AA
- Use `aria-hidden="true"` on decorative duplicate content (marquee)

## Performance

- Zola compiles Sass automatically - no manual build step needed
- Prefer CSS `transform` and `opacity` for animations (GPU acceleration)
- Use `will-change` sparingly on animated elements
- Marquee animation: 30s duration, linear timing
- No JavaScript frameworks - vanilla JS only for interactivity
