+++
title = "Motion in Static Design"
date = 2026-03-15
description = "Adding life to layouts with animations, transitions, and the scrolling marquee."
[taxonomies]
categories = ["技术"]
tags = ["动效", "CSS", "动画"]
+++

# Making Static Sites Feel Alive

The web doesn't have to be static. With CSS animations, we can add the energy of print's moving parts—scrolling tickers, page-turning effects, and attention-grabbing transitions.

## The Marquee Revival

Remember the `<marquee>` tag? We've evolved beyond it, but the spirit remains: **movement draws attention**.

```css
@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
```

## When to Use Animation

1. **Marquees** - News tickers, announcements
2. **Hover States** - Feedback on interaction
3. **Page Transitions** - Smooth navigation
4. **Loading States** - Progress indicators

## Accessibility First

Remember `prefers-reduced-motion`! Not everyone wants animated content.

```css
@media (prefers-reduced-motion: reduce) {
    .marquee { animation: none; }
}
```

---

Motion should enhance, not distract. Use it purposefully.
