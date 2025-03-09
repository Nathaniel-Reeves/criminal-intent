import React, { useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import DateTimePicker from '@react-native-community/datetimepicker';

export const CustomDateTimePicker = (props:{
  date: Date,
  setDate: (date: Date) => void
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || props.date;
    setShow(false);
    props.setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <Box>
      <Button onPress={showDatepicker}>
        <ButtonText>{props.date.toLocaleDateString(
          'en-US',
          {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )}</ButtonText>
      </Button>
      {show && (
        <DateTimePicker
          value={props.date}
          mode="date"
          onChange={onChange}
        />
      )}
    </Box>
  );
};