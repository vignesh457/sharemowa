import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

export default function CustomRadioBtn({ gender, setGender }: any) {

  return (
    <View className="w-4/5 ">
      <Text className="text-secondary-100 text-lg pl-1 font-medium w-4/5">Select Gender</Text>

      <View className=" flex flex-row gap-20 mt-3">
        {/* Male Radio Button */}
        <View className="flex flex-row justify-center items-center">
          <RadioButton
            value="male"
            color="#E27139"
            status={gender === "male" ? "checked" : "unchecked"}
            onPress={(e)=>setGender("gender", "male")}
          />
          <Text className="text-secondary-100 text-[15px] font-JakartaLight">Male</Text>
        </View>

        {/* Female Radio Button */}
        <View className="flex flex-row justify-center items-center">
          <RadioButton
            value="female"
            color="#E27139"
            status={gender === "female" ? "checked" : "unchecked"}
            onPress={(e)=>setGender("gender", "female")}
          />
          <Text className="text-secondary-100 text-[15px] font-JakartaLight">Female</Text>
        </View>
      </View>
    </View>
  );
};
