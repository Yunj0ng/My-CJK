import styles from "./WordInput.module.scss";

const WordInput = ({ label, value, placeholder, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.inputLabel}>{label}</label>
      <textarea
        className={styles.wordInput}
        type="text"
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        // onKeyDown={handleKeyDown}
        //讓高度依內容調整 無內容時維持1行高
        rows={Math.max(value.split("\n").length, 1)}
      />
    </div>
  );
};

export default WordInput;
