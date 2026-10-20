---
name: security
description: Use when implementing or reviewing authentication, authorization, private wardrobe data, image uploads, storage access, secrets, or sensitive API operations.
---

# Clothset Security Skill

## 1. Security Boundaries

- Treat client input, browser storage, request bodies, query parameters, uploaded files, and AI output as untrusted.
- Enforce authorization in the NestJS API for every protected resource operation.
- Never rely on hidden UI controls or frontend checks as security controls.
- Derive the authenticated identity from the verified authentication context, not an arbitrary client-provided user ID.
- Verify ownership before reading, editing, deleting, exporting, or otherwise acting on a private wardrobe item or image.
- Deny access when identity, ownership, or permission cannot be established.

## 2. Authentication and Secrets

- Follow the existing authentication and session design.
- Do not introduce a competing authentication mechanism without a clear requirement.
- Keep secrets and privileged credentials server-side and out of source control, logs, and client bundles.
- Never expose tokens, secrets, stack traces, or internal implementation details in error responses.
- Avoid logging sensitive user data or private image contents.
- Follow the project's established secure cookie, token, and session practices.

## 3. Input and File Handling

- Validate request data at the API boundary, including identifiers, enums, lengths, and allowed values.
- Validate uploads against the application's existing file type, size, and access rules.
- Do not trust filenames or client-supplied MIME types alone.
- Use safe storage access patterns and prevent unauthorized access to private image objects.
- Do not construct storage paths or access permissions directly from untrusted input.
- Prevent unsafe mass assignment by allowing only expected fields to be changed.
- Handle missing and unauthorized resources consistently with existing API conventions.

## 4. Privacy and Data Integrity

- Return only data the caller is permitted to access.
- Do not expose one user's wardrobe, images, preferences, or account details to another user.
- Do not allow clients to self-assign premium status, change protected ownership fields, or bypass usage limits.
- Treat AI outputs and external service responses as untrusted input.
- Avoid destructive changes unless the operation is explicitly requested and authorized.
- Preserve user-owned data unless a valid, authorized operation changes it.
- Avoid collecting or retaining personal information that is unnecessary for the feature.

## 5. Verification Checklist

- Test unauthenticated access to protected endpoints.
- Test attempts to read, edit, and delete another user's resources.
- Test invalid and unexpected request payloads.
- Test unauthorized image access and unsafe upload attempts.
- Test that secrets and internal errors are not returned to clients.
- Test that clients cannot modify protected ownership or entitlement fields.
- Run the existing relevant tests and report any checks that could not be completed.
