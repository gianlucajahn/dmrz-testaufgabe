"use client"

import { useFormData } from "@/app/context/FormDataContext";
import * as React from "react";
import PatientMask from "./PatientMask";
import TherapyMask from "./TherapyMask";
import ReviewMask from "./ReviewMask";

export interface IMaskWrapperProps {}

export default function MaskWrapper(props: IMaskWrapperProps) {
  const { currentMask } = useFormData();
  let renderedMask;

  switch (currentMask) {
    case "Patientendaten":
      renderedMask = <PatientMask />;
      break;
    case "Therapiedaten":
      renderedMask = <TherapyMask />;
      break;
    case "Datenüberprüfung":
      renderedMask = <ReviewMask />;
      break;
    default:
      renderedMask = null;
  }

  return <div>{renderedMask}</div>;
}
