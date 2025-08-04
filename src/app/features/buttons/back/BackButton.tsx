"use client"

import * as React from 'react';
import css from './BackButton.module.scss'
import { useFormData } from '@/app/context/FormDataContext';

export interface IBackButtonProps {
}

export default function BackButton (props: IBackButtonProps) {
  const { setCurrentMask, currentMask } = useFormData()

  return (
    <div className={css.backButton} onClick={() => setCurrentMask(currentMask === "Therapiedaten" ? "Patientendaten" : "Therapiedaten")}>
      Zurück
    </div>
  );
}
