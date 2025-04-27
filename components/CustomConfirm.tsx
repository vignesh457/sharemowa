import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { hideConfirm } from '@/redux/slice/confirmSlice';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomConfirm = () => {

    const dispatch = useAppDispatch();
    const { open, title, message, onConfirm, onCancel } = useAppSelector(state => state.confirm);

    if (!open) return null;

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        dispatch(hideConfirm());
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        dispatch(hideConfirm());
    };
  
  return (
    <View className="w-full h-full bg-[#00000080] absolute top-0 left-0 flex justify-center items-center z-10">
      <View className="w-[300px] bg-secondary-400 rounded-lg p-5">
        <Text className="text-[20px] font-JakartaBold text-center text-secondary-100 mb-2">{title}</Text>
        <Text className="text-[18px] font-JakartaMedium text-center text-secondary-200 mb-5">{message}</Text>

        <View className="flex flex-row justify-between">
          <TouchableOpacity
            onPress={handleCancel}
            className="flex-1 bg-secondary-300 py-2 mr-2 rounded-md justify-center items-center"
          >
            <Text className="text-white text-[16px] font-JakartaSemiBold">No</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConfirm}
            className="flex-1 bg-success-100 py-2 ml-2 rounded-md justify-center items-center"
          >
            <Text className="text-white text-[16px] font-JakartaSemiBold">Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomConfirm;
