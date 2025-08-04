"use client";

import * as React from "react";
import css from "./Mask.module.scss";
import Headline from "../headline/Headline";
import FieldGroup from "../fieldgroup/FieldGroup";
import { TherapyFrequency, useFormData, YesNo } from "@/app/context/FormDataContext";
import BackButton from "../buttons/back/BackButton";
import SaveButton from "../buttons/save/SaveButton";
import Checkbox from "../fields/checkbox/Checkbox";
import Dropdown from "../fields/dropdown/Dropdown";
import Radio from "../fields/radio/Radio";

export default function TherapyMask() {
  const { data, updateSection, setCurrentMask } = useFormData();

  const [form, setForm] = React.useState({
    therapyReport: data.therapy.therapyReport,
    urgent: data.therapy.urgent,
    therapyFrequency: data.therapy.therapyFrequency,
    homeVisit: data.therapy.homeVisit,
  });

  const [forceErrors, setForceErrors] = React.useState(false);

  React.useEffect(() => {
    setCurrentMask("Therapiedaten");
  }, [setCurrentMask]);

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidationAndSave = () => {
    const requiredFields = [];
    const select = document.getElementById(
      "therapyFrequency"
    ) as HTMLSelectElement;

    let allValid = true;

    if (!select?.value) {
      allValid = false;
    }

    if (!form.homeVisit) {
      allValid = false;
    }

    if (!allValid) {
      setForceErrors(true);
      return;
    }

    updateSection("therapy", form);
    setCurrentMask("Datenüberprüfung");
  };

  return (
    <div className={css.maskWrapper}>
      <Headline
        headline="Therapiedaten"
        subline="Bitte geben Sie die Therapiedaten an"
      />
      <br />
      <br />

      <div className={css.checkboxGroup}>
        <Checkbox
          id="therapyReport"
          label="Therapiebericht"
          checked={form.therapyReport === "yes"}
          onChange={(e) =>
            handleChange("therapyReport", e.target.checked ? "yes" : "no")
          }
        />
        <Checkbox
          id="urgent"
          label="Dringlicher Behandlungsbedarf innerhalb von 14 Tagen"
          checked={form.urgent === "yes"}
          onChange={(e) =>
            handleChange("urgent", e.target.checked ? "yes" : "no")
          }
        />
      </div>

      <FieldGroup headline="Therapieangaben">
        <Dropdown
          id="therapyFrequency"
          label="Therapiefrequenz"
          value={form.therapyFrequency}
          onChange={(e) => handleChange("therapyFrequency", e.target.value as TherapyFrequency)}
          options={["1-3x wöchentlich", "alle 4-6 Wochen"]}
          placeholder="Therapiefrequenz festlegen"
          required
          errorMessage="Bitte eine Therapiefrequenz auswählen"
          forceErrorDisplay={forceErrors}
        />

        <Radio
          name="homeVisit"
          label="Hausbesuch"
          value={form.homeVisit}
          onChange={(value) => handleChange("homeVisit", value as YesNo)}
          options={[
            { value: "no", label: "Nein" },
            { value: "yes", label: "Ja" },
          ]}
          required
          errorMessage="Bitte Ja oder Nein wählen"
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
