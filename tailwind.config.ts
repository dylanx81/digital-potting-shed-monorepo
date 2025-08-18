import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors
        earth: {
          50: "var(--color-earth-50)",
          100: "var(--color-earth-100)",
          200: "var(--color-earth-200)",
          300: "var(--color-earth-300)",
          400: "var(--color-earth-400)",
          500: "var(--color-earth-500)",
          600: "var(--color-earth-600)",
          700: "var(--color-earth-700)",
          800: "var(--color-earth-800)",
          900: "var(--color-earth-900)",
        },
        sage: {
          50: "var(--color-sage-50)",
          100: "var(--color-sage-100)",
          200: "var(--color-sage-200)",
          300: "var(--color-sage-300)",
          400: "var(--color-sage-400)",
          500: "var(--color-sage-500)",
          600: "var(--color-sage-600)",
          700: "var(--color-sage-700)",
          800: "var(--color-sage-800)",
          900: "var(--color-sage-900)",
        },
        rose: {
          50: "var(--color-rose-50)",
          100: "var(--color-rose-100)",
          200: "var(--color-rose-200)",
          300: "var(--color-rose-300)",
          400: "var(--color-rose-400)",
          500: "var(--color-rose-500)",
          600: "var(--color-rose-600)",
          700: "var(--color-rose-700)",
          800: "var(--color-rose-800)",
          900: "var(--color-rose-900)",
        },
        // Legacy colors for compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      spacing: {
        "2": "var(--space-2)",
        "4": "var(--space-4)",
        "8": "var(--space-8)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "24": "var(--space-24)",
        "32": "var(--space-32)",
        "40": "var(--space-40)",
        "48": "var(--space-48)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "sprout-grow": "sproutGrow 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        sproutGrow: {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "50%": { transform: "scale(1.1) rotate(5deg)", opacity: "0.8" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      transitionDuration: {
        fast: "var(--motion-duration-fast)",
        base: "var(--motion-duration-base)",
        slow: "var(--motion-duration-slow)",
      },
      transitionTimingFunction: {
        natural: "var(--motion-ease-natural)",
        emphatic: "var(--motion-ease-emphatic)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
