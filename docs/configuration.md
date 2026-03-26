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

The theme uses Zola's built-in multilingual system with full support for multiple languages and a language switcher.

### Configuration

Add to your site's `zola.toml`:

```toml
default_language = "zh"

[languages]
[languages.zh]
title = "我的博客"

[languages.en]
title = "My Blog"
generate_feeds = true

[translations]
nav_home = "首页"
nav_archive = "归档"
nav_about = "关于"
nav_tags = "标签"
nav_categories = "分类"
posts = "篇文章"
masthead_label = "个人博客"
latest_posts = "最新文章"
about = "关于"
archive = "归档"
cta_title = "保持联系。"
cta_subtitle = "每周都有新文章"
view_all_posts = "查看所有文章"
read_more = "阅读 →"
more_about = "了解更多 →"
min_read = "分钟阅读"
uncategorized = "未分类"
all_posts = "所有文章"
earlier = "更早"
showing_posts = "显示"
posts_in_month = "篇文章在"
of_posts = "共"
archive_label = "归档 — 所有文章"
every_word = "每一个<br>文字。"
stack_skills = "技术栈"
timeline = "时间线"
find_me = "找到我"
want_to_collaborate = "想合作？"
get_in_touch = "联系我 →"
open_to_projects = "承接自由职业、开源协作与有趣项目"
who_is_this = "这是谁"
more_posts = "更多文章"
built_with = "由 Zola 构建"
design_style = "设计风格"
switch_lang = "EN / 中文"
switch_lang_label = "切换语言"
system_error = "系统错误 — 页面未找到"
lost_in_grid = "迷失<br><em>在网格中。</em>"
error_message = "您查找的页面不存在、已被移动，<br>或者像90年代的屏幕保护程序一样跑掉了。"
back_to_home = "← 返回首页"

[languages.en.translations]
nav_home = "Home"
nav_archive = "Archive"
nav_about = "About"
nav_tags = "Tags"
nav_categories = "Categories"
posts = "posts"
masthead_label = "Personal Blog"
latest_posts = "Latest Posts"
about = "About"
archive = "Archive"
cta_title = "Stay in the loop."
cta_subtitle = "NEW POSTS EVERY WEEK"
view_all_posts = "VIEW ALL POSTS"
read_more = "READ →"
more_about = "MORE ABOUT →"
min_read = "min read"
uncategorized = "Uncategorized"
all_posts = "All Posts"
earlier = "Earlier"
showing_posts = "SHOWING"
posts_in_month = "POSTS IN"
of_posts = "OF"
archive_label = "ARCHIVE — ALL POSTS"
every_word = "Every<br>Word."
stack_skills = "Stack & Skills"
timeline = "Timeline"
find_me = "Find Me"
want_to_collaborate = "Want to collaborate?"
get_in_touch = "GET IN TOUCH →"
open_to_projects = "OPEN TO FREELANCE, OSS & INTERESTING PROJECTS"
who_is_this = "WHO IS THIS PERSON"
more_posts = "More Posts"
built_with = "Built with Zola"
design_style = "Design"
switch_lang = "中文"
switch_lang_label = "Switch Language"
system_error = "SYSTEM_ERROR — PAGE_NOT_FOUND"
lost_in_grid = "Lost in<br><em>the Grid.</em>"
error_message = "The page you're looking for doesn't exist,<br>has been moved, or ran away like a 90s screensaver."
back_to_home = "← Back to Home"
```

### Enable Language Switcher

In your `zola.toml` `[extra]` section:

```toml
[extra]
lang_switcher_enabled = true
```

### Content Structure

Create translated content files with language suffixes:

```
content/
├── posts/
│   ├── _index.md          # Chinese version (default)
│   ├── _index.en.md       # English version
│   ├── hello-world.md     # Chinese version
│   └── hello-world.en.md  # English version
├── about.md               # Chinese version
├── about.en.md            # English version
├── archives.md            # Chinese version
└── archives.en.md         # English version
```

URL structure:
- Chinese (default): `/posts/hello-world/`
- English: `/en/posts/hello-world/`

## Filter Buttons

Category filter buttons on archive pages are automatically generated from your taxonomies. Ensure `categories` taxonomy is defined:

```toml
taxonomies = [
    { name = "categories", feed = true },
    { name = "tags", feed = true }
]
```

The filter buttons will show all categories that have at least one post.
