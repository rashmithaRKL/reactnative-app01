const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-css-transformer')
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'css']
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
