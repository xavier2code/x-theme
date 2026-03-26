# Configuration

All configuration is done through `zola.toml` in your site root.

## Theme Setup

Add `x-theme` to your theme list:

```toml
theme = "x-theme"
compile_sass = true
```

## Taxonomies

Enable taxonomies for categories and tags (required for filter buttons):

```toml
taxonomies = [
    { name = "categories", feed = true },
    { name = "tags", feed = true }
]
```

## Extra Settings

The `extra` section in `zola.toml` configures all theme-specific options:

```toml
[extra]
# ===========================================
# Author Info
# ===========================================
author_name = "Your Name"
author_nickname = "2"                    # Used in masthead title (e.g., "YourName<br><em>2</em>code")
author_subtitle = "FULL-STACK DEVELOPER · LOCATION · TOPICS"
author_quote = "Your quote here.<br>Line breaks supported."
author_bio = "Your bio here. <strong>HTML</strong> supported."

# ===========================================
# About Page
# ===========================================
about_name = "Your Name"
about_nickname = "2"
about_role = "FULL-STACK DEVELOPER · WUHAN, CHINA"
about_img = "featured1.jpg"
about_est = "EST. 2024"
about_bio_1 = "Bio paragraph 1 with <strong>HTML</strong>."
about_bio_2 = "Bio paragraph 2."
about_bio_3 = "Bio paragraph 3."
about_want_collaborate = "Want to collaborate?"
about_open_to = "OPEN TO FREELANCE, OSS & INTERESTING PROJECTS"
about_email = "hello@example.com"
about_github_url = "https://github.com/yourname"
about_blog_url = "yourname.github.io/blog"

# ===========================================
# Skills (TOML array of tables)
# ===========================================
[[extra.skills]]
name = "Frontend"
desc = "React, Vue, TypeScript"
level = 85

[[extra.skills]]
name = "Backend"
desc = "Node.js, Python, Rust"
level = 78

[[extra.skills]]
name = "AI / LLM"
desc = "OpenAI API, Claude, RAG"
level = 82

[[extra.skills]]
name = "DevOps"
desc = "Docker, GitHub Actions, Nginx"
level = 75

[[extra.skills]]
name = "Tools"
desc = "Zola, Git, Vim, Figma"
level = 90

[[extra.skills]]
name = "Design"
desc = "90s Print Aesthetic, Grid Systems"
level = 65

# ===========================================
# Timeline (TOML array of tables)
# ===========================================
[[extra.timeline]]
year = "2024 — NOW"
title = "Current Role"
desc = "Role description."

[[extra.timeline]]
year = "2022 — 2024"
title = "Previous Role"
desc = "Role description."

[[extra.timeline]]
year = "2019 — 2022"
title = "Education"
desc = "Degree or early career."

# ===========================================
# Marquee Text
# ===========================================
marquee_text = "★ WELCOME TO MY BLOG ★"           # Default (fallback)
marquee_home = "★ LATEST POSTS ★"                  # Homepage specific
marquee_about = "★ ABOUT ME ★"                     # About page specific
marquee_archive = "★ ALL POSTS ★"                   # Archive page specific

# ===========================================
# Social Links
# ===========================================
github_url = "https://github.com/username"

# ===========================================
# Archive
# ===========================================
archive_posts_count = 4
```

## Complete Extra Keys Reference

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `author_name` | string | `"Xavier"` | Author display name |
| `author_nickname` | string | `"2"` | Nickname for masthead |
| `author_subtitle` | string | `"FULL-STACK DEVELOPER · LOCATION"` | Subtitle under masthead title |
| `author_quote` | string | - | Quote on homepage about section |
| `author_bio` | string | - | Bio text on homepage |
| `brand` | string | `config.title` | Brand name in nav |
| `about_name` | string | `"Xavier"` | About page name |
| `about_nickname` | string | `"2"` | About page nickname |
| `about_role` | string | `"FULL-STACK DEVELOPER · LOCATION"` | About page role |
| `about_img` | string | `"featured1.jpg"` | About page portrait |
| `about_est` | string | `"EST. 2024"` | About page establishment stamp |
| `about_bio_1` | string | - | About page bio paragraph 1 |
| `about_bio_2` | string | - | About page bio paragraph 2 |
| `about_bio_3` | string | - | About page bio paragraph 3 |
| `about_want_collaborate` | string | `"Want to collaborate?"` | CTA title |
| `about_open_to` | string | - | CTA subtitle |
| `about_email` | string | - | Contact email |
| `about_github_url` | string | - | GitHub profile URL |
| `about_blog_url` | string | - | Blog URL for link card |
| `skills` | array | `[]` | Skills array with name, desc, level |
| `timeline` | array | `[]` | Timeline array with year, title, desc |
| `marquee_text` | string | - | Default marquee text |
| `marquee_home` | string | `marquee_text` | Homepage marquee |
| `marquee_about` | string | `marquee_text` | About page marquee |
| `marquee_archive` | string | `marquee_text` | Archive marquee |
| `github_url` | string | - | GitHub link in footer |
| `archive_posts_count` | int | `4` | Posts on archive page |

## Static Assets

### Default Theme Images

The theme provides default images in `themes/x-theme/static/`:

| File | Usage |
|------|-------|
| `avatar.jpg` | Author avatar (homepage about section) |
| `hero.jpg` | Homepage hero image |
| `featured1.jpg` | About page portrait |
| `featured2.jpg` | Reserved |
| `featured3.jpg` | Reserved |

### Overriding Default Images

Zola uses a **priority cascade** for static files:

1. `your-site/static/` (highest priority)
2. `themes/x-theme/static/`

To override, place a file with the **same name** in your site's `static/` directory:

```bash
# Example: Override the avatar
cp /path/to/your-avatar.png your-site/static/avatar.jpg
```

## Content Structure

### Required Sections

```
content/
├── _index.md       # Homepage content (uses index.html template)
├── posts/
│   └── _index.md   # Posts section (required for archive)
├── about.md        # About page
└── archives/
    └── _index.md   # Archive page
```

### Homepage Content (`content/_index.md`)

```toml
+++
title = "Home"
template = "index.html"
+++
```

### Post Front Matter

```toml
+++
title = "My Post Title"
date = 2024-01-01
description = "Post description for meta tags and cards"
[taxonomies]
categories = ["Tech"]
tags = ["Zola", "Tutorial"]
+++

Post content here.
```

### Optional Post Settings

```toml
[extra]
cover = "/images/my-cover.jpg"  # Post cover image
read_time = 5                   # Estimated read time (minutes)
```

## Internationalization (i18n)

The theme supports English and Chinese out of the box:

- English: `i18n/en.toml`
- Chinese: `i18n/zh.toml`

URLs starting with `/en` will use English, others use Chinese by default.

To add a new language, copy `en.toml` and translate the values.

### Adding New Languages

1. Copy `i18n/en.toml` to `i18n/[lang].toml`
2. Translate all values
3. Add language detection in `base.html` if needed

## Filter Buttons

Category filter buttons on archive pages are automatically generated from your taxonomies. Ensure `categories` taxonomy is defined:

```toml
taxonomies = [
    { name = "categories", feed = true },
    { name = "tags", feed = true }
]
```

The filter buttons will show all categories that have at least one post.
