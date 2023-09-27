import {  useRef, Fragment } from "react";
import clsx from "clsx";
import styles from "./ShowWordWrapper.module.scss";

const ShowWordWrapper = ({
  title,
  language,
  text,
  isEdit,
  onChangeMode,
  onSave,
}) => {
  const inputRef = useRef(null);

  // 點擊兩下進入編輯模式
  const handleDoubleClick = (e) => {
    onChangeMode?.({
      language,
      isEdit: true,
    });
		// 確保onChangeMode執行後(即)執行focus textarea
		setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  // 監聽鍵盤事件 儲存,取消,換行
  const handleKeyDown = (e) => {
    // 按enter儲存
    if (inputRef.current.value.length > 0 && e.key === "Enter" && !e.shiftKey) {
      onSave?.(language, inputRef.current.value);
    }
    // 按esc取消
    if (e.key === "Escape") {
			inputRef.current.value = text;
      onChangeMode?.({ language, isEdit: false });
    }
    // 按shift和enter換行
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart; //游標位置
      const inputValue = inputRef.current.value;
      const newValue =
        inputValue.substring(0, cursorPosition) +
        "\n" +
        inputValue.substring(cursorPosition); //substring(startIndex, endIndex)取字串(不包括最後一個字) 省略endIndex則取到最後一個字
      inputRef.current.value = newValue;
    }
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <div
        className={`${styles.showArea} ${clsx("", { [styles.edit]: isEdit })}`}
        onDoubleClick={handleDoubleClick}
      >
        <span
          className={styles.text}
          // dangerouslySetInnerHTML={{ __html: text }}
        >
          {text?.split("\n").map((line, index) => (
            <Fragment key={index}>
              {line}
              {index < text?.split("\n").length - 1 && <br />}
            </Fragment>
          ))}
        </span>
        <textarea
          ref={inputRef}
          className={styles.input}
          defaultValue={text}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </div>
  );
};

export default ShowWordWrapper;
