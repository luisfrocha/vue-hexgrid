module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  plugins: [],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'space-infix-ops': ['error', {int32Hint: true}],
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
    'vue/array-bracket-spacing': ['error', 'always'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/v-on-function-call': ['error', 'never'],
    'vue/require-direct-export': 'error',
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
      },
    ],
    'vue/space-infix-ops': ['error', {int32Hint: true}],
    quotes: ['error', 'single'],
    'space-in-parens': ['error', 'always'],
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
    'no-console': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {multiline: true, minProperties: 2},
        ObjectPattern: {multiline: true, minProperties: 2},
        ImportDeclaration: {multiline: true, minProperties: 2},
        ExportDeclaration: {multiline: true, minProperties: 2},
      },
    ],
    'object-property-newline': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'always'],
    'template-curly-spacing': ['error', 'always'],
    'newline-per-chained-call': ['error', {ignoreChainWithDepth: 10}],
    'arrow-spacing': 'error',
  },
  overrides: [
    {
      files: ['*.vuemodule'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
