Should make it into a bash file, will need to create a Docker container anyway.

Create new project with Vite.
`npm create vite@latest my-app --template react`

Install Vitest & testing libraries.
`npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest eslint-plugin-jest-dom eslint-plugin-testing-library @vitest/ui eslint-plugin-vitest

Run tests with:
`npx vitest`

Install ESLint + Prettier.
`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks`
`npx eslint --init`

Add to eslint config.
```js
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "eslint-plugin-vitest";
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

Add to vite.config.js:
```js
test: {
	globals: true,
	environment: "jsdom",
	setupFiles: "./src/setupTests.js",
},
```

Add setupTests.js.
`import "@testing-library/jest-dom";`

Install tailwind.
`npm install -D tailwindcss@3 postcss autoprefixer`
`npx tailwindcss init -p`

Update tailwind.config.js to include all files.
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add tailwind to index.css.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

If using Typescript, add to tsconfig.json.
```json
{
  "compilerOptions": {
    "types": ["vitest"]
  }
}
```
