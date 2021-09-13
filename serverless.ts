import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "headlines",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    region: "us-west-2",
    runtime: "nodejs12.x",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    versionFunctions: false,
  },
  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          schedule: {
            rate: "rate(1 hour)",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
