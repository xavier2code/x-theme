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

### Gallery

Photo gallery with hover overlay effects.

```html
<div class="gallery gallery--3">
  <div class="gallery-item">
    <img src="/images/photo1.jpg" alt="Description">
    <div class="gallery-overlay">
      <span class="gallery-title">Photo Title</span>
      <span class="gallery-description">Description text</span>
    </div>
  </div>
  <div class="gallery-item">
    <img src="/images/photo2.jpg" alt="Description">
    <div class="gallery-overlay">
      <span class="gallery-title">Photo Title</span>
    </div>
  </div>
</div>
```

**Classes:**
- `.gallery` - Container (add `--2`, `--3`, `--4` for column variants)
- `.gallery-item` - Individual gallery item
- `.gallery-overlay` - Hover overlay with title/description
- `.gallery-title` - Overlay title text
- `.gallery-description` - Overlay description text

---

### Portfolio Grid

Portfolio card grid with hover effects.

```html
<div class="portfolio-grid">
  <article class="portfolio-item">
    <img src="/images/project.jpg" alt="Project" class="portfolio-cover">
    <div class="portfolio-content">
      <h3 class="portfolio-title">Project Title</h3>
      <p class="portfolio-description">Project description text</p>
      <div class="portfolio-tags">
        <span class="tag">Zola</span>
        <span class="tag">Theme</span>
      </div>
    </div>
  </article>
</div>
```

**Classes:**
- `.portfolio-grid` - Container grid
- `.portfolio-item` - Individual portfolio card
- `.portfolio-cover` - Project cover image
- `.portfolio-content` - Card content area
- `.portfolio-title` - Project title
- `.portfolio-description` - Project description
- `.portfolio-tags` - Tag container

---

### Feature List

Icon + title + description layout.

```html
<div class="feature-list">
  <div class="feature-item">
    <div class="feature-icon">⚡</div>
    <h4 class="feature-title">Fast</h4>
    <p class="feature-description">Lightning fast performance</p>
  </div>
  <div class="feature-item">
    <div class="feature-icon">🎨</div>
    <h4 class="feature-title">Beautiful</h4>
    <p class="feature-description">90s print magazine aesthetic</p>
  </div>
</div>
```

**Classes:**
- `.feature-list` - Container grid
- `.feature-item` - Individual feature card
- `.feature-icon` - Icon container (48x48)
- `.feature-title` - Feature title
- `.feature-description` - Feature description

---

### Stats

Number + label statistics display.

```html
<div class="stats">
  <div class="stat-item">
    <span class="stat-number">100%</span>
    <span class="stat-label">Static</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">0</span>
    <span class="stat-label">JavaScript*</span>
  </div>
</div>
```

**Classes:**
- `.stats` - Container grid
- `.stat-item` - Individual stat card
- `.stat-number` - Large number display
- `.stat-label` - Label text (uppercase)

---

### Accordion

Expandable/collapsible content sections.

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-trigger" aria-expanded="false">
      Section Title
    </button>
    <div class="accordion-content" aria-hidden="true">
      <div class="accordion-body">
        Collapsible content goes here...
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-trigger" aria-expanded="false">
      Another Section
    </button>
    <div class="accordion-content" aria-hidden="true">
      <div class="accordion-body">
        More content...
      </div>
    </div>
  </div>
</div>
```

**Classes:**
- `.accordion` - Container
- `.accordion-item` - Individual accordion item
- `.accordion-trigger` - Clickable header (button)
- `.accordion-content` - Hidden content wrapper
- `.accordion-body` - Content inner padding

**Attributes:**
- `aria-expanded` - "true" or "false"
- `aria-hidden` - "true" or "false"

**Data Attributes:**
- `data-multiple="true"` - Allow multiple items open at once

**JavaScript:** `accordion.js` (auto-initialized)

---

### Tabs

Tabbed content panels.

```html
<div class="tabs">
  <div class="tab-list" role="tablist">
    <button class="tab-btn" role="tab" aria-selected="true" aria-controls="panel-1">
      Tab 1
    </button>
    <button class="tab-btn" role="tab" aria-selected="false" aria-controls="panel-2">
      Tab 2
    </button>
  </div>
  <div class="tab-panel" id="panel-1" role="tabpanel" aria-hidden="false">
    Content for panel 1...
  </div>
  <div class="tab-panel" id="panel-2" role="tabpanel" aria-hidden="true">
    Content for panel 2...
  </div>
</div>
```

**Classes:**
- `.tabs` - Container
- `.tab-list` - Tab button container
- `.tab-btn` - Individual tab button
- `.tab-panel` - Content panel

**Attributes:**
- `role="tablist"` - Container
- `role="tab"` - Tab buttons
- `role="tabpanel"` - Content panels
- `aria-selected` - "true" or "false"
- `aria-controls` - ID of panel
- `aria-hidden` - "true" or "false"

**Keyboard:** Arrow keys to navigate, Home/End

**JavaScript:** `tabs.js` (auto-initialized)

---

### Modal

Dialog overlay with focus trap.

```html
<!-- Trigger -->
<button class="btn" data-modal-open="my-modal">Open Modal</button>

<!-- Modal -->
<div class="modal" id="my-modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <button class="modal-close" aria-label="Close">&times;</button>
    <h3 class="modal-title">Modal Title</h3>
    <div class="modal-body">
      Modal content goes here...
    </div>
  </div>
</div>
```

**Classes:**
- `.modal` - Modal container (add `.open` to display)
- `.modal-overlay` - Clickable backdrop
- `.modal-content` - Modal content box
- `.modal-close` - Close button
- `.modal-title` - Modal header title
- `.modal-body` - Modal content area

**Data Attributes:**
- `data-modal-open="modal-id"` - Trigger button attribute

**Keyboard:** Escape to close, Tab trapping

**JavaScript:** `modal.js` (auto-initialized)

---

### Tooltip

Hover/focus tooltip with position awareness.

```html
<span class="tooltip">
  <span class="tooltip-text" data-position="top">Tooltip text</span>
  Hover me
</span>
```

**Classes:**
- `.tooltip` - Parent container
- `.tooltip-text` - Tooltip text element

**Data Attributes:**
- `data-position="top"` - Position (top, bottom, left, right)

**Accessibility:** `role="tooltip"`, focusable parent

**JavaScript:** `tooltip.js` (auto-initialized)

---

### Columns

Multi-column text layout.

```html
<div class="columns-2">
  <p>Your content here...</p>
  <p>More content...</p>
</div>
```

**Classes:**
- `.columns-2` - 2 column layout
- `.columns-3` - 3 column layout
- `.columns-4` - 4 column layout

---

### Blockquote

Styled quotation blocks.

```html
<blockquote class="blockquote">
  <p>Quote text here...</p>
</blockquote>

<!-- With accent style -->
<blockquote class="blockquote blockquote--accent">
  <p>Accented quote...</p>
</blockquote>

<!-- With purple style -->
<blockquote class="blockquote blockquote--purple">
  <p>Purple quote...</p>
</blockquote>

<!-- With emerald style -->
<blockquote class="blockquote blockquote--emerald">
  <p>Emerald quote...</p>
</blockquote>
```

**Classes:**
- `.blockquote` - Base blockquote
- `.blockquote--accent` - Orange accent variant
- `.blockquote--purple` - Purple variant
- `.blockquote--emerald` - Emerald variant

---

### Alerts

Information callout boxes.

```html
<div class="alert alert--info">
  <span class="alert-title">Information</span>
  <div class="alert-content">
    <p>This is an informational message.</p>
  </div>
</div>

<div class="alert alert--success">
  <span class="alert-title">Success</span>
  <div class="alert-content">
    <p>Operation completed successfully.</p>
  </div>
</div>

<div class="alert alert--warning">
  <span class="alert-title">Warning</span>
  <div class="alert-content">
    <p>Please review before proceeding.</p>
  </div>
</div>

<div class="alert alert--error">
  <span class="alert-title">Error</span>
  <div class="alert-content">
    <p>Something went wrong.</p>
  </div>
</div>
```

**Classes:**
- `.alert` - Base alert
- `.alert--info` - Blue info alert
- `.alert--success` - Green success alert
- `.alert--warning` - Yellow warning alert
- `.alert--error` - Red error alert
- `.alert-title` - Alert header
- `.alert-content` - Alert body content

---

### Code Block

Enhanced code block with copy button.

```html
<div class="code-block">
  <button class="code-copy-btn" aria-label="Copy code">Copy</button>
  <pre><code>your code here</code></pre>
</div>
```

**Classes:**
- `.code-block` - Container wrapper
- `.code-copy-btn` - Copy button (positioned top-right)
- `.code-copy-btn.copied` - State after successful copy

---

### Cards

Base card component used in various contexts.

```html
<article class="card">
  <span class="badge">Category</span>
  <h3 class="card-title"><a href="/post">Post Title</a></h3>
  <p class="card-meta">January 1, 2024</p>
  <p class="card-excerpt">Post excerpt text...</p>
  <a href="/post" class="btn btn-primary">Read More</a>
</article>
```

**Classes:**
- `.card` - Base card
- `.card-title` - Card title
- `.card-meta` - Metadata (date, author)
- `.card-excerpt` - Excerpt text

---

### Buttons

Call-to-action buttons.

```html
<a href="#" class="btn">Default</a>
<a href="#" class="btn btn-primary">Primary</a>
<a href="#" class="btn btn-accent">Accent</a>
```

**Classes:**
- `.btn` - Base button
- `.btn-primary` - Primary blue button
- `.btn-accent` - Accent orange button

---

### Tags & Badges

Category badges and tags.

```html
<span class="badge">Featured</span>
<span class="tag">Zola</span>
<span class="tag">Theme</span>
```

**Classes:**
- `.badge` - Category badge (blue)
- `.tag` - Tag label (orange)

---

## Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `$primary-color` | `#2563eb` | Royal Blue - Primary actions |
| `$primary-light` | `rgba(37, 99, 235, 0.1)` | Light backgrounds |
| `$accent-color` | `#ff6b35` | Warm Orange - Highlights |
| `$accent-light` | `rgba(255, 107, 53, 0.1)` | Light backgrounds |
| `$purple` | `#8b5cf6` | Electric Purple - Accents |
| `$purple-light` | `rgba(139, 92, 246, 0.1)` | Light backgrounds |
| `$emerald` | `#10b981` | Emerald Green - Success |
| `$emerald-light` | `rgba(16, 185, 129, 0.1)` | Light backgrounds |
| `$rose` | `#f43f5e` | Rose Pink - Errors/Warnings |
| `$rose-light` | `rgba(244, 63, 94, 0.1)` | Light backgrounds |
| `$bg-color` | `#f5f0e6` | Cream Paper - Background |
| `$text-color` | `#000000` | Black - Text |
| `$border-color` | `#000000` | Black - Borders |

---

## Configuration

See [docs/configuration.md](./docs/configuration.md) for full configuration guide including:

- Theme setup and taxonomies
- All `extra` settings (`marquee_text`, `github_url`, `archive_posts_count`, etc.)
- Static asset overrides
- Content structure and front matter

### Author Customization

Configure author info via `zola.toml`:

```toml
[extra]
author_subtitle = "FULL-STACK DEVELOPER · LOCATION"
author_quote = "Your quote here."
author_bio = "Your bio here."
brand = "Your Brand"
```

---

## Content Format

```markdown
+++
title = "My Post"
date = 2024-01-01
description = "Post description"
[taxonomies]
categories = ["Tech"]
tags = ["Zola", "Theme"]
+++

Post content here.
```

## License

MIT
