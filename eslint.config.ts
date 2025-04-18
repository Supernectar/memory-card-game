import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage", "node_modules", ".next", "build", ".turbo"] },
  eslint.configs.recommended,
  tseslint.configs.strict,
  eslintPluginUnicorn.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
      "react/no-danger-with-children": "error",
      "react/jsx-max-depth": ["warn", { max: 5 }],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...reactHooks.configs["recommended-latest"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...reactRefresh.configs.vite,
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...jsxA11y.flatConfigs.recommended,
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    ...vitest.configs.recommended,
    rules: {
      "vitest/no-conditional-tests": "warn",
      "vitest/no-identical-title": "error",
      "vitest/prefer-hooks-in-order": "warn",
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    ...testingLibrary.configs["flat/react"],
    rules: {
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-wait-for-multiple-assertions": "warn",
      "testing-library/prefer-user-event": "warn",
      "testing-library/no-node-access": "error",
    },
  },
  {
    files: ["**/e2e/**/*.{js,ts}"],
    ...playwright.configs.recommended,
    rules: {
      "playwright/no-force-option": "warn",
      "playwright/require-to-select-options": "warn",
    },
  },
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    rules: {
      curly: "error",
    },
  },
);
