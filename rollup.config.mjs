import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'dayjs_plugin_cnWeek',
    compact: true
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env']
    }),
    terser()
  ]
})
