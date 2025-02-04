import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent } from '@mui/material';
import { useDateSelection } from './useDateSelection';

type FlightType = 'Round-trip' | 'One-way' | 'Multi-city';
type CabinClass = 'Economy' | 'Premium economy' | 'Business' | 'First';
interface FlightLocation {
  origin: string;
  destination: string;
}
interface PassengerCount {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

export const useFlightSearch = () => {
  const router = useRouter();

  const [flightType, setFlightType] = useState<FlightType>('Round-trip');
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [locations, setLocations] = useState<FlightLocation>({ origin: '', destination: '' });
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const { dates } = useDateSelection();

  const handleChangeFlightType = (event: SelectChangeEvent<FlightType>) => {
    setFlightType(event.target.value as FlightType);
  };

  const handleChangeCabinClass = (event: SelectChangeEvent<CabinClass>) => {
    setCabinClass(event.target.value as CabinClass);
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

  return {
    flightType,
    setFlightType,
    cabinClass,
    setCabinClass,
    locations,
    setLocations,
    open,
    dates,
    passengers,
    setPassengers,
    handleChangeFlightType,
    handleChangeCabinClass,
    handleSearch,
  };
};
