import React from 'react'
import FieldForm from '@/ui/FieldForm'
import { useAppDispatch } from '@/redux/hook';
import { FormState, setRiderForm } from '@/redux/slice/riderFormSlice';

const rider = () => {
    const dispatch = useAppDispatch();

    const handleChange = (name: keyof FormState, value: string) => {
      dispatch(setRiderForm({ name, value }));
    }
    
  return (
    <FieldForm parent="rider" onSubmit={(value) =>handleChange("profileInformation", value)}/>
  )
}

export default rider