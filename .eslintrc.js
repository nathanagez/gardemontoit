module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
