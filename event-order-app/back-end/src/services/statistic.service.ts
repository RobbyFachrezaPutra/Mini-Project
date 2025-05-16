import prisma from "../lib/prisma";

async function GetTicketsSoldByEventCategoryIdService(organizerId: number) {
  try {
    // Ambil semua kategori event
    const categories = await prisma.event_Category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Untuk setiap kategori, hitung jumlah tiket terjual (sum qty di TransactionDetail)
    const results = await Promise.all(
      categories.map(async (category) => {
        const tickets = await prisma.transactionDetail.aggregate({
          _sum: {
            qty: true,
          },
          where: {
            transaction: {
              status: "approve", // Pastikan status sesuai dengan transaksi sukses di database
            },
            ticket: {
              event: {
                category_id: category.id,
                organizer_id: organizerId,
              },
            },
          },
        });

        return {
          event_category_id: category.id,
          category_name: category.name,
          tickets_sold: tickets._sum.qty || 0,
        };
      })
    );

    return results;
  } catch (error) {
    throw error;
  }
}

async function GetMonthlyRevenueService(organizerId: number) {
  try {
    const currentYear = new Date().getFullYear();
    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Inisialisasi array untuk revenue per bulan
    const monthlyRevenue = Array(12).fill(0);

    // Ambil data transaksi berdasarkan bulan untuk tahun ini dan organizerId
    const transactions = await prisma.transaction.findMany({
      where: {
        created_at: {
          gte: new Date(`${currentYear}-01-01`), // Tahun ini
          lt: new Date(`${currentYear + 1}-01-01`), // Sampai akhir tahun
        },
        status: "approve",
        event: {
          organizer_id: organizerId,
        },
      },
      include: {
        event: true,
      },
    });

    // Hitung total revenue per bulan
    transactions.forEach((transaction) => {
      const monthIndex = new Date(transaction.created_at).getMonth(); // Dapatkan bulan (0-11)
      monthlyRevenue[monthIndex] += transaction.final_price.toNumber(); // Tambah total transaksi ke bulan yang sesuai
    });

    // Kembalikan data dalam format yang cocok untuk chart
    return {
      labels, // Bulan-bulan
      data: monthlyRevenue, // Total revenue per bulan
    };
  } catch (error) {
    throw new Error("Error fetching monthly revenue data");
  }
}

export { GetTicketsSoldByEventCategoryIdService, GetMonthlyRevenueService };
