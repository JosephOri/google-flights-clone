export interface ApiAirport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    subtitle: string;
  };
}

export interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  skyId: string;
  entityId: string;
}
