import React, { useState } from 'react'
import DocForm from '@/ui/DocForm'
import { router, useLocalSearchParams } from 'expo-router';
import FieldForm from '@/ui/FieldForm';
import { useAppDispatch } from '@/redux/hook';
import { setPersonalInfo } from '@/redux/slice/userSlice';
import { setAadharDocument, setDlDocument, setRcDocument } from '@/redux/slice/documentSlice';

const bikerForm = () => {
  const {id} = useLocalSearchParams();
  const dispatch = useAppDispatch();
  
  return (
    <>
      {id === 'rc' && <DocForm title="Registration Certificate" label="Registration Number" onSubmit={(value) => dispatch(setRcDocument(value))} />}
      {id === 'dl' && <DocForm title="Driving License" label="Driving License Number" onSubmit={(value) => dispatch(setDlDocument(value))} />}
      {id === 'aadhar' && <DocForm title="Aadhar Card" label="Aadhar Card Number" onSubmit={(value) => dispatch(setAadharDocument(value))} />}
      {id === 'profile' && <FieldForm onSubmit={(value) => dispatch(setPersonalInfo(value))} />}
    </>
  );
}

export default bikerForm