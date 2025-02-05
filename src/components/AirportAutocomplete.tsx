import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import { useAirportSearch } from '@/app/hooks/useAirportSearch';
import { Airport } from '@/app/types/airport.types';

interface Props {
  type: 'origin' | 'destination';
  value: Airport | null;
  onChange: (value: Airport | null) => void;
}
const AirportSearch = ({ type, value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const { options, loading, setSelectedAirport, selectedAirport } = useAirportSearch(inputValue);

  const handleAirportChange = (event: React.SyntheticEvent, newValue: Airport | null) => {
    setSelectedAirport(newValue);
    onChange(newValue); // Pass full Airport object
  };

  useEffect(() => {
    setSelectedAirport(value);
  }, [value]);

  return (
    <Autocomplete<Airport, false>
      value={selectedAirport}
      onChange={handleAirportChange}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => `${option.iataCode}`}
      renderOption={(props, option) => (
        <li {...props} key={option.iataCode}>
          {`${option.cityName} (${option.iataCode}) - ${option.name}`}
        </li>
      )}
      isOptionEqualToValue={(option, value) => option.iataCode === value.iataCode}
      loading={loading}
      loadingText="Searching airports..."
      noOptionsText={inputValue.length < 2 ? 'Type to search airports...' : 'No airports found'}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={type === 'origin' ? 'Where from?' : 'Where to?'}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {type === 'origin' ? (
                  <FlightTakeoff sx={{ color: '#AFB1B6' }} />
                ) : (
                  <FlightLand sx={{ color: '#AFB1B6' }} />
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: '#AFB1B6',
              },
            },
            width: { xs: '100%', sm: '100px', md: '180px', lg: '200px' },
            flexGrow: 1,
          }}
        />
      )}
    />
  );
};

export default AirportSearch;
