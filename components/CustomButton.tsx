import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';

const CustomButton = ({
  title,
  icon,
  className,
  onPress
}: { 
  title: string; 
  icon?: ImageSourcePropType 
  className?: string
  onPress?: () => void
}) => {
  return (
    <TouchableOpacity onPress={onPress} className={`flex justify-center items-center ${className}`} style={{ borderRadius: 10, backgroundColor: '#EB8317' }}>
      {icon && <Image source={icon} className="w-6 h-6 mr-2" />}
      <Text className="text-black text-2xl font-JakartaBold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
