import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();
app.use(cors());

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

export interface HelloMessage {
  message: string;
}

const testRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      console.log("hello called");

      const msg: HelloMessage = {
        message: input.message,
      };
      return msg;
    }),
});

const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;

app.use((req, _res, next) => {
  // request logger
  console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

  next();
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
