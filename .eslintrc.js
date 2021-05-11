module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: { jsx: true },
    ecmaVersion: 8,
    sourceType: 'module',
    babelOptions: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { browsers: ['Chrome >= 88'] },
            loose: true,
          },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
      plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        // "@babel/plugin-transform-regenerator",
      ],
    },
  },
  extends: [
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'react-app',
  ],
  plugins: ['babel', 'react', 'react-hooks', 'jsx-a11y', 'import', 'standard', 'promise', 'node'],
  rules: {
    'template-curly-spacing': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    semi: ['error', 'never'],
    'react/destructuring-assignment': 0,
    'arrow-parens': 0,
    'react/prop-types': 0,
    'max-len': ['error', { code: 350 }],
    'linebreak-style': ['error', 'unix'],
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    allowImplicit: 0,
    camelcase: 'error',
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never',
        ExportDeclaration: 'never',
        ObjectPattern: { multiline: false },
        // consistent: true,
        // minProperties: 5,
        ObjectExpression: { multiline: true },
      },
    ],
    'array-callback-return': 'off',
  },
}
