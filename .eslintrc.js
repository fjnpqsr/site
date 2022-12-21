// .eslintrc.js
module.exports = {
    // Umi 项目
    extends: require.resolve('umi/eslint'),
    plugins: ['simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};
