// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': ['vue'],
  'rules': {

    // ESLint https://eslint.org/docs/rules/template-tag-spacing
    'indent': ['error', 2],
    'brace-style': 2,
    'comma-dangle': 2,
    'comma-style': ['error', 'last'],
    'semi': 2,
    'semi-style': [2, 'last'],
    'no-unused-vars': 2,
    'no-redeclare': 2,
    'no-eq-null': 2,
    'no-else-return': 2,
    'dot-notation': 2,
    'eqeqeq': 2,
    'dot-location': 2,
    'default-param-last': 2,
    'default-case-last': 2,
    'default-case': 2,
    'no-loss-of-precision': 2,
    'no-import-assign': 2,
    'no-func-assign': 2,
    'no-extra-semi': 2,
    'no-extra-parens': 2,
    'no-extra-boolean-cast': 2,
    'no-empty': 2,
    'no-dupe-keys': 2,
    'no-dupe-args': 2,
    'for-direction': 2,
    'no-compare-neg-zero': 2,
    'quotes': [2, 'single'],
    'multiline-comment-style': [2, 'starred-block'],
    // 注释
    'spaced-comment': [
      1, 'always',{
        'markers': ['@desc'] 
      }
    ],
    'sort-vars': 2,
    'array-bracket-newline': [2, { 'multiline': true, 'minItems': 6 }],
    'newline-per-chained-call': [2, { 'ignoreChainWithDepth': 6 }],
    'prefer-template': 'error',
    // vue3 标签问题 //https://eslint.vuejs.org/rules/html-self-closing.html
    'vue/max-attributes-per-line': [
      'error', {
        'singleline': {
          'max': 3,
          'allowFirstLine': true
        },      
        'multiline': {
          'max': 3,
          'allowFirstLine': true
        }
      }
    ]
 
  }
};
