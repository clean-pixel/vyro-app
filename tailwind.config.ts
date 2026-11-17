import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ebony: '#0c0d11',
        panel: '#12141a',
        violet: '#8b5cf6',
        lilac: '#a78bfa',
        fog: '#d9d9df',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(139, 92, 246, 0.35), 0 12px 24px rgba(139, 92, 246, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
