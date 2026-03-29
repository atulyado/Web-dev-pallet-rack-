# Stow Solution — Wireframe Project

**Academic Submission | Pallet Rack & Warehouse Storage Solutions**  
**Design Style:** Low-fidelity · Grayscale · Minimalist

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [How to Open the Project](#how-to-open-the-project)
4. [Page Guide](#page-guide)
5. [Navigation Map](#navigation-map)
6. [File Responsibilities](#file-responsibilities)
7. [Design System Summary](#design-system-summary)
8. [What Is / Isn't Implemented](#what-is--isnt-implemented)

---

## Project Overview

Stow Solution is a **6-page wireframe website** for a fictional warehouse storage solutions company. It was built as an academic submission to demonstrate front-end wireframing skills.

The project covers:
- A public-facing site (Home, Products, Team)
- An admin-only area (Login, Dashboard with full CRUD)
- A shared design system (colors, typography, components)

All styling is **grayscale only** — no colors except red for destructive actions (delete, logout). No images are used; placeholder boxes indicate where real images would go.

---

## Folder Structure

```
stow-solution/
│
├── index.html              ← Home page (entry point)
│
├── pages/                  ← All other HTML pages
│   ├── login.html          ← Admin Login
│   ├── search.html         ← Product Search
│   ├── detail.html         ← Product Detail
│   ├── admin.html          ← Admin Dashboard
│   └── team.html           ← Team / About
│
├── css/                    ← Stylesheets
│   ├── styles.css          ← Global design system (shared by all pages)
│   └── pages.css           ← Page-specific styles (one section per page)
│
├── js/                     ← JavaScript
│   ├── main.js             ← Shared logic: navbar, footer, product data
│   ├── search.js           ← Renders product result cards
│   ├── detail.js           ← Populates product detail fields
│   └── admin.js            ← Full CRUD: add, edit, delete products
│
└── README.md               ← This file
```

---

## How to Open the Project

No server or build tools needed. Just open in a browser:

1. Locate the project folder on your computer.
2. Double-click **`index.html`** — this opens the Home page.
3. All navigation links work via relative paths between the files.

> **Tip:** If links between pages aren't working, try opening via a local server instead:
> - VS Code: Install the **Live Server** extension, right-click `index.html` → "Open with Live Server"
> - Or run `npx serve .` in the project folder (requires Node.js)

---

## Page Guide

| # | File | Page Name | Description |
|---|------|-----------|-------------|
| 1 | `index.html` | **Home** | Hero section, services grid, why-choose-us |
| 2 | `pages/login.html` | **Admin Login** | Centered login form, restricted access |
| 3 | `pages/search.html` | **Product Search** | Filter form + 5 product result cards |
| 4 | `pages/detail.html` | **Product Detail** | Full product info, specs, image placeholder |
| 5 | `pages/admin.html` | **Admin Dashboard** | Product table + add/edit form (CRUD) |
| 6 | `pages/team.html` | **Team** | 6-member grid with photo placeholders |

---

## Navigation Map

```
Home (index.html)
│
├── [Explore Products] ──────────────────→ Search (search.html)
│                                                │
├── [Products nav link] ────────────────→       │
│                                         [View Details] → Detail (detail.html)
│                                                              │
│                                               [← Back to Search] → Search
│
├── [Team nav link] ──────────────────────→ Team (team.html)
│
└── [Admin Login button] ─────────────────→ Login (login.html)
                                                   │
                                             [Login button] → Admin (admin.html)
                                                   │
                                             [Back to Home] → Home
                                             
Admin (admin.html)
│
├── [+ Add New Product] → Form View (create mode) → [Publish] → back to table
├── [Edit]              → Form View (edit mode)   → [Save]    → back to table
├── [Del]               → confirm dialog          → deleted from table
└── [Logout]            → confirm dialog          → Home
```

---

## File Responsibilities

### `css/styles.css` — Global Design System
Everything shared across all pages:
- CSS custom properties (color tokens, spacing, border styles)
- Reset & base styles
- Animations (`fadeIn`, `slideUp`, `slideInRight`)
- Utility classes (`.u-upper`, `.u-center`, etc.)
- Button components (`.btn-primary`, `.btn-secondary`, `.btn-ghost`)
- Form inputs (`.input`, `.select`, `.textarea`, `.form-label`)
- Navbar (`#navbar` and all child elements)
- Footer (`#footer` and all child elements)
- Responsive breakpoints shared across all pages

### `css/pages.css` — Page-Specific Styles
Organized into clearly labelled sections, one per page:
1. Home — hero, services grid, why-choose-us
2. Login — centered card layout
3. Search — filter form, result cards
4. Detail — two-column grid, specs, action buttons
5. Admin — table, form card, destructive button styles
6. Team — member grid, card layout

### `js/main.js` — Shared JavaScript
- `PRODUCTS` array — single source of truth for the 5 public products
- `getNavbarHTML()` — returns navbar markup string
- `getFooterHTML()` — returns footer markup string
- `setActiveNav()` — reads `<body data-page="">` and highlights the correct nav link
- `DOMContentLoaded` handler — injects navbar + footer into every page

### `js/search.js` — Search Page
- `renderResults()` — loops over `PRODUCTS` and builds result card HTML
- `goToDetail(id)` — saves product ID to `sessionStorage`, navigates to `detail.html`

### `js/detail.js` — Detail Page
- `populateDetail()` — reads `sessionStorage`, finds the product in `PRODUCTS`, fills all fields

### `js/admin.js` — Admin Dashboard
- `adminProducts` array — separate product data for the admin table
- `renderAdminTable()` — builds the `<tbody>` from current data
- `openCreateForm()` — clears form, sets title to "Create", shows form view
- `openEditForm(id)` — pre-fills form with product data, sets title to "Edit"
- `saveProduct()` — validates required fields, creates or updates product
- `deleteProduct(id)` — confirms then removes from array
- `showFormView()` / `showListView()` — toggles between the two admin states
- `handleLogout()` — confirm dialog then redirect to home

---

## Design System Summary

### Colors (Grayscale only)
| Variable | Hex | Used For |
|----------|-----|----------|
| `--white` | `#ffffff` | Page backgrounds, button fills on hover |
| `--gray-100` | `#F3F4F6` | Table header background, badges |
| `--gray-200` | `#E5E7EB` | Dividers, form borders |
| `--gray-300` | `#D1D5DB` | Card borders, navbar border |
| `--gray-400` | `#9CA3AF` | Placeholder text, muted labels |
| `--gray-600` | `#4B5563` | Body text, descriptions |
| `--gray-800` | `#1F2937` | Primary borders, standard buttons |
| `--gray-900` | `#111827` | Headings, admin elements |
| `--red-500` | `#EF4444` | Logout & delete buttons only |

### Typography
- Font: system-ui (no external font imports)
- H1: 48–60px, weight 900, UPPERCASE
- H2: 36px, weight 900, UPPERCASE, centered
- Labels: 12px, weight 700, UPPERCASE, letter-spaced
- Body: 14–16px, weight 400, gray-600

### Spacing (8px grid)
`8 → 16 → 24 → 32 → 48 → 64 → 80px`

### Borders
- Standard card/input: `2px solid var(--gray-300)`
- Dark emphasis: `2px solid var(--gray-800)`
- Admin form (heavy): `4px solid var(--gray-900)`
- Placeholder boxes: `2px dashed var(--gray-300)`

---

## What Is / Isn't Implemented

### ✅ Implemented
- All 6 pages with correct layouts
- Sticky navbar with active-state highlighting per page
- Shared footer on every page (injected via JS)
- Search → Detail navigation (product data passed via sessionStorage)
- Admin full CRUD: add, edit, delete products (in-memory, session only)
- Admin form toggle: list view ↔ form view with animations
- Logout and delete confirmation dialogs
- Hover states on all interactive elements
- Responsive layouts (mobile breakpoints at 768px)
- Page fade-in animations

### ⚠️ Wireframe Only (not implemented)
- Search filtering — the filter form is visual only; results don't change
- "Request Quote" button — no action
- Favourite/save icon button — no action
- Real authentication — login accepts any input
- Data persistence — all admin changes reset on page refresh
- Real images — all image areas are styled placeholder boxes
- Backend / database — no server, no storage

---

*Stow Solution Wireframe — Academic Submission 2026*
