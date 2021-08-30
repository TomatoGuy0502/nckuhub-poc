module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: {
          '50': '#f2f7f8',
          '100': '#d6f0f9',
          '200': '#a8e2f2',
          '300': '#73c5df',
          '400': '#18abd6',
          '500': '#2b83ae',
          '600': '#256994',
          '700': '#205074',
          '800': '#183654',
          '900': '#0f2138'
        },
        blue: {
          '50': '#f6f9fb',
          '100': '#e2f0fc',
          '200': '#c3dafa',
          '300': '#99b7f2',
          '400': '#7290e7',
          '500': '#5b6cdf',
          '600': '#4b50d0',
          '700': '#3a3caf',
          '800': '#282981',
          '900': '#171952'
        },
        indigo: {
          '50': '#f8fafb',
          '100': '#e9f0fc',
          '200': '#d2d6f9',
          '300': '#aeb2f0',
          '400': '#9189e5',
          '500': '#7964dd',
          '600': '#6348cd',
          '700': '#4b36ab',
          '800': '#34257d',
          '900': '#1d184c'
        },
        pink: {
          '50': '#fcfbfb',
          '100': '#f8eff5',
          '200': '#f2ceec',
          '300': '#e4a3d6',
          '400': '#df75bc',
          '500': '#cf51a5',
          '600': '#b63686',
          '700': '#8f2963',
          '800': '#661d41',
          '900': '#3c1323'
        },
        cerise: {
          '50': '#fcfcfb',
          '100': '#faf0f0',
          '200': '#f6cfe1',
          '300': '#eba2c2',
          '400': '#e7739d',
          '500': '#d94f7f',
          '600': '#c1355e',
          '700': '#9a2845',
          '800': '#6e1c2d',
          '900': '#431218'
        },
        cocoa: {
          '50': '#fcfbf9',
          '100': '#fbf0e0',
          '200': '#f6d4bf',
          '300': '#e9aa8f',
          '400': '#e07b60',
          '500': '#ce593e',
          '600': '#b33e29',
          '700': '#8b2f20',
          '800': '#622017',
          '900': '#3d140e'
        },
        gold: {
          '50': '#fbfaf5',
          '100': '#f9f0c8',
          '200': '#f2db92',
          '300': '#dfb55e',
          '400': '#c88935',
          '500': '#ac691c',
          '600': '#8e4f12',
          '700': '#6c3b10',
          '800': '#4a290d',
          '900': '#30190a'
        },
        lemon: {
          '50': '#fbfaf3',
          '100': '#f8f0bb',
          '200': '#f0de7e',
          '300': '#d8ba4c',
          '400': '#b69028',
          '500': '#957114',
          '600': '#78580d',
          '700': '#5c420c',
          '800': '#3f2d0a',
          '900': '#2a1c08'
        },
        grass: {
          '50': '#f6f7f3',
          '100': '#ecf0d9',
          '200': '#d2e4ac',
          '300': '#a2c676',
          '400': '#5da347',
          '500': '#428627',
          '600': '#366e1b',
          '700': '#2d5417',
          '800': '#203914',
          '900': '#162310'
        }
      },
      fontFamily: {
        sans:
          'Noto Sans TC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
