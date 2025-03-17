import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "@vitest/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...vitest.environments.env.globals },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    plugins: {
      "react-hooks": reactHooks,
      "jest-dom": jestDom,
      "testing-library": testingLibrary,
      vitest,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jestDom.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
      ...vitest.configs.recommended.rules,
    },
  },
];
