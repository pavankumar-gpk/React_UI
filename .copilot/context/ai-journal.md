# AI Interaction Journal

Tracks all AI interactions for review and monitoring.

## Fields
- **Prompt**: The input provided to AI
- **Timestamp**: ISO 8601 format (e.g., 2026-06-09T15:04:05Z)
- **Response**: AI's response or summary
- **Outcome**: `accepted`, `rejected`, or `challenged`

## Rules
- **Every prompt must be logged** in this journal immediately after interaction
- Record all AI interactions, no exceptions

## Entries

- Prompt: "Add tech-stack.md with Frontend (React, Vite, React Router, Zustand, Material UI), Mock Backend (JSON Server v0.17.4), Data (db.json), Testing (Vitest v1.5, React Testing Library v14.0)"
  Timestamp: 2026-06-09T00:00:00Z
  Response: "Created tech-stack.md with all specified technologies and versions. Added entry to ai-journal.md."
  Outcome: accepted

- Prompt: "Update tech-stack.md with detailed version table format showing specific versions (React 19.2.7, Vite 8.0.16, React Router 7.17.0, Zustand 5.0.14, Material UI 9.1.0, JSON Server 0.17.2, Vitest 4.1, React Testing Library 16.3.2) and compatibility between libraries"
  Timestamp: 2026-06-09T00:02:00Z
  Response: "Updated tech-stack.md to table format with Library/Tool, Version, and Works With columns. Added detailed compatibility information for all dependencies."
  Outcome: accepted

- Prompt: "Add accessibility rules covering WCAG 2.1 Level AA compliance, semantic components, text alternatives, color contrast, keyboard accessibility, visible focus, form labels, ARIA roles, responsive design, headings/landmarks, and language settings"
  Timestamp: 2026-06-09T00:03:00Z
  Response: "Created accessibility.md with 11 sections of accessibility rules for Material UI components and WCAG compliance."
  Outcome: accepted

- Prompt: "Add project architecture with directory structure (src/assets, components, pages, store, styles, utils, i18n, tests, App.jsx, main.jsx) and key principles"
  Timestamp: 2026-06-09T00:04:00Z
  Response: "Created architecture.md with directory structure, table of purposes, and key principles for components, store, styles, and utils."
  Outcome: accepted

- Prompt: "Add React + Material UI coding standards covering file size limits, naming conventions, test file colocation, and things to never do"
  Timestamp: 2026-06-09T00:05:00Z
  Response: "Created coding-standards.md with 11 file size rules, 11 naming conventions, 3 test file rules, and 10 things to never do practices."
  Outcome: accepted

- Prompt: "Add error handling rules: implement top-level ErrorBoundary, wrap feature routes with ErrorBoundary for isolation, and wrap all API calls (axios) in try/catch"
  Timestamp: 2026-06-09T00:06:00Z
  Response: "Created error-handling.md with 9 error handling rules covering ErrorBoundary, async error handling, user feedback, logging, storage/recovery, accessibility, config, and testing."
  Outcome: accepted

- Prompt: "Add i18n rules: never hardcode strings in UI, create all texts as constants in separate place, support English only for now, use standard React currency pipe for formatting"
  Timestamp: 2026-06-09T00:07:00Z
  Response: "Created i18n.md with 4 rules for string management, constant storage, English-only support, and currency formatting."
  Outcome: accepted

- Prompt: "Add security rules: React escapes values by default, use dangerouslySetInnerHTML cautiously with sanitization, create SafeHTMLRenderer utility, use fetch/axios for API calls, no PII in logs, never include sensitive data in URL parameters"
  Timestamp: 2026-06-09T00:08:00Z
  Response: "Created security.md with 5 rules covering XSS safety, HTML sanitization, HTTP requests, logging, and sensitive data protection."
  Outcome: accepted

- Prompt: "Add storage rules: create single StorageService for all localStorage/sessionStorage operations, never access raw storage directly, all error handling in StorageService only"
  Timestamp: 2026-06-09T00:09:00Z
  Response: "Created storage.md with 3 rules for centralized StorageService, preventing direct storage access, and encapsulated error handling."
  Outcome: accepted

- Prompt: "Add styling rules for dark mode: semantic tokens, ThemeProvider, contrast ratios, background/surface colors, text colors, interactive elements, error/success/warning colors"
  Timestamp: 2026-06-09T00:10:00Z
  Response: "Created styling.md with 14 rules for theme tokens, dark mode setup, color/contrast standards, and interactive elements."
  Outcome: accepted

- Prompt: "Add testing rules: Vitest test runner, RTL component testing, user-centric queries, Vitest mocking, smart/dumb component testing, services testing, accessibility testing, error states, file naming"
  Timestamp: 2026-06-09T00:11:00Z
  Response: "Created testing.md with 18 testing rules covering test runner setup, component/service testing, mocking, accessibility, error states, and file colocation."
  Outcome: accepted

- Prompt: "Add files that should be ignored to git repo"
  Timestamp: 2026-06-09T00:12:00Z
  Response: "Created .gitignore with standard ignores for Node dependencies, build artifacts, environment files, IDE files, OS files, logs, and testing coverage."
  Outcome: accepted

- Prompt: "Add info that all rules files have to be referred to whenever generating code"
  Timestamp: 2026-06-09T00:13:00Z
  Response: "Created COPILOT.MD with guidelines stating all rules files (accessibility, architecture, coding-standards, error-handling, i18n, security, storage, styling, testing) must be referred to before generating code."
  Outcome: accepted

## Template
- Prompt: ""
  Timestamp: ""
  Response: ""
  Outcome: ""
