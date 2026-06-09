# Coding Standards (React + Material UI)

## File Size Limits

1. Any .ts / .tsx file: **300 lines maximum**.
2. Any .jsx template file: **150 lines maximum**.
3. Any .scss / .css file: **200 lines maximum**.
4. Any function or method: **30 lines maximum**.
5. Any class: **10 public methods maximum**.
6. When a limit is approached, **split the file before continuing**.

## Naming Conventions

1. **Components**: PascalCase — `PolicyTable`, `UserProfileCard`.
2. **Hooks**: use + camelCase — `useAuthToken`, `useFetchPolicies`.
3. **Services / Utilities**: PascalCase + Service suffix — `PolicyService`, `StorageService`.
4. **Interfaces / Types**: PascalCase, no I prefix — `Policy`, `FilterParams`.
5. **Enums**: PascalCase — `PolicyStatus`, `LineOfBusiness`.
6. **State Variables / Signals**: camelCase noun — `policies`, `selectedIds`.
7. **Derived State / Computed Values**: camelCase adjective/noun — `filteredPolicies`, `activeCount`.
8. **Files**: kebab-case — `policy-table.tsx`, `policy-service.ts`.
9. **SCSS tokens**: --kebab-case — `--color-surface-primary`.
10. **Constants**: UPPER_SNAKE_CASE — `PAGE_SIZE_DEFAULT`.
11. **Storage keys**: UPPER_SNAKE_CASE — `STORAGE_KEY_THEME`.

## Test Files

1. Every .test.tsx file lives **co-located next to the file it tests**.
2. No separate `__tests__` folders.
3. Deleting a source file means **deleting its test file** — they travel together.

## Things You Should Never Do

1. Use `any` in TypeScript — always type explicitly.
2. Make raw `localStorage` or `sessionStorage` calls outside `StorageService`.
3. Use `console.*` calls outside `LoggingService`.
4. Call API endpoints directly in components — centralize in `Services`.
5. Have a service that mixes two unrelated domains — keep services focused.
6. Use hardcoded API URLs or magic values in services.
7. Use hardcoded UI strings in components — use i18n constants from `/infrastructure/i18n`.
8. Create components without clear separation of logic and presentation.
9. Swallow errors — every caught error must be logged or re-thrown.
10. Use default exports for components — use named exports for clarity.