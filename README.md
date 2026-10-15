# Dynamic Lead Form

A React + TypeScript lead capture form that renders itself from a typed config. The form supports responsive layouts, inline field validation, conditional company fields, and a working submit summary.

## Install and run

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Build for production:
   npm run build

## Folder layout

- src/App.tsx — app shell and page entry
- src/design-system/tokens.css — design tokens for color, spacing, type, and breakpoints
- src/components/atoms — reusable field atoms such as Button, TextInput, Select, Checkbox, and TextArea
- src/components/molecules/FormField — label + control + hint + error wrapper
- src/components/organisms/DynamicForm — config-driven form renderer
- src/config/leadFormConfig.ts — mock data and field config
- src/utils/validation.ts — shared validation logic for blur, submit, and conditional rules
- src/types/form.types.ts — typed form model

## Where the layout lives

- Desktop layout and form grid behavior: src/components/organisms/DynamicForm/DynamicForm.module.css
- App shell and outer container styling: src/App.module.css
- Mobile and tablet responsiveness: src/components/organisms/DynamicForm/DynamicForm.module.css and src/App.module.css via media queries
- This means the main form spacing, columns, and card layout are handled in DynamicForm.module.css, while the page shell, background, and overall frame styling are handled in App.module.css.

## Validation rules

Validation rules are kept in one module: src/utils/validation.ts. The form uses that shared logic to validate on blur and submit, and it hides the company field unless the selected lead type is Company.

## Notes

- No backend is required for this assignment.
- Submitting prints the final values to the page as a summary after the form passes validation.
