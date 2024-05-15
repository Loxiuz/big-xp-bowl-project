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

interface LaneTable {
  id: number | null;
  type: string;
  isJunior: boolean;
  isActive: boolean;
}

interface LaneTableReservation {
  id: number | null;
  laneTablesId: number;
  reservationId: number;
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

const dateTimes: Date[] = [
  new Date("2022-01-01 17:00:00"),
  new Date("2022-01-01 18:00:00"),
  new Date("2022-01-01 19:00:00"),
  new Date("2022-01-01 20:00:00"),
  new Date("2022-01-01 21:00:00"),
  new Date("2022-01-01 22:00:00"),
  new Date("2022-01-01 23:00:00"),
  new Date("2022-01-02 17:00:00"),
  new Date("2022-01-02 18:00:00"),
  new Date("2022-01-02 19:00:00"),
  new Date("2022-01-02 20:00:00"),
  new Date("2022-01-02 21:00:00"),
  new Date("2022-01-02 22:00:00"),
  new Date("2022-01-02 23:00:00"),
  new Date("2022-01-03 17:00:00"),
  new Date("2022-01-03 18:00:00"),
  new Date("2022-01-03 19:00:00"),
  new Date("2022-01-03 20:00:00"),
  new Date("2022-01-03 21:00:00"),
  new Date("2022-01-03 22:00:00"),
  new Date("2022-01-03 23:00:00"),
  new Date("2022-01-04 17:00:00"),
  new Date("2022-01-04 18:00:00"),
  new Date("2022-01-04 19:00:00"),
  new Date("2022-01-04 20:00:00"),
  new Date("2022-01-04 21:00:00"),
  new Date("2022-01-04 22:00:00"),
  new Date("2022-01-04 23:00:00"),
  new Date("2022-01-05 17:00:00"),
  new Date("2022-01-05 18:00:00"),
  new Date("2022-01-05 19:00:00"),
  new Date("2022-01-05 20:00:00"),
  new Date("2022-01-05 21:00:00"),
  new Date("2022-01-05 22:00:00"),
  new Date("2022-01-05 23:00:00"),
];

export type {
  BookingCalendarProps,
  Reservation,
  Customer,
  LaneTable,
  LaneTableReservation,
};

export { dateTimes };
