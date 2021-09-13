import Parser from "rss-parser";

const parser: Parser = new Parser();

export const parseFeed = async () => {
  const feed = await parser.parseURL("https://www.reddit.com/.rss");
  console.log(feed.title); // feed will have a `foo` property, type as a string
  expect(feed.items.length).toBeGreaterThan(0);
};
