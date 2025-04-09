import React, { useState } from 'react'
import DocForm from '@/ui/DocForm'
import { router, useLocalSearchParams } from 'expo-router';
import FieldForm from '@/ui/FieldForm';
import { useAppDispatch } from '@/redux/hook';
import { FormState, setBikerForm } from '@/redux/slice/bikerFormSlice';

const bikerForm = () => {
  const {id} = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const handleChange = (name: keyof FormState, value: string) => {
    dispatch(setBikerForm({ name, value }))
  };
  
  return (
    <>
      {id === 'rc' && <DocForm title="Registration Certificate" label="Registration Number" onSubmit={(value) => handleChange("registrationCertificate",value)} />}
      {id === 'dl' && <DocForm title="Driving License" label="Driving License Number" onSubmit={(value) => handleChange("drivingLicense",value)} />}
      {id === 'aadhar' && <DocForm title="Aadhar Card" label="Aadhar Card Number" onSubmit={(value) => handleChange("aadharCard",value)} />}
      {id === 'profile' && <FieldForm parent="biker" onSubmit={(value) => handleChange("profileInformation",value)} />}
    </>
  );
}

export default bikerForm