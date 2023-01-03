import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@server/index";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8081/trpc",
    }),
  ],
});
