# Clothset — Project Context

## Product Overview

Clothset is an AI-powered digital wardrobe application that helps users organize clothing they own, discover outfit combinations, and make better use of their wardrobe.

## Core Features

- Authentication and private user accounts.
- User can choose what type of wardrobe they want. Each wardrobe has their own limits depending on the sizes and types.
- Wardrobe CRUD: add, view, edit, organize, archive, favorite, and remove clothing.
- Clothing metadata: category, subcategory, colors, brand, material, styles, seasons, occasions, descriptions, and images.
- AI clothing-image analysis with editable attribute suggestions.
- AI outfit recommendations grounded in the user's actual wardrobe.
- Saved outfits and user preferences.
- Free and premium features with backend-enforced usage limits.
- Responsive, accessible experiences across supported screen sizes.

Implement only requirements supported by the current product scope. Do not invent plan quotas, pricing, or unconfirmed functionality.

## Monorepo Architecture

- `apps/web/`: Next.js App Router, React, TypeScript, and Tailwind CSS; feature-based web architecture.
- `apps/api/`: NestJS and TypeScript; API validation, authorization, business logic, and persistence integration.
- `packages/shared-schemas/`: shared Zod schemas and inferred TypeScript types.
- Expo: intended mobile client; confirm whether its workspace package exists before modifying it.
- pnpm manages the monorepo. Actual package names and scripts come from each `package.json`.

## Database and Storage

- PostgreSQL hosted on Neon.
- Prisma ORM 8 contract workflow; inspect the existing `contract.prisma` and configuration before changes.
- AWS S3 for clothing images and thumbnails.
- Store image object keys and necessary metadata in PostgreSQL, not temporary presigned URLs.
- Keep the S3 bucket private. NestJS authorizes uploads and image access.

## AI and Domain Integrity

- Preserve user-confirmed clothing data; never silently overwrite manual edits with AI suggestions.
- Distinguish AI-generated suggestions from user-confirmed attributes.
- Recommendations must reference real clothing items owned by the user. Never invent wardrobe records.
- Validate AI output before displaying, processing, or storing it.
- AI operations must respect authorization, privacy, and plan limits.

## Design System: Sage & Cream

- Forest Green: `#354438`; hover: `#29372C`.
- Sage Green: `#87977A`; Pale Sage: `#DCE4D5`.
- Cream Background: `#F7F5EF`; White Surface: `#FFFFFF`.
- Charcoal Text: `#292C28`; Muted Text: `#65685F`.
- Warm Gray Border: `#E5E2DA`.
- Inter is preferred when available. Use consistent spacing, clear hierarchy, accessible contrast, responsive layouts, subtle borders, and restrained shadows.
- Keep clothing photography visually prominent.
- Check: `ui-design` for more context about the app design.

## Priorities and Decision-Making

1. Secure authentication, ownership, and private image access.
2. Correct wardrobe CRUD and database integrity.
3. Reliable AI analysis and grounded outfit recommendations.
4. Consistent cross-package contracts.
5. Accessible, responsive UX and maintainable code.

Inspect the repository before implementing features. Treat actual code, configuration, package manifests, and database contracts as the implementation source of truth. This document describes intended product context, not proof that every feature exists. Preserve established decisions; clarify materially unresolved security or data-integrity requirements.
