module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [ 'plugin:vue/essential', '@vue/standard' ],
  overrides: [
    {
      files: [ '*.vuemodule' ],
      rules: { indent: 'off' },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: { parser: 'babel-eslint' },
  plugins: [],
  root: true,
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'arrow-spacing': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        exports: 'always-multiline',
      },
    ],
    'computed-property-spacing': [ 'error', 'always' ],
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'newline-per-chained-call': [ 'error', { ignoreChainWithDepth: 10 } ],
    'no-console': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true, minProperties: 2,
        },
        ObjectPattern: {
          multiline: true, minProperties: 2,
        },
        ImportDeclaration: {
          multiline: true, minProperties: 2,
        },
        ExportDeclaration: {
          multiline: true, minProperties: 2,
        },
      },
    ],
    'object-curly-spacing': [ 'error', 'always' ],
    'object-property-newline': 'error',
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'always' ],
    'space-in-parens': [ 'error', 'always' ],
    'space-infix-ops': [ 'error', { int32Hint: true } ],
    'template-curly-spacing': [ 'error', 'always' ],
    'vue/array-bracket-spacing': [ 'error', 'always' ],
    'vue/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
      },
    ],
    'vue/component-name-in-template-casing': [ 'error', 'kebab-case' ],
    'vue/object-curly-spacing': [ 'error', 'always' ],
    'vue/v-on-function-call': [ 'error', 'never' ],
    'vue/require-direct-export': 'error',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 1,
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
      },
    ],
    'vue/space-infix-ops': [ 'error', { int32Hint: true } ],
  },
};
