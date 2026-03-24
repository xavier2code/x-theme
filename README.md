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
│   ├── _variables.scss    # Design tokens
│   ├── _base.scss         # Reset, typography
│   ├── _components.scss   # UI components
│   └── ...
└── zola.toml              # Theme configuration
```

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
