# Copilot Guidelines

## Main Project Requirements

See `context/requirements.md` for the complete project requirements and feature specifications.

All code generation MUST align with these core requirements:
- Policy Table View (pagination, sorting, filtering)
- Bulk Actions (multi-select, flag for review)
- Summary Statistics Panel
- State management & async handling
- Error states with meaningful messages

## Project Rules

All rules files in `.copilot/rules/` MUST be referred to and followed whenever generating, reviewing, or refactoring code.

### Rules Files to Always Reference

1. **accessibility.md** — WCAG 2.1 Level AA compliance, semantic components, text alternatives, color contrast, keyboard accessibility.

2. **architecture.md** — Project directory structure, folder purposes, and key principles.

3. **coding-standards.md** — File size limits, naming conventions, test colocation, and things to never do.

4. **error-handling.md** — ErrorBoundary implementation, async error handling, API calls with try/catch.

5. **i18n.md** — No hardcoded strings, store constants separately, English-only support, currency formatting.

6. **security.md** — XSS safety, HTML sanitization, API calls, logging without PII, sensitive data protection.

7. **storage.md** — Centralized StorageService, no direct localStorage/sessionStorage access.

8. **styling.md** — Theme tokens, dark mode setup, contrast ratios, interactive elements.

9. **testing.md** — Vitest + React Testing Library, component testing, mocking, accessibility testing.

## Tech Stack Reference

See `context/tech-stack.md` for the complete tech stack with versions and compatibility information.

## Code Generation Checklist

Before generating or refactoring code:
- ✅ Check **coding-standards.md** for naming conventions and file size limits.
- ✅ Check **architecture.md** for correct folder structure and organization.
- ✅ Check **accessibility.md** for Material UI accessibility requirements.
- ✅ Check **error-handling.md** for error boundary and try/catch patterns.
- ✅ Check **i18n.md** for no hardcoded strings.
- ✅ Check **security.md** for XSS, sanitization, and sensitive data handling.
- ✅ Check **storage.md** for StorageService usage.
- ✅ Check **styling.md** for theme tokens and dark mode compliance.
- ✅ Check **testing.md** for test structure and coverage requirements.