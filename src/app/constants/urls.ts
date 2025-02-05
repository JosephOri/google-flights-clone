export const API_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';
export const API_HOST = 'sky-scrapper.p.rapidapi.com';
export const API_KEY = (process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string) || '';
export const SEARCH_FLIGHT_URL = `${API_URL}/searchFlights`;
