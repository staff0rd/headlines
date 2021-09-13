import { ScheduledHandler } from "aws-lambda";
import "source-map-support/register";

export const hello: ScheduledHandler = async (event, _context) => {
  console.log("event", event);
  console.log("context", _context);
};
