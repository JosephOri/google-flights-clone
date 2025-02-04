export type FlightType = 'Round-trip' | 'One-way' | 'Multi-city';
export type CabinClass = 'Economy' | 'Premium economy' | 'Business' | 'First';
export interface FlightLocation {
  origin: string;
  destination: string;
}

export interface DateRange {
  departure: Date | null;
  return: Date | null;
}

export interface PassengerCount {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}
