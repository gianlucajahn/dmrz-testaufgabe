"use client";

import * as React from "react";
import css from "./SaveButton.module.scss";
import { Mask, useFormData } from "@/app/context/FormDataContext";

interface SaveButtonProps {
  onClick: () => void;
}

export default function SaveButton({ onClick }: SaveButtonProps) {
  const { currentMask } = useFormData();

  let nextMask: Mask;
  switch (currentMask) {
    case "Patientendaten":
      nextMask = "Therapiedaten";
      break;
    case "Therapiedaten":
      nextMask = "Datenüberprüfung";
      break;
    default:
      nextMask = "Datenüberprüfung";
      break;
  }

  return (
    <div className={css.saveButton} onClick={onClick}>
      Speichern & weiter mit {nextMask}
    </div>
  );
}
