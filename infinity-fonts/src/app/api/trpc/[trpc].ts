import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/_app';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});