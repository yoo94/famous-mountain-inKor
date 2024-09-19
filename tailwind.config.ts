import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222.2, 84%, 4.9%)',
        card: 'hsl(0, 0%, 100%)',
        'card-foreground': 'hsl(222.2, 84%, 4.9%)',
        border: 'hsl(214.3, 31.8%, 91.4%)',
      },
    },
  },
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
