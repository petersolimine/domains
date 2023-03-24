const flowbite = require("flowbite");

module.exports = {
  presets: [flowbite],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        grammarly: "url('public/bg.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
