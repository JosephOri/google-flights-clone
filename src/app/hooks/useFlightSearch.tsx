import React, { createContext, useContext, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent } from '@mui/material';

type FlightType = 'Round-trip' | 'One-way' | 'Multi-city';
type CabinClass = 'Economy' | 'Premium economy' | 'Business' | 'First';
interface FlightLocation {
  origin: string;
  destination: string;
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

interface FlightSearchContextType {
  flightType: FlightType;
  setFlightType: (type: FlightType) => void;
  cabinClass: CabinClass;
  setCabinClass: (classType: CabinClass) => void;
  locations: FlightLocation;
  setLocations: (loc: FlightLocation) => void;
  open: 'departure' | 'return' | null;
  setOpen: (open: 'departure' | 'return' | null) => void;
  dates: DateRange;
  setDates: React.Dispatch<React.SetStateAction<DateRange>>;
  passengers: PassengerCount;
  setPassengers: React.Dispatch<React.SetStateAction<PassengerCount>>;
  handleChangeFlightType: (event: SelectChangeEvent<FlightType>) => void;
  handleChangeCabinClass: (event: SelectChangeEvent<CabinClass>) => void;
  handleDateChange: (type: 'departure' | 'return') => (date: Date | null) => void;
  handleSearch: () => Promise<void>;
  containerRef: React.RefObject<HTMLDivElement>;
}

// Create context
const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

// Provider component
export const FlightSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [flightType, setFlightType] = useState<FlightType>('Round-trip');
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [locations, setLocations] = useState<FlightLocation>({ origin: '', destination: '' });
  const [open, setOpen] = useState<'departure' | 'return' | null>(null);
  const [dates, setDates] = useState<DateRange>({ departure: null, return: null });
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });

  const handleChangeFlightType = (event: SelectChangeEvent<FlightType>) => {
    setFlightType(event.target.value as FlightType);
  };

  const handleChangeCabinClass = (event: SelectChangeEvent<CabinClass>) => {
    setCabinClass(event.target.value as CabinClass);
  };

  const handleDateChange = (type: 'departure' | 'return') => (date: Date | null) => {
    setDates((prev) => ({ ...prev, [type]: date }));
    setOpen(null);
  };

  const handleSearch = async () => {
    if (!locations.origin) return alert('Please select an origin airport');
    if (!locations.destination) return alert('Please select a destination airport');
    if (locations.origin === locations.destination) return alert('Origin and destination cannot be the same');
    if (!dates.departure) return alert('Please select a departure date');
    if (flightType === 'Round-trip' && !dates.return) return alert('Please select a return date for round-trip flight');

    const searchData = { flightType, cabinClass, passengers, locations, dates };

    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `API error: ${response.status}`);
      if (!data.flights || !Array.isArray(data.flights))
        throw new Error(data.message || 'Invalid flight data received');
      if (data.flights.length === 0)
        throw new Error('No flights found for this route. Please try different dates or airports.');

      await fetch('/api/flights/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchId: data.searchId, flights: data.flights }),
      });

      sessionStorage.setItem(`flights-${data.searchId}`, JSON.stringify(data.flights));

      router.push(`/flights/results?id=${data.searchId}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to search flights. Please try again.');
      console.error('Error details:', error);
    }
  };

  return (
    <FlightSearchContext.Provider
      value={{
        flightType,
        setFlightType,
        cabinClass,
        setCabinClass,
        locations,
        setLocations,
        open,
        setOpen,
        dates,
        setDates,
        passengers,
        setPassengers,
        handleChangeFlightType,
        handleChangeCabinClass,
        handleDateChange,
        handleSearch,
        containerRef,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
};

export const useFlightSearch = () => {
  const context = useContext(FlightSearchContext);
  if (context === undefined) {
    throw new Error('useFlightSearchContext must be used within a FlightSearchProvider');
  }
  return context;
};
