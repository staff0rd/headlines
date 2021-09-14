import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: "headlines",
  frameworkVersion: "2",
  configValidationMode: "error",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      excludeFiles: "src/**/*.test.ts",
    },
    bucketName: "headlines-${sls:stage}",
  },
  plugins: ["serverless-webpack", "serverless-offline"],
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
      environment: {
        BUCKET_NAME: "${self:custom.bucketName}",
      },
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
