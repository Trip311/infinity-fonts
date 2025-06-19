import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import prisma from "../../lib/prisma";

export const fontsRouter = router({
  search: publicProcedure
    .input(z.object({
      name: z.string().optional(),
      style: z.string().optional(),
      stroke: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { name, style, stroke } = input;

      const where: any = {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(style && { style: { equals: style, mode: 'insensitive' } }),
        ...(stroke && { stroke: { equals: stroke, mode: 'insensitive' } }),
      };

      return prisma.font.findMany({
        where,
        select: {
          id: true,
          s3Url: true,
          description: true,
          name: true,
          style: true,
          stroke: true,
        },
        take: 50,
        orderBy: { name: 'asc' },
      });
    }),
});