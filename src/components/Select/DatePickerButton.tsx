import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface DatePickerButtonProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  minDate?: Date;
  anchorEl: HTMLElement | null;
}

const DatePickerButton = ({
  open,
  onOpen,
  onClose,
  value,
  onChange,
  label,
  minDate,
  anchorEl,
}: DatePickerButtonProps) => {
  return (
    <DatePicker
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      value={value}
      onChange={onChange}
      minDate={minDate}
      slotProps={{
        popper: {
          anchorEl,
          placement: 'bottom-start',
        },
      }}
      slots={{
        textField: () => (
          <Button
            onClick={onOpen}
            startIcon={<CalendarTodayIcon />}
            sx={{
              color: '#AFB1B6',
              textTransform: 'none',
              justifyContent: 'flex-start',
              borderRadius: 0,
              padding: '15px 20px',
              fontSize: '1rem',
              height: '100%',
              minWidth: '150px',
              maxWidth: '100%',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            {value ? value.toLocaleDateString() : label}
          </Button>
        ),
      }}
    />
  );
};

export default DatePickerButton;
