# Clothset — Project-Wide Rules

## 1. Product Scope

- Clothset is an AI-powered digital wardrobe application that helps users organize clothing and discover outfit combinations using clothes they own.
- Core features include authentication, personal wardrobe management, clothing CRUD, AI clothing analysis, outfit recommendations, categories, filters, and free and premium plans.
- Prioritize the Next.js web application. NestJS is the API backend, and Expo is the mobile client.
- Support desktop, tablet, and mobile layouts.
- Prioritize usability, maintainability, privacy, and reliable behavior.
- Implement only requested features and necessary supporting changes. Avoid speculative features and unnecessary complexity.

## 2. General Coding Rules

- Use TypeScript for application code.
- Use clear, descriptive names for variables, functions, components, types, helpers, lib and files.
- Follow existing project conventions before introducing new patterns.
- Keep components, functions, and modules focused on a clear responsibility.
- Apply separation of concerns between presentation, business logic, data access, validation, and API handling.
- Extract reusable logic when doing so reduces meaningful duplication or improves maintainability.
- Organize code by feature and responsibility. Avoid unnecessary folders, abstractions, and indirection.
- Strictly adhere to SOLID, KISS, YAGNI, and DRY principles. Reject over-engineered abstractions, speculative decorators, and defensive boilerplate when standard implementations suffice.
- Provide candid, realistic technical advice. Never default to "yes-man" answers or complex enterprise patterns when a simpler, idiomatic solution exists.
- Avoid `any` unless necessary and justified.
- Reuse existing components, hooks, utilities, constants, and types where appropriate.
- Handle applicable loading, empty, success, and error states.
- Do not silently swallow errors or add empty catch blocks to suppress failures.
- Remove unused imports, variables, and code introduced by changes.
- Avoid adding comments on any files.
- Do not rewrite unrelated code or refactor beyond the scope of the task without a clear reason.
- Avoid adding dependencies when existing project capabilities are sufficient.
- Prefer pure JavaScript packages (e.g., `bcryptjs` over native `bcrypt`) to avoid native compilation friction and pnpm build script blocks on Windows.
- Strictly avoid modifying, sharing my env and backend files, and API keys.
- Avoid adding another abstraction unless it is justified.
- Strictly avoid running any destructive commands on my backend and database.

## 3. Monorepo Architecture and Shared Contracts

- Respect the existing monorepo structure, package manager, workspace configuration, and package boundaries.
- Keep web presentation and web-specific behavior in Next.js.
- Keep backend business logic, server-side validation, authorization, and data access in NestJS.
- Keep native UI and device-specific behavior in Expo.
- Keep genuinely shared contracts and framework-independent utilities in their appropriate shared packages.
- Use shared Zod schemas as the canonical source for validation contracts consumed by multiple packages.
- Infer TypeScript types from shared Zod schemas where appropriate instead of maintaining duplicate type definitions.
- Keep package-specific validation and behavior in the package that owns them.
- Validate untrusted API input on the server; client-side validation does not replace server-side validation.
- Enforce important business rules on the backend so all clients follow consistent rules.
- Avoid circular dependencies, duplicated business logic, and imports that violate package boundaries.
- Follow established decisions for the database, ORM, authentication, object storage, and AI providers. Do not assume unconfirmed technologies.
- Preserve existing working behavior unless requirements explicitly call for a change.

## 4. Authentication, Authorization, and Privacy

- Require authentication for private account and wardrobe operations.
- Enforce authorization and resource ownership on the server for every protected operation.
- Never trust client-provided user IDs, ownership claims, roles, subscription status, or permission flags.
- Prevent users from accessing, modifying, or deleting another user's private data.
- Validate and safely handle untrusted input at system boundaries.
- Keep secrets, tokens, and private environment variables out of committed source code and client bundles.
- Protect clothing images and object-storage references against unauthorized access.
- Avoid logging credentials, access tokens, private images, or unnecessary personal information.
- Return safe, appropriately structured errors without exposing secrets, stack traces, or internal implementation details.
- Collect and retain only data required for current product functionality.

## 5. Wardrobe Data and AI Integrity

- Preserve user-entered and user-confirmed clothing information unless the user explicitly changes it.
- Never silently overwrite manual edits with AI-generated values.
- Distinguish AI-generated suggestions from user-confirmed information.
- Do not present unsupported AI inferences as verified facts.
- Generate outfit recommendations using clothing items the user actually owns and is authorized to access.
- Never invent wardrobe items to complete an outfit recommendation.
- Validate AI-generated output before displaying, processing, or persisting it.
- Handle AI failures, malformed responses, and unavailable providers gracefully.
- Ensure AI operations respect authentication, privacy, resource ownership, and applicable plan limits.

## 6. Free and Premium Plans

- Enforce subscription entitlements and usage limits on the backend, not only in the UI.
- Never trust client-provided subscription status or entitlement claims.
- Follow established product requirements for plan features and limits. Do not invent restrictions.
- Keep entitlement behavior consistent across web, API, and mobile.
- Do not introduce payment providers, billing flows, or subscription changes unless explicitly required.

## 7. UI and Design Consistency

- Follow Clothset's established Sage & Cream design system, design tokens, and shared UI components.
- Reuse existing components and styling patterns before creating alternatives.
- Keep clothing photographs visually prominent against neutral backgrounds.
- Maintain responsive layouts, readable contrast, clear visual hierarchy, and consistent spacing.
- Use semantic HTML, accessible labels, keyboard navigation, and visible focus states where applicable.
- Provide clear feedback for user actions and meaningful loading, empty, and error states.
- Ensure interactive controls have real functionality and clear labels.
- Confirm destructive actions when appropriate.
- Do not introduce inconsistent styling, unnecessary decorative effects, or a new UI library without a concrete requirement.
- Do not use fake data in production features unless explicitly requested.

## 8. Testing and Verification

- Add or update tests for meaningful changes to business logic, validation, authorization, data integrity, and subscription limits.
- Test important success paths and relevant failure cases.
- Verify access boundaries for private wardrobe and account data.
- Update tests when a shared schema or API contract changes.
- Run relevant existing tests, type checks, linting, and builds for affected packages when available.
- Follow the established package manager and lockfile.
- Do not claim tests, builds, or deployments succeeded unless their results were actually verified.
- Update documentation when setup, architecture, environment variables, or API contracts change.
- Report relevant verification failures rather than hiding or misrepresenting them.

## 9. Change Management and Decisions

- Understand the existing implementation before modifying it.
- Prefer the smallest complete change that satisfies the requirement.
- Always inspect existing shared packages (e.g. `@clothset/shared-schemas`) for canonical schemas and contracts before proposing or creating new ones.
- When presenting implementation plans or code for review, wait for the user's explicit signal or confirmation before executing file modifications or installation commands.
- Consider affected packages, shared contracts, API consumers, existing data, and backward compatibility before changing public interfaces.
- Do not introduce breaking changes without a clear requirement and an assessment of affected consumers.
- Ask for clarification when an unresolved requirement materially affects security, data integrity, architecture, or user experience.
- Otherwise, use established project conventions and make the simplest reasonable decision.
