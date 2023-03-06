import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const noteRouter = createTRPCRouter({
  delete: protectedProcedure
  .input( z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.note.delete({
      where: {
        id: input.id,
      },
    });
  }),

  create: protectedProcedure
  .input(
    z.object({ title: z.string(), content: z.string(), subjectId: z.string() })
  )
  .mutation(({ ctx, input }) => {
    return ctx.prisma.note.create({
      data: {
        title: input.title,
        content: input.content,
        subjectId: input.subjectId,
      },
    });
  }),

  getAll: protectedProcedure
  .input(z.object({ subjectId: z.string() }))
  .query(({ ctx, input }) => {
    return ctx.prisma.note.findMany({
      where: {
        subjectId: input.subjectId,
      },
    });
  }),
});
