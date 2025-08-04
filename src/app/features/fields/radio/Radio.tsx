import React from "react";
import styles from "./Radio.module.scss";

interface Option {
  value: string;
  label: string;
}

interface RadioProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  errorMessage?: string;
  forceErrorDisplay?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  required,
  errorMessage,
  forceErrorDisplay,
}) => {
  const showError = required && forceErrorDisplay && !value;

  return (
    <div className={`${styles.container} ${showError ? styles.error : ""}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.options}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.option} ${value === opt.value ? styles.active : ""}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
            aria-label={opt.label}
            name={name}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {showError && <div className={styles.errorText}>{errorMessage}</div>}
    </div>
  );
};

export default Radio;
