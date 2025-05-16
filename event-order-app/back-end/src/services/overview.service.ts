import prisma from "../lib/prisma";

async function GetOverviewService(organizerId: number) {
  try {
    // Total Events
    const total_events = await prisma.event.count({
      where: {
        organizer_id: organizerId,
      },
    });

    // Total Transactions (status: approved)
    const total_transactions = await prisma.transaction.count({
      where: {
        status: "approve",
        event: {
          organizer_id: organizerId,
        },
      },
    });

    // Total Revenue (sum final_price, status: approved)
    const revenueAgg = await prisma.transaction.aggregate({
      _sum: {
        final_price: true,
      },
      where: {
        status: "approve",
        event: {
          organizer_id: organizerId,
        },
      },
    });

    return {
      total_events,
      total_transactions,
      total_revenue: revenueAgg._sum.final_price
        ? Number(revenueAgg._sum.final_price)
        : 0,
    };
  } catch (error) {
    throw error;
  }
}

export { GetOverviewService };
