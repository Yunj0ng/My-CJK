import { useEffect, useState } from "react";
import styles from "./Alert.module.scss";

const Alert = ({ msg }) => {
  const [visable, setVisible] = useState(true);

  // // 1.5秒後消失
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    // alert消失後 取消timer 確保不再執行計時
    return () => {
      clearTimeout(timer);
    };
  }, [visable]);

  // 一般情況下隱藏alert
  if (!visable) {
    return null;
  }
  return (
    <div className={styles.alert}>
      <div className={styles.errIcon}></div>
      <p className={styles.errMsg}>{msg}</p>
    </div>
  );
};

export default Alert;
