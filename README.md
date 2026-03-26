# x-theme

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Zola](https://img.shields.io/badge/Zola-0.22+-orange.svg)](https://www.getzola.org/)

A Zola static site generator theme inspired by 90s print magazines with bold typography, hard shadows, and nostalgic scrolling marquees.

## Installation

### As Git Submodule (Recommended)

```bash
cd your-zola-site
git submodule add https://github.com/xavier2code/x-theme.git themes/x-theme
```

### Clone Directly

```bash
cd your-zola-site/themes
git clone https://github.com/xavier2code/x-theme.git
```

### Enable Theme

Add to your `zola.toml`:

```toml
theme = "x-theme"
```

## Quick Start

### Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) 0.22+

### Development

```bash
# Serve locally
zola serve

# Serve on all interfaces (for mobile testing)
zola serve --interface 0.0.0.0 --port 1111

# Build for production
zola build

# Check for errors
zola check
```

## Project Structure

```
├── templates/            # Tera HTML templates
│   ├── base.html          # Base template
│   ├── home.html          # Homepage
│   ├── list.html          # Archive/list page
│   ├── page.html          # Single post + static pages
│   └── ...
├── sass/                 # Sass stylesheets
│   ├── main.scss          # Entry point
│   ├── _variables.scss    # Design tokens, colors, typography
│   ├── _base.scss         # Reset, typography, body
│   ├── _components.scss   # Navigation, cards, buttons, search
│   ├── _layout.scss       # Page layouts
│   ├── _content.scss      # Gallery, portfolio, features, stats
│   ├── _interactive.scss # Accordion, tabs, modal, tooltip
│   ├── _enhanced.scss     # Columns, blockquote, alerts
│   └── ...
├── static/js/            # JavaScript modules
│   ├── search.js         # Search functionality
│   ├── accordion.js       # Accordion component
│   ├── tabs.js           # Tab component
│   ├── modal.js          # Modal component
│   └── tooltip.js        # Tooltip component
└── theme.toml            # Theme configuration
```

## Components

### Content Display
- **Gallery** - `.gallery`, `.gallery-item`, `.gallery-overlay`
- **Portfolio Grid** - `.portfolio-grid`, `.portfolio-item`
- **Feature List** - `.feature-list`, `.feature-item`
- **Stats** - `.stats`, `.stat-item`

### Interactive
- **Accordion** - `.accordion`, `.accordion-item` (JS: `accordion.js`)
- **Tabs** - `.tabs`, `.tab-btn`, `.tab-panel` (JS: `tabs.js`)
- **Modal** - `.modal`, `.modal-overlay` (JS: `modal.js`)
- **Tooltip** - `.tooltip`, `.tooltip-text` (JS: `tooltip.js`)

### Layout Enhancement
- **Columns** - `.columns-2`, `.columns-3`, `.columns-4`
- **Blockquote** - `.blockquote`, `.blockquote--accent`, `.blockquote--purple`, `.blockquote--emerald`
- **Alerts** - `.alert`, `.alert--info`, `.alert--success`, `.alert--warning`, `.alert--error`
- **Code Block** - `.code-block`, `.code-copy-btn`

## Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `$primary-color` | `#2563eb` | Royal Blue |
| `$accent-color` | `#ff6b35` | Warm Orange |
| `$purple` | `#8b5cf6` | Electric Purple |
| `$emerald` | `#10b981` | Emerald Green |
| `$rose` | `#f43f5e` | Rose Pink |
| `$bg-color` | `#f5f0e6` | Cream Paper |

## Configuration

Edit your site's `zola.toml`:

```toml
base_url = "https://example.com"
title = "My Blog"
theme = "x-theme"
compile_sass = true

taxonomies = [
    { name = "categories", feed = true },
    { name = "tags", feed = true }
]

[extra]
marquee_text = "★ WELCOME TO MY BLOG ★"
```

## Content Format

```markdown
+++
title = "My Post"
date = 2024-01-01
+++

Post content here.
```

## License

MIT
