# Zola 90s Print Magazine Theme - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Zola blog theme with 90s print magazine aesthetics - asymmetric grid layout, overlapping elements, hard drop shadows, marquee ticker, and bold Playfair Display typography.

**Architecture:** Zola static site with Tera templates and Sass. Theme creates 4 page types: homepage (asymmetric grid), archive (post cards), single post (centered column), and static page. All styling via Sass with CSS variables.

**Tech Stack:** Zola, Tera templates, Sass, Google Fonts (Playfair Display)

---

## File Structure

```
├── zola.toml                        # Zola config (update)
├── content/
│   ├── _index.md                   # Homepage content
│   ├── archive.md                  # Archive page
│   └── posts/
│       └── _index.md               # Posts section index
├── templates/
│   ├── base.html                   # Base template (HTML, head, nav, footer, marquee)
│   ├── home.html                   # Homepage template
│   ├── list.html                   # Archive/post list template
│   ├── page.html                   # Single post + static page template
│   └── section.html                # Section (posts archive) template
├── sass/
│   ├── _variables.scss             # Colors, fonts, spacing
│   ├── _base.scss                  # Reset, typography, body
│   ├── _components.scss            # Buttons, cards, badges, nav
│   ├── _layout.scss                # Grid, containers, responsive
│   ├── _marquee.scss               # Scrolling ticker animation
│   └── main.scss                   # Import all
└── static/
    └── fonts/                       # Local font files (optional)
```

---

## Zola Configuration

### Task 1: Update zola.toml

**Files:**
- Modify: `zola.toml`

- [ ] **Step 1: Update zola.toml**

```toml
base_url = "https://example.com"
title = "My Blog"
compile_sass = true
build_search_index = false

[markdown]
insert_anchor_links = true
highlight_code = false

[markdown.highlighting]
theme = "catppuccin-mocha"

[extra]
# Theme colors
bg_color = "#f5f0e6"
primary_color = "#2563eb"
accent_color = "#ff6b35"
text_color = "#000000"

[taxonomies]
category = "categories"
```

---

## Base Template

### Task 2: Create base.html

**Files:**
- Create: `templates/base.html`

- [ ] **Step 1: Create base.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{{ config.title }}{% endblock %}</title>
    
    <!-- Google Fonts: Playfair Display -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="{{ get_url(path="main.css") }}">
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-container">
            <a href="{{ get_url(path="/") }}" class="nav-link {% if current_path == "/" %}active{% endif %}">HOME</a>
            <a href="{{ get_url(path="@/_index.md") }}" class="nav-link {% if current_path == "/archive" %}active{% endif %}">ARCHIVE</a>
            <a href="{{ get_url(path="about") }}" class="nav-link {% if current_path == "/about" %}active{% endif %}">ABOUT</a>
            <a href="{{ get_url(path="contact") }}" class="nav-link {% if current_path == "/contact" %}active{% endif %}">CONTACT</a>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
        {% block content %}{% endblock %}
    </main>

    <!-- Marquee Ticker -->
    <div class="marquee">
        <div class="marquee-content">
            <span>★ WELCOME TO MY BLOG ★ LATEST POSTS ★ 90S PRINT AESTHETIC ★ SCROLLING NEWS ★ DESIGN ★ ART ★ CREATIVITY ★ </span>
            <span aria-hidden="true">★ WELCOME TO MY BLOG ★ LATEST POSTS ★ 90S PRINT AESTHETIC ★ SCROLLING NEWS ★ DESIGN ★ ART ★ CREATIVITY ★ </span>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; {{ now() | date(format="%Y") }} {{ config.title }}. Built with Zola.</p>
    </footer>
</body>
</html>
```

---

## SCSS Stylesheets

### Task 3: Create Sass Variables

**Files:**
- Create: `sass/_variables.scss`

- [ ] **Step 1: Create _variables.scss**

```scss
// Colors
$bg-color: #f5f0e6;
$primary-color: #2563eb;
$accent-color: #ff6b35;
$text-color: #000000;
$white: #ffffff;
$border-color: #000000;

// Typography
$font-heading: 'Playfair Display', Georgia, serif;
$font-body: Georgia, serif;

// Spacing
$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
$spacing-md: 1.5rem;
$spacing-lg: 2rem;
$spacing-xl: 3rem;

// Borders
$border-width: 3px;
$border: $border-width solid $border-color;

// Shadows
$shadow-sm: 4px 4px 0 $border-color;
$shadow-md: 6px 6px 0 $border-color;
$shadow-lg: 8px 8px 0 $border-color;

// Layout
$max-width: 1200px;
$content-width: 65ch;
$nav-height: 60px;
```

### Task 4: Create Base Styles

**Files:**
- Create: `sass/_base.scss`

- [ ] **Step 1: Create _base.scss**

```scss
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: $font-body;
    background-color: $bg-color;
    color: $text-color;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

h1, h2, h3, h4, h5, h6 {
    font-family: $font-heading;
    font-weight: 700;
    line-height: 1.2;
}

h1 { font-size: 3rem; }
h2 { font-size: 2.25rem; }
h3 { font-size: 1.5rem; }

p {
    margin-bottom: $spacing-sm;
}

a {
    color: $primary-color;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

.main {
    flex: 1;
    max-width: $max-width;
    margin: 0 auto;
    padding: $spacing-lg $spacing-md;
    width: 100%;
}

.footer {
    text-align: center;
    padding: $spacing-md;
    border-top: $border;
    font-size: 0.875rem;
}
```

### Task 5: Create Component Styles

**Files:**
- Create: `sass/_components.scss`

- [ ] **Step 1: Create _components.scss**

```scss
// Navigation
.nav {
    background: $white;
    border-bottom: $border;
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-container {
    max-width: $max-width;
    margin: 0 auto;
    display: flex;
    padding: 0;
}

.nav-link {
    font-family: $font-heading;
    font-weight: 700;
    font-size: 0.875rem;
    padding: $spacing-sm $spacing-md;
    color: $text-color;
    border-right: $border;
    display: block;
    transition: all 0.2s ease;
    
    &:hover {
        background: $primary-color;
        color: $white;
        text-decoration: none;
    }
    
    &.active {
        background: $primary-color;
        color: $white;
    }
    
    &:last-child {
        border-right: none;
    }
}

// Category Badge
.badge {
    display: inline-block;
    background: $primary-color;
    color: $white;
    padding: $spacing-xs $spacing-sm;
    border: $border;
    font-family: $font-heading;
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;
}

// Post Card
.card {
    background: $white;
    border: $border;
    box-shadow: $shadow-md;
    padding: $spacing-md;
    transition: all 0.2s ease;
    
    &:hover {
        box-shadow: $shadow-lg;
        transform: translate(-2px, -2px);
    }
    
    &-title {
        font-family: $font-heading;
        font-size: 1.25rem;
        margin-bottom: $spacing-sm;
    }
    
    &-meta {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: $spacing-sm;
    }
    
    &-excerpt {
        font-size: 0.9375rem;
        line-height: 1.6;
    }
}

// Buttons
.btn {
    display: inline-block;
    font-family: $font-heading;
    font-weight: 700;
    font-size: 0.875rem;
    padding: $spacing-sm $spacing-md;
    border: $border;
    background: $white;
    color: $text-color;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: $primary-color;
        color: $white;
        box-shadow: $shadow-sm;
        text-decoration: none;
    }
    
    &-primary {
        background: $primary-color;
        color: $white;
        
        &:hover {
            background: darken($primary-color, 10%);
        }
    }
    
    &-accent {
        background: $accent-color;
        color: $white;
        
        &:hover {
            background: darken($accent-color, 10%);
        }
    }
}
```

### Task 6: Create Layout Styles

**Files:**
- Create: `sass/_layout.scss`

- [ ] **Step 1: Create _layout.scss**

```scss
// Homepage Grid
.home-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: $spacing-lg;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.hero-post {
    grid-column: 1;
    
    .card {
        height: 100%;
    }
    
    .card-image {
        width: 100%;
        height: 300px;
        background: #ddd;
        border-bottom: $border;
        margin-bottom: $spacing-md;
        object-fit: cover;
    }
}

.sidebar-posts {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    
    @media (max-width: 768px) {
        grid-column: 1;
    }
    
    .card {
        box-shadow: $shadow-sm;
        
        &:hover {
            box-shadow: $shadow-md;
        }
    }
}

// Archive Grid
.archive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacing-lg;
}

// Single Post Layout
.post-layout {
    max-width: $content-width;
    margin: 0 auto;
    
    .post-header {
        margin-bottom: $spacing-xl;
        
        .badge {
            margin-bottom: $spacing-sm;
        }
        
        h1 {
            margin-bottom: $spacing-sm;
        }
    }
    
    .post-meta {
        font-size: 0.875rem;
        color: #666;
        padding-bottom: $spacing-md;
        border-bottom: $border;
    }
    
    .post-content {
        font-size: 1.125rem;
        line-height: 1.8;
        
        p {
            margin-bottom: $spacing-md;
        }
        
        h2, h3 {
            margin-top: $spacing-xl;
            margin-bottom: $spacing-md;
        }
        
        blockquote {
            border-left: 4px solid $primary-color;
            padding-left: $spacing-md;
            margin: $spacing-lg 0;
            font-style: italic;
        }
        
        code {
            background: darken($bg-color, 5%);
            padding: 2px 6px;
            border: 1px solid #ddd;
        }
        
        pre {
            background: #1a1a1a;
            color: #f8f8f2;
            padding: $spacing-md;
            overflow-x: auto;
            border: $border;
            margin: $spacing-lg 0;
        }
    }
    
    .highlight {
        background: $accent-color;
        color: $white;
        padding: 2px 6px;
    }
}

// Post Navigation
.post-nav {
    display: flex;
    justify-content: space-between;
    margin-top: $spacing-xl;
    padding-top: $spacing-lg;
    border-top: $border;
    
    .prev, .next {
        max-width: 45%;
    }
    
    .next {
        text-align: right;
        margin-left: auto;
    }
}
```

### Task 7: Create Marquee Animation

**Files:**
- Create: `sass/_marquee.scss`

- [ ] **Step 1: Create _marquee.scss**

```scss
.marquee {
    background: $text-color;
    color: $bg-color;
    border-top: $border;
    border-bottom: $border;
    overflow: hidden;
    padding: $spacing-sm 0;
}

.marquee-content {
    display: flex;
    width: fit-content;
    animation: marquee 20s linear infinite;
}

.marquee span {
    white-space: nowrap;
    padding-right: 2rem;
    font-family: $font-heading;
    font-weight: 700;
    font-size: 0.875rem;
    letter-spacing: 1px;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
```

### Task 8: Create Main SCSS Entry

**Files:**
- Create: `sass/main.scss`

- [ ] **Step 1: Create main.scss**

```scss
@import "variables";
@import "base";
@import "components";
@import "layout";
@import "marquee";
```

---

## Templates

### Task 9: Create Homepage Template

**Files:**
- Create: `templates/home.html`

- [ ] **Step 1: Create templates/home.html**

```html
{% extends "base.html" %}

{% block content %}
<div class="home-grid">
    {% set hero_post = get_section(path="posts/_index.md") %}
    {% if hero_post.pages %}
    {% set latest = hero_post.pages | first %}
    <article class="hero-post">
        <div class="card">
            {% if latest.extra.image %}
            <img src="{{ latest.extra.image }}" alt="{{ latest.title }}" class="card-image">
            {% else %}
            <div class="card-image" style="background: linear-gradient(135deg, #2563eb 0%, #ff6b35 100%);"></div>
            {% endif %}
            <div class="card-content">
                {% if latest.taxonomies.categories %}
                <span class="badge">{{ latest.taxonomies.categories[0] }}</span>
                {% endif %}
                <h2 class="card-title"><a href="{{ latest.permalink }}">{{ latest.title }}</a></h2>
                <p class="card-meta">{{ latest.date | date(format="%B %d, %Y") }}</p>
                <p class="card-excerpt">{{ latest.description }}</p>
                <a href="{{ latest.permalink }}" class="btn btn-primary">Read More</a>
            </div>
        </div>
    </article>
    {% endif %}
    
    <aside class="sidebar-posts">
        {% for page in hero_post.pages | slice(start=1, end=5) %}
        <article class="card">
            {% if page.taxonomies.categories %}
            <span class="badge">{{ page.taxonomies.categories[0] }}</span>
            {% endif %}
            <h3 class="card-title"><a href="{{ page.permalink }}">{{ page.title }}</a></h3>
            <p class="card-meta">{{ page.date | date(format="%B %d, %Y") }}</p>
        </article>
        {% endfor %}
    </aside>
</div>
{% endblock %}
```

### Task 10: Create Archive/List Template

**Files:**
- Create: `templates/list.html`

- [ ] **Step 1: Create templates/list.html**

```html
{% extends "base.html" %}

{% block content %}
<h1 style="margin-bottom: 2rem; border-bottom: 3px solid black; padding-bottom: 1rem;">
    {% if term %}
    Category: {{ term }}
    {% else %}
    All Posts
    {% endif %}
</h1>

<div class="archive-grid">
    {% for page in paginator.pages %}
    <article class="card">
        {% if page.taxonomies.categories %}
        <span class="badge">{{ page.taxonomies.categories[0] }}</span>
        {% endif %}
        <h2 class="card-title"><a href="{{ page.permalink }}">{{ page.title }}</a></h2>
        <p class="card-meta">{{ page.date | date(format="%B %d, %Y") }}</p>
        {% if page.description %}
        <p class="card-excerpt">{{ page.description }}</p>
        {% endif %}
        <a href="{{ page.permalink }}" class="btn">Read More</a>
    </article>
    {% endfor %}
</div>

{% if paginator.previous or paginator.next %}
<nav class="post-nav" style="margin-top: 3rem;">
    {% if paginator.previous %}
    <a href="{{ paginator.previous }}" class="btn">← Newer Posts</a>
    {% endif %}
    {% if paginator.next %}
    <a href="{{ paginator.next }}" class="btn">Older Posts →</a>
    {% endif %}
</nav>
{% endif %}
{% endblock %}
```

### Task 11: Create Single Post Template

**Files:**
- Create: `templates/page.html`

- [ ] **Step 1: Create templates/page.html**

```html
{% extends "base.html" %}

{% block content %}
<article class="post-layout">
    <header class="post-header">
        {% if page.taxonomies.categories %}
        <span class="badge">{{ page.taxonomies.categories[0] }}</span>
        {% endif %}
        <h1>{{ page.title }}</h1>
        <div class="post-meta">
            <time datetime="{{ page.date }}">{{ page.date | date(format="%B %d, %Y") }}</time>
            {% if page.taxonomies.tags %}
            • Tags: {{ page.taxonomies.tags | join(", ") }}
            {% endif %}
        </div>
    </header>
    
    <div class="post-content">
        {{ page.content | safe }}
    </div>
    
    <nav class="post-nav">
        {% if page.lighter %}
        <a href="{{ page.lighter.permalink }}" class="prev">
            <span class="btn">← {{ page.lighter.title }}</span>
        </a>
        {% endif %}
        {% if page.heavier %}
        <a href="{{ page.heavier.permalink }}" class="next">
            <span class="btn">{{ page.heavier.title }} →</span>
        </a>
        {% endif %}
    </nav>
</article>
{% endblock %}
```

### Task 12: Create Section Template for Posts

**Files:**
- Create: `templates/section.html`

- [ ] **Step 1: Create templates/section.html**

```html
{% extends "base.html" %}

{% block content %}
<h1 style="margin-bottom: 2rem; border-bottom: 3px solid black; padding-bottom: 1rem;">
    {{ section.title }}
</h1>

<div class="archive-grid">
    {% for page in section.pages %}
    <article class="card">
        {% if page.taxonomies.categories %}
        <span class="badge">{{ page.taxonomies.categories[0] }}</span>
        {% endif %}
        <h2 class="card-title"><a href="{{ page.permalink }}">{{ page.title }}</a></h2>
        <p class="card-meta">{{ page.date | date(format="%B %d, %Y") }}</p>
        {% if page.description %}
        <p class="card-excerpt">{{ page.description }}</p>
        {% endif %}
    </article>
    {% endfor %}
</div>
{% endblock %}
```

---

## Content Setup

### Task 13: Create Content Files

**Files:**
- Create: `content/_index.md`
- Create: `content/archives.md`
- Create: `content/posts/_index.md`
- Create: `content/about.md`
- Create: `content/contact.md`

- [ ] **Step 1: Create content/_index.md`

```markdown
+++
title = "Home"
template = "home.html"
sort_by = "date"
+++
```

- [ ] **Step 2: Create content/archives.md**

```markdown
+++
title = "Archive"
template = "list.html"
sort_by = "date"
paginate_by = 10
+++
```

- [ ] **Step 3: Create content/posts/_index.md**

```markdown
+++
title = "Posts"
template = "section.html"
sort_by = "date"
+++
```

- [ ] **Step 4: Create content/about.md**

```markdown
+++
title = "About"
template = "page.html"
sort_by = "date"
+++

# About Me

Welcome to my blog! This is a personal space where I share thoughts on design, art, and creativity.

## The Theme

This blog uses a custom Zola theme inspired by 90s print magazines - featuring grid layouts, bold typography, and that tactile Dribbble aesthetic.
```

- [ ] **Step 5: Create content/contact.md**

```markdown
+++
title = "Contact"
template = "page.html"
sort_by = "date"
+++

# Contact

Get in touch with me:

- Email: hello@example.com
- Twitter: @username
```

---

## Build and Test

### Task 14: Build and Verify

**Files:**
- Test: Full Zola site

- [ ] **Step 1: Install Zola (if not installed)**

Run: `brew install zola` (macOS) or see https://www.getzola.org/documentation/getting-started/installation/

- [ ] **Step 2: Serve locally to test**

Run: `cd /Users/xavier/Projects/github/x-theme && zola serve`

Expected: Server starts on http://127.0.0.1:1111

- [ ] **Step 3: Verify all pages load**

Open http://127.0.0.1:1111 and check:
- Homepage loads with asymmetric grid
- Navigation bar visible with pill buttons
- Marquee ticker animating at bottom
- Archive page shows posts
- Single post page has centered content
- Static pages (About, Contact) work

- [ ] **Step 4: Verify styles**

Check browser devtools:
- Cream background (#f5f0e6)
- Blue primary (#2563eb) and orange accent (#ff6b35)
- Playfair Display font loaded
- Hard drop shadows on cards
- Thick black borders visible

- [ ] **Step 5: Build for production**

Run: `zola build`

Expected: `_site` directory created with all static files

---

## Plan Complete

**Save plan to:** `docs/superpowers/plans/2026-03-24-zola-blog-90s-print-theme.md`
