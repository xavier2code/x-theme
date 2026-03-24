# Zola Blog Theme: 90s Print Magazine Design

## Overview

A Zola static site theme inspired by 20th-century print media with grid layouts, overlapping elements, and high-contrast "anti-design" aesthetics. The theme creates a digital art magazine feel with Dribbble's playful, tactile, nostalgic vibe.

## Design Language

### Color Palette
- **Background**: Cream `#f5f0e6` (paper-like warmth)
- **Primary**: Royal Blue `#2563eb`
- **Accent**: Warm Orange `#ff6b35`
- **Text**: Black `#000000`
- **Borders**: Black `#000000`

### Typography
- **Headings**: Playfair Display (Google Fonts) - bold, dramatic serifs
- **Body**: System serif stack fallback for readability
- **Scale**: Large display headings (48-72px), comfortable body (16-18px)

### Visual Effects
- **Borders**: 3-4px solid black on all interactive/structural elements
- **Shadows**: Hard drop shadows (4-8px offset, no blur) in black
- **Overlap**: Elements break grid boundaries with z-depth layering
- **Marquee**: Horizontal scrolling text ticker at bottom of pages

## Page Types

### 1. Homepage
- Asymmetric grid layout: large hero article (2/3 width) + sidebar stack (1/3 width)
- Hero features latest/pinned post with full image
- Sidebar contains smaller post cards stacked vertically
- Marquee ticker at bottom with scrolling text
- Top navigation bar

### 2. Archive / List Page
- Grid of post cards (2-3 columns)
- Each card: title, date, excerpt, category badge
- Overlapping card effect on hover
- Hard shadows and borders

### 3. Single Post Page
- Centered single column (max-width: 65ch)
- Category badge above title
- Large Playfair Display title
- Generous line-height (1.8) for readability
- Optional orange text highlight for emphasis
- Previous/Next post navigation

### 4. Static Page
- Same centered layout as single post
- For About, Contact, etc.

## Components

### Navigation Bar
- Connected pill-style buttons with 3px black borders
- Background: Blue `#2563eb` for active, White for inactive
- No gap between buttons (connected system UI aesthetic)
- Sticky on scroll

### Post Card
- White background on cream
- 3px black border
- 6px hard drop shadow (offset: 6px 6px)
- Title in Playfair Display
- Hover: shadow increases to 8px, slight translate

### Category Badge
- Inline-block display
- Blue background, white text
- 3px black border
- Small padding (8px 16px)

### Marquee Ticker
- Black background, cream text
- Continuous horizontal scroll animation
- 3px black top/bottom borders
- Fixed to viewport bottom or within page footer

### Buttons
- Pill shape (border-radius: 0 or slight)
- 3px black border
- Hard shadow on hover
- Blue primary, white secondary

## Technical Approach

### Framework
- Zola static site generator
- Tera templates for all pages
- Sass for stylesheets (compiled by Zola)

### File Structure
```
├── zola.toml              # Zola configuration
├── content/               # Markdown content
│   ├── _index.md         # Homepage content
│   ├── archive.md        # Archive page
│   └── posts/            # Blog posts
├── templates/            # Tera templates
│   ├── base.html         # Base template
│   ├── home.html         # Homepage
│   ├── list.html         # Archive/list
│   ├── page.html         # Single post
│   └── page.html         # Static page
├── sass/                 # Stylesheets
│   ├── _variables.scss   # Colors, fonts
│   ├── _base.scss        # Reset, typography
│   ├── _components.scss  # Buttons, cards, badges
│   ├── _layout.scss      # Grid, containers
│   └── main.scss         # Import all
└── static/              # Images, fonts
```

### Key Zola Features
- Section organization for posts
- Paginated lists for archive
- Taxonomies for categories
- Custom front matter for post metadata

## Responsive Strategy

- Desktop: Full asymmetric grid
- Tablet: Simplified 2-column grid
- Mobile: Single column, stacked layout
- Navigation collapses to hamburger or scrollable pills

## Interactions

- Hover states on all clickable elements (shadow + translate)
- Marquee continuous animation (CSS keyframes)
- Smooth scroll for anchor links
- No JavaScript required (Zola's static nature)
