import { ScheduledHandler } from "aws-lambda";
import Parser from "rss-parser";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const parser: Parser = new Parser();

export const parseFeed = async () => {
  const feed = await parser.parseURL("https://www.reddit.com/.rss");
  console.log(`Retreived ${feed.items.length} items from ${feed.title}`);
  return feed;
};

export const persist = async (body: any) => {
  const date = new Date();
  const key = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDay()}/${date.getHours()}${date.getMinutes()}.json`;
  await new S3Client({ region: process.env.AWS_REGION }).send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(body, null, 2),
    })
  );
  console.log(`Saved ${key}`);
};

export const handle: ScheduledHandler = async (_event, _context) => {
  const feed = await parseFeed();
  await persist(feed);
};
