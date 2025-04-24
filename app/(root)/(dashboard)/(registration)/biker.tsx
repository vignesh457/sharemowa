import { View, Text, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import { router } from 'expo-router'
import CustomDocCard from '@/components/CustomDocCard'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useAppSelector } from '@/redux/hook'
import { supabase } from '@/lib/supabase'

const main = () => {
    const [completionPercentage, setCompletionPercentage] = useState(0);
    // const formData = useAppSelector((state) => state.biker);
    const {personalInfo, phoneNumber} = useAppSelector((state) => state.user);
    const document = useAppSelector((state) => state.document)


    useEffect(() => {
      const fields = Object.values(document);
      //extra field for personal info
      const totalFields = fields.length + 1;
      var completedFields = fields.filter((field) => field.url !== '').length;
      //adding personal info to the count
      if(personalInfo){
        completedFields++;
      }
      const percent = Math.round((completedFields / totalFields) * 100);
      setCompletionPercentage(percent);
    }, [document, personalInfo]);
    
    function handleClick(id: string) {
      router.push({
        pathname: '/(root)/(dashboard)/(registration)/bikerForm',
        params: {
          id: id
        },
      });
    }

    const handleSubmit = async () => {
      try {
        // Step 1: Insert (or update) into documents table
        const { data: docData, error: docError } = await supabase
          .from('documents')
          .upsert({
            rc_url: document.rc.url,
            rc_number: document.rc.number,
            dl_url: document.dl.url,
            dl_number: document.dl.number,
            aadhar_url: document.aadhar.url,
            aadhar_number: document.aadhar.number,
          }, { onConflict: 'aadhar_number' })
          .select()
          .single(); // get the inserted/updated doc row
    
        if (docError || !docData) {
          console.log('❌ Error inserting/updating documents:', docError);
          return;
        }
    
        // Step 2: Update user with personal info and document_id
        const { error: userError } = await supabase
          .from('users')
          .upsert({
            first_name: personalInfo?.firstName,
            last_name: personalInfo?.lastName,
            dob: personalInfo?.dob,
            gender: personalInfo?.gender,
            document_id: docData.id,
          }, { onConflict: 'phone_number' });
    
        if (userError) {
          console.log('❌ Error updating user:', userError);
          return;
        }
    
        console.log('✅ User onboarded successfully!');
        router.push('/(root)/(dashboard)/vehicleSelect');
      } catch (err) {
        console.log('❌ Unexpected error:', err);
      }
    };
    
    

  return (
    <SafeAreaView className="bg-secondary-400 flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header */}
            <View className="bg-secondary-300 w-full h-[15%] flex flex-row justify-evenly items-center pt-5">
              <TouchableOpacity onPress={() => router.back()}>
                <Image source={icons.arrow} className="w-[30px] h-[30px] ml-7 mr-10" />
              </TouchableOpacity>
              <Text className="text-secondary-100 text-2xl font-JakartaBold flex-1">Upload Documents</Text>
            </View>
            {/* Main Fields */}
            <View className="w-full h-[70%] py-7 flex justify-center items-center">
                <View className="w-full h-[110px] flex flex-row justify-evenly items-center">
                    <Text className=" text-secondary-100 text-lg w-2/3 font-JakartaLight">Please complete all the steps to activate your account</Text>
                    {/* Circular Profile Completion */}
                    <AnimatedCircularProgress
                      size={80}
                      width={8}
                      fill={completionPercentage}
                      tintColor="#E27139"
                      backgroundColor="#525252"
                      rotation={0}
                    >
                      {(fill) => (
                        <Text className="text-primary-100 font-JakartaBold text-base">
                          {`${Math.round(fill)}%`}
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                </View>
                <TouchableOpacity onPress={() => handleClick('rc')}>
                    <CustomDocCard label="Vehicle RC Number" leftIcon={icons.document} status={document.rc.number != ''}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('dl')}>
                    <CustomDocCard label="Driving License" leftIcon={icons.document} status={document.dl.number != ''}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>handleClick('aadhar')}>
                    <CustomDocCard label="Aadhar/Pan Card" leftIcon={icons.document} status={document.aadhar.number != ''}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => handleClick('profile')}>
                    <CustomDocCard label="Profile info" leftIcon={icons.profile} status={personalInfo!=null}/>
                </TouchableOpacity>
            </View>
            {/* Submit Button */}
            <View className="w-full h-[15%] flex justify-center items-center">
              <CustomButton active={completionPercentage === 100} title="Submit" onPress={handleSubmit}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default main