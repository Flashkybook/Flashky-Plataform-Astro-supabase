import { defineMiddleware } from "astro:middleware";
export const onRequest = defineMiddleware(({locals}, next) => {
  // locals.message = "Hello!";
  // locals.message2 = "Hello!";
  return next();
});