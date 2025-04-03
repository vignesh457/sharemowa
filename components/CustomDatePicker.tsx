import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { icons } from '@/constants';

export default function CustomDatePicker({date, setDate}: any) {
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    setShow(false); // Hide picker after selecting a date
    console.log(selectedDate+" -------------------");
    if (selectedDate) {
      setDate("dob", selectedDate.toLocaleDateString("en-GB"));
    }
  };

  const parseToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number); // Extract dd, mm, yyyy
    return new Date(year, month - 1, day); // month is 0-based in JS
  };

  return (
    <View>
        <Text className='text-secondary-100 text-lg pl-1 font-medium w-4/5'>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShow(true)}
          className="flex flex-row justify-between items-center p-1 mt-1 bg-secondary-300 w-4/5 h-[50px] rounded-[10px] mb-7"
        >
            <Text className={`text-secondary-${date ? "100" : "200"} text-[15px] px-4 font-JakartaLight`}>{date?date: "Select your DOB"}</Text>
            <View className=' flex items-center justify-center border-l-2 p-2 border-l-secondary-200'>
              <Image source={icons.calender} className="w-7 h-7 ml-2" />
            </View>
        </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date==''? new Date(): parseToDate(date)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()} // Prevents future dates selection
        />
      )}
    </View>
  );
}
