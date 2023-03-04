/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  tabWidth: 4,
  semi: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
