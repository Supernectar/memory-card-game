import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import * as tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint["configs"].recommended],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
  },
  reactHooks.configs["recommended-latest"],
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
    plugins: { vitest, "testing-library": testingLibrary },
    ...testingLibrary.configs["flat/react"],
  },
  eslintConfigPrettier,
);
