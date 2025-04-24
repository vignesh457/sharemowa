import { View, Text, Keyboard, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { images, icons } from '@/constants';
import MascotTalk from '@/components/MascotTalk';
import { useAppDispatch } from '@/redux/hook';
import { setUserPhoneNumber } from '@/redux/slice/userSlice';

const PhoneNumberUi = ({ phoneNumber, setPhoneNumber, sendOTP }: { 
    phoneNumber: string; 
    setPhoneNumber: (value: string) => void;
    sendOTP: () => void;
}) => {
    const dispatch = useAppDispatch();

    const handlePhoneNumberChange = (name: string, text: string) => {
        setPhoneNumber(text);
    }

    const handleSendOTP = () => {
        dispatch(setUserPhoneNumber(phoneNumber));
        sendOTP();
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="w-full h-full justify-center items-center"> 
                <View className='h-[50%] w-full flex justify-end items-center'>
                    <MascotTalk text="Enter your mobile number" image={images.mascotDialing} />
                </View>
                <View className='h-[50%] w-full flex justify-start items-center gap-5'>
                    <View className='w-full flex justify-center items-center'>
                        <InputField   
                            placeholder="Enter Mobile Number"
                            keyboardType="phone-pad"
                            maxLength={10}
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            icon={icons.indiaFlag}
                            name='phone'
                        />
                        <Text className="text-secondary-200 text-md font-JakartaLight mb-2 mt-[-20px]">Note: We will send you a verification code</Text>
                    </View>
                    <CustomButton active={phoneNumber.length === 10} title="Get OTP" onPress={handleSendOTP} />
                </View>
            </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default PhoneNumberUi;