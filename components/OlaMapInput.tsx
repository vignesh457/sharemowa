import { useAppSelector } from '@/redux/hook';
import { setSelectedLocationType } from '@/redux/slice/userLocationSlice';
import { OlaMapInputProps } from '@/types/type';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';

const OlaMapInput: React.FC<OlaMapInputProps> = ({
  placeholder,
  setSuggestions,
  defaultValue,
  name,
  keyboardType = 'default',
  className,
  classNameText,
  icon,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: inputValue.length,
    end: inputValue.length,
  });

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isInitialRender = useRef(true); // Track if it's the first render
  const inputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const { pickupLocation, selectedLocationType } = useAppSelector((state) => state.userLocation);

  const apiKey = process.env.EXPO_PUBLIC_OLA_MAP_KEY;

  // Focus and select the text only if the "focused" prop is true
  useEffect(() => {
    if (name===selectedLocationType) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
        setSelection({ start: 0, end: inputValue.length }); // Select all text on focus
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [selectedLocationType]);

  // Handle suggestion API call with debounce
  useEffect(() => {
    // Skip API call on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false; // Mark as rendered
      return;
    }

    // Clear the timeout if inputValue changes before the delay
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to call the API after 1000ms
    debounceTimeout.current = setTimeout(() => {
      if (inputValue.trim() !== '') {
        fetchSuggestions(inputValue.trim());
      }
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts or before the next effect
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue]);

  // Fetch autocomplete suggestions from Ola Maps API
  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
          query
        )}&location=${pickupLocation?.lat},${pickupLocation?.log}&api_key=${apiKey}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (!data.predictions || data.predictions.length === 0) {
        throw new Error('No suggestions found');
      }
      setSuggestions(data.predictions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // When input is focused, dispatch the selected type (pickup/drop)
  const handleFocus = () => {
    dispatch(setSelectedLocationType(name));
    setSelection({ start: 0, end: inputValue.length }); // Select all text on focus
  };

  // When input is blurred with type "pickup", if input is empty then replace it with the current location or if not empty then leave it as it is
  const handleBlur = () => {
    if(name === 'pickup') {
      setInputValue(pickupLocation?.address || '');
    }
  }

  // Update input value and move cursor to end
  const handleChangeText = (text: string) => {
    setInputValue(text);
    setSelection({ start: text.length, end: text.length });
  };

  return (
    <View
      className={`flex flex-row items-center p-1 bg-secondary-300 h-[50px] rounded-[10px] mb-2 mt-0 w-[90%] ${className}`}
    >
      {icon && (
        <View className="w-[17%] h-[90%] flex items-center justify-center border-r">
          <Image source={icon} className="w-8 h-8" />
        </View>
      )}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={inputValue}
        selection={selection}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        cursorColor="#E27139"
        className={`w-full px-4 tracking-widest rounded-[10px] text-[15px] font-JakartaMedium text-secondary-100 placeholder:text-secondary-200 ${classNameText}`}
      />
    </View>
  );
};

export default OlaMapInput;
