const path = require('path');

const root = path.join(__dirname, '..');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const {ConfigBuilder, javascript, styles, assets} = require('@yandex-data-ui/webpack-levels');

const srcRoot = path.resolve(root, 'src');
const stylesRoot = path.resolve(root, 'styles');
const assetsRoot = path.resolve(root, 'assets');
const nodeModulesRoot = path.resolve(root, 'node_modules');
const uikitRoot = path.resolve(__dirname, '..', 'node_modules/@yandex-cloud/uikit');

const storybookRoot = path.resolve(root, '.storybook');

const ruleIncludes = [srcRoot, stylesRoot, assetsRoot, storybookRoot];

const config = new ConfigBuilder();

config
    .apply(
        javascript({
            bem: false,
            typescript: true,
            reactHotLoader: false,
            threadLoader: false, // https://github.com/storybookjs/storybook/issues/9515#issuecomment-607319175
            ruleIncludes,
        }),
    )
    .apply(styles({}))
    .apply(
        assets({
            ruleIncludes,
            ruleExcludes: [path.resolve(assetsRoot, 'icons'), path.resolve(assetsRoot, 'images')],
        }),
    )
    .module.addRule({
        test: /\.svg$/,
        include: [
            path.resolve(assetsRoot, 'icons'),
            path.resolve(nodeModulesRoot, '@yandex-data-ui/common/assets/icons'),
            path.resolve(uikitRoot, 'assets/icons'),
        ],
        loader: 'svg-sprite-loader',
        options: {
            extract: true,
            spriteFilename: 'sprite-[hash:6].svg',
        },
    })
    .plugins.addPlugin(new SpriteLoaderPlugin({plainSprite: true}));

const projectConfig = config.build();

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-knobs',
        './addons/addon-yaml/preset.js',
    ],
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            setDisplayName: false,
            shouldExtractLiteralValuesFromEnum: true,
            compilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
            },
        },
    },

    webpackFinal: async (storybookBaseConfig) => {
        storybookBaseConfig.module.rules = projectConfig.module.rules;

        storybookBaseConfig.plugins.push(...projectConfig.plugins);
        // Remove webpack-levels plugin for ts check, storybook already add it.
        storybookBaseConfig.plugins.splice(-3, 1);

        storybookBaseConfig.module.rules.push({
            test: /\.md$/,
            include: [root],
            use: [{loader: 'html-loader'}, {loader: 'markdown-loader'}],
        });
        storybookBaseConfig.module.rules.push({
            test: /\.(ico|bmp|gif|jpe?g|png|svg)$/,
            loader: 'url-loader',
            include: [root],
            exclude: [
                path.resolve(assetsRoot, 'icons'),
                path.resolve(nodeModulesRoot, '@yandex-data-ui/common/assets/icons'),
                path.resolve(uikitRoot, 'assets/icons'),
            ],
        });

        storybookBaseConfig.resolve.alias = {
            ...storybookBaseConfig.resolve.alias,
        };

        // без этого fileName в context.parameters в продакшн сборке становится цифрой, а не путём, и ссылку на сорсы не сформировать
        storybookBaseConfig.optimization.moduleIds = 'named';
        return storybookBaseConfig;
    },
};
