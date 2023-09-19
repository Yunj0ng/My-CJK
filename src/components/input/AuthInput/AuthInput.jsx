import { useState } from "react";
import styles from "./AuthInput.module.scss";
import eye from "../../../assets/icons/eye.svg";
import eyeOff from "../../../assets/icons/eye-off.svg"

const AuthInput = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  showPw,
  onClick,
}) => {
  
  return (
    <div className={styles.container}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.authInput}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />

      {label === "密碼" && (
        <img
          className={styles.eye}
          src={showPw ? eyeOff : eye}
          alt="eye"
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default AuthInput;
