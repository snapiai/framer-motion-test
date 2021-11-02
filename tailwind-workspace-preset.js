// tailwind-workspace-preset.js
const defaultTheme = require('tailwindcss/defaultTheme');

const fontFamily = 'Poppins';

const colors = {
  brown: '#7F7071',
  white: '#FFFFFF',
  gray: {
    DEFAULT: '#999999',
    light: '#F5F5F5',
    lighter: '#FAFAFA',
  },
  body: '#595959',
  cyan: {
    light: '#C9E9E7',
    DEFAULT: '#BAD4D3',
  },
  dark: '#363D47',
  green: {
    DEFAULT: '#D3EDC8',
    light: '#EDF8E9',
  },
  blue: '#A5CEF5',
  pink: {
    DEFAULT: '#F4BCC8',
    light: '#FFF7F8',
  },
  brand: {
    google: '#CE5641',
    facebook: '#425794',
  },
};

const baseStylesPlugin = ({ addBase }) =>
  addBase({
    section: {
      paddingTop: 64,
      paddingBottom: 64,
    },
    body: {
      width: '100%',
      fontFamily: fontFamily,
      fontSize: 13,
      fontWeight: 400,
      lineHeight: '24px',
      color: colors.body,
      '-webkit-text-size-adjust': '100%',
      fontVariantLigatures: 'none',
      '-webkit-font-variant-ligatures': 'none',
      textRendering: 'optimizeLegibility',
      '-moz-osx-font-smoothing': 'grayscale',
      fontSmoothing: 'antialiased',
      '-webkit-font-smoothing': 'antialiased',
      textShadow: 'rgba(0, 0, 0, .01) 0 0 1px',
    },
    strong: {
      fontWeight: 600,
      color: colors.dark,
    },
    button: {
      fontWeight: 600,
      fontSize: 14,
    },
  });

const containerStylesPlugin = ({ addComponents }) =>
  addComponents({
    '.container': {
      maxWidth: '100%',
      '@screen xs': {
        maxWidth: '100%',
      },
      '@screen sm': {
        maxWidth: '100%',
      },
      '@screen md': {
        maxWidth: '940px',
      },
      '@screen lg': {
        maxWidth: '1024px',
      },
      '@screen xl': {
        maxWidth: '1216px',
      },
    },
  });

module.exports = {
  important: true,
  theme: {
    colors,
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2.5rem',
      },
    },
    // TODO
    // We have to find the way to extend the screens instead of reinitialize the full set
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    extend: {
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },
      fontSize: {
        xxs: '0.5rem',
      },
      spacing: {
        144: '36rem',
      },
      borderRadius: {
        button: '0.625rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    baseStylesPlugin,
    containerStylesPlugin,
  ],
};
