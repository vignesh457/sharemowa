import { TextInput, View, Image, ImageSourcePropType} from 'react-native'
import React,{useState} from 'react'

const InputFeild = ({
    value,
    onChangeText,
    placeholder,
    keyboardType='default',
    maxLength,
    className,
    icon,
    }: {
        value: string,
        onChangeText: (text: string) => void,
        placeholder: string,
        keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad',
        maxLength: number | undefined,
        className?: string
        icon?: ImageSourcePropType
}) => {

    return (
        <View className={`flex flex-row items-center p-1 bg-secondary-300 w-4/5 h-[55px] rounded-[10px] mb-10`}>
            <View className='w-[17%] h-[90%] flex items-center justify-center border-r '>
                <Image source={icon} className="w-8 h-8" />
            </View>
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                cursorColor="#E27139"
                className='w-[83%] px-4 tracking-widest rounded-[10px] text-2xl font-JakartaBold text-secondary-100 placeholder:text-secondary-200 placeholder:text-[15px]'
            />
        </View>
  )
}

export default InputFeild