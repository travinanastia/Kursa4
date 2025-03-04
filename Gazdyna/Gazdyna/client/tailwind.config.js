/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff0c7e",
        primaryLight: "#ff70a6",
        light: "#ffe4e1",
      },
      backgroundImage: {
        login: 
          "url('https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?cs=tinysrgb&w=720&dpr=1')",
        hero: "url('https://images.pexels.com/photos/6947295/pexels-photo-6947295.jpeg?cs=tinysrgb&w=720&dpr=1')",
      },
    },
  },
  plugins: [],
};
