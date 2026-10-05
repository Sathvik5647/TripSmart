---
name: Horizon Luxe
colors:
  surface: '#fff8f0'
  surface-dim: '#e0d9cf'
  surface-bright: '#fff8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf3e9'
  surface-container: '#f4ede3'
  surface-container-high: '#eee7dd'
  surface-container-highest: '#e8e2d8'
  on-surface: '#1e1b15'
  on-surface-variant: '#43474d'
  inverse-surface: '#33302a'
  inverse-on-surface: '#f7f0e6'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4a607c'
  primary: '#0c243d'
  on-primary: '#ffffff'
  primary-container: '#243a54'
  on-primary-container: '#8ea4c3'
  inverse-primary: '#b2c8e8'
  secondary: '#944a00'
  on-secondary: '#ffffff'
  secondary-container: '#fc8f34'
  on-secondary-container: '#663100'
  tertiary: '#322000'
  on-tertiary: '#ffffff'
  tertiary-container: '#4e3400'
  on-tertiary-container: '#d09937'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#b2c8e8'
  on-primary-fixed: '#031c35'
  on-primary-fixed-variant: '#324863'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#ffb783'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#713700'
  tertiary-fixed: '#ffdeae'
  tertiary-fixed-dim: '#f8bc57'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#fff8f0'
  on-background: '#1e1b15'
  surface-variant: '#e8e2d8'
  warm-sand: '#F9F2E8'
  deep-midnight: '#0A0F14'
  azure-blue: '#243A54'
  sunset-orange: '#E67E22'
  champagne-highlight: '#FFF9F0'
  slate-text: '#1A1A1A'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered to evoke the sensation of high-end editorial travel journalism. It balances the timeless elegance of a physical magazine with the fluid utility of a modern digital concierge. The brand personality is knowledgeable, aspirational, and meticulously organized, targeting travelers who value curation over clutter.

The visual direction employs a **Modern Editorial** style mixed with **Glassmorphism**. It rejects the sterile, flat-white aesthetic of standard SaaS products in favor of rich, textured surfaces and sophisticated layering. Every interaction should feel intentional and smooth, mirroring the effortless flow of a well-planned journey. 

The aesthetic is defined by:
- **Rich Neutrals:** Using "Warm Sand" as a canvas to provide a premium, tactile feel.
- **Editorial Contrast:** Juxtaposing high-contrast serif headlines with utilitarian sans-serif UI elements.
- **Atmospheric Depth:** Using soft blurs and translucent overlays to maintain context during the planning process.

## Colors

The palette is anchored by **Warm Sand (#F9F2E8)**, providing a sophisticated alternative to pure white that reduces eye strain and feels more organic. **Azure Blue (#243A54)** serves as the primary grounding color for navigation and core structure, while **Sunset Orange (#E67E22)** is used sparingly for high-priority calls to action and active states.

### Implementation Guidelines:
- **Surface Strategy:** In Light Mode, use *Warm Sand* for the main background. Use *Champagne Highlight* for raised cards to create a subtle "tone-on-tone" depth.
- **Dark Mode:** When switching to *Deep Midnight*, the primary text shifts to a soft cream rather than pure white to maintain the premium feel.
- **Accent Usage:** Use *Sunset Orange* for the "Plan My Trip" or "Book Now" buttons to create a vibrant focal point against the muted backgrounds.

## Typography

This system utilizes a classic serif/sans-serif pairing to distinguish between narrative content and functional UI elements. 

- **Playfair Display:** Used for all "Display" and "Headline" roles. It conveys a sense of heritage and luxury. Headlines should use tight letter-spacing to feel modern.
- **Inter:** Chosen for its exceptional legibility at small sizes. It handles all body copy, inputs, and button labels.
- **Labeling:** Functional labels (like price tags or category chips) use Inter Bold with slight tracking (0.05em) and uppercase styling to provide a clear visual break from narrative text.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous margins to mimic the layout of a travel magazine. 

### Spacing Rhythm:
- **Base Unit:** A 4px grid ensures consistency. 
- **Vertical Rhythm:** Use *Stack-MD (24px)* for spacing between card elements and *Stack-LG (48px)* for distinct sections on landing pages.
- **Mobile Layout:** A 2-column or 4-column grid for mobile, with 20px side margins to ensure content doesn't feel "cramped" against the device edges.
- **Safe Areas:** Ensure interactive elements are padded by at least 12px from the edges of glassmorphic overlays to maintain touch-target accessibility.

## Elevation & Depth

Depth is communicated through **Backdrop Blurs** and **Tonal Layering** rather than heavy shadows.

- **Surface Levels:** 
    - *Level 0 (Base):* Warm Sand (#F9F2E8).
    - *Level 1 (Cards):* Solid Champagne Highlight (#FFF9F0) with a very thin (1px) inner border of 5% Black.
    - *Level 2 (Modals/Overlays):* Glassmorphic surfaces with a 20px backdrop blur, 70% opacity of the background color, and a subtle white top-edge highlight.
- **Shadows:** When shadows are necessary for high-altitude elements (like floating action buttons), use "Ambient Shadows"—a large 32px blur with very low 8% opacity, tinted with the Primary Azure Blue to maintain color harmony.

## Shapes

The design system uses a **Rounded (Level 2)** shape language to evoke a feeling of comfort and accessibility.

- **Standard Elements:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Container Elements:** Main itinerary cards and photography containers use a **1rem (16px)** radius.
- **Hero/Modal Elements:** Large bottom sheets and hero image containers use a **1.5rem (24px)** radius on top corners only to create a "nesting" effect against the screen edges.
- **Image Treatment:** All travel photography should have a slight 1px inner stroke to ensure images don't bleed into the background colors.

## Components

### Buttons
- **Primary:** Azure Blue background with White Inter Medium text. 0.5rem radius.
- **Secondary:** Transparent background with an Azure Blue 1.5px border.
- **Tertiary/Ghost:** Sunset Orange text with no border, used for "See More" or "View All" links.

### Input Fields
- Use a solid Champagne Highlight background. 
- Border is 1px Azure Blue (20% opacity) at rest, and 2px Azure Blue (100% opacity) on focus.
- Labels use *Label-MD* styling sitting above the field.

### Chips & Tags
- Used for destination categories (e.g., "Beach", "Luxury").
- Pill-shaped with a 30px radius. 
- Background: Azure Blue at 10% opacity; Text: Azure Blue.

### Cards
- **Itinerary Card:** Uses a 16px radius. Includes a high-resolution image at the top with a gradient overlay (bottom-to-top) to ensure white text titles remain readable over the image.
- **Glass Overlays:** For filters or quick-view details, use a backdrop-blur surface that partially reveals the photography underneath.

### Interactive States
- **Hover/Tap:** Elements should subtly scale down (to 0.98) on press to provide tactile feedback.
- **Transitions:** Use a "Gentle Ease-Out" (cubic-bezier 0.25, 0.1, 0.25, 1.0) for all page transitions and modal reveals.