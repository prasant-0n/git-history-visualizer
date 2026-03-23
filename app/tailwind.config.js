/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      colors: {
        /* Background colors */
        'bg-primary': 'hsl(var(--bg-primary))',
        'bg-secondary': 'hsl(var(--bg-secondary))',
        'bg-tertiary': 'hsl(var(--bg-tertiary))',
        'bg-hover': 'hsl(var(--bg-hover))',
        
        /* Text colors */
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        'text-tertiary': 'hsl(var(--text-tertiary))',
        
        /* Accent colors */
        'accent-primary': 'hsl(var(--accent-primary))',
        'accent-secondary': 'hsl(var(--accent-secondary))',
        'accent-tertiary': 'hsl(var(--accent-tertiary))',
        'accent-success': 'hsl(var(--accent-success))',
        'accent-warning': 'hsl(var(--accent-warning))',
        'accent-error': 'hsl(var(--accent-error))',
        
        /* Gray scale */
        gray: {
          50: 'hsl(var(--gray-50))',
          100: 'hsl(var(--gray-100))',
          200: 'hsl(var(--gray-200))',
          300: 'hsl(var(--gray-300))',
          400: 'hsl(var(--gray-400))',
          500: 'hsl(var(--gray-500))',
          600: 'hsl(var(--gray-600))',
          700: 'hsl(var(--gray-700))',
          800: 'hsl(var(--gray-800))',
          900: 'hsl(var(--gray-900))',
        },
      },
      backgroundColor: {
        'primary': 'hsl(var(--bg-primary))',
        'secondary': 'hsl(var(--bg-secondary))',
        'tertiary': 'hsl(var(--bg-tertiary))',
        'hover': 'hsl(var(--bg-hover))',
      },
      textColor: {
        'primary': 'hsl(var(--text-primary))',
        'secondary': 'hsl(var(--text-secondary))',
        'tertiary': 'hsl(var(--text-tertiary))',
      },
      borderColor: {
        'default': 'var(--border-color)',
      },
      borderWidth: {
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      transitionDuration: {
        instant: '0ms',
        fast: '100ms',
        normal: '200ms',
        smooth: '300ms',
        slower: '500ms',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: '0 0 20px rgba(13, 148, 136, 0.3)',
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
