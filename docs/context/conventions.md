# Clothset — Development Conventions

## General

- Use TypeScript, descriptive names, and existing project conventions.
- Apply Separation of Concerns: presentation, business logic, validation, persistence, and API handling have distinct responsibilities.
- Prefer small, focused changes; reuse existing components, schemas, and utilities.
- Avoid unnecessary abstractions, duplicated logic, dependencies, and unrelated refactoring.
- Do not use `any` without justification or silently swallow errors.

## Monorepo

- Respect `pnpm-workspace.yaml`, package boundaries, lockfile, and existing scripts.
- Use `apps/web/` for Next.js, `apps/api/` for NestJS, and `packages/shared-schemas/` for cross-package Zod contracts.
- Check actual package names in `package.json`; directory names are not necessarily package names.
- Import shared functionality through intended package exports. Avoid circular dependencies and framework-specific imports in shared packages.
- Do not assume the Expo app exists until verified.

## Next.js Feature-Based Structure

- Keep App Router routes, layouts, loading states, error boundaries, and route-specific files in appropriate `app/` locations.
- Organize feature-specific components, hooks, API calls, schemas, types, and utilities under their owning feature.
- Always make app router page.tsx server components.
- Keep genuinely reusable UI components in shared UI locations.
- Example structure (adapt to the repository rather than creating every folder):

  `apps/web/src/features/wardrobe/{components,hooks,api,schemas,types,utils}/`

- Keep route files focused on routing and composition. Separate complex business logic from UI components.
- Prefer Server Components unless client-side interactivity or browser APIs require Client Components.
- Avoid unnecessary cross-feature dependencies and `"use client"` directives.

## NestJS

- Organize backend code by domain/module, such as wardrobe, outfits, users, storage, and AI, where needed.
- Controllers handle HTTP boundaries; services coordinate application logic; persistence stays on the server.
- Validate untrusted input at API boundaries.
- Enforce authorization, resource ownership, business rules, and plan limits on the backend.
- Avoid unnecessary repository or abstraction layers and database-model-shaped public responses.

## Shared Zod Schemas

- Shared Zod schemas are the canonical contracts for validation genuinely shared across packages.
- Check for existing schemas before creating new ones. Use descriptive `Schema` names.
- Infer types with `z.infer<typeof schema>`; use `z.input` when input and parsed output differ.
- Keep feature-only form schemas within their owning feature and API-only schemas within their module when not shared.
- Distinguish optional from nullable fields; keep create and update contracts distinct when their behavior differs.
- Keep schemas free of database calls, authorization checks, side effects, and framework-specific dependencies.
- When a shared schema changes, review affected consumers, compatibility, and tests across packages.

## Prisma and Database

- Follow the installed Prisma ORM version and existing Prisma 8 `contract.prisma` configuration.
- Preserve `// use prisma-8` and established types such as `Uuid`, `TimestamptzString`, and `temporal.updatedAtString()` where used by the project.
- Inspect existing models and relationships before making changes.
- Review ownership, foreign keys, uniqueness, indexes, nullability, deletion behavior, and migration/data-loss impact.
- Do not assume example models or generic Prisma commands match the actual project configuration.
- Validate contracts and run commands defined by the owning package; do not make destructive database changes without assessing their impact.
- After adding, updating models or schema on contract, the process would be emit, migrate plan, migrate.
- Always ask first for permission when running db scripts or commands.

## API, Storage, and Data Flow

- Clients communicate with NestJS; only the backend accesses the database directly.
- For S3 uploads, NestJS issues short-lived presigned URLs and verifies upload ownership and validity before saving metadata.
- Keep AWS credentials and other secrets on the server. Store object keys rather than temporary URLs.
- A valid foreign key does not prove the authenticated user owns that record; verify ownership explicitly.

## UI and Accessibility

- Follow Clothset's Sage & Cream tokens and existing shared components.
- Use consistent spacing, readable typography, semantic markup, accessible labels, keyboard navigation, and visible focus states.
- Provide appropriate loading, empty, success, error, and disabled states.
- Keep clothing photos prominent. Avoid excessive decoration and nonfunctional placeholder controls.

## Security and AI Integrity

- Authenticate private operations and authorize every protected resource action.
- Never trust client-provided ownership, roles, permissions, subscription status, or entitlement claims.
- Never commit secrets or expose them in client bundles, logs, or API responses.
- Treat uploaded files and AI/external responses as untrusted; validate them.
- Preserve manual edits and distinguish AI suggestions from confirmed data.
- Do not let AI bypass authorization, validation, privacy, or entitlement enforcement.

## Testing and Verification

- Add or update tests for meaningful changes to validation, business logic, authorization, shared contracts, and data integrity.
- Inspect package scripts and run relevant tests, type checks, linting, builds, or Prisma contract checks when available.
- Check affected packages when changing shared contracts.
- Report failures honestly; never claim an unrun check passed.

## Scope Control

- Inspect existing code before implementing a feature.
- Prefer the smallest complete change that satisfies the requirement.
- Do not invent product rules, rewrite unrelated code, remove working functionality, or introduce breaking contracts without assessing their impact.
- Clarify only when unresolved decisions materially affect security, data integrity, or intended product behavior.
