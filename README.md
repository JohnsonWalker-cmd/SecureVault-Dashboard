# SecureVault Dashboard

A file management dashboard built with React and Tailwind CSS. It lets you navigate a nested folder structure, inspect file metadata, and track recently opened files.

---

## Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Requires Node 18+. No environment variables needed.

---

## Design File

[View on Figma →](https://your-figma-link-here.com)

---

## Recursive Strategy

The folder data comes from a flat-ish JSON file where each node has a `type` ("folder" or "file") and an optional `children` array. The challenge is that folders can be nested to any depth.

I solved this with a single `TreeNode` component that renders itself. When a node is a folder and it's expanded, it maps over its `children` and renders a `TreeNode` for each one — passing the depth and path down as it goes. Each instance manages its own `open/closed` state independently, so expanding one folder doesn't affect any other.

```text
TreeNode (01_Legal_Department)
  └── TreeNode (Active_Cases)
        └── TreeNode (Doe_vs_MegaCorp)
              └── TreeNode (Case_Summary.docx)  ← file, stops here
```

This means the component doesn't care whether the data has 2 levels or 20 — it handles both the same way without any changes.

---

## Wildcard Feature — Recents

The requirements covered browsing and inspecting files, but nothing tracked what you'd already opened. In a vault with hundreds of nested files, finding something you opened 10 minutes ago means navigating the whole tree again.

I added a **Recents** section at the top of the sidebar. Every time a file is selected, it gets pushed to the top of a short list (capped at 8). If the same file is opened again, it moves to the top instead of duplicating. Each entry shows the file icon, name, and a relative timestamp ("2m ago").

This is genuinely useful because it mirrors how people actually work — they return to the same few files repeatedly. It cuts out the navigation overhead entirely for recent work, which in a legal or finance context where speed matters, saves real time.
