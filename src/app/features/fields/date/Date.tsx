import React from "react";
import css from "./../Fields.module.scss";
import { Calendar } from "lucide-react";

interface DateInputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
  forceErrorDisplay?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value = "",
  onChange,
  required = false,
  errorMessage = "Bitte Datum eingeben",
  forceErrorDisplay = false,
}) => {
  const isInvalid = required && forceErrorDisplay && value.trim() === "";

  return (
    <div className={css.inputGroup}>
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <div className={`${css.dateWrapper} ${isInvalid ? css.invalid : ""}`}>
        <input
          className={`${css.dateInputField}`}
          type="date"
          id={id}
          value={value}
          onChange={onChange}
          placeholder="Kein Datum gewählt"
        />
        <Calendar className={css.calendarIcon} strokeWidth={1.5} />
      </div>
      {isInvalid && <div className={css.errorText}>{errorMessage}</div>}
    </div>
  );
};

export default DateInput;
