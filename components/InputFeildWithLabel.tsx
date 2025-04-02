import { View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import InputFeild from './InputFeild'

const InputFeildWithLabel = (props: React.JSX.IntrinsicAttributes & { value: string; name: string; label: string; onChangeText: (name: string, text: string) => void; placeholder: string; keyboardType: "default" | "numeric" | "email-address" | "phone-pad"; maxLength?: number | undefined; className?: string; icon?: ImageSourcePropType }) => {
  return (
    <View className='w-full flex justify-center items-center'>
      <Text className='text-secondary-100 text-lg pl-1 font-medium w-4/5'>{props.label}</Text>
      <InputFeild {...props}/>
    </View>
  )
}

export default InputFeildWithLabel