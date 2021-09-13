import { parseFeed } from "./parseFeed";

describe("parseFeed", () => {
  it("should parse the feed", async () => {
    const result = await parseFeed();
    expect(result.items.length).toBeGreaterThan(0);
  });
});
