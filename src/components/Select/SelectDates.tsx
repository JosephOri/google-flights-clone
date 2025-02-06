import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Container, Stack } from '@mui/material';
import DatePickerButton from './DatePickerButton';
import { useFlightSearch } from '@/app/hooks/useFlightSearch';

const SelectDates = () => {
  const { open, setOpen, dates, handleDateChange, containerRef } = useFlightSearch();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        sx={{
          border: '1px solid #3A3B3F',
          borderRadius: 1,
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        ref={containerRef}
        id="flight-date-container"
      >
        <DatePickerButton
          open={open === 'departure'}
          onOpen={() => setOpen('departure')}
          onClose={() => setOpen(null)}
          value={dates.departure}
          onChange={handleDateChange('departure')}
          label="Departure"
          anchorEl={containerRef.current}
        />
        <DatePickerButton
          open={open === 'return'}
          onOpen={() => setOpen('return')}
          onClose={() => setOpen(null)}
          value={dates.return}
          onChange={handleDateChange('return')}
          label="Return"
          minDate={dates.departure || undefined}
          anchorEl={containerRef.current}
        />
      </Container>
    </LocalizationProvider>
  );
};

export default SelectDates;
