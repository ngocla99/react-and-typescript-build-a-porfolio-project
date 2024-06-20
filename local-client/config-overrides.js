const webpack = require("webpack");
module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    constants: require.resolve("constants-browserify"),
    assert: require.resolve("assert/"),
    os: require.resolve("os-browserify/browser"),
    "process/browser": require.resolve("process/browser"),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [
    {
      message:
        /Critical dependency: the request of a dependency is an expression/,
    },
  ];
  return config;
};
