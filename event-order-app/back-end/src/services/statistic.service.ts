import prisma from "../lib/prisma";

async function GetTicketsSoldByCategoryService() {
  try {
    const categories = ["Music", "Sports", "Art", "Food", "Tech"];

    const results = await Promise.all(
      categories.map(async (category) => {
        const count = await prisma.transaction.count({
          where: {
            status: "done",
            event: {
              name: category,
            },
          },
        });

        return {
          category,
          count,
        };
      })
    );

    return results;
  } catch (error) {
    throw error;
  }
}

async function GetMonthlyRevenueService() {
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

    // Ambil data transaksi berdasarkan bulan untuk tahun ini
    const transactions = await prisma.transaction.findMany({
      where: {
        created_at: {
          gte: new Date(`${currentYear}-01-01`), // Tahun ini
          lt: new Date(`${currentYear + 1}-01-01`), // Sampai akhir tahun
        },
        status: "done",
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

export { GetTicketsSoldByCategoryService, GetMonthlyRevenueService };
