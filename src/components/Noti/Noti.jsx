import { useState } from "react";
import styles from "./Noti.module.scss";
import notiIcon from "../../assets/icons/noti.svg";

const Noti = ({ text }) => {
  const [showNoti, setShowNoti] = useState(false);
  const [light, setLight] = useState(false);

  const handleNotiClick = () => {
    setShowNoti(!showNoti);
    setLight(!light);
  };

  return (
    <div className={styles.noti}>
      <img
        className={styles.notiIcon}
        src={notiIcon}
        alt="noti"
        onClick={handleNotiClick}
      />
      {light ? <div className={styles.lightIcon}></div> : ""}
      {showNoti ? <span className={styles.notiText}>{text}</span> : ""}
    </div>
  );
};

export default Noti;
