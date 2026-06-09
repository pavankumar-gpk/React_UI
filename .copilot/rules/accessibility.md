# Accessibility Rules

## WCAG 2.1 Level AA Compliance
All Material UI components must meet WCAG 2.1 Level AA standards.

## Semantic Components
- Prefer Material UI components that wrap native HTML elements (Button, TextField, AppBar, Toolbar, Typography).
- Use semantic HTML (<main>, <nav>, <header>, <footer>) for layout.
- Add ARIA attributes only when MUI's built-in semantics don't cover the case.

## Text Alternatives
- Provide meaningful alt text for images.
- Use alt="" for decorative images.
- For Avatar or IconButton, ensure accessible labels via alt or aria-label.

## Color Contrast
- Maintain 4.5:1 contrast for normal text and 3:1 for large text/UI elements.
- Override MUI theme colors if defaults don't meet contrast requirements.
- Never rely on color alone — always add icons, text, or ARIA attributes.

## Keyboard Accessibility
- All interactive MUI components (Button, Menu, Dialog, Select) must be operable via keyboard.
- Ensure logical focus order and avoid traps in modals/dialogs.

## Visible Focus
- Keep MUI's default focus styles visible; don't override them to invisible.
- Customize theme focus indicators if necessary for clarity.

## Form Labels
- Use TextField with label prop or aria-label.
- Errors must be programmatically associated with fields (helperText + aria-describedby).

## Names, Roles, Values
- Custom components must expose correct ARIA roles and states.
- Verify MUI overrides don't break accessibility.

## Responsive & Zoom Support
- Layouts must remain usable at 200% zoom.
- Use MUI's responsive grid system to ensure proper reflow.

## Headings & Landmarks
- Use Typography with semantic variants (h1–h6) in logical order.
- Define landmark regions (<main>, <nav>, <aside>).

## Language
- Set <html lang="en"> in the root document (index.html).