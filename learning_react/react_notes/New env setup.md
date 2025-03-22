Should make it into a bash file, will need to create a Docker container anyway.

Create new project with Vite.
`npm create vite@latest my-app --template react`

Install Vitest & testing libraries.
`npm install --save-dev vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event @vitest/ui @types/testing-library__react @types/jest msw@latest`

If you need mocks:
Need to setup MSW: https://mswjs.io/docs/integrations/node

(Vitest has a UI server at http://localhost:51204/__vitest__/, have to start it with vitest --ui)

Run tests with:
`npx vitest`

Install ESLint + Prettier.
`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks`
`npx eslint --init`

Second object seems to be optional.
```
pluginReact.configs.flat["jsx-runtime"],
{
	plugins: {
		"react-hooks": reactHooks,
	},
	rules: {
		...reactHooks.configs.recommended.rules,
	},
},
```

Install testing ESLint plugins:
`npm install --save-dev eslint-plugin-jest-dom eslint-plugin-testing-library @vitest/eslint-plugin

Add to eslint config.
```js
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "@vitest/eslint-plugin";
```

Add to plugins:
```js
 "jest-dom": jestDom,
  "testing-library": testingLibrary,
  vitest,
```

Add to rules:
```js
...jestDom.configs.recommended.rules,
...testingLibrary.configs.react.rules,
...vitest.configs.recommended.rules,
```

Add to globals.
` globals: { ...globals.browser, ...vitest.environments.env.globals },`

Add to vite.config.js:
Reference types thing at the top of the file.
```js
/// <reference types="vitest/config" />
test: {
	globals: true,
	environment: "jsdom",
	setupFiles: "./src/setupTests.js",
},
```

Add setupTests.js.
`import "@testing-library/jest-dom";`

If using Typescript, add to tsconfig.json
```json
{ "path" : "./tsconfig.test.json"},
```

Create tsconfig.test.json:
```json
{
	"extends": "./tsconfig.app.json",
	"compilerOptions": {
	"types": ["vitest", "@testing-library/jest-dom", "@testing-library/react", "@testing-library/user-event"]
	},
	"include": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/*.spec.ts", "src/**/*.spec.tsx"]
}
```


Install tailwind + DaisyUI (much more easier with tailwind4).
`npm install -D tailwindcss @tailwindcss/vite daisyui@latest

Add to vite.config.ts
```ts
import tailwindcss from '@tailwindcss/vite'
  plugins: [tailwindcss(),],
```

Add tailwind to index.css.
```css
@import "tailwindcss";
@plugin "daisyui";
```


Delete auto-generated Readme.md (?)
Delete icons.
Delete App.tsx extra stuff.

Either clsx or classnames for easier application of class names.