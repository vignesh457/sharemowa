/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily: {
            Jakarta: ["Jakarta", "sans-serif"],
            JakartaBold: ["Jakarta-Bold", "sans-serif"],
            JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
            JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
            JakartaLight: ["Jakarta-Light", "sans-serif"],
            JakartaMedium: ["Jakarta-Medium", "sans-serif"],
            JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
        },
        colors: {
            primary: {
                100: "#E27139",
            },
            secondary: {
                100: "#DFDFDF",
                200: "#BCBCBC",
                300: "#383838",
                400: "#161616",
            },
            success: {
                100: "#4BAE4F",
                200: "#08B783",
            },
            warning: {
                100: "#4BAE4F",
            },
            general: {
                100: "#CED1DD",
                200: "#858585",
                300: "#EEEEEE",
                400: "#0CC25F",
                500: "#F6F8FA",
                600: "#E6F3FF",
                700: "#EBEBEB",
                800: "#ADADAD",
            },
        },
    },
  },
  plugins: [],
}