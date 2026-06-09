# Styling Rules (React + Material UI)

## Theme Tokens

1. Define semantic tokens (primary, secondary, background, surface, error) in _tokens.semantic.scss.
2. Map raw values from _tokens.primitives.scss to semantic tokens.

## Dark Mode

3. Use Material UI's ThemeProvider to apply dark mode globally.
4. Set palette.mode = 'dark' for dark theme.
5. Dark mode background should use deep neutral tones (#121212 or equivalent).
6. Surface elements (cards, panels) should use slightly lighter shades for elevation.

## Color & Contrast

7. Ensure contrast ratios meet WCAG 2.1 AA (minimum 4.5:1 for text).
8. Primary text: light gray/white (#E0E0E0).
9. Secondary text: muted gray (#B0B0B0).
10. Ensure headings remain visually distinct with stronger contrast.
11. Error messages must use accessible red tones with sufficient contrast.
12. Success and warning colors should be adjusted for dark backgrounds.

## Interactive Elements

13. Buttons, links, and icons must have clear hover/focus states.
14. Focus indicators must remain visible in dark mode.