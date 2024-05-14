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

interface DiningTable {
  id: number | null;
  numberOfSeats: number;
  reservationTime: Date | null;
}

interface LaneTable {
  id: number | null;
  type: string;
  isJunior: boolean;
  isActive: boolean;
}

interface Reservation {
  id: number | null;
  customerId: number | null;
  diningTableId: number | null;
  activity: string;
  noOfParticipants: number;
  activityStart: Date | null;
  activityEnd: Date | null;
  creationDateTime: Date | null;
}

export type {
  BookingCalendarProps,
  Reservation,
  Customer,
  DiningTable,
  LaneTable,
};
