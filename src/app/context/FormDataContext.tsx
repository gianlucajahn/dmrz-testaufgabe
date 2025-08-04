"use client";

import React, { createContext, useContext, useState } from "react";

export type Mask =
  | "Rechnungsempfänger"
  | "Verordnungsmuster"
  | "Aussteller"
  | "Patientendaten"
  | "Zuzahlungsstatus"
  | "Unfallfolgen / BVG"
  | "Diagnosedaten"
  | "Therapiedaten"
  | "Datenüberprüfung"
  | "Leistungen"
  | "";
export type Gender = "Männlich" | "Weiblich" | "Divers" | "Keine Angabe" | "";
export type Title = "Dr." | "Prof." | "";
export type YesNo = "yes" | "no" | "";
export type TherapyFrequency = "1-3x wöchentlich" | "alle 4-6 Wochen" | "";

export interface PersonalInfo {
  gender: Gender;
  title: Title;
  name: string;
  firstName: string;
  birthDate: string;
  street: string;
  number: string;
  plz: string;
  city: string;
  costBearer: string;
  insuranceNumber: string;
  insuranceStatus: string;
}

interface TherapyInfo {
  therapyReport: YesNo;
  urgent: YesNo;
  therapyFrequency: TherapyFrequency;
  homeVisit: YesNo;
}

interface FormData {
  personal: PersonalInfo;
  therapy: TherapyInfo;
}

interface FormDataContextType {
  currentMask: Mask;
  setCurrentMask: (mask: Mask) => void;
  data: FormData;
  updateSection: <K extends keyof FormData>(
    section: K,
    values: Partial<FormData[K]>
  ) => void;
}

const defaultData: FormData = {
  personal: {
    gender: "",
    title: "",
    name: "",
    firstName: "",
    birthDate: "",
    street: "",
    number: "",
    plz: "",
    city: "",
    costBearer: "",
    insuranceNumber: "",
    insuranceStatus: "",
  },
  therapy: {
    therapyReport: "",
    urgent: "",
    therapyFrequency: "",
    homeVisit: "",
  },
};

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentMask, setCurrentMask] = useState<Mask>("Patientendaten");
  const [data, setData] = useState<FormData>(defaultData);

  const updateSection = <K extends keyof FormData>(
    section: K,
    values: Partial<FormData[K]>
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values,
      },
    }));
  };

  return (
    <FormDataContext.Provider
      value={{ currentMask, setCurrentMask, data, updateSection }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context)
    throw new Error(
      "useFormData muss innerhalb des Providers verwendet werden"
    );
  return context;
};
