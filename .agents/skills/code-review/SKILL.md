---
name: code-review
description: Use when reviewing new or existing code, pull requests, diffs, bug fixes, refactors, API endpoints, database operations, authentication, or architectural changes. Identify actionable defects and risks before suggesting changes.
---

# Code Review Skill

## Objective

Review code for correctness, security, reliability, maintainability, performance, and project consistency. Prioritize real defects over stylistic preferences.

## Review Principles

- Understand the intended behavior before judging the implementation.
- Read relevant project instructions, `project.md`, `conventions.md`, and existing patterns when available.
- Inspect related files, callers, schemas, tests, and dependencies when necessary.
- Review the smallest relevant scope first; expand only when dependencies require it.
- Never assume code is incorrect merely because another approach exists.
- Do not rewrite code or modify files unless explicitly requested.
- Do not claim a test, command, or build passed unless it was actually executed.
- Distinguish verified findings from assumptions and potential risks.
- Never invent requirements, APIs, dependencies, or project conventions.

## Review Checklist

### 1. Correctness

- Does the code meet the intended requirements?
- Are edge cases, empty values, invalid inputs, and failures handled?
- Are conditions, calculations, state transitions, and return values correct?
- Are asynchronous operations awaited and errors handled appropriately?
- Could the code introduce regressions or unexpected side effects?

### 2. Security

- Check authentication and authorization separately.
- Verify resource ownership and prevent insecure direct object references.
- Validate and constrain untrusted input at appropriate boundaries.
- Check for injection, data exposure, unsafe file uploads, and secret leakage.
- Review cookie settings, session handling, CORS, and rate limiting where relevant.
- Verify sensitive operations are enforced on the server, not just in the UI.
- Never expose credentials, private data, or internal errors unnecessarily.

### 3. Data and API Integrity

- Check database constraints, relationships, transactions, and consistency.
- Verify pagination, filtering, sorting, and query boundaries.
- Check for N+1 queries, unnecessary queries, and unsafe concurrent operations.
- Ensure API contracts, validation schemas, status codes, and error responses agree.
- Verify ownership, quotas, and business rules are enforced server-side.

### 4. Maintainability

- Check naming, cohesion, separation of concerns, and duplication.
- Follow established project architecture and conventions.
- Flag unnecessary abstractions, premature optimization, and overengineering.
- Check types and avoid unsafe casts, unexplained `any`, and suppressed errors.
- Prefer simple changes consistent with the existing codebase.

### 5. Performance and Reliability

- Identify measurable or plausible bottlenecks.
- Check unnecessary rendering, expensive operations, memory issues, and resource cleanup.
- Check timeouts, retries, caching, and external-service failure handling where relevant.
- Avoid speculative micro-optimizations without meaningful impact.

### 6. Tests

- Check whether important behavior and edge cases are covered.
- Identify missing regression tests for confirmed bugs.
- Check whether tests validate behavior rather than implementation details.
- Do not demand tests for trivial changes when they provide little value.
- Run relevant checks only when tools and project setup permit.

## Severity Levels

- **P0 — Critical:** Immediate severe security issue, data loss, or system-wide failure.
- **P1 — High:** Major defect, exploitable vulnerability, or broken core functionality.
- **P2 — Medium:** Meaningful bug, edge-case failure, or significant maintainability/reliability risk.
- **P3 — Low:** Minor issue with limited impact.
- **Info:** Optional improvement, clarification, or non-blocking observation.

Assign severity based on impact and realistic likelihood. Do not inflate severity.

## Finding Requirements

Every finding must include:

1. Severity and concise title.
2. Exact file and line reference when available.
3. The specific problem and the conditions under which it occurs.
4. Its practical impact.
5. A concrete recommended fix.

Only report actionable findings. Do not report hypothetical issues as confirmed defects. Mention uncertainty when evidence is incomplete.

## Review Workflow

1. Identify the change's purpose and scope.
2. Inspect relevant implementation and surrounding code.
3. Trace important data flows, trust boundaries, and dependencies.
4. Evaluate the checklist against the actual code.
5. Verify suspicious behavior using tests, static analysis, or focused inspection when available.
6. Remove duplicate, irrelevant, and unsupported findings.
7. Present findings in descending severity.
8. Summarize residual risks and verification limitations.

## Output Format

### Summary

One or two sentences describing the overall risk and review result.

### Findings

For each finding:

**[P1] Concise issue title**

- **Location:** `path/to/file.ts:42`
- **Problem:** What is wrong and when it occurs.
- **Impact:** Why it matters.
- **Fix:** The smallest appropriate correction.

If no actionable findings are identified, explicitly say so. Do not claim the code is bug-free.

### Verification

- Checks actually performed and their results.
- Tests or checks not run and why.
- Remaining uncertainties or risks.

## Review Boundaries

- Report findings before optional refactoring suggestions.
- Avoid nitpicks unless they violate established conventions or cause real problems.
- Do not duplicate issues already fixed in the current change.
- Do not make changes without explicit permission.
- If the review scope or requirements are unclear, ask one focused question or state the assumptions used.
- Keep the review concise, evidence-based, and focused on issues that matter.
