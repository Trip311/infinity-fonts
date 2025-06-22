import { router } from '../trpc';
import { fontsRouter } from './fonts';

export const appRouter = router({
  fonts: fontsRouter,
});
export type AppRouter = typeof appRouter;