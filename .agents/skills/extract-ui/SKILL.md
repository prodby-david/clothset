---
name: extract-ui
description: Use this when extracting or refactoring web components, sections, and UI.
---

# Web Skill

## Purpose

Make coupled sections, pages, components, and other UI make decoupled for easier to read and maintain.

## When to use

- When user wants to make coupled sections, pages, components, and other UI decoupled for easier to read and maintain.
- When user wants to extract or refactor web components, sections, and UI into reusable and purpose-driven files.
- When a page, component, or UI section contains too many responsibilities.
- When extracting sections or repeated UI patterns into separate components.
- When refactoring large or difficult-to-maintain components.
- When multiple components duplicate the same UI or presentation logic.
- When separating layout, presentation, and UI-specific logic.
- When improving component organization, naming, or file structure.
- When making components easier to test, understand, and maintain.

## Core Principles

- Strictly follow and use SoC (Separation of Concerns) principles when extracting or refactoring web components, sections, and UI.
- Separate hooks, components, UI, types/interfaces, constants (if applicable), and styles into their own files.
- Maintain the existing visual design, layout, responsiveness, and interactions.
- Avoid unnecessary custom hooks, utility functions, context providers, and configuration objects.
- Do not introduce generic components when a specific, descriptive component is clearer.
- Avoid excessive component nesting and unnecessary wrapper components.
- Each component should have one clear primary responsibility.
- Follow the project's framework, naming conventions, import patterns, styling approach, and component organization.

## Guidelines

- Use descriptive names based on responsibility or domain.
- Avoid passing entire objects when only a few properties are required, unless the object itself is the natural interface.
- Keep state close to the components that use it.
- Separate the hooks from components.
- Avoid passing entire objects when only a few properties are required, unless the object itself is the natural interface.
- Avoid adding redundant props or configuration objects to components unless they are necessary for the component's purpose.
