import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useFlightSearch } from '@/app/hooks/useFlightSearch';

const SelectClass = () => {
  const { cabinClass, handleChangeCabinClass } = useFlightSearch();

  return (
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
  );
};

export default SelectClass;
