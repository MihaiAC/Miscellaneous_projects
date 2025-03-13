### Intro
`npx create-next-app@latest`

NextJS is based on RSCs.
Root app file reserved filenames:
- `page.js` = defines a route + automatically becomes entry point for its folder;
- `layout.js` = wraps pages in a persistent layout (for things like putting a navbar on every page)
- `icon.png` = will be used as a favicon;
- `not-found.js, error.js, loading.js, route.js` etc..

Folder structure mirrors the routes that are created. Interesting approach, reduces boilerplate from react-router-dom, but I still prefer Django's approach of defining routes explicitly.

**Link** component to ... link to other components.
Takes a bit of time to load the pages even for a small app.

Naming a folder with `[slug]` for dynamic routing. However, you don't seem to be able to validate what type of slug it is, so you probably need to do it in the component?

To be fair, NextJS' error messages and error panel is on a whole different level.

#### Importing an image
`import logoImg from "@/assets/logo.png";
Use: logoImg.src`
Also, use `<Image>` instead of `<img>` with next. Can lazy load images, automatically infers image dimensions + optimizes it (resize, compress, serving in webp). Also uses a CDN when deployed on Vercel (? automatically or if specified ?).

#### Using state
Can only do on client components.
Mark it as a client component with "use client".

RSCs are better for SEO, less client-side JS.

#### usePathname
Get current path (useful for e.g: highlighting the nav bar).
Is a hook, so can only be used in client components.




### [Error: ENOSPC: System limit for number of file watchers reached angular](https://stackoverflow.com/questions/65300153/error-enospc-system-limit-for-number-of-file-watchers-reached-angular)

The ESLint extension in VSCode watches all the files in node_modules by default, hitting the limit of files you can watch on Ubuntu (65536).


