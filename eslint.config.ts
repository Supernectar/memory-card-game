import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";
import vitest from "@vitest/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import eslintPluginImportX from "eslint-plugin-import-x";
import * as tsParser from "@typescript-eslint/parser";

export default tseslint.config(
  { ignores: ["dist"] },
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
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
      vitest,
    },
    settings: {
      "import-x/resolver": {
        alias: {
          map: [["", "./public"]],
        },
      },
    },
    ...testingLibrary.configs["flat/react"],
  },
  reactHooks.configs["recommended-latest"],
  eslintPluginPrettierRecommended,
  ...tailwind.configs["flat/recommended"],
);
