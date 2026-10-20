---
name: ui-design
description: Apply Clothset's design system and UI/UX requirements when creating, reviewing, or modifying web or mobile interfaces.
---

# Clothset Design Skill

## 1. Design Direction

- Clothset uses a Sage & Cream color palette.
- The interface should feel calm, clean, modern, and fashion-focused.
- Keep the user experience simple, intuitive, and visually consistent.
- Keep clothing photographs visually prominent against neutral backgrounds.
- Reuse existing design tokens and shared UI components instead of introducing inconsistent styles.

## 2. Brand Colors

| Purpose         | Color             | Hex       |
| --------------- | ----------------- | --------- |
| Primary         | Forest Green      | `#354438` |
| Primary Hover   | Dark Forest Green | `#29372C` |
| Secondary       | Sage Green        | `#87977A` |
| Accent          | Pale Sage         | `#DCE4D5` |
| Page Background | Cream             | `#F7F5EF` |
| Card / Surface  | White             | `#FFFFFF` |
| Main Text       | Charcoal          | `#292C28` |
| Muted Text      | Muted Gray        | `#65685F` |
| Borders         | Warm Gray         | `#E5E2DA` |

## 3. Color Usage

- Use cream for the main page background.
- Use white for cards, dialogs, forms, and content surfaces.
- Use forest green for primary buttons, important actions, and active navigation.
- Use white text on forest-green buttons.
- Use pale sage for selected filters, secondary buttons, and subtle highlights.
- Use charcoal for headings and important text.
- Use muted gray for descriptions and secondary information.
- Use warm gray for borders and dividers.
- Maintain readable text contrast.
- Do not use every brand color in every component.
- Avoid unnecessary gradients, excessive shadows, and decorative effects.
- Keep clothing photos visually prominent against neutral backgrounds.

## 4. Typography

- Use Inter as the primary font when available in the project.
- Use consistent font sizes and weights.
- Maintain a clear visual hierarchy for page titles, section headings, card titles, body text, and labels.
- Avoid excessively small text.
- Keep text readable on mobile screens.

## 5. Component Styling

- Buttons and inputs should have approximately `12px` border radii.
- Cards and larger panels should have approximately `16px` border radii.
- Use subtle borders and shadows.
- Maintain consistent spacing based on an `8px` scale.
- Include visible keyboard focus states.
- Provide hover, disabled, loading, and selected states where applicable.
- Do not rely on color alone to communicate status.
- Reuse existing design tokens and shared UI components.
- Avoid duplicating styles or creating new component variants when existing ones are sufficient.
- Use a purpose-driven icons.

## 6. Layout and Responsive Design

- Build mobile-first, responsive interfaces.
- Ensure layouts adapt to desktop, tablet, and mobile screens.
- Keep navigation predictable and consistent.
- Make wardrobe grids, clothing details, filters, forms, and outfit recommendations usable on small screens.
- Avoid horizontal overflow and controls that are difficult to use on touch screens.
- Use appropriate image sizing and cropping without hiding important garment details.
- Keep the interface focused on wardrobe organization and outfit discovery.

## 7. UI and UX Guidelines

- Provide clear page titles and action labels.
- Use skeletons or loading indicators for asynchronous operations when useful.
- Provide helpful empty states when the wardrobe has no clothing items.
- Provide helpful feedback when filters return no results.
- Show clear feedback after successful or failed actions.
- Confirm destructive actions when accidental deletion is possible.
- Use semantic HTML and accessible labels.
- Support keyboard navigation.
- Add appropriate alt text to meaningful images.
- Avoid unnecessary modals and multi-step flows.
- Do not use placeholder buttons that appear functional but do nothing.
- Do not create fake data in production features unless explicitly requested.

## 8. Accessibility and Interaction States

- Maintain readable text contrast.
- Ensure visible focus states for keyboard users.
- Use meaningful labels for inputs and controls.
- Do not rely on color alone to convey errors, selection, or status.
- Provide clear disabled and loading states to prevent confusing interactions.
- Ensure interactive elements remain usable on touch screens.
- Keep status messages and validation errors understandable.

## 9. Implementation Checklist

When modifying an interface:

1. Inspect existing components, design tokens, typography, and styling conventions.
2. Reuse existing components and styles where appropriate.
3. Apply the Clothset color palette and typography consistently.
4. Check responsive behavior on mobile, tablet, and desktop layouts.
5. Check loading, empty, error, disabled, and success states where relevant.
6. Check keyboard focus, labels, contrast, and image alt text.
7. Ensure clothing imagery remains visually prominent.
8. Avoid unrelated visual changes and unnecessary dependencies.
