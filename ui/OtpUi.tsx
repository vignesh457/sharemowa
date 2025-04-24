import { View, Text, Keyboard, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { OtpInput } from 'react-native-otp-entry'
import MascotTalk from '@/components/MascotTalk'
import { useAppSelector } from '@/redux/hook'

const OtpUi = ({ otp, setOtp, handleVerifyOTP, resendOTP }: { 
    otp: string; 
    setOtp: (value: string) => void; 
    handleVerifyOTP: () => void; 
    resendOTP: () => void
}) => {
  const [countdown, setCountdown] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const {phoneNumber} = useAppSelector(state => state.user)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setResendVisible(true); // Enable resend button
    }
  }, [countdown]);

  const handleResendOTP = () => {
    resendOTP();
    setCountdown(30); // Restart countdown
    setResendVisible(false);
    // Resend OTP logic
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="w-full h-full justify-center items-center"> 
          <View className='h-[50%] w-full flex justify-end items-center'>
              <MascotTalk text={`Enter the OTP sent to ${phoneNumber.slice(0, 4)}******`} image={images.mascotDialing} />
          </View>
          <View className='h-[50%] w-full flex justify-start items-center gap-5'>
              <View className='w-full flex justify-center items-center'>
                <OtpInput
                    numberOfDigits={6}
                    focusColor="#525252"
                    onTextChange={setOtp}
                    theme={{
                      containerStyle: {
                        width: "80%",
                        padding: 5,
                      },
                      pinCodeContainerStyle: {
                        backgroundColor: "#262626",
                        borderColor: "#525252",
                        width: 40,
                        height: 45,
                        borderRadius: 8
                      },
                      filledPinCodeContainerStyle: {
                        borderColor: "#525252",
                      },
                      pinCodeTextStyle: {
                        color: "#dfdfdf",
                        fontFamily: "Nunito-Regular",
                        fontSize: 20
                      },
                    }}
                  />
                  {resendVisible ? (
                  <View className='flex items-center justify-center flex-row mt-1 mb-7'>
                    <Text className="text-secondary-200 text-md font-JakartaLight">Didn't receive the code?</Text>
                    <TouchableOpacity className='ml-5'  onPress={handleResendOTP}>
                      <Text className='text-primary-100 text-md font-JakartaRegular'>Resend OTP</Text>
                    </TouchableOpacity>
                  </View>
                ): (
                  <View className='flex items-center justify-center flex-row gap-1  mt-1 mb-7'>
                    <Text className="text-secondary-200 text-md font-JakartaLight ml-5">Resend OTP in : </Text>
                    <Text className="text-primary-100 text-md font-JakartaRegular">{countdown} sec</Text>
                  </View>
                )}
              </View>
              <CustomButton active={otp.length === 6} title="Verify" onPress={handleVerifyOTP} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default OtpUi

