module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'eslint-plugin-prettier'],
    extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react/recommended',
        'eslint-config-prettier',
    ],
    rules: {
        'linebreak-style': 0,
        'import/prefer-default-export': 'off',
        'prettier/prettier': 'warn',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-var-requires': 'off',
        'no-use-before-define': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
};
