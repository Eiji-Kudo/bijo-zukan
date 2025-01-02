import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "import/no-default-export": "error",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }]
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/pages/**/*", "**/pages/api/**/*", "**/layout.tsx", "**/page.tsx"],
    rules: {
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",
    },
  }
];

export default eslintConfig;