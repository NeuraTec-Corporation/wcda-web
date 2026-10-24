# Approved services carousel

Pablo requested gentle right-to-left automatic movement and previous/next arrows, preserving the service cards. Applies only to `.services3 .owl-carousel` in the active site.

- Existing Owl runtime retained; no second initialization or new dependency.
- One-card steps, every 6000 ms, 1400 ms ease-in-out transitions.
- Previous/next buttons flank the existing dots beneath the cards; 44px touch targets, accessible names and focus outlines.
- Pause on hover and keyboard focus. Reduced-motion preference disables autoplay and animated transitions; preference changes and cleanup supported.
- Card content, styling, responsive item counts, reference HTML and other carousels unchanged.
- Preview only. Visual acceptance of the pace remains with Pablo.
