import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import { useAirportSearch, Airport } from '@/app/hooks/useAirportSearch';

interface Props {
  type: 'origin' | 'destination';
  value: string;
  onChange: (value: string) => void;
}

export default function AirportAutocomplete({ type, value, onChange }: Props) {
  const [inputValue, setInputValue] = useState('');

  const { options, loading, setSelectedAirport, selectedAirport } = useAirportSearch(inputValue);

  const handleAirportChange = (event: React.SyntheticEvent, newValue: Airport | null) => {
    if (newValue) {
      setSelectedAirport(newValue);
      onChange(JSON.stringify({ skyId: newValue.skyId, entityId: newValue.entityId }));
    } else {
      setSelectedAirport(null);
      onChange('');
    }
  };
  useEffect(() => {
    if (value) {
      setSelectedAirport({
        iataCode: value,
        name: value,
        cityName: value,
        skyId: value,
        entityId: value,
      });
    } else {
      setSelectedAirport(null);
    }
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
      getOptionLabel={(option) => `${option.cityName} (${option.iataCode}) - ${option.name}`}
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
}
