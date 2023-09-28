import styles from "./WordInput.module.scss";

const WordInput = ({ label, value, placeholder, onChange}) => {
  // const handleKeyDown = (e) => {
  //   // 按shift和enter換行
  //   if (e.shiftKey && e.key === "Enter") {
  //     e.preventDefault();
  //     const cursorPosition = e.target.selectionStart; //游標位置
  //     const inputValue = e.target.value;
  //     const newValue =
  //       inputValue.substring(0, cursorPosition) +
  //       "\n" +
  //       inputValue.substring(cursorPosition); //substring(startIndex, endIndex)取字串(不包括最後一個字) 省略endIndex則取到最後一個字
  //     onChange?.(newValue);
  //   }
  // };
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
