module.exports = {
  // Common settings for JS Files.
  extends: [
    "eslint:recommended",
    // TODO: inspect: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html usage.
    "plugin:eslint-comments/recommended",
    // Disables all formatting related rules as formatting is handled by prettier.
    "prettier",
  ],
  parserOptions: {
    // The `ecmaVersion` should align to the supported features of our target runtimes (browsers / nodejs / others)
    // Consult with: https://kangax.github.io/compat-table/es2016plus/
    ecmaVersion: 2017,
  },
  env: {
    commonjs: true,
    mocha: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.js"],
    },
    {
      // TODO: does this also  scan d.ts files?
      files: ["*.ts"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "@typescript-eslint/no-use-before-define": [
          "error",
          // These can be safely used before they are defined due to function hoisting in EcmaScript
          { functions: false, classes: false },
        ],
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            // We only allow ts-expect-error comments to enforce removal
            // of outdated suppression comments when the underlying issue has been resolved.
            // https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/#what-about-ts-ignore
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": true,
            "ts-check": true,
          },
        ],
      },
    },
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      // Using the smaller vue rule subset (essential) to avoid including formatting rules
      // as formatting as handled by prettier **directly**.
      extends: ["plugin:vue/essential"],
    },
  ],
};
