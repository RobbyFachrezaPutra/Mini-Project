import { ITicketParam } from "../interface/ticket.interface";
import prisma from "../lib/prisma";

async function CreateTicketService(param : ITicketParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const Ticket = await prisma.ticket.create({
        data: {
          name         : param.name,
          description  : param.description,
          event_id     : param.event_id,
          type         : param.type,
          price        : param.price,
          quota  : param.quota,
          remaining : param.remaining,
          sales_start   : param.sales_start,
          sales_end     : param.sales_end,
          created_at   : new Date(),
          updated_at   : new Date(),
          created_by_id : param.created_by_id
        },
      });

      return Ticket;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function GetAllTicketService(){
  
  try {
    const Ticket = await prisma.ticket.findMany({
      },
    );

    return Ticket;
  } catch (err) {
    throw err;
  }
}

async function GetTicketService(id : number){
  
  try {
    const Ticket = await prisma.ticket.findUnique({
      where : { id }
      },
    );

    return Ticket;
  } catch (err) {
    throw err;
  }
}

async function UpdateTicketService(id : number, param : ITicketParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const Ticket = await prisma.ticket.update({
        where : { id },
        data: {
          name         : param.name,
          event_id     : param.event_id,
          type         : param.type,
          price        : param.price,
          quota        : param.quota,
          remaining    : param.remaining,
          sales_start  : param.sales_start,
          sales_end    : param.sales_end,
          updated_at   : new Date(),
        },
      });

      return Ticket;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function DeleteTicketService(id : number){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const user = await prisma.ticket.delete({
        where : { id }
      });

      return user;
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function GetTicketByEventIdService(eventId : number){
  
  try {
    const Ticket = await prisma.ticket.findMany({
      where : { event_id : eventId }
      },
    );

    return Ticket;
  } catch (err) {
    throw err;
  }
}

export { 
  CreateTicketService, 
  GetTicketService, 
  GetAllTicketService, 
  UpdateTicketService, 
  DeleteTicketService,
  GetTicketByEventIdService
}