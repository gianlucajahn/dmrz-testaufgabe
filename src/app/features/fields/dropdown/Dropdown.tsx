import React from "react";
import css from "./../Fields.module.scss";

interface DropdownProps {
  id: string;
  label: string;
  placeholder?: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  errorMessage?: string;
  forceErrorDisplay?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  placeholder,
  options,
  value = "",
  onChange,
  required = false,
  errorMessage = "Bitte Auswahl treffen",
  forceErrorDisplay = false,
}) => {
  const isInvalid = required && forceErrorDisplay && value.trim() === "";

  return (
    <div className={`${css.inputGroup} ${css.dropdownMenu}`}>
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <select
        id={id}
        className={`${css.dropdownSelect} ${isInvalid ? css.invalid : ""}`}
        value={value}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {isInvalid && <div className={css.errorText}>{errorMessage}</div>}
    </div>
  );
};

export default Dropdown;
