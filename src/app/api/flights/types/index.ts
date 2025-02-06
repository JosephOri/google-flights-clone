interface LocationIds {
  skyId: string;
  entityId: string;
  iataCode: string;
  name: string;
  cityName: string;
}

interface ApiItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: Array<{
    id: string;
    departure: string;
    arrival: string;
    duration: number;
    carriers: {
      marketing: Array<{
        name: string;
        alternateId: string;
      }>;
    };
    segments: Array<{
      flightNumber: string;
      origin: {
        displayCode: string;
      };
      destination: {
        displayCode: string;
      };
    }>;
  }>;
}

interface ApiResponse {
  data: {
    itineraries: ApiItinerary[];
    context: {
      status: string;
      totalResults: number;
    };
  };
  status: boolean;
  timestamp: number;
}

interface FlightItinerary {
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

export type { ApiItinerary, ApiResponse, LocationIds, FlightItinerary };
