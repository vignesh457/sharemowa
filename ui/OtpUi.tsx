import { View, Text, Keyboard, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { OtpInput } from 'react-native-otp-entry'

const OtpUi = ({ otp, setOtp, handleVerifyOTP }: { 
    otp: string; 
    setOtp: (value: string) => void; 
    handleVerifyOTP: () => void; 
}) => {
  const [countdown, setCountdown] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setResendVisible(true); // Enable resend button
    }
  }, [countdown]);

  const handleResendOTP = () => {
    setCountdown(30); // Restart countdown
    setResendVisible(false);
    // Resend OTP logic
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="w-full h-full justify-center items-center"> 
          <Image source={images.otpSvg} className="h-60 w-80 mb-10 mt-[-100px]" /> 
          <Text className="text-secondary-100 text-2xl mb-1 font-JakartaBold">OTP Verification</Text>
          <Text className="text-secondary-200 text-md font-JakartaRegular mb-7">Enter the OTP sent to your mobile</Text>
          <OtpInput
            numberOfDigits={6}
            focusColor="#E27139"
            onTextChange={setOtp}
            theme={{
              containerStyle: {
                width: 310,
                padding: 10,
              },
              pinCodeContainerStyle: {
                backgroundColor: "#383838",
                borderColor: "#383838",
              },
              filledPinCodeContainerStyle: {
                borderColor: "#E27139",
              },
              pinCodeTextStyle: {
                color: "#E27139",
                fontFamily: "Jakarta-semibold",
              },
            }}
          />
          {resendVisible ? (
            <View className='flex items-center justify-center flex-row mt-7 mb-7'>
              <Text className="text-secondary-200 text-md font-JakartaLight">Didn't receive the code?</Text>
              <TouchableOpacity className='ml-5'  onPress={handleResendOTP}>
                <Text className='text-primary-100 text-md font-JakartaRegular'>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          ): (
            <View className='flex items-center justify-center flex-row gap-1  mt-7 mb-7'>
              <Text className="text-secondary-200 text-md font-JakartaLight ml-5">Resend OTP in : </Text>
              <Text className="text-primary-100 text-md font-JakartaRegular">{countdown} sec</Text>
            </View>
          )}
          
        
          <CustomButton active={otp.length === 6} title="Verify" onPress={handleVerifyOTP} />
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default OtpUi