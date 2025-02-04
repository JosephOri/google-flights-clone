import React from 'react';
import { MenuItem, Select } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useFlightSearch } from '@/app/hooks/useFlightSearch';

const SelectFlightType = () => {
  const { flightType, handleChangeFlightType } = useFlightSearch();
  return (
    <Select
      value={flightType}
      onChange={handleChangeFlightType}
      size="small"
      sx={{
        color: '#AFB1B6',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      renderValue={(selected) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CompareArrowsIcon sx={{ fontSize: 20 }} />
          {selected}
        </div>
      )}
    >
      <MenuItem value="Round-trip">Round trip</MenuItem>
      <MenuItem value="One-way">One way</MenuItem>
      <MenuItem value="Multi-city">Multi-city</MenuItem>
    </Select>
  );
};

export default SelectFlightType;
