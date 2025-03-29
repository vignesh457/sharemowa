import { Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';

const CustomButton = ({
  title,
  icon,
  className,
  active,
  onPress
}: { 
  title: string; 
  icon?: ImageSourcePropType 
  className?: string
  onPress?: () => void 
  active?: boolean
}) => {
  return (
    <TouchableOpacity disabled={!active} onPress={onPress} className={`flex items-center ${active ? 'bg-primary-100' : 'bg-secondary-300'} rounded-[10px] p-3 w-4/5 mb-4 ${className}`} >
      {icon && <Image source={icon} className="w-6 h-6 mr-2" />}
      <Text className="text-secondary-500 text-2xl font-JakartaBold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
