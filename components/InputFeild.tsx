import { TextInput, View, Image, ImageSourcePropType, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'
import React,{useState} from 'react'

const InputFeild = ({
    value,
    name,
    onChangeText,
    placeholder,
    keyboardType='default',
    maxLength,
    className,
    icon,
    }: {
        value: string,
        name: string,
        onChangeText: (name: string, text: string) => void,
        placeholder: string,
        keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad',
        maxLength?: number | undefined,
        className?: string
        icon?: ImageSourcePropType
}) => {

    return (
        <View className={`flex flex-row items-center p-1 mt-1 bg-secondary-300 w-4/5 h-[50px] rounded-[10px] mb-7  ${className}`}>
            {icon && <View className='w-[17%] h-[90%] flex items-center justify-center border-r '>
                <Image source={icon} className="w-8 h-8" />
            </View>}
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={(text) => onChangeText(name, text)}
                maxLength={maxLength}
                cursorColor="#E27139"
                className='w-full px-4 tracking-widest rounded-[10px] text-2xl font-JakartaLight text-secondary-100 placeholder:text-secondary-200 placeholder:text-[15px]'
            />
        </View>
  )
}

export default InputFeild