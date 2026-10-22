---
name: commit
description: Reviews Git changes, prepares clear conventional commit messages, and creates Git commits when requested and authorized. Use when users ask to commit changes, prepare commit messages, or review changes before committing.
---

# Git Commit Skill

## Purpose

Create clear, standard and consistent Git commits that strictly accurately describe the changes on the files that are being committed.

## When to use

- When the user wants to commit changes
- When the user wants to prepare a commit message
- When the user wants to create a Git commit

Do not create a commit when the user only asks to review changes or suggest a message.

## Instructions

- Inspect the Git working tree before preparing a commit.
- Review the staged and unstaged changes.
- Follow the git commit standards and conventions of the repository.
- Understand the purpose of the changes before writing a message.
- Follow the repository's existing commit message conventions.
- Strictly ensure that the commit message and prefix use is strictly match on what the files changes has.
- Use Conventional Commits when requested or when the project uses that convention.
- Never include unrelated changes in a commit.
- Never stage or commit secrets, credentials, or sensitive files.
- Never bypass Git hooks or verification checks without explicit authorization.
- Do not amend, reset, rebase, or force-push unless explicitly requested.

## Rules and Constraints

- Never commit without a clear user request.
- Never silently discard user changes.
- Never amend an existing commit unless requested.
- Never use `--no-verify` to bypass hooks unless explicitly authorized.
- Never claim a commit succeeded without verifying it.
- Do not push to a remote unless requested.
- Ask for clarification if the intended commit scope is ambiguous.

## Quality Checklist

- [ ] The changes were inspected.
- [ ] The commit message accurately describes the changes.
- [ ] Only intended files are included.
- [ ] No secrets or unrelated changes are committed.
- [ ] Existing user changes are preserved.
- [ ] The commit is verified if created.
- [ ] Results are reported honestly.
