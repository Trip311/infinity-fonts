import { router, publicProcedure } from '../trpc';
import prisma from '../../lib/prisma';
import { z } from 'zod';

export const fontsRouter = router({
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return prisma.font.findUnique({ where: { id: input.id } });
    }),
  download: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const font = await prisma.font.findUnique({ where: { id: input.id } });
      if (!font) throw new Error('Font not found');
      return { url: font.s3Url };
    }),
});