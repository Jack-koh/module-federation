/* eslint-disable @typescript-eslint/no-var-requires */
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  devServer: { port: 8080 },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, context: { env, paths } }) => {
          return {
            ...webpackConfig,
            plugins: [
              ...webpackConfig.plugins,
              new ModuleFederationPlugin({
                name: "client",
                filename: "remoteEntry.js",
                remotes: { lib: "lib@http://localhost:8081/remoteEntry.js" },
                exposes: {},
                shared: {
                  ...deps,
                  react: { singleton: true, requiredVersion: deps.react },
                  "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
                },
              }),
            ],
          };
        },
      },
    },
  ],
};
