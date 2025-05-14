export interface IAttendee {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  status?: string;
}

export interface IEventWithAttendees {
  id: number;
  name: string;
  attendees: IAttendee[];
  total_attendees: number;
  event_date?: Date;
  location?: string;
}
