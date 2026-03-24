# x-theme

A Zola static site generator theme inspired by 90s print magazines.

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
├── zola.toml              # Zola configuration
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
└── content/              # Markdown content
    ├── _index.md
    ├── about.md
    └── posts/
```

## Configuration

Edit `zola.toml`:

```toml
base_url = "https://example.com"
title = "My Blog"
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
