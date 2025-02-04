export const rapidApiUrl = import.meta.env.VITE_RAPID_URL as string;
export const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY as string;
export const rapidApiHost = import.meta.env.VITE_RAPID_HOST as string;
export const searchFlightsUrl = `${rapidApiUrl}/searchFlights`;
export const searchAirportUrl = `${rapidApiUrl}/searchAirport`;
