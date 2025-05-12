import prisma from "../lib/prisma";
export const runtime = 'edge';

export async function GET() {
  const expired = await prisma.transaction.updateMany({
    where: {
      status: 'pending',
      created_at: {
        lt: new Date(Date.now() - 2 * 60 * 60 * 1000), // lebih dari 2 jam lalu
      },
    },
    data: {
      status: 'expired',
    },
  });

  return Response.json({ message: 'Expired check done', expired });
}