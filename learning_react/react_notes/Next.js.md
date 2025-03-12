### Intro
`npx create-next-app@latest`

NextJS is based on RSCs.
Root app file reserved filenames:
- `page.js` = defines a route + automatically becomes entry point for its folder;
- `layout.js` = wraps pages in a persistent layout (for things like putting a navbar on every page)
- `icon.png` = will be used as a favicon;
- `not-found.js, error.js, loading.js, route.js` etc..

### [Error: ENOSPC: System limit for number of file watchers reached angular](https://stackoverflow.com/questions/65300153/error-enospc-system-limit-for-number-of-file-watchers-reached-angular)

The ESLint extension in VSCode watches all the files in node_modules by default, hitting the limit of files you can watch on Ubuntu (65536).


