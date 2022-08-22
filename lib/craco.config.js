const { whenDev, whenProd, when } = require("@craco/craco");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const deps = require("./package.json").dependencies;
const path = require("path");

const devModeConfig = (webpackConfig) => {
  webpackConfig.output.publicPath = "auto";
  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new ModuleFederationPlugin({
      name: "lib",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./components": "./src/module/lib/index.ts",
        "./scss": "./src/module/module.scss",
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
  ];

  return webpackConfig;
};

const prodModeConfig = (webpackConfig) => {
  webpackConfig = {
    ...webpackConfig,
    devtool: false,
    entry: __dirname + "/src/module/module.scss",
    output: {
      path: path.join(__dirname, "./build/"),
      assetModuleFilename: "assets/[name].[hash][ext]",
    },
    plugins: [new MiniCssExtractPlugin({ filename: "jk.ui.components.css" })],
  };

  return webpackConfig;
};

module.exports = {
  devServer: { port: 8081, open: false },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          if (env === "development") return devModeConfig(webpackConfig);
          if (env === "production") return prodModeConfig(webpackConfig);
        },
      },
    },
  ],
};
