import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  input: 'build/index.js',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'es',
      compact: true
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'default',
      compact: true
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env']
    }),
    terser()
  ]
})
