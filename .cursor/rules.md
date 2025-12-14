# Cursor Coding Rules - Next.js 16 Project

## 1. Project Structure & Organization
- Use **Next.js 16 App Router**.
- Maintain a clean folder structure for scalability and maintainability:

```
/app
/(auth)           # Auth-related pages and layouts
/dashboard        # Admin or user dashboards
page.tsx
layout.tsx
/products
page.tsx
[id]/page.tsx
/components
/ui               # Shadcn UI components and custom UI
/common           # Reusable components
/layout           # Layout components
/hooks               # Custom React hooks
/store               # Zustand stores
/types               # TypeScript types/interfaces
/utils               # Utility functions
```

- Keep code modular and **DRY** (Don't Repeat Yourself).

---

## 2. UI & Components
- Always use **Shadcn UI components** where possible.
- Create **reusable, stateless components**.
- Keep UI **responsive and accessible**.

---

## 3. Next.js Features
- **Server Actions:** For server-side mutations.
- **SSR (Server-Side Rendering):** For dynamic pages.
- **ISR (Incremental Static Regeneration):** For cached but updated content.
- **CSR (Client-Side Rendering):** For interactive components.
- Use each strategy **wisely**.

---

## 4. State Management
- Use **Zustand** for global state.
- Keep stores **type-safe**.
- Avoid unnecessary rerenders.

---

## 5. TypeScript Rules
- Enable **strict TypeScript**.
- **Never use `any`**. Always define proper types/interfaces.
- Type **props, state, functions, API responses**.

---

## 6. Code Quality
- Write **human-readable, maintainable code**.
- Add **comments** for complex logic.
- Follow **consistent naming conventions**.
- Keep **functions small and focused**.
- Split large files logically.

---

## 7. General Rules
- Use **ESLint and Prettier** for consistency.
- Keep imports organized.
- Write code as if **another developer will maintain it**.

