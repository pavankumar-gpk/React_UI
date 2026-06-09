# Project Architecture

## Directory Structure

```
src/
├── assets/           # Static assets (images, icons, fonts)
├── components/       # Reusable UI components
├── pages/            # Page components (route views)
├── store/            # Zustand state management slices
├── styles/           # SCSS themes and global styles
├── utils/            # Helper functions, constants, formatting utilities
├── i18n/             # Internationalization configuration
├── tests/            # Test files and test utilities
├── App.jsx           # Root component
└── main.jsx          # Application entry point
```

## Directory Purposes

| Directory | Purpose |
| --- | --- |
| **components/** | Reusable UI components (buttons, forms, modals, etc.) |
| **pages/** | Page-level components for routes |
| **store/** | Zustand state management slices |
| **styles/** | SCSS themes, global styles, and variables |
| **utils/** | Helper functions, formatting utilities, constants |
| **assets/** | Static files (images, icons, fonts) |
| **i18n/** | Internationalization (translations, language config) |
| **tests/** | Unit and integration tests |

## Key Principles
- **Components** = UI logic and presentation
- **Store** = State management (Zustand)
- **Styles** = SCSS theming and global styles
- **Utils** = Reusable helpers and constants