import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '@/constants';

export default function CustomDatePicker({date, setDate}: any) {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false); // Hide picker after selecting a date
    if (selectedDate) {
      setDate("dob", selectedDate.toLocaleDateString("en-GB"));
    }
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
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()} // Prevents future dates selection
        />
      )}
    </View>
  );
}
