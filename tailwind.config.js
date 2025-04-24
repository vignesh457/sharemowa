/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./ui/**/*.{js,jsx,ts,tsx}"],
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
            Nunito: ["Nunito-Regular", "sans-serif"],
            NunitoLight: ["Nunito-Light", "sans-serif"],
            NunitoSemiBold: ["Nunito-SemiBold", "sans-serif"],
            NunitoBold: ["Nunito-Bold", "sans-serif"],
        },
        colors: {
            primary: {
                100: "#E27139",
            },
            secondary: {
                100: "#DFDFDF",
                200: "#525252",
                300: "#262626",
                400: "#000000",
            },
            success: {
                100: "#7EB489",
            },
            error: {
                100: "#DB7B7B",
            },
            warning: {
                100: "#F0C565",
            },
            general: {
                100: "#65C3EA",
            },
        },
    },
  },
  plugins: [],
}