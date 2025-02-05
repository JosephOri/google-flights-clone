import { NextResponse } from 'next/server';
import { REQUEST_HEADERS, SEARCH_FLIGHT_URL } from '@/app/constants/urls';
import { ApiItinerary, ApiResponse } from './types';
import { FlightSearchData } from '@/app/types/flight.types';

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export async function POST(request: Request) {
  try {
    const searchData: FlightSearchData = await request.json();
    console.log('Search Request Data:', JSON.stringify(searchData, null, 2));

    const originIds = searchData.locations.origin;
    const destinationIds = searchData.locations.destination;

    if (!searchData.locations.origin || !searchData.locations.destination || !searchData.dates.departure) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RAPIDAPI_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const departureDate = searchData.dates.departure ? formatDate(new Date(searchData.dates.departure)) : '';
    const returnDate = searchData.dates.return ? formatDate(new Date(searchData.dates.return)) : '';

    const cabinClassMap = {
      Economy: 'economy',
      'Premium economy': 'premium_economy',
      Business: 'business',
      First: 'first',
    };

    const params = new URLSearchParams({
      originSkyId: originIds.skyId,
      destinationSkyId: destinationIds.skyId,
      originEntityId: originIds.entityId,
      destinationEntityId: destinationIds.entityId,
      date: departureDate,
      returnDate: returnDate,
      adults: searchData.passengers.adults.toString(),
      children: searchData.passengers.children.toString(),
      infants: (searchData.passengers.infantsInSeat + searchData.passengers.infantsOnLap).toString(),
      cabinClass: cabinClassMap[searchData.cabinClass],
      currency: 'USD',
      market: 'US',
      countryCode: 'US',
    });

    const response = await fetch(`${SEARCH_FLIGHT_URL}?${params}`, {
      method: 'GET',
      headers: REQUEST_HEADERS,
    });

    const flightData: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    if (!flightData.data?.itineraries?.length) {
      return NextResponse.json({
        searchId: Date.now().toString(),
        flights: [],
        message: 'No flights available for the selected route and dates. Please try different dates or airports.',
      });
    }

    const searchId = Date.now().toString();
    const mappedFlights = flightData.data.itineraries.map((flight: ApiItinerary) => ({
      id: flight.id,
      price: {
        amount: parseFloat(String(flight.price.raw)) || 0,
        currency: 'USD',
      },
      legs: flight.legs.map((leg) => ({
        departure: {
          time: leg.departure,
          airport: leg.segments[0]?.origin?.displayCode || '',
        },
        arrival: {
          time: leg.arrival,
          airport: leg.segments[0]?.destination?.displayCode || '',
        },
        duration: leg.duration,
        carrier: {
          name: leg.carriers.marketing[0]?.name || 'Unknown Airline',
          code: leg.carriers.marketing[0]?.alternateId || '',
        },
        flightNumber: leg.segments[0]?.flightNumber || '',
      })),
    }));

    return NextResponse.json({
      searchId,
      flights: mappedFlights,
      message: 'Search completed successfully',
    });
  } catch (error) {
    console.error('Error processing flight search:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to search flights',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
