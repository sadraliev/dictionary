import { PathBuilder } from "./builder";

const pathfinder = new PathBuilder("http://mysite.com");
const path = pathfinder
  .addSegment("auth")
  .addSegment("users")
  .addParam(25)
  .addSegment("bookings")
  .addQueryParam({
    hello: "hello",
    world: "world",
  })
  .build();
console.log("generated path", path);
