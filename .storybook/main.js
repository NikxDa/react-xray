module.exports = {
    stories: ['../src/**/*.stories.tsx'],

    docs: {
        autodocs: true
    },

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    addons: ['@storybook/addon-webpack5-compiler-swc']
}