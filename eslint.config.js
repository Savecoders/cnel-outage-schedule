import eslintPluginAstro from "eslint-plugin-astro";
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [
      ".vscode/",
      "node_modules/",
      ".env",
      ".env.local",
      "pnpm-lock.yaml",
      ".vercel/",
    ],
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];
