import { IEventParam } from "../interface/event.interface";
import { ITicketParam } from "../interface/ticket.interface";
import { IVoucherParam } from "../interface/voucher.interface";
import prisma from "../lib/prisma";
import { uploadImageToCloudinary } from "../utils/cloudinary";

async function CreateEventService(param : IEventParam,
  file?: Express.Multer.File){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {
      if (file) {
        const uploadResult = await uploadImageToCloudinary(file);
        param.banner_url = uploadResult?.secure_url;
      }
  
      // Pastikan tickets berupa array setelah parsing
      let parsedTickets: ITicketParam[] = [];
      if (typeof param.tickets === "string") {
        parsedTickets = JSON.parse(param.tickets).map((t : any ) => ({
          name : t.name,
          type : t.type,
          description : t.description,
          sales_start : t.sales_start,        
          sales_end   : t.sales_end,
          created_at  : t.created_at,
          updated_at  : t.updated_at,        
          quota : Number(t.quota),
          remaining : Number(t.remaining),
          price : Number(t.price),
          created_by_id : Number(t.created_by_id)
        })); // Mengubah string JSON menjadi array objek
      }

      let parsedVouchers: IVoucherParam[] = [];
       if (typeof param.vouchers === "string") {
        parsedVouchers = JSON.parse(param.vouchers).map((t : any ) => (
          {
            code            : t.code,
            description     : t.description,
            discount_amount : Number(t.discount_amount),
            sales_start     : t.sales_start,
            sales_end       : t.sales_end,
            created_at      : t.created_at,
            updated_at      : t.updated_at,
            created_by_id   : t.created_by_id
          }
        )); // Mengubah string JSON menjadi array objek
      }

      const event = await prisma.event.create({
        data: {
          name         : param.name,
          description  : JSON.parse(param.description),
          category_id  : Number(param.category_id),
          location     : param.location,
          start_date   : param.start_date,
          end_date     : param.end_date,
          available_seats : Number(param.available_seats),          
          banner_url   : param.banner_url,
          status       : param.status,
          created_at   : new Date(),
          updated_at   : new Date(),
          organizer_id : Number(param.organizer_id),
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

async function GetAllEventService(){
  
  try {
    const event = await prisma.event.findMany({
      include : {
        category : true,
        tickets : true
      }
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
      where : { id },
      include : {
        tickets : true,
        category : true,
        organizer : true
      }
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

async function SearchEventService(eventName : string){
  
  try {
    const event = await prisma.event.findMany({
      where : {      
        name: {
          contains: eventName,
          mode: 'insensitive',
        },
      }
    });

    return event;
  } catch (err) {
    throw err;
  }
}

export { 
  CreateEventService, 
  GetEventService, 
  GetAllEventService, 
  UpdateEventService, 
  DeleteEventService,
  SearchEventService 
}