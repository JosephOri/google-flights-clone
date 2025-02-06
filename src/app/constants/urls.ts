export const API_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';
export const API_HOST = 'sky-scrapper.p.rapidapi.com';
export const API_KEY = (process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string) || '';
export const SEARCH_FLIGHT_URL = `${API_URL}/searchFlights`;
export const SEARCH_AIRPORT_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport';
export const REQUEST_HEADERS = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_HOST,
};
