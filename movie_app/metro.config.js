// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add path alias resolution
config.resolver.alias = {
  '@': path.resolve(__dirname),
};

module.exports = withNativeWind(config, {input: "./app/globals.css"});