import { View, Text, Keyboard, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { images, icons } from '@/constants';

const PhoneNumberUi = ({ phoneNumber, setPhoneNumber, handleSendOTP }: { 
    phoneNumber: string; 
    setPhoneNumber: (value: string) => void; 
    handleSendOTP: () => void; 
}) => {

    const handlePhoneNumberChange = (name: string, text: string) => {
        setPhoneNumber(text);
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="w-full h-full justify-center items-center"> 
                <Image source={images.phoneSvg} className="h-80 w-80 mb-10 mt-[-100px]" /> 
                <Text className="text-secondary-100 text-2xl mb-1 font-JakartaBold">Enter Your Mobile Number</Text>
                <Text className="text-secondary-200 text-md font-JakartaRegular mb-10">We will send you a verification code</Text>
                <InputField   
                placeholder="Enter Mobile Number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                icon={icons.indiaFlag}
                name='phone'
                />
                <CustomButton active={phoneNumber.length === 10} title="Get OTP" onPress={handleSendOTP} />
            </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default PhoneNumberUi;