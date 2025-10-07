/**
 * Metro configuration for React Native
 * https://github.com/facebook/metro
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "cjs"],
  },
};

module.exports = mergeConfig(defaultConfig, config);
