import { ScheduledHandler } from "aws-lambda";
import Parser from "rss-parser";

const parser: Parser = new Parser();

export const parseFeed = async () => {
  const feed = await parser.parseURL("https://www.reddit.com/.rss");
  console.log(`Retreived ${feed.items.length} items from ${feed.title}`);
  return feed;
};

export const handle: ScheduledHandler = async (_event, _context) => {
  await parseFeed();
};
