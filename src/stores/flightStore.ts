import { makeAutoObservable, action } from 'mobx';
import { fetchFlights } from './apiService'; 

type Flight = any;

class FlightStore {
  // State
  flights: Flight[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      searchFlights: action,
      setFlights: action,
      setLoading: action,
      setError: action,
    });
  }

  // Actions
  setFlights = (flights: Flight[]) => {
    this.flights = flights;
  };

  setLoading = (isLoading: boolean) => {
    this.loading = isLoading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  searchFlights = async (params: {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    date: string;
    returnDate: string;
    cabinClass: string;
    adults: string;
    sortBy: string;
    currency: string;
    market: string;
    countryCode: string;
  }) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const data = await fetchFlights(params);
      // Assuming the response has a property 'results' or similar for the list of flights
      this.setFlights(data.results || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      this.setError('Failed to fetch flights. Please try again.');
    } finally {
      this.setLoading(false);
    }
  };

  // Computed properties can go here if needed
  get filteredFlights() {
    return this.flights;
  }
}

export default FlightStore;
