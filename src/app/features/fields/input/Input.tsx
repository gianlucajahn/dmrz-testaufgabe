import React from "react";
import css from "./../Fields.module.scss";
import { AlertCircle } from "lucide-react";

interface InputProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: RegExp;
  errorMessage?: string;
  forceErrorDisplay?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required,
  forceErrorDisplay,
  pattern,
  errorMessage = "Ungültiger Wert",
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [touched, setTouched] = React.useState(false);

  const isInvalid =
    (touched || forceErrorDisplay) &&
    inputRef.current &&
    !inputRef.current.checkValidity();

  return (
    <div className={css.inputGroup}>
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <div className={`${css.inputWrapper} ${isInvalid ? css.invalid : ""}`}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          required={required}
          pattern={pattern?.source}
          onChange={(e) => {
            onChange?.(e);
          }}
          onBlur={() => setTouched(true)}
        />
        {isInvalid && <AlertCircle className={css.warningIcon} size={16} />}
      </div>
      {isInvalid && <div className={css.errorText}>{errorMessage}</div>}
    </div>
  );
};

export default Input;
