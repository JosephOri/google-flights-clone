import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDateSelection } from '@/app/hooks/useDateSelection';

const SelectDates = () => {
  const { open, setOpen, dates, handleDateChange, containerRef } = useDateSelection();

  return (
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
  );
};

export default SelectDates;
