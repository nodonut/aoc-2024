// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu().override('antfu/stylistic/rules', {
  rules: {
    'style/no-extra-semi': 'off',
    'style/semi': 'off',
    'no-console': 'off',
  },
});
