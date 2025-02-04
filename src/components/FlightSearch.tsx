'use client';
import { Box, Button, IconButton, Select, MenuItem, Paper, Typography, Stack } from '@mui/material';
import { CompareArrows, Search } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PassengerSelect from './PassengerSelect';
import AirportAutocomplete from './AirportAutocomplete';
import { useFlightSearch } from '@/app/hooks/useFlightSearch';
import SelectFlightType from './SelectFlightType';

export default function FlightSearch() {
  const {
    cabinClass,
    locations,
    setLocations,
    open,
    setOpen,
    dates,
    passengers,
    setPassengers,
    handleChangeCabinClass,
    handleDateChange,
    handleSearch,
    containerRef,
  } = useFlightSearch();
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

          {/* section: passengers */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PassengerSelect value={passengers} onChange={setPassengers} />
          </Box>

          {/* section: class */}
          <Select
            value={cabinClass}
            onChange={handleChangeCabinClass}
            size="small"
            sx={{
              color: '#AFB1B6',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Premium economy">Premium Economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="First">First</MenuItem>
          </Select>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div ref={containerRef} id="flight-date-container">
                <Stack
                  direction="row"
                  sx={{
                    border: '1px solid #3A3B3F',
                    borderRadius: 1,
                    overflow: 'hidden',
                    paddingTop: 0.5,
                  }}
                >
                  <DatePicker
                    open={open === 'departure'}
                    onOpen={() => setOpen('departure')}
                    onClose={() => setOpen(null)}
                    value={dates.departure}
                    onChange={handleDateChange('departure')}
                    slotProps={{
                      popper: {
                        anchorEl: containerRef.current,
                        placement: 'bottom-start',
                      },
                    }}
                    slots={{
                      textField: () => (
                        <Button
                          onClick={() => setOpen('departure')}
                          startIcon={<CalendarTodayIcon />}
                          sx={{
                            flex: 1,
                            color: '#AFB1B6',
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            borderRadius: 0,
                            padding: '10px 20px',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            },
                          }}
                        >
                          {dates.departure ? dates.departure.toLocaleDateString() : 'Departure'}
                        </Button>
                      ),
                    }}
                  />

                  <DatePicker
                    open={open === 'return'}
                    onOpen={() => setOpen('return')}
                    onClose={() => setOpen(null)}
                    value={dates.return}
                    onChange={handleDateChange('return')}
                    slotProps={{
                      popper: {
                        anchorEl: containerRef.current,
                        placement: 'bottom-start',
                      },
                    }}
                    minDate={dates.departure || undefined}
                    slots={{
                      textField: () => (
                        <Button
                          onClick={() => setOpen('return')}
                          startIcon={<CalendarTodayIcon />}
                          sx={{
                            flex: 1,
                            color: '#AFB1B6',
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            borderLeft: '1px solid #AFB1B6',
                            borderRadius: 0,
                            padding: '10px 16px',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            },
                          }}
                        >
                          {dates.return ? dates.return.toLocaleDateString() : 'Return'}
                        </Button>
                      ),
                    }}
                  />
                </Stack>
              </div>
            </LocalizationProvider>
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
