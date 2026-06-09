# Project Requirements - Policy Overview Dashboard

## Project Overview

Chubb's APAC operations team manages insurance policies across multiple regions. Build a Policy Overview Dashboard — a single-page application demonstrating production-quality frontend engineering.

## Core Features

### 1. Policy Table View
- Paginated, sortable table displaying policy records
- Server-side filtering by status, line of business, date range, and region
- Free-text search across policy number, policyholder name, and underwriter
- Configurable page size with sensible defaults

### 2. Bulk Actions
- Multi-select policies via checkboxes
- "Flag for Review" bulk action on selected policies
- Clear visual feedback on action success/failure

### 3. Summary Statistics Panel
- Counts by policy status (Active, Expired, Pending, Cancelled)
- Total premium by line of business
- Count of policies expiring within 30 days
- Updates when filters are applied

## Technical Requirements

### State Management
- Loading states for all async operations (skeleton screens or loading indicators)
- Empty states when no data matches filters
- Error states with meaningful messages and retry options
- Optimistic updates where appropriate (e.g., flagging for review)

### Architecture
- Follow folder structure in `.copilot/rules/architecture.md`
- Functional components only (React v19)
- SCSS styling with semantic tokens and dark mode support
- Centralized services for API calls and business logic

### Accessibility
- WCAG 2.1 Level AA compliance (see `accessibility.md`)
- Semantic HTML with Material UI components
- Keyboard navigation and focus indicators
- Screen reader support

### Testing
- Unit tests with Vitest + React Testing Library
- Accessibility tests with jest-axe
- Error state testing
- API mocking with MSW

### Performance
- Code splitting and lazy loading where appropriate
- Optimized re-renders with proper memoization
- Efficient state management with Zustand

## Mock Data

- 200 realistic APAC policy records in db.json
- Realistic names from APAC regions
- Policy data structure follows schema in `ai-journal.md`

## Deliverables

1. ✅ React v19 app with routing and SCSS
2. ✅ db.json with 200 mock records
3. ✅ JSON Server configured on port 3000
4. ✅ .env file with apiBase URL
5. ✅ proxy.json for API forwarding
6. ✅ npm scripts: `start` and `db`
7. ✅ Project rules and documentation in `.copilot/`
8. ✅ README with setup instructions

## Code Quality Standards

- Follow all rules in `.copilot/rules/`
- No hardcoded strings (use i18n constants)
- Centralized error handling with ErrorBoundary
- Centralized storage access with StorageService
- Consistent naming conventions and file size limits
- Comprehensive test coverage
