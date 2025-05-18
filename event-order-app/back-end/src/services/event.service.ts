import { date } from "zod";
import { IEventParam } from "../interface/event.interface";
import { ITicketParam } from "../interface/ticket.interface";
import { IVoucherParam } from "../interface/voucher.interface";
import prisma from "../lib/prisma";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import {
  IAttendee,
  IEventWithAttendees,
} from "../interface/attendee.interface";
import { error } from "console";

async function CreateEventService(
  param: IEventParam,
  file?: Express.Multer.File
) {
  try {
    if (file) {
      const uploadResult = await uploadImageToCloudinary(file);
      param.banner_url = uploadResult?.secure_url;
    }

    const result = await prisma.$transaction(async (prisma) => {
      // Pastikan tickets berupa array setelah parsing
      let parsedTickets: ITicketParam[] = [];
      if (typeof param.tickets === "string") {
        parsedTickets = JSON.parse(param.tickets).map((t: any) => ({
          name: t.name,
          type: t.type,
          description: t.description,
          sales_start: t.sales_start,
          sales_end: t.sales_end,
          created_at: t.created_at,
          updated_at: t.updated_at,
          quota: Number(t.quota),
          remaining: Number(t.remaining),
          price: Number(t.price),
          created_by_id: Number(t.created_by_id),
        })); // Mengubah string JSON menjadi array objek
      }

      let parsedVouchers: IVoucherParam[] = [];
      if (typeof param.vouchers === "string") {
        parsedVouchers = JSON.parse(param.vouchers).map((t: any) => ({
          code: t.code,
          description: t.description,
          discount_amount: Number(t.discount_amount),
          sales_start: t.sales_start,
          sales_end: t.sales_end,
          created_at: t.created_at,
          updated_at: t.updated_at,
          created_by_id: t.created_by_id,
        })); // Mengubah string JSON menjadi array objek
      }

      const event = await prisma.event.create({
        data: {
          name: param.name,
          description: JSON.parse(param.description),
          category_id: Number(param.category_id),
          location: param.location,
          start_date: param.start_date,
          end_date: param.end_date,
          available_seats: Number(param.available_seats),
          banner_url: param.banner_url,
          status: param.status,
          created_at: new Date(),
          updated_at: new Date(),
          organizer_id: Number(param.organizer_id),
          tickets: {
            create: parsedTickets,
          },
          vouchers: {
            create: parsedVouchers,
          },
        },
      });

      return event;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function GetAllEventService() {
  try {
    const event = await prisma.event.findMany({
      where: {
        start_date: {
          gt: new Date(),
        },
        status: "Publish",
      },
      include: {
        category: true,
        tickets: true,
      },
    });

    return event;
  } catch (err) {
    throw err;
  }
}

async function GetEventService(id: number) {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        tickets: true,
        category: true,
        organizer: true,
        vouchers: true,
      },
    });

    return event;
  } catch (err) {
    throw err;
  }
}

async function UpdateEventService(
  eventId: number,
  param: IEventParam,
  file?: Express.Multer.File
) {
  try {
    if (file) {
      const uploadResult = await uploadImageToCloudinary(file);
      param.banner_url = uploadResult?.secure_url;
    }

    const result = await prisma.$transaction(async (prisma) => {
      // Parse tickets
      let parsedTickets: ITicketParam[] = [];
      if (typeof param.tickets === "string") {
        parsedTickets = JSON.parse(param.tickets).map((t: any) => ({
          name: t.name,
          type: t.type,
          description: t.description,
          sales_start: t.sales_start,
          sales_end: t.sales_end,
          created_at: t.created_at,
          updated_at: t.updated_at,
          quota: Number(t.quota),
          remaining: Number(t.remaining),
          price: Number(t.price),
          created_by_id: Number(t.created_by_id),
        }));
      }

      // Parse vouchers
      let parsedVouchers: IVoucherParam[] = [];
      if (typeof param.vouchers === "string") {
        parsedVouchers = JSON.parse(param.vouchers).map((v: any) => ({
          code: v.code,
          description: v.description,
          discount_amount: Number(v.discount_amount),
          sales_start: v.sales_start,
          sales_end: v.sales_end,
          created_at: v.created_at,
          updated_at: v.updated_at,
          created_by_id: Number(v.created_by_id),
        }));
      }

      // Update event
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          name: param.name,
          description: JSON.parse(param.description),
          category_id: Number(param.category_id),
          location: param.location,
          start_date: param.start_date,
          end_date: param.end_date,
          available_seats: Number(param.available_seats),
          banner_url: param.banner_url,
          status: param.status,
          updated_at: new Date(),
        },
      });

      // Hapus tickets & vouchers lama
      await prisma.ticket.deleteMany({ where: { event_id: eventId } });
      await prisma.voucher.deleteMany({ where: { event_id: eventId } });

      // Tambahkan ulang tickets
      if (parsedTickets.length > 0) {
        await prisma.ticket.createMany({
          data: parsedTickets.map(t => ({
            ...t,
            event_id: eventId,
          })),
        });
      }

      // Tambahkan ulang vouchers
      if (parsedVouchers.length > 0) {
        await prisma.voucher.createMany({
          data: parsedVouchers.map(v => ({
            ...v,
            event_id: eventId,
          })),
        });
      }

      return updatedEvent;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function DeleteEventService(id: number) {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.event.delete({
        where: { id },
      });

      return user;
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function SearchEventService(eventName: string) {
  try {
    const event = await prisma.event.findMany({
      where: {
        OR: [
          {
            name: {
              contains: eventName,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: eventName,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: eventName,
                mode: "insensitive",
              },
            },
          },
        ],
      },

      include: {
        category: true,
        tickets: true,
      },
    });

    return event;
  } catch (err) {
    throw err;
  }
}

async function GetEventsByOrganizerService(organizerId: number) {
  try {
    const events = await prisma.event.findMany({
      where: {
        organizer_id: organizerId,
      },
      include: {
        organizer: true, // Menyertakan data organizer
        category: true, // Menyertakan data kategori
        tickets: true, // Menyertakan data tiket
        vouchers: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return events;
  } catch (err) {
    throw err;
  }
}

async function getEventWithAttendees(
  eventId: number
): Promise<IEventWithAttendees> {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      transactions: {
        where: { status: "approve" }, // Filter hanya yang approved (optional)
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
          reviews: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error();
  }

  const attendees = event.transactions
    .filter(
      (trx): trx is typeof trx & { user: NonNullable<typeof trx.user> } => {
        if (!trx.user) {
          console.warn(`Transaction ${trx.id} has no user associated`);
          return false;
        }
        return true;
      }
    )
    .map((trx) => ({
      id: trx.user.id,
      first_name: trx.user.first_name,
      last_name: trx.user.last_name,
      email: trx.user.email,
      status: trx.status,
      review: trx.reviews?.[0] ?? null,
    }));

  return {
    id: event.id,
    name: event.name,
    attendees,
    total_attendees: attendees.length,
    // Tambahan:
    event_date: event.start_date,
    location: event.location,
  };
}

export {
  CreateEventService,
  GetEventService,
  GetAllEventService,
  UpdateEventService,
  DeleteEventService,
  SearchEventService,
  GetEventsByOrganizerService,
  getEventWithAttendees,
};
