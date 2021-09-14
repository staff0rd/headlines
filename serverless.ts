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
      excludeFiles: "src/**/*.test.ts",
    },
    bucketName: "headlines-${sls:stage}",
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
    parseFeed: {
      handler: "src/parseFeed.handle",
      events: [
        {
          schedule: {
            rate: "rate(1 hour)",
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:custom.bucketName}",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
