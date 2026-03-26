# Configuration

All configuration is done through `zola.toml` in your site root.

## Theme Configuration

Add `x-theme` to your theme list:

```toml
theme = "x-theme"
compile_sass = true
```

## Extra Settings

The `extra` section in `zola.toml` configures theme-specific options:

```toml
[extra]
# Marquee ticker text (optional)
marquee_text = "★ WELCOME TO MY BLOG ★"

# Social links (optional)
github_url = "https://github.com/username"
twitter_url = "https://twitter.com/username"

# Archive page settings
archive_posts_count = 4
```

### Available Extra Keys

| Key | Default | Description |
|-----|---------|-------------|
| `marquee_text` | - | Text displayed in the marquee ticker at the top of pages |
| `github_url` | - | GitHub profile URL, shown in footer and about page |
| `twitter_url` | - | Twitter/X profile URL, shown in footer |
| `archive_posts_count` | `4` | Number of recent posts to display on the archive page |

## Taxonomies

Enable taxonomies for categories and tags:

```toml
taxonomies = [
    { name = "categories", feed = true },
    { name = "tags", feed = true }
]
```

## Static Assets

### Default Theme Images

The theme provides default images in `themes/x-theme/static/`:

| File | Usage |
|------|-------|
| `avatar.jpg` | Author avatar (about page) |
| `hero.jpg` | Homepage hero image |
| `featured1.jpg` | About page portrait |
| `featured2.jpg` | Reserved for featured content |
| `featured3.jpg` | Reserved for featured content |

### Overriding Default Images

Zola uses a **priority cascade** for static files:
- `your-site/static/` (highest priority)
- `themes/x-theme/static/`

To use your own images, place a file with the **same name** in your site's `static/` directory:

```bash
# Example: Override the avatar
cp /path/to/your-avatar.png your-site/static/avatar.jpg
```

Your site's `static/images/` directory is for post-specific images and is not affected by theme defaults.

## Content Structure

### Required Sections

Create these content directories:

```
content/
├── _index.md       # Homepage content
├── posts/
│   └── _index.md   # Posts section (required for archive)
├── about.md        # About page
└── archives/
    └── _index.md   # Archive page
```

### Post Front Matter

```toml
+++
title = "My Post Title"
date = 2024-01-01
description = "Post description for meta tags"
[taxonomies]
categories = ["Tech"]
tags = ["Zola", "Tutorial"]
+++
```

### Optional Post Settings

```toml
[extra]
cover = "/images/my-cover.jpg"  # Post cover image
read_time = 5                   # Estimated read time in minutes
```
