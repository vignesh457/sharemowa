import CustomLoader from "@/components/CustomLoader";
import OtpUi from "@/ui/OtpUi";
import PhoneNumberUi from "@/ui/PhoneNumberUi";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, View, Text } from "react-native";

export default function OTPAuthentication() {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [isSignUpFlow, setIsSignUpFlow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!isSignInLoaded || !isSignUpLoaded){
      Alert.alert("Error", "Authentication service not loaded.");
      return;
    }
    setLoading(true);
    try {
      // Try sign-in first
      if (signIn) {
        const {supportedFirstFactors} = await signIn.create({ identifier: `+91${phoneNumber}` });
        const isPhoneCodeFactor = (factor: any): factor is any => {
          return factor.strategy === 'phone_code'
        }
        const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor);
        const { phoneNumberId } = phoneCodeFactor
        await signIn.prepareFirstFactor({ strategy: "phone_code", phoneNumberId});
        setStep(2);
        setIsSignUpFlow(false);
      }
    } 
    catch (err: any) {
      console.log(err);
      if (err.errors?.[0]?.code === "form_identifier_not_found") {
        // If user doesn't exist, switch to sign-up
        try {
          if (signUp) {
            await signUp.create({ phoneNumber: `+91${phoneNumber}` });
            await signUp.preparePhoneNumberVerification();
            setStep(2);
            setIsSignUpFlow(true);
          }
        } catch (signUpErr: any) {
          Alert.alert("Error", signUpErr.errors[0].message);
        }
      } 
      else {
        Alert.alert("Error", err.errors?.[0]?.message || "Failed to send OTP");
      }
    }
    setLoading(false); 
  };

  const handleVerifyOTP = async () => {
    if ((!isSignInLoaded && !isSignUpFlow) || (!isSignUpLoaded && isSignUpFlow)){
      Alert.alert("Error", "Authentication service not loaded.");
      return;
    }
    setLoading(true);
    try {
      if (isSignUpFlow) {
        if (signUp) {
          const result = await signUp.attemptPhoneNumberVerification({ code: otp });
          if (result.status === "complete") {
            console.log("Sign up successful!", result.createdSessionId);
            router.replace('/(root)/(dashboard)/main');
          }
        }
      } else {
        if (signIn) {
          const result = await signIn.attemptFirstFactor({
            strategy: "phone_code",
            code: otp,
          });
          if (result.status === "complete") {
            console.log("Sign in successful!", result.createdSessionId);
            router.replace('/(root)/(dashboard)/main');
          }
        }
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].message);
    } 
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-secondary-400">
      {loading && <CustomLoader/>}
      {step === 1 ? (
        <PhoneNumberUi phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} handleSendOTP={handleSendOTP}/>
      ) : (
        <OtpUi otp={otp} setOtp={setOtp} handleVerifyOTP={handleVerifyOTP}/>
      )}
    </SafeAreaView>
    
  );
}
