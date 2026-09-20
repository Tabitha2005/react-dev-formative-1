# Dev Insights Mini Blog

A small internal blog front end for the fictional startup "Dev Insights", where employees can share quick web development tips. Built with React, TypeScript and Vite, with no templates beyond the standard `react-ts` Vite scaffold.

## How to install, run and test

This project uses **Vite**. The app lives in the `mini-blog` folder.

```bash
git clone https://github.com/Tabitha2005/react-dev-formative-1.git
cd react-dev-formative-1/mini-blog
npm install
npm run dev
```

Vite prints a local address (usually `http://localhost:5173`). Open it in your browser.

Other commands, all run from `mini-blog`:

- `npm run build` type checks the project and creates a production build
- `npm run preview` serves the production build locally
- `npm run lint` runs Oxlint (it currently shows 3 "Fast refresh" warnings and no errors)
- `npx tsc -b` runs the TypeScript check on its own

There is no automated test suite in this project. I tested it by running the type check, the production build and the linter, and by checking the app by hand in the browser (including the browser console for the HOC logs).

## What the app does

- A `Header` with a text logo and a "New Post" link (not functional yet)
- A `PostList` that shows three sample posts
- Each post shows a title, author, date and a short preview
- Posts by one author get a highlighted background
- Posts less than 24 hours old get a "New!" badge

## Project structure

```
mini-blog/src
  components/   Header, PostList, Post
  data/         sample posts
  hoc/          withLogger higher-order component
  styles/       CSS files, one per component plus a global file
  types/        the Post TypeScript interface
  utils/        getPreview, formatDate and isNew helper functions
```

I split the code this way so each folder has one job. Components only display things, the data and helper functions live outside them, and types are in one place.

## My choices

### Functional components, not class components

All my components are functional. `Header`, `PostList` and `Post` only display what they receive through props. They have no state and need no lifecycle methods, so a class would add extra code (`extends Component`, `render()`, `this.props`) for no benefit. Functional components are also the modern standard in React, they work with hooks, and they work well with `React.memo`. Class components are still needed for a few things, like error boundaries, but nothing in this project needs one.

### TypeScript

The `Post` interface in `src/types/post.ts` describes the shape of a post (id, title, author, content, date). Each component has a typed props interface, so TypeScript catches mistakes like a missing or misspelled prop. Dates are stored as ISO strings and turned into readable text by `formatDate`.

### Styling methods

I used two methods:

1. **External CSS files** for layout, the header and the post cards. There is one file per component, which makes it clear where each style lives. This is the main styling method because it handles shared styles and hover effects.
2. **Inline styles** on the word "Dev" in the header logo. Inline styles suit small one-off values, but they can't do hover states or media queries, so I only used one here.

**Conditional styling:**

- Posts by the highlighted author get an extra CSS class (`post--highlighted`) chosen with a ternary.
- A red "New!" badge shows only when a post is less than 24 hours old. It uses `condition && <element>`.
- The first sample post's date is built from `Date.now()`, so it always counts as new. A fixed date would be older than 24 hours after a day, and the badge would never show again.

### Optimization

- **Unique `key` props.** Each post in the list uses `key={post.id}`. I used the id and not the array index, because indexes change if the list is reordered.
- **`React.memo` on `Post`.** `Post` only depends on its props, so React can skip re-rendering it when the props haven't changed. I checked this with a temporary counter button and a `console.log` in `Post`. With `memo`, clicking the button caused no new post renders. Without it, every click re-rendered all three posts. I removed the test code afterwards.
- **A trade-off:** because `memo` skips re-renders, a "New!" badge won't disappear by itself after 24 hours. It updates when the post re-renders or the page reloads. That is fine for this project.

### Higher-order component: `withLogger`

`withLogger` in `src/hoc/withLogger.tsx` takes a component and returns a new one that logs a message when it mounts and when it unmounts. It uses `useEffect` with an empty dependency array, and the function it returns runs on unmount. It uses a generic type so it works with any component's props, and it sets a `displayName` so React DevTools shows `withLogger(Header)`.

I applied it to `Header` with one line: `export default withLogger(Header)`. `Header` itself didn't need to change.

In development you will see "mounted, unmounted, mounted" in the browser console. That is React's `StrictMode` mounting, unmounting and remounting components on purpose to check that cleanup code works. A production build only logs "mounted" once.

## Challenges and how I overcame them

- **Leftover Vite files were different from what I expected.** The template had files I didn't expect. I ran `ls` and `grep` to see what was actually there before deleting anything.
- **Running a command in the wrong folder.** `npx tsc -b` failed with a missing `tsconfig.json` error because I ran it from `src/data`. I learned that tools look for their config in the current folder, so I now run everything from `mini-blog`.
- **CSS files in the wrong place.** My CSS files ended up in `mini-blog/styles` instead of `mini-blog/src/styles`, and Vite gave a "failed to resolve import" error. I also used `../` instead of `./` in `App.tsx`. Both taught me that import paths are relative to the file they are written in, and that Vite's error message names the exact file and line to check.
- **Looking for console logs in the terminal.** The `withLogger` messages appear in the browser console, not the terminal that runs Vite. Once I opened the browser dev tools I could see them.
- **Uncommitted work.** One change was still uncommitted when I thought it was pushed. Running `git status` and `git log` after each push fixed that habit.
- **Invisible characters in my README.** After copying text in, my README had hidden characters and stray spaces. I found them with `grep` and cleaned them out.

## External libraries and packages

Runtime:

- `react`
- `react-dom`

Development tools (set up by the Vite `react-ts` template):

- `vite` and `@vitejs/plugin-react`
- `typescript`
- `oxlint`

I did not add any styling libraries or other extra packages. The full list with versions is in `mini-blog/package.json`.
