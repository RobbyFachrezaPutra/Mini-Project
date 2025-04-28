import { IEventCategryParam } from "../interface/event-category.interface";
import prisma from "../lib/prisma";

async function CreateEventCategoryService(param : IEventCategryParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const event_Category = await prisma.event_Category.create({
        data: {
          name : param.name,
          description : param.description,           
          created_at: new Date(),
          updated_at : new Date(),
          created_by_id : param.created_by_id
        },
      });

      return event_Category;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function GetAllEventCategoryService(){
  
  try {
    const event_Category = await prisma.event_Category.findMany({
      select : {
        id : true,
        name : true,
        description : true,
        created_at : true,
        updated_at : true
      }
      },
    );

    return event_Category;
  } catch (err) {
    throw err;
  }
}

async function GetEventCategoryService(id : number){
  
  try {

    const event_Category = await prisma.event_Category.findUnique({
      where: { id },
    });

    if (!event_Category) {
      throw new Error("Event category not found");
    }

    return event_Category;
  } catch (err) {
    throw err;
  }
}

async function UpdateEventCategoryService(id: number, param : IEventCategryParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const event_Category = await prisma.event_Category.update({
        where: { id }, 
        data: {
          name: param.name,
          description: param.description,
          updated_at: new Date()
        },
      });

      return event_Category;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

export { CreateEventCategoryService, UpdateEventCategoryService, GetEventCategoryService, GetAllEventCategoryService }