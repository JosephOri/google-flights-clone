import { Airport } from './airport.types';

type FlightType = 'Round-trip' | 'One-way' | 'Multi-city';
type CabinClass = 'Economy' | 'Premium economy' | 'Business' | 'First';
interface FlightLocation {
  origin: Airport | null;
  destination: Airport | null;
}
interface DateRange {
  departure: Date | null;
  return: Date | null;
}
interface PassengerCount {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface Flight {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  legs: Array<{
    departure: {
      time: string;
      airport: string;
    };
    arrival: {
      time: string;
      airport: string;
    };
    duration: number;
    carrier: {
      name: string;
      code: string;
    };
    flightNumber: string;
  }>;
}

interface FlightLeg {
  departure: {
    time: string;
    airport: string;
  };
  arrival: {
    time: string;
    airport: string;
  };
  duration: number;
  carrier: {
    name: string;
    code: string;
  };
  flightNumber: string;
}

interface FlightSearchData {
  flightType: 'Round-trip' | 'One-way' | 'Multi-city';
  cabinClass: 'Economy' | 'Premium economy' | 'Business' | 'First';
  passengers: {
    adults: number;
    children: number;
    infantsInSeat: number;
    infantsOnLap: number;
  };
  locations: {
    origin: Airport;
    destination: Airport;
  };
  dates: {
    departure: string;
    return?: string;
  };
}

export type { FlightSearchData, FlightType, CabinClass, FlightLocation, DateRange, PassengerCount, Flight, FlightLeg };
