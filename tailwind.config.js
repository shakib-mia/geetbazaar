/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px", // sm: starts at 0px min width, but container maxWidth becomes 600px
        md: "905px",
        lg: "1240px",
        xl: "1440px",
        "2xl": "1560px",
      },
    },

    screens: {
      sm: { min: "0px" },
      md: { min: "600px" },
      lg: { min: "905px" },
      xl: { min: "1240px" },
      "2xl": { min: "1440px" },
      "3xl": { min: "1560px" },
      "4xl": { min: "1920px" },
    },

    spacing: {
      0: "0px",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "48px",
      6: "72px",
      7: "128px",
    },

    fontSize: {
      "heading-1": [
        "89.8px",
        {
          lineHeight: "112px",
          letterSpacing: "-1.5px",
          fontWeight: "400",
        },
      ],
      "heading-1-bold": [
        "89.8px",
        {
          lineHeight: "112px",
          letterSpacing: "-1.5px",
          fontWeight: "700",
        },
      ],

      "heading-2": [
        "67.34px",
        {
          lineHeight: "72px",
          letterSpacing: "-0.5px",
          fontWeight: "400",
        },
      ],

      "heading-2-bold": [
        "67.34px",
        {
          lineHeight: "72px",
          letterSpacing: "-0.5px",
          fontWeight: "700",
        },
      ],

      "heading-3": [
        "50.52px",
        {
          lineHeight: "56px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],

      "heading-3-bold": [
        "50.52px",
        {
          lineHeight: "56px",
          letterSpacing: "0px",
          fontWeight: "700",
        },
      ],

      "heading-4": [
        "37.9px",
        {
          lineHeight: "40px",
          letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],

      "heading-4-bold": [
        "37.9px",
        {
          lineHeight: "40px",
          letterSpacing: "0.25px",
          fontWeight: "700",
        },
      ],

      "heading-5": [
        "28.43px",
        {
          lineHeight: "32px",
          letterSpacing: "-0.18px",
          fontWeight: "400",
        },
      ],

      "heading-5-bold": [
        "28.43px",
        {
          lineHeight: "32px",
          letterSpacing: "-0.18px",
          fontWeight: "700",
        },
      ],

      "heading-6": [
        "21.328px",
        {
          lineHeight: "24px",
          letterSpacing: "-0.18px",
          fontWeight: "400",
        },
      ],

      "heading-6-bold": [
        "21.328px",
        {
          lineHeight: "24px",
          letterSpacing: "-0.18px",
          fontWeight: "700",
        },
      ],

      "paragraph-1": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0.5px",
          fontWeight: "400",
        },
      ],

      "paragraph-2": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],

      "subtitle-1": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0.5px",
          fontWeight: "400",
        },
      ],
      "subtitle-1-bold": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0.5px",
          fontWeight: "600",
        },
      ],

      "subtitle-2": [
        "12px",
        {
          lineHeight: "24px",
          letterSpacing: "0.1px",
          fontWeight: "400",
        },
      ],

      "subtitle-2-bold": [
        "12px",
        {
          lineHeight: "24px",
          letterSpacing: "0.1px",
          fontWeight: "700",
        },
      ],

      button: [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "1.25px",
          fontWeight: "700",
        },
      ],
    },

    extend: {
      colors: {
        transparent: "#00FFFF00",
        primary: {
          DEFAULT: "#064088",
          light: "#58A3FF",
          dark: "#002859",
        },
        secondary: {
          DEFAULT: "#0000FF",
          light: "#A7CAFF",
          dark: "#0000A6",
        },
        grey: {
          DEFAULT: "#9CA3AF",
          light: "#E5E7EB",
          dark: "#4B5563",
        },
        black: {
          DEFAULT: "#202020",
          primary: "#202020",
          secondary: "#202020CC",
          tertiary: "#202020B2",
          deactivated: "#20202080",
        },
        white: {
          DEFAULT: "#ffffff",
          primary: "#ffffff",
          secondary: "#FFFFFFD9",
          tertiary: "#FFFFFFB2",
          deactivated: "#FFFFFF80",
        },
        interactive: {
          light: {
            DEFAULT: "#2B52DD",
            hover: "#1C3DB2",
            active: "#18328E",
            focus: "#18328E",
            disabled: "#D1D8E2",
          },

          "light-confirmation": {
            DEFAULT: "#22683E",
            hover: "#194E31",
            active: "#0E3522",
            focus: "#2E844A",
            disabled: "#CED4D0",
          },

          "light-destructive": {
            DEFAULT: "#BA0517",
            hover: "#8E030F",
            active: "#640103",
            focus: "#EA001E",
            disabled: "#DBCECD",
          },

          dark: {
            DEFAULT: "#78B0FD",
            hover: "#57A3FD",
            active: "#1B96FF",
            focus: "#AACBFF",
            disabled: "#354F72",
          },

          "dark-confirmation": {
            DEFAULT: "#45C65A",
            hover: "#41B658",
            active: "#3BA755",
            focus: "#91DB8B",
            disabled: "#2D5C35",
          },

          "dark-destructive": {
            DEFAULT: "#FE8F7D",
            hover: "#FE7765",
            active: "#FE5C4C",
            focus: "#FEB8AB",
            disabled: "#623833",
          },
        },

        surface: {
          white: {
            DEFAULT: "#FFFFFF",
            line: "#E1E6EF",
            "surface-1": "#F8F9FC",
            "surface-2": "#F1F3F9",
          },
          black: {
            DEFAULT: "#202020",
            line: "#3F444D",
            "surface-1": "#2B2D30",
            "surface-2": "#3C3C42",
          },
        },

        success: {
          DEFAULT: "#22C55E",
          light: "#86EFAC",
        },
        warning: {
          DEFAULT: "#EAC608",
          light: "#FFED8E",
        },
        info: {
          light: "#BFDBFE",
          DEFAULT: "#60A5FA",
        },
        error: {
          DEFAULT: "#F87171",
          light: "#FECACA",
        },
      },
      boxShadow: {
        base: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)",
        lg: "0px 4px 6px rgba(0, 0, 0, 0.05), 0px 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0px 10px 10px rgba(0, 0, 0, 0.04), 0px 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0px 25px 50px rgba(0, 0, 0, 0.25)",
        inner: "inset 0px 2px 4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
