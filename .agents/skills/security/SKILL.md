---
name: security
description: Use when implementing or reviewing authentication, authorization, private wardrobe data, image uploads, storage access, secrets, payments, webhooks, or security-sensitive code.
---

# Clothset Security Skill

## 1. Security Boundaries

- Treat client input, browser storage, request bodies, query parameters, uploaded files, AI output, and external service responses as untrusted.
- Enforce authorization in the NestJS API for every protected resource operation.
- Never rely on hidden UI controls or frontend checks as security controls.
- Derive authenticated identity from verified authentication context, never arbitrary client-provided user IDs.
- Verify ownership before reading, editing, deleting, exporting, or acting on private resources.
- Deny access when identity, ownership, or permission cannot be established.

## 2. Authentication and Secrets

- Follow the existing authentication and session design; do not introduce competing mechanisms without justification.
- Keep secrets and privileged credentials server-side and out of source control, logs, and client bundles.
- Never expose tokens, secrets, stack traces, or internal implementation details in error responses.
- Avoid logging sensitive user data, credentials, or private image contents.
- Follow secure cookie, token, session, expiry, revocation, and logout practices.

## 3. Input, Files, and Output

- Validate request data at API boundaries, including identifiers, enums, lengths, formats, and allowed values.
- Prevent mass assignment by explicitly allowing writable fields.
- Do not trust filenames or client-supplied MIME types alone; enforce file type, size, and upload restrictions.
- Prevent path traversal and unauthorized access to private storage objects.
- Never construct storage paths or permissions directly from untrusted input.
- Use context-appropriate encoding and escaping when rendering untrusted content.
- Prevent injection vulnerabilities, including SQL injection, command injection, and cross-site scripting (XSS), where applicable.
- Handle missing and unauthorized resources consistently with project conventions.

## 4. Privacy and Data Integrity

- Return only data the caller is authorized to access.
- Prevent cross-user exposure of wardrobes, clothing, images, preferences, and account details.
- Never allow clients to modify protected ownership, role, subscription, payment, or entitlement fields.
- Preserve user-owned data unless a valid, authorized operation changes it.
- Avoid unnecessary collection, exposure, and retention of personal information.
- Avoid destructive changes unless explicitly requested and authorized.

## 5. Business Logic and Resource Limits

- Enforce wardrobe capacity, clothing limits, and plan restrictions server-side across every relevant operation.
- Derive subscription status, permissions, and limits from trusted server-side records.
- Never trust client-provided prices, payment status, capacity values, or claims of premium access.
- Enforce limits atomically or transactionally when concurrent requests could bypass them.
- Verify ownership and authorization before reading or modifying resource counts.
- Apply consistent restrictions to create, update, bulk operations, imports, and alternate resource-creation paths.
- Check for privilege escalation, mass assignment, parameter pollution, and bypasses through alternate routes or request sequences.

## 6. Payment and Webhook Security

- Verify webhook signatures using the provider's documented procedure and required request representation.
- Never grant paid access based solely on frontend state, redirects, or client-reported payment success.
- Process events idempotently; handle duplicate, delayed, replayed, and out-of-order deliveries safely.
- Validate amounts, currency, transaction references, and subscription associations against trusted records.
- Keep payment credentials server-side and redact sensitive values from logs.
- Distinguish payment status, subscription status, and application entitlements.
- Handle failed renewals, cancellations, refunds, disputes, and expirations according to defined business rules.
- Never assume webhook delivery occurs exactly once or in chronological order.

## 7. Code Vulnerability Review

- Review security-sensitive code for exploitable vulnerabilities, logic flaws, insecure defaults, and unintended behavior.
- Trace untrusted data from entry points to sensitive operations, including database queries, file access, rendering, and external requests.
- Check for injection, path traversal, open redirects, SSRF, unsafe deserialization, prototype pollution, and insecure cryptographic usage where applicable.
- Identify missing authorization checks, IDOR, privilege escalation, and trust in client-controlled values.
- Detect race conditions, time-of-check-to-time-of-use flaws, and non-atomic security-critical operations.
- Examine fail-open behavior, information leakage, unsafe fallbacks, and inconsistent error handling.
- Check for dead security checks, bypassable validation, unreachable validation branches, and alternate execution paths.
- Inspect affected controllers, guards, decorators, services, repositories, database operations, and integrations as relevant.
- Review refactors for removed, weakened, or inconsistently applied security controls.

## 8. API Abuse and Session Security

- Apply appropriate rate limits to authentication, password recovery, uploads, and resource-intensive endpoints.
- Use generic authentication and recovery responses where detailed errors could enable account enumeration.
- Bound request sizes, pagination, bulk operations, and expensive queries; apply suitable timeouts.
- Protect cookie-authenticated state-changing requests against CSRF where applicable.
- Validate CORS origins and never use permissive credentialed CORS configurations.
- Use HTTPS in production; do not transmit credentials or session tokens through URLs.
- Apply appropriate security headers and avoid insecure browser storage for sensitive authentication tokens.

## 9. Database and Concurrency Security

- Scope database reads and mutations to authenticated users and their authorized resources.
- Never treat UUIDs or unguessable identifiers as substitutes for authorization.
- Use database constraints, transactions, or atomic operations to preserve ownership and capacity invariants.
- Prevent race conditions in resource creation, subscription updates, and other limited operations.
- Use least-privilege database credentials; never expose privileged database access to clients.
- Never concatenate untrusted input into raw database queries.
- Review migrations and destructive operations for data loss, weakened constraints, or unintended access changes.

## 10. Dependencies and Deployment

- Follow the project's dependency maintenance policy and run available vulnerability and secret scans when appropriate.
- Separate development and production credentials.
- Never commit real secrets or expose them through logs, command output, or client bundles.
- Review storage permissions, webhook configuration, authentication settings, and production error handling.
- Avoid suppressing security warnings, weakening validation, disabling tests, or introducing insecure defaults to make builds pass.

## 11. Adversarial Testing and Verification

- For each security-sensitive feature, identify its security invariant, trust boundaries, and plausible attack paths.
- Safely test manipulated inputs, unauthorized identities, alternate routes, unexpected request sequences, concurrency, and failure conditions.
- Test unauthenticated access and cross-user read, update, and delete attempts.
- Test attempts to modify protected fields, bypass capacity limits, or escalate privileges.
- Test invalid webhook signatures, duplicate events, replay attempts, and out-of-order delivery.
- Test unsafe uploads, unauthorized object access, and expired or reused upload permissions.
- Use static analysis, dependency audits, and automated regression tests where available and appropriate.
- Verify fixes address root causes rather than only observed inputs or symptoms.
- Inspect the final diff for regressions and newly introduced vulnerabilities.
- Report findings with severity, affected code path, impact, reproducible evidence, and recommended remediation.
- Distinguish confirmed vulnerabilities from potential risks and untested assumptions.
- Never claim a check passed unless it was executed and its result inspected; never claim a review is exhaustive.

## 12. Implementation Rules

- Inspect existing architecture, conventions, and relevant tests before making security-sensitive changes.
- Reuse established patterns unless they introduce a demonstrable security risk.
- Prefer targeted, maintainable fixes over unrelated rewrites.
- Preserve existing functionality and user data unless a change is explicitly required.
- Run relevant tests after changes and report failures, skipped checks, and remaining risks.
