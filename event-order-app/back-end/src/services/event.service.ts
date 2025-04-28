import { IEventParam } from "../interface/event.interface";
import prisma from "../lib/prisma";

async function CreateEventService(param : IEventParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const event = await prisma.event.create({
        data: {
          name         : param.name,
          description  : param.description,
          category_id  : param.category_id,
          location     : param.location,
          start_date   : param.start_date,
          end_date     : param.end_date,
          available_seats : param.available_seats,
          banner_url   : param.banner_url,
          status       : param.status,
          created_at   : new Date(),
          updated_at   : new Date(),
          organizer_id : param.organizer_id,
        },
      });

      return event;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function GetAllEventService(){
  
  try {
    const event = await prisma.event.findMany({
      },
    );

    return event;
  } catch (err) {
    throw err;
  }
}

async function GetEventService(id : number){
  
  try {
    const event = await prisma.event.findUnique({
      where : { id }
      },
    );

    return event;
  } catch (err) {
    throw err;
  }
}

async function UpdateEventService(id : number, param : IEventParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const event = await prisma.event.update({
        where : { id },
        data: {
          name         : param.name,
          description  : param.description,
          category_id  : param.category_id,
          location     : param.location,
          start_date   : param.start_date,
          end_date     : param.end_date,
          available_seats : param.available_seats,
          banner_url   : param.banner_url,
          status       : param.status,
          updated_at   : new Date()
        },
      });

      return event;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function DeleteEventService(id : number){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const user = await prisma.event.delete({
        where : { id }
      });

      return user;
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export { CreateEventService, GetEventService, GetAllEventService, UpdateEventService, DeleteEventService }