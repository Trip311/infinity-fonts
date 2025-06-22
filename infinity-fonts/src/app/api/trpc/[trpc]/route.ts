import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/app'; // Use tsconfig path alias or adjust path

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => ({}),
    onError: (opts) => {
      console.error(`[tRPC error] [${opts.error.code}] ${opts.path}:`, opts.error);
    },
  });

export { handler as GET, handler as POST };
