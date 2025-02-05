import { useState, useRef } from 'react';

interface DateRange {
  departure: Date | null;
  return: Date | null;
}

export const useDateSelection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<'departure' | 'return' | null>(null);
  const [dates, setDates] = useState<DateRange>({ departure: null, return: null });

  const handleDateChange = (type: 'departure' | 'return') => (date: Date | null) => {
    setDates((prev) => ({ ...prev, [type]: date }));
    setOpen(null);
  };

  return {
    open,
    setOpen,
    dates,
    handleDateChange,
    containerRef,
  };
};