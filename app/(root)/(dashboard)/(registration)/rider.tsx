import React, { useEffect } from 'react'
import FieldForm from '@/ui/FieldForm'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setIsOnboarded, setPersonalInfo } from '@/redux/slice/userSlice'
import { supabase } from '@/lib/supabase'
import CustomAlert from '@/components/CustomAlert'
import { showAlert } from '@/redux/slice/alertSlice'
import { router } from 'expo-router'

const rider = () => {
  const dispatch = useAppDispatch()
  const { phoneNumber, isOnboarded } = useAppSelector((state) => state.user)

  const handleSubmit = async (value: {
    firstName: string
    lastName: string
    dob: string
    gender: string
  }) => {
    try {
      // 1. Save to Redux
      dispatch(setPersonalInfo(value))
      console.log(phoneNumber);

      // 2. Save to Supabase
      const { error } = await supabase.from('users').upsert({
        phone_number: phoneNumber,
        first_name: value.firstName,
        last_name: value.lastName,
        dob: value.dob,
        gender: value.gender
      }, { onConflict: 'phone_number' });

      if (error) {
        console.log('❌ supabase error:', error)
        dispatch(showAlert({ type: 'error', message: error.message }))
      } else {
        dispatch(showAlert({ type: 'success', message: 'Your personal info has been saved' }))
        dispatch(setIsOnboarded(true));
        router.push('/(root)/(dashboard)/vehicleSelect');
      }
    } catch (error) {
      console.log('❌ Unexpected error:', error)
      dispatch(showAlert({ type: 'error', message: "Something went wrong" }))
    }
  }

  return <FieldForm onSubmit={handleSubmit} />
}

export default rider
