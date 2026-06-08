# SecureVault Dashboard

A file management dashboard built with React 19, Vite, and Tailwind CSS. Navigate nested folder structures, inspect file metadata, search across files, and track recently opened items.

## Live Demo

[View Live →](https://secure-vault-dashboard-theta.vercel.app/)

---

## Tech Stack

| Layer   | Technology     |
| ------- | -------------- |
| UI      | React 19       |
| Styling | Tailwind CSS 4 |
| Icons   | Lucide React   |
| Bundler | Vite           |

---

## Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Production build
npm run build
```

Requires Node 18+. No environment variables needed.

---

## Design File

[View on Figma →](https://www.figma.com/design/YA8pFP5mDny7qFQxQefYg4/SecureVault?m=auto&t=Y0bPI7eTS4hUTYiD-6)

---

## Project Structure

```text
src/
├── App.jsx                  # Root state, recents logic, layout
├── components/
│   ├── Navbar.jsx           # Top bar and search
│   ├── Sidebar.jsx          # Tree navigator and Recents
│   ├── MainPanel.jsx        # File grid view
│   ├── PropertiesPanel.jsx  # File metadata panel
│   └── SearchBar.jsx        # Search input
└── main.jsx
```

---

## Recursive Strategy

The folder data comes from a flat-ish JSON file where each node has a `type` ("folder" or "file") and an optional `children` array. The challenge is that folders can be nested to any depth.

I solved this with a single `TreeNode` component that renders itself. When a node is a folder and it's expanded, it maps over its `children` and renders a `TreeNode` for each one — passing the depth and path down as it goes. Each instance manages its own open/closed state independently, so expanding one folder doesn't affect any other.

```text
TreeNode (01_Legal_Department)
  └── TreeNode (Active_Cases)
        └── TreeNode (Doe_vs_MegaCorp)
              └── TreeNode (Case_Summary.docx)  ← file, stops here
```

This means the component doesn't care whether the data has 2 levels or 20 — it handles both the same way without any changes.

---

## Recents

The requirements covered browsing and inspecting files, but nothing tracked what you'd already opened. In a vault with hundreds of nested files, finding something you opened 10 minutes ago means navigating the whole tree again.

I added a **Recents** section at the top of the sidebar. Every time a file is selected, it gets pushed to the top of a short list (capped at 8). If the same file is opened again, it moves to the top instead of duplicating. Each entry shows the file icon, name, and a relative timestamp ("2m ago"). State is persisted in `localStorage` so the list survives page reloads.

This is genuinely useful because it mirrors how people actually work — they return to the same few files repeatedly. It cuts out the navigation overhead entirely for recent work, which in a legal or finance context where speed matters, saves real time.

---

## Other Features

**Main Panel** — Displays the contents of the selected folder as a file grid with type icons, names, and basic metadata.

**Properties Panel** — Shows detailed metadata for the selected file: name, type, size, created date, modified date, and owner.

**Search** — Static now will work on it later.
