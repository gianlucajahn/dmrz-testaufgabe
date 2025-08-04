import React from "react";
import css from "./../Fields.module.scss";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
    <div className={styles.checkboxWrapper}>
  <div
    className={css.inputGroup}
    style={{ flexDirection: "row", alignItems: "center" }}
  >
    <input
      className={styles.checkbox}
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <label
      className={styles.checkboxLabel}
      htmlFor={id}
      style={{ marginLeft: "0.5rem" }}
    >
      {label}
    </label>
  </div>
  </div>
);

export default Checkbox;
