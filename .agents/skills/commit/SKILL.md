---
name: commit
description: Use when reviewing Git changes, preparing commit messages, staging files, or creating Git commits. Inspect actual diffs, preserve unrelated work, follow repository conventions, and verify results.
---

# Git Commit Skill

## Purpose

Create accurate, focused, maintainable Git commits. Every commit message must reflect the actual changes included in that commit.

## When to Use

- The user asks to commit changes.
- The user asks to prepare or improve a commit message.
- The user asks to inspect changes before committing.
- The user asks to split or organize changes into commits.

Do not create a commit when the user only requests a review or suggested message.

## Core Principles

- Inspect before staging or committing.
- Treat the actual diff as the source of truth, not assumptions or task descriptions.
- Follow repository instructions and existing commit conventions.
- Prefer small, logically cohesive commits.
- Preserve unrelated changes and the user's work.
- Never claim an operation succeeded without verifying its result.
- Do not modify application code merely to make a commit easier.

## Workflow

### 1. Inspect Repository State

Run:

- `git status --short`
- `git diff`
- `git diff --cached`
- `git diff --stat`
- `git diff --cached --stat`

Inspect untracked files separately when needed. Review relevant files and repository instructions to understand the change.

Determine:

- Which changes are staged, unstaged, and untracked.
- Whether changes belong to one logical task or multiple tasks.
- Whether existing staged changes may belong to the user or another task.
- Whether generated files, lockfiles, migrations, or configuration changes are intentional.

### 2. Establish Commit Scope

- Include only files relevant to the requested commit.
- Do not use `git add .` or `git add -A` blindly.
- Stage specific files or selected hunks when appropriate.
- Review pre-existing staged changes before committing.
- Never discard, overwrite, or silently unstage unrelated user changes.
- If staged changes mix unrelated work, ask before reorganizing them.
- If scope is ambiguous, explain the ambiguity and ask one focused question.

### 3. Check Sensitive or Risky Changes

- Inspect staged content for secrets, credentials, tokens, private keys, and sensitive data.
- Check for accidental `.env` files, local configuration, personal data, or unrelated generated artifacts.
- Never stage or commit secrets.
- If a suspected secret is found, stop and explain the issue.
- Do not assume `.gitignore` guarantees that sensitive files are excluded.
- Inspect destructive changes, database migrations, and lockfile changes for relevance.

### 4. Choose the Commit Convention

- Prefer the repository's documented convention.
- If Conventional Commits is used, follow:
  `type(scope): concise imperative summary`
- Use a scope only when it adds useful context.
- Choose the type based on the actual change:
  - `feat`: adds user-facing or functional capability.
  - `fix`: corrects a defect.
  - `refactor`: restructures code without changing intended behavior.
  - `perf`: improves performance.
  - `test`: adds or updates tests.
  - `docs`: documentation-only changes.
  - `style`: formatting-only changes without behavior changes.
  - `build`: build tooling or dependency configuration.
  - `ci`: continuous integration changes.
  - `chore`: maintenance that does not fit a more specific type.
  - `revert`: reverts a previous commit.
- Do not choose `feat` or `fix` merely because the change is substantial.
- Do not invent scopes, issue references, or breaking changes.
- Mark a breaking change only when the diff and impact justify it.

### 5. Write the Commit Message

- Subject: concise, specific, and ideally under 72 characters.
- Describe the main change, not every changed file.
- Use imperative wording where natural.
- Avoid vague subjects such as `updates`, `changes`, `misc fixes`, or `work`.
- Include a body when it explains important rationale, behavior, constraints, or migration implications.
- Use multiple `-m` flags for separate body paragraphs when useful.
- Do not duplicate the subject in the body.
- Do not list trivial implementation details just to make the message longer.
- Do not claim tests passed unless they were run successfully.

Example:

`feat(wardrobe): enforce item capacity limits`

Body:

- Reject item creation when the selected wardrobe reaches its limit.
- Enforce the limit server-side to prevent client-side bypasses.

### 6. Stage and Review

- Stage only the intended files or hunks.
- Run `git status --short`.
- Inspect the final staged diff using `git diff --cached`.
- Confirm the staged content matches the intended commit scope.
- Recheck sensitive files and unrelated changes before proceeding.
- Do not rely on a filename list alone; review the actual content.

### 7. Create the Commit

- Commit only when the user explicitly requests a commit.
- Use the verified staged content to construct the message.
- Preserve normal Git hooks and verification checks.
- Never use `--no-verify` or bypass hooks without explicit authorization.
- Never amend, reset, rebase, or force-push unless explicitly requested.
- Do not push to a remote unless requested.
- If a hook fails, inspect the failure and report it; do not bypass it automatically.

### 8. Verify and Report

After committing, run:

- `git status --short`
- `git log -1 --format="%h %s"`

Confirm that the new commit exists and its subject matches the intended message.

Report:

- Commit hash and subject.
- Brief summary of what was committed.
- Relevant checks performed and their results.
- Any remaining uncommitted changes.
- Any checks that were not run.

If the commit fails, report the actual failure and next step. Never report an unsuccessful operation as complete.

## Rules and Constraints

- Never commit without a clear user request.
- Never silently discard user changes.
- Never include unrelated files to make the working tree clean.
- Never commit known secrets or sensitive credentials.
- Never invent changes, test results, or repository conventions.
- Never amend an existing commit unless requested.
- Never push unless requested.
- Ask before proceeding when commit scope, staged ownership, or potentially destructive actions are unclear.

## Quality Checklist

- [ ] Repository state inspected.
- [ ] Staged, unstaged, and untracked changes considered.
- [ ] Commit scope is cohesive and intentional.
- [ ] Actual staged diff reviewed.
- [ ] No known secrets or unrelated changes included.
- [ ] Commit type, scope, and subject match the diff.
- [ ] Body included only when useful.
- [ ] Hooks and checks handled without unauthorized bypasses.
- [ ] Commit verified if created.
- [ ] Final report accurately describes the result.
