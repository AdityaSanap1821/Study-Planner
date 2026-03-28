# Study Planner

A dark-mode assignment tracking SPA built with React + Tailwind CSS (Obsidian Amber theme).

## Problem This Solves

Students need a quick and intuitive way to manage their assignments without switching between multiple apps. Study Planner provides a single-page interface where all CRUD operations happen seamlessly without page reloads, allowing students to focus on their work.

## Tech Stack

### Frontend Architecture
- **React** 18.2.0 - Component-based UI framework for dynamic rendering
- **Tailwind CSS** 3.4.0 - Utility-first CSS for rapid dark-mode styling
- **React Hooks** - State management (useState, useEffect) for assignments and filters
- **Fetch API** - HTTP client for backend communication
- **PostCSS & Autoprefixer** - CSS processing for cross-browser compatibility

### Design & Styling
- **Obsidian Amber Theme** - Dark mode color palette (amber accents on dark backgrounds)
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Component Reusability** - Shared drawer component for add/edit operations

## Prerequisites

- Node.js 16+
- npm or yarn

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with Add button
│   ├── StatsBar.jsx        # Summary stats (total, pending, completed, overdue)
│   ├── FilterBar.jsx       # Filter pills by status, priority, subject
│   ├── AssignmentGrid.jsx  # Responsive card grid
│   ├── AssignmentCard.jsx  # Individual assignment card
│   ├── AssignmentDrawer.jsx # Slide-in form for add/edit
│   └── Icons.jsx           # SVG icon components
├── App.jsx                 # Root component, state management
├── data.js                 # Mock data + constants
├── utils.js                # Helper functions
└── index.css               # Tailwind directives + global styles
```

## Features

- Add, edit, delete assignments
- Priority levels: Low / Medium / High (color coded)
- Status toggle: Pending / Completed
- Overdue detection with visual flagging
- Filter by status, priority, and subject
- Slide-in drawer for add/edit (same component reused)
- Fully responsive (3 cols → 2 → 1)

## Challenges Overcome

**API Integration:** Connecting the frontend to the FastAPI backend required implementing proper error handling for async fetch calls, managing loading states, and ensuring CORS headers were correctly configured. The solution involved creating reusable API utility functions and proper state management for async operations.

**Form Validation:** Implementing inline form validation with red error messages below fields (instead of alert popups) required managing separate error state, clearing errors on user input, and validating all required fields before submission to the backend.

**Responsive Dark Theme:** Maintaining the Obsidian Amber theme consistency across all responsive breakpoints (mobile, tablet, desktop) involved careful Tailwind configuration and ensuring all color variables worked correctly with dark-mode backgrounds.
