// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu().override('antfu/stylistic/rules', {
  rules: {
    'no-console': 'off',
  },
})
