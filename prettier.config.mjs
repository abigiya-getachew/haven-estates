/**
 * Formatting configuration.
 *
 * Tailwind class names are sorted through the Tailwind v4 stylesheet entry
 * point so the ordering matches the theme defined in DESIGN.md.
 */
const prettierConfig = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default prettierConfig;
