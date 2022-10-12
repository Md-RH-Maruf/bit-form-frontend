/* eslint-disable import/no-extraneous-dependencies */
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const terserOptions = {
  compress: {
    passes: 10,
    drop_console: true,
  },
  output: {
    comments: false,
  },
  // mangle: {
  //   properties: true,
  //   reserved: [
  //     'bit_country_field',
  //   ]
  // }
}

export default function generateRollupConfig() {
  const packageJson = require('./package.json') // eslint-disable-line global-require, import/no-unresolved
  const inputFileName = packageJson.name
  const libName = packageJson.name.replace(/-/g, '_')
  const inputFilePath = `src/${inputFileName}.js`
  const outputFilePath = `dist/${inputFileName}.min.js`
  const devOutputFilePath = `dist/${inputFileName}.dev.js`

  const isDev = process.env.NODE_ENV === 'dev'

  return [
    {
      input: inputFilePath,
      external: ['window', 'document'],

      output: [
        ...isDev ? [
          {
            file: devOutputFilePath,
            name: libName,
            format: 'iife',
            globals: {
              document: 'document',
              window: 'window',
            },
          },
        ] : [
          {
            file: outputFilePath,
            name: libName,
            format: 'iife',
            plugins: [terser(terserOptions)],
            globals: {
              document: 'document',
              window: 'window',
            },
          },
        ],
      ],
      plugins: [
        ...isDev ? [
          serve({ open: true, port: 3030 }),
          livereload(),
        ] : [],
        resolve(),
        babel({
          presets: [
            [
              '@babel/preset-env',
              { targets: isDev ? '> 20%' : '> 2%' },
            ],
          ],
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
        }),
      ],
    },
  ]
}
