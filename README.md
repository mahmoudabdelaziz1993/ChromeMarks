# ChromeMarks

**ChromeMarks** is a high-performance, developer-centric bookmark manager built for speed, precision, and a seamless organization experience. It reimagines the native Chrome bookmark manager with a modern stack and an "OS-level" feel.

## 🚀 Key Features

* **Instant Management**: Rename folders and links inline with a double-click—no more disruptive popups.
* **Smart Recursive Search**: A high-performance search that preserves your folder structure context using `useDeferredValue` for zero-lag filtering.
* **Native Drag & Drop**: Effortlessly organize your space by moving nodes directly into folders with real-time visual feedback.
* **Contextual Actions**: Quick-access menus for renaming and deletion, optimized with focus management for a smooth UX.
* **Real-time Sync**: Automatically stays in sync with your browser's bookmark events (`onCreated`, `onRemoved`, `onChanged`, `onMoved`).

## 🛠️ Tech Stack

* **Framework**: React 18 + Vite.
* **Language**: TypeScript.
* **Styling**: Tailwind CSS.
* **UI Components**: Radix UI + Shadcn/ui.
* **Icons**: Remix Icon.
* **Browser API**: Chrome Extensions API (Manifest V3).

## 📦 Installation (Developer Mode)

Since this extension is optimized for power users and developers, follow these steps to install it directly from the source:

### 1. Clone & Build
First, ensure you have [Node.js](https://nodejs.org/) installed, then run the following in your terminal:

```bash
# Clone the repository
git clone https://github.com/mahmoudabdelaziz1993/ChromeMarks.git

# Navigate to project directory
cd ChromeMarks

# Install dependencies
npm install

# Build the extension
npm run build
```

### 2. Load into Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **"Developer mode"** using the toggle in the top-right corner.
3. Click the **"Load unpacked"** button.
4. Select the `dist` folder located inside the project directory.

## 📂 Project Structure

* `src/components/bookmarks`: Core UI components including `BookmarkItem`, `BookmarkFolder`, and `ActionsMenu`.
* `src/hooks`: Custom hooks like `useBrowserData` for API interaction and `useBookmarkRename` for inline editing logic.
* `src/lib/chrome-actions.ts`: Service layer for Chrome API interactions (move, rename, remove).

## 🤝 Contributing

Feel free to fork, open issues, or submit PRs to enhance the functionality.

---
**Developed by [Mahmoud Abdelaziz](https://mahmoudabdelaziz1993.github.io/mahmoud-abdelaziz/en)** *Senior Frontend Developer based in Egypt*
