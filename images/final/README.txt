SIDHARTH RAJ — LOGO KIT
========================

THE MARK
--------
The icon is a three-arc cyclical loop — reduce → repurpose → re-Engineer,
back to reduce — drawn with rounded circuit-trace strokes instead of
a smooth recycling curve, to keep it in the controls/electronics world.
Two arcs are phosphor green, one is cyan (a small nod to the capital
"E" in "reEngineer"), meeting at a center via-pad, same palette as the
portfolio site.

FILES
-----
SVG (edit these / use for print, they scale to any size):
  icon-dark-bg.svg              — icon only, for dark backgrounds
  icon-light-bg.svg             — icon only, for light backgrounds (darker,
                                   more saturated colors for contrast)
  icon-mono-black.svg           — single color, black (stamps, engraving, print)
  icon-mono-white.svg           — single color, white (dark or photo backgrounds)
  lockup-horizontal-dark.svg    — icon + name + tagline, for dark backgrounds
                                   (site header, dark social banners)
  lockup-horizontal-light.svg   — same, for light backgrounds (résumé header,
                                   letterhead, business card)
  lockup-stacked-avatar.svg     — square icon+name, for profile photos

PNG (ready to use):
  favicon-32.png                — browser tab favicon
  favicon-192.png                — app icon / touch icon size
  icon-512-transparent.png      — transparent icon, general use
  avatar-512.png                 — square avatar for GitHub/LinkedIn/etc.
  banner-dark-1800.png           — wide banner (e.g. GitHub social preview,
                                    LinkedIn banner — crop/reposition as needed)

USING IT ON YOUR SITE
----------------------
Your site already loads JetBrains Mono via Google Fonts, so the wordmark
in the SVGs will render in the correct font there. If you open an SVG
directly in an app that doesn't have JetBrains Mono installed, text will
fall back to a generic monospace font — the icon itself is unaffected
either way since it's pure vector shapes, no font dependency.

Suggested favicon line for index.html's <head>:
  <link rel="icon" type="image/png" href="images/favicon-32.png">

CUSTOMIZING
-----------
Colors are inline hex values in each SVG (not CSS variables), so you can
open any file in a text editor and swap:
  #49E39A  → green
  #49C6E8  → cyan
  #1F9D63 / #187EA1 → darker green/cyan (light-background versions)
