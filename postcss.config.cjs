/**
 * PostCSS configuration.
 *
 * CommonJS on purpose: Next.js loads a `.cjs` PostCSS configuration with
 * `require()`, while `.mjs` configurations are loaded through `import()`, and
 * an import path is parsed as a URL. A `#` in the project path is therefore
 * only safe with this file extension.
 */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
