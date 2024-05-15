interface BookingCalendarProps {
  availableDates: Date[];
  availableTimes: string[];
  onDateTimeSelected?: (date: Date) => void;
}

interface Customer {
  id: number | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date | null;
}

interface Reservation {
  id: number | null;
  customerId: number | null;
  diningTableId: number | null;
  activity: string;
  noOfParticipants: number;
  activityStart: Date;
  activityEnd: Date;
  creationDateTime: Date | null;
}

export type { BookingCalendarProps, Reservation, Customer };
