'use client';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { CompareArrows, Search } from '@mui/icons-material';
import PassengerSelect from './PassengerSelect';
import AirportAutocomplete from './AirportAutocomplete';
import { useFlightSearch } from '@/app/hooks/useFlightSearch';
import SelectFlightType from './Select/SelectFlightType';
import SelectClass from './Select/SelectClass';
import SelectDates from './Select/SelectDates';

export default function FlightSearch() {
  const { locations, setLocations, passengers, setPassengers, handleSearch } = useFlightSearch();

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#3A3B3F',
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 2,
            alignItems: 'center',
          }}
        >
          <SelectFlightType />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PassengerSelect value={passengers} onChange={setPassengers} />
          </Box>

          <SelectClass />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: '100%',
            }}
          >
            <AirportAutocomplete
              type="origin"
              value={locations.origin}
              onChange={(value) => setLocations((prev) => ({ ...prev, origin: value }))}
            />

            <IconButton
              sx={{
                bgcolor: '#3A3B3F',
                '&:hover': { bgcolor: '#4A4B4F' },
                padding: 0,
                margin: -2,
              }}
            >
              <CompareArrows sx={{ color: 'white' }} />
            </IconButton>

            <AirportAutocomplete
              type="destination"
              value={locations.destination}
              onChange={(value) => setLocations((prev) => ({ ...prev, destination: value }))}
            />
          </Box>

          {/* section: departure and return */}
          <Box
            sx={{
              display: 'flex',
              border: '1px solid #AFB1B6',
              paddingRight: 0,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: '100%',
            }}
          >
            <SelectDates />
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            bgcolor: '#8AB4F8',
            width: '20%',
            borderRadius: 10,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#3A74FF',
            },
          }}
        >
          <Search sx={{ color: '#202123' }} />
          <Typography sx={{ color: '#202123' }}>Search</Typography>
        </Button>
      </Box>
    </>
  );
}
