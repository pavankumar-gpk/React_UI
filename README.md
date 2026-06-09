# Policy Overview Dashboard

A production-ready React v19 application built with Vite, React Router, Zustand, and Material UI. This dashboard manages insurance policy data across APAC regions.

## Tech Stack

- **Frontend**: React 19.2.7, Vite 8.0.16, React Router 7.17.0, Zustand 5.0.14, Material UI 9.1.0
- **Mock Backend**: JSON Server 0.17.2
- **Testing**: Vitest 4.1, React Testing Library 16.3.2
- **Styling**: SCSS

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Mock Data

Generate 200 mock policy records:

```bash
node seed.js
```

This creates `db.json` with realistic APAC names and policy data.

### 3. Start the Development Environment

**Terminal 1 - Start JSON Server (Mock Backend)**

```bash
npm run db
```

Server runs on `http://localhost:3000` and serves `/api/policies`

**Terminal 2 - Start React App (Frontend)**

```bash
npm run start
```

App runs on `http://localhost:5173`

## Project Structure

```
src/
├── features/
│   └── dashboard/
│       ├── components/
│       ├── Dashboard.jsx
│       └── Dashboard.test.tsx
├── core/
│   ├── models/
│   ├── services/
│   └── state/        # Zustand stores
├── infrastructure/
│   ├── logging/
│   ├── storage/
│   ├── error/
│   └── i18n/
├── styles/
│   ├── _tokens.primitives.scss
│   ├── _tokens.semantic.scss
│   ├── _themes.scss
│   └── styles.scss
├── App.jsx
└── main.jsx

.copilot/
├── context/
│   ├── tech-stack.md
│   ├── requirements.md
│   └── ai-journal.md
└── rules/
    ├── accessibility.md
    ├── architecture.md
    ├── coding-standards.md
    ├── error-handling.md
    ├── i18n.md
    ├── security.md
    ├── storage.md
    ├── styling.md
    └── testing.md
```

## Available Scripts

- `npm run start` — Start Vite dev server (React app)
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run db` — Start JSON Server on port 3000
- `npm run test` — Run tests with Vitest

## Environment Configuration

`.env` file contains:

```
VITE_API_BASE_URL=http://localhost:3000
```

Access in React:

```javascript
const apiBase = import.meta.env.VITE_API_BASE_URL
```

## Mock Data Structure

Each policy record contains:

```json
{
  "id": "uuid",
  "policyNumber": "POL-XXXXXX",
  "policyholderName": "APAC Name",
  "lineOfBusiness": "Property|Casualty|A&H|Marine",
  "status": "Active|Expired|Pending|Cancelled",
  "premiumAmount": 1000-5000000,
  "currency": "USD|SGD|HKD|AUD|JPY|THB",
  "effectiveDate": "YYYY-MM-DD",
  "expiryDate": "YYYY-MM-DD",
  "region": "Singapore|Hong Kong|Australia|Japan|Thailand|Indonesia|Malaysia|Philippines",
  "underwriter": "UW-XX",
  "flaggedForReview": boolean
}
```

## API Endpoints

JSON Server exposes:

- `GET /policies` — Fetch all policies
- `GET /policies?status=Active` — Filter by status
- `GET /policies/:id` — Fetch single policy
- `POST /policies` — Create policy
- `PATCH /policies/:id` — Update policy
- `DELETE /policies/:id` — Delete policy

## Development Rules

All development must follow rules in `.copilot/rules/`:

- **accessibility.md** — WCAG 2.1 Level AA compliance
- **architecture.md** — Folder structure and organization
- **coding-standards.md** — Naming, file size, and best practices
- **error-handling.md** — ErrorBoundary and error handling
- **i18n.md** — No hardcoded strings
- **security.md** — XSS, sanitization, data protection
- **storage.md** — StorageService usage
- **styling.md** — Dark mode, tokens, contrast
- **testing.md** — Vitest + RTL standards

See `.copilot/COPILOT.MD` for code generation checklist.

## Getting Started with Development

1. Start JSON Server: `npm run db`
2. Start React app: `npm run start`
3. Navigate to `http://localhost:5173`
4. Check console for mock API calls to `http://localhost:3000/policies`

## Notes

- db.json is generated dynamically and should be in `.gitignore`
- .copilot/context and .copilot/rules are tracked in git for project consistency
- Follow all rules in `.copilot/rules/` before generating or modifying code
