# Testing Rules (Vitest + React Testing Library)

## Test Runner

1. Use Vitest for all unit and integration tests.
2. Write tests in describe / it style with Vitest globals (describe, it, expect, beforeEach, afterEach).

## Component Testing

3. Use React Testing Library (RTL) for rendering and querying components.
4. Prefer user-centric queries (getByRole, getByLabelText, findByText) instead of test IDs.
5. For Material UI components, verify accessibility props (aria-label, aria-describedby, role) are correctly applied.

## Mocking

6. Use Vitest APIs (vi.fn(), vi.spyOn(), vi.mock()) for mocking functions, modules, or services.
7. Do not use Jasmine/Karma or legacy mocking libraries.

## Smart Components

8. Must be unit tested with RTL to cover logic, state, and rendering.
9. Include tests for props, state changes, and event handlers.

## Services

10. Must be unit tested with Vitest.
11. Mock API calls using vi.fn() or MSW (Mock Service Worker) for integration tests.

## Dumb Components

12. Render-only components (no logic/state) may skip full unit tests.
13. At minimum, include a smoke test to ensure they render without crashing.

## Accessibility Testing

14. Integrate jest-axe or @axe-core/react with RTL to validate accessibility.
15. Ensure Material UI overrides don't break ARIA roles or focus indicators.

## Error States

16. Test error messages, validation (helperText + aria-describedby), and fallback UI.
17. Verify dialogs and modals trap focus correctly.

## File Naming

18. Colocate tests with components/services: Component.test.tsx, service.test.ts.