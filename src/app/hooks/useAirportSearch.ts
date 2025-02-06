import { useState, useEffect } from 'react';
import { REQUEST_HEADERS, SEARCH_AIRPORT_URL } from '../constants/urls';
import { Airport, ApiAirport } from '../types/airport.types';

export const useAirportSearch = (inputValue: string) => {
  const [options, setOptions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  useEffect(() => {
    let active = true;

    const fetchAirports = async () => {
      if (inputValue.length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${SEARCH_AIRPORT_URL}?query=${encodeURIComponent(inputValue)}`, {
          headers: REQUEST_HEADERS,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        if (active && data.data && Array.isArray(data.data)) {
          const airports: Airport[] = data.data
            .map((airport: ApiAirport) => ({
              iataCode: airport.skyId,
              name: airport.presentation.title,
              cityName: airport.presentation.subtitle,
              skyId: airport.skyId,
              entityId: airport.entityId,
            }))
            .filter(isCommercialAirport);

          console.log('Mapped Airports:', airports);
          setOptions(airports);
        } else {
          console.log('No airports found in response:', data);
          setOptions([]);
        }
      } catch (error) {
        console.error('Error fetching airports:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchAirports, 300);
    return () => {
      active = false;
      clearTimeout(debounceTimer);
    };
  }, [inputValue]);

  return { options, loading, setSelectedAirport, selectedAirport };
};

const isCommercialAirport = (airport: Airport) => {
  // List of known executive/private airports
  const nonCommercialAirports = ['OPF'];
  return !nonCommercialAirports.includes(airport.skyId);
};
