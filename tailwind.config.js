module.exports = {
    purge: [
        "./**/*.html",
        "./js/*.js"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
          borderColor: ['first'],
          borderOpacity:  ['first'],
          borderRadius:  ['first'],
          borderStyle:  ['first'],
          borderWidth:  ['first'],
        }
    },
    plugins: [],
}