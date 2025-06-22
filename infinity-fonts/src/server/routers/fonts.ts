import { router, publicProcedure } from '../trpc';
import prisma from '../../lib/prisma';
import { z } from 'zod';

export const fontsRouter = router({
  search: publicProcedure
    .input(z.object({
      q: z.string().optional(),
      style: z.string().optional(),
      catagory: z.string().optional(),
    }))
    .query(async ({ input }) => {
      return prisma.font.findMany({
        where: {
          name: input.q ? { contains: input.q, mode: 'insensitive' } : undefined,
          style: input.style ? { equals: input.style } : undefined,
          catagory: input.catagory ? { equals: input.catagory } : undefined,
        },
      });
    }),
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