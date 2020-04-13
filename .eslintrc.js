module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: [2, 'never'],
    'comma-dangle': ['error', 'never'],
    eqeqeq: ['error', 'smart'],
    'no-param-reassign': ['error', { props: false }]
  }
};
