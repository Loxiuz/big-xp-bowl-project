interface BookingCalendarProps {
  defaultMonth: number;
  defaultYear: number;
  handleChosenDateTime: (dateTime: Date) => void;
  handleAvailableStandardLanes: (lanes: number) => void;
  handleAvailableJuniorLanes: (lanes: number) => void;
  handleAvailableAirHockeyTables: (tables: number) => void;
  handleActivity: (activity: string, dateTime: Date) => void;
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
}

export type { BookingCalendarProps, Reservation, Customer, Product, Equipment };
