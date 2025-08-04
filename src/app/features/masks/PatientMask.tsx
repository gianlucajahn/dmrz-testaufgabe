"use client";

import * as React from "react";
import css from "./Mask.module.scss";
import Headline from "../headline/Headline";
import FieldGroup from "../fieldgroup/FieldGroup";
import { Gender, PersonalInfo, Title, useFormData } from "@/app/context/FormDataContext";
import Dropdown from "../fields/dropdown/Dropdown";
import Input from "../fields/input/Input";
import DateInput from "../fields/date/Date";
import BackButton from "../buttons/back/BackButton";
import SaveButton from "../buttons/save/SaveButton";

export default function PatientMask() {
  const { data, updateSection, setCurrentMask } = useFormData();

  const [form, setForm] = React.useState<PersonalInfo>({
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
  });

  // Einholen aktueller Context-Daten
  React.useEffect(() => {
    setCurrentMask("Patientendaten");
    setForm(data.personal);
  }, [data.personal, setCurrentMask]);

  // Lokale State-Speicherung
  const handleChange = <K extends keyof PersonalInfo>(
    key: K,
    value: PersonalInfo[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Endgültige Speicherung im Context
  const handleSave = () => {
    updateSection("personal", form);
    alert("Daten gespeichert!");
  };

  const [forceErrors, setForceErrors] = React.useState(false);

  const handleValidationAndSave = () => {
    const inputElements = document.querySelectorAll("input");

    let allValid = true;

    inputElements.forEach((input) => {
      if (!input.checkValidity()) {
        allValid = false;
      }
    });

    if (!allValid) {
      setForceErrors(true);
      return;
    }

    // Wenn alles gültig
    updateSection("personal", form);
    setCurrentMask("Therapiedaten");
  };

  return (
    <div className={css.maskWrapper}>
      <Headline
        headline="Patientendaten"
        subline="Bitte tragen Sie die Patientendaten ein"
      />

      <FieldGroup headline="Persönliche Angaben">
        <Dropdown
          id="gender"
          label="Anrede"
          placeholder="ㅤ"
          value={form.gender}
          options={["Herr", "Frau", "Divers"]}
          onChange={(e) => handleChange("gender", e.target.value as Gender)}
        />
        <Dropdown
          id="title"
          label="Titel"
          placeholder="ㅤ"
          value={form.title}
          options={["Dr.", "Prof.", "Prof. Dr."]}
          onChange={(e) => handleChange("title", e.target.value as Title)}
        />
        <Input
          id="name"
          label="Name"
          placeholder="Mustermann"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          pattern={/^[A-Za-zÄÖÜäöüß\s-]+$/}
          errorMessage="Ungültiger Name"
          forceErrorDisplay={forceErrors}
        />
        <Input
          id="firstName"
          label="Vorname"
          placeholder="Max"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          required
          pattern={/^[A-Za-zÄÖÜäöüß\s-]+$/}
          errorMessage="Ungültiger Vorname"
          forceErrorDisplay={forceErrors}
        />
        <DateInput
          id="birthDate"
          label="Geburtsdatum"
          value={form.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          required
          errorMessage="Ungültiges Geburtsdatum"
          forceErrorDisplay={forceErrors}
        />
      </FieldGroup>

      <FieldGroup headline="Adresse">
        <Input
          id="street"
          label="Straße"
          placeholder="Musterstraße"
          value={form.street}
          onChange={(e) => handleChange("street", e.target.value)}
          required
          pattern={/^[A-Za-zÄÖÜäöüß\s-]+$/}
          errorMessage="Ungültige Straße"
          forceErrorDisplay={forceErrors}
        />
        <Input
          id="number"
          label="Nr."
          placeholder="1"
          value={form.number}
          onChange={(e) => handleChange("number", e.target.value)}
          required
          errorMessage="Ungültige Hausnummer"
          forceErrorDisplay={forceErrors}
        />
        <Input
          id="plz"
          label="PLZ"
          placeholder="12345"
          value={form.plz}
          onChange={(e) => handleChange("plz", e.target.value)}
          required
          pattern={/^\d+$/}
          errorMessage="Ungültige PLZ"
          forceErrorDisplay={forceErrors}
        />
        <Input
          id="city"
          label="Ort"
          placeholder="Musterstadt"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          required
          errorMessage="Ungültiger Ort"
          forceErrorDisplay={forceErrors}
        />
      </FieldGroup>

      <FieldGroup headline="Versichertendaten">
        <div className={css.fullWidth}>
          <Input
            id="costBearer"
            label="Kostenträger"
            placeholder="Kennung bzw. Kostenträger suchen"
            value={form.costBearer}
            onChange={(e) => handleChange("costBearer", e.target.value)}
            required
            errorMessage="Ungültiger Kostenträger"
            forceErrorDisplay={forceErrors}
          />
        </div>
        <Input
          id="insuranceNumber"
          label="Versicherten-Nr."
          placeholder="10-stellig"
          value={form.insuranceNumber}
          onChange={(e) => handleChange("insuranceNumber", e.target.value)}
          required
          pattern={/^\d{10}$/}
          errorMessage="Ungültige Versicherten-Nr."
          forceErrorDisplay={forceErrors}
        />
        <Input
          id="insuranceStatus"
          label="Versicherten-Status"
          placeholder=""
          value={form.insuranceStatus}
          onChange={(e) => handleChange("insuranceStatus", e.target.value)}
          required
          errorMessage="Ungültiger Versicherten-Status"
          forceErrorDisplay={forceErrors}
        />
      </FieldGroup>

      <div className={css.buttons}>
        <BackButton />
        <SaveButton onClick={handleValidationAndSave} />
      </div>
    </div>
  );
}
