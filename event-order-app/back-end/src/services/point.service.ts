import prisma from "../lib/prisma";

async function GetPointByUserIdService(userid: number) {
  try {
    const point = await prisma.point.findMany({
      where: {
        user_id: userid,
        expired_at: {
          gte: new Date(), // yang belum expired pada saat transaksi
        },
      },
      orderBy: {
        expired_at: "asc", // FIFO: pakai yang paling cepet expired
      },
    });
    return point;
  } catch (err) {
    throw err;
  }
}

export { GetPointByUserIdService };
