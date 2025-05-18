"use strict";
// // src/services/dashboard.service.ts
// import prisma from "../lib/prisma";
// // 1. GET DASHBOARD DATA (events + stats)
// async function getDashboard(organizerId: number) {
//   const events = await prisma.event.findMany({
//     where: { organizer_id: organizerId },
//     include: {
//       transactions: {
//         where: { status: "done" },
//         select: { final_price: true },
//       },
//     },
//   });
//   // Hitung total revenue per event
//   return events.map((event) => ({
//     id: event.id,
//     name: event.name,
//     total_sales: event.transactions.length,
//     total_revenue: event.transactions.reduce(
//       (sum, t) => sum + t.final_price.toNumber(),
//       0
//     ),
//   }));
// }
// // 2. GET ATTENDEES (hanya untuk event milik organizer)
// async function getAttendees(eventId: number, organizerId: number) {
//   // Validasi: event ini punya organizer?
//   const isOwner = await prisma.event.findFirst({
//     where: { id: eventId, organizer_id: organizerId },
//   });
//   if (!isOwner) throw new Error("Not your event!");
// //   return await prisma.transaction.findMany({
// //     where: {
// //       event_id: eventId,
// //       status: "done",
// //     },
// //     select: {
// //       user: { select: { first_name: true, last_name: true } },
// //       ticket: { select: { name: true } },
// //       qty: true,
// //     },
// //   });
// // }
// // 3. ACCEPT/REJECT TRANSACTION (auto restore resources if rejected)
// async function updateTransaction(
//   transactionId: number,
//   organizerId: number,
//   status: "accepted" | "rejected"
// ) {
//   // Validasi: transaksi ini punya organizer?
//   const tx = await prisma.transaction.findFirst({
//     where: {
//       id: transactionId,
//       event: { organizer_id: organizerId },
//     },
//   });
//   if (!tx) throw new Error("Transaction not found!");
//   // Update status
//   const updatedTx = await prisma.transaction.update({
//     where: { id: transactionId },
//     data: { status },
//   });
//   // Kembalikan seat jika ditolak
//   if (status === "rejected") {
//     await prisma.event.update({
//       where: { id: tx.event_id },
//       data: { available_seats: { increment: tx.qty } },
//     });
//   }
//   return updatedTx;
// }
// export { getDashboard, getAttendees, updateTransaction };
