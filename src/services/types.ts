interface BookingCalendarProps {
  defaultMonth: number;
  defaultYear: number;
  handleAvailableStandardLanes: (lanes: number) => void;
  handleAvailableJuniorLanes: (lanes: number) => void;
  handleAvailableAirHockeyTables: (tables: number) => void;
  handleActivityDateTime: (activity: string, dateTime: Date) => void;
}

interface DiningTable {
  id: number | null;
  numberOfSeats: number;
}

interface Equipment {
  id: number | null;
  name: string;
  quantity: number;
}

interface Product {
  id: number | null;
  name: string;
  price: number;
  size: string;
  inStock: boolean;
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
  numberOfStandardLanes: number;
  numberOfJrLanes: number;
  numberOfAirTables: number;
  numberOfParticipants: number;
  activityStart: Date;
  activityEnd: Date;
  creationDateTime: Date | null;
  isValid: boolean;
}

export type {
  DiningTable,
  BookingCalendarProps,
  Reservation,
  Customer,
  Product,
  Equipment,
};
