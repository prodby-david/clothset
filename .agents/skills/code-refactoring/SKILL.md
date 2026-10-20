---
name: code-refactoring
description: Refactors existing code to improve readability, maintainability, structure, and reuse while preserving its existing behavior. Use when users ask to refactor, clean up, simplify, or improve code without changing functionality.
---

# Code Refactoring Skill

## Purpose

Improve the internal structure and quality of existing code without changing its externally observable behavior.

## When to Use

Use this skill when the user asks to:

- Refactor existing code.
- Remove duplicated logic.
- Simplify complex functions
- Improve naming and readability.
- Split large functions or modules.
- Improve code organization.
- Make code easier to test and maintain.

Do not use this skill to implement new features unless explicitly requested.

## Core Principles

1. Preserve existing behavior.
2. Prefer simple, readable solutions.
3. Follow the conventions already used in the project.
4. Avoid unnecessary abstractions.
5. Keep changes focused and minimal.
6. Do not introduce unrelated changes.
7. Do not claim tests passed unless they were actually executed.

## Workflow

### Step 1: Inspect

Before changing code:

- Read the target file and relevant surrounding code.
- Identify the programming language and framework.
- Understand the function's purpose and expected behavior.
- Check existing tests, interfaces, and dependencies when available.
- Identify duplicated logic, complexity, unclear naming, and other maintainability issues.

Do not modify code before understanding its purpose.

### Step 2: Plan

Create a short refactoring plan.

For each proposed change, explain:

- What will change.
- Why it improves the code.
- How existing behavior will be preserved.

Avoid changes that do not provide a clear benefit.

### Step 3: Refactor

Apply the smallest set of changes that achieves the goal.

Possible improvements include:

- Extracting repeated logic into reusable functions.
- Renaming unclear variables and functions.
- Reducing unnecessary nesting.
- Simplifying conditional expressions.
- Separating unrelated responsibilities.
- Removing genuinely unused code, comments, files, dependencies, etc.
- Improving module boundaries.
- Replacing overly complex logic with simpler equivalents.

Do not:

- Change public APIs without permission.
- Change business rules.
- Add unnecessary dependencies.
- Rewrite the entire file when a small change is sufficient.
- Remove code merely because it appears unused without checking its usage.
- Mix feature development with refactoring.

### Step 4: Verify

After refactoring:

1. Review the diff.

2. Check for unintended behavior changes.

3. Run relevant existing tests when tools are available.

4. Run appropriate linting or formatting checks when available.

5. Add or update tests only when necessary and within the requested scope.

If tests cannot be run, clearly state that they were not run.

If a test fails, report the failure instead of claiming success.

### Step 5: Report

Summarize the completed work using the output format below.

## Safety Rules

- Never overwrite unrelated user changes.
- Never delete project files without a clear reason and appropriate authorization.
- Never expose secrets, credentials, or environment variables.
- Ask for clarification when the intended behavior is ambiguous and a safe refactor is not possible.
- If the requested refactor requires a potentially breaking change, explain the risk before proceeding.

## Output Format

### Summary

Briefly explain what was refactored.

### Changes

List the important changes and their benefits.

### Behavior Preservation

Explain why the existing behavior should remain unchanged, noting any uncertainty.

### Verification

Report tests and checks that were actually run and their results.

### Remaining Issues

Mention any unresolved concerns or recommended follow-up work.

## Quality Checklist

Before finishing, confirm:

- [ ] Existing behavior is preserved.
- [ ] The code is easier to understand.
- [ ] No unnecessary dependencies were added.
- [ ] No unrelated files were modified.
- [ ] The diff contains only intended changes.
- [ ] Verification results are reported honestly.
