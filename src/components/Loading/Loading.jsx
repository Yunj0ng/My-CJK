import { useState, useEffect } from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
  const [currentImg, setCurrentImg] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prevImg) => {
        // 間隔1秒循環顯示img1到4
        if (prevImg === 4) {
          return 1;
        } else {
          return prevImg + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderImg = (imgNum) => {
    switch (imgNum) {
      case 1:
        return (
          <div className={styles.img1}>
            <div className={styles.img1eye}></div>
            <div className={styles.img1mouth}></div>
          </div>
        );
      case 2:
        return (
          <div className={styles.img2}>
            <div className={styles.img2eye}></div>
            <div className={styles.img2mouth}></div>
          </div>
        );
      case 3:
        return (
          <div className={styles.img3}>
            <div className={styles.img3eye}></div>
            <div className={styles.img3mouth}></div>
          </div>
        );
      case 4:
        return (
          <div className={styles.img4}>
            <div className={styles.img4eye}></div>
            <div className={styles.img4mouth}></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loadingImg}>{renderImg(currentImg)}</div>
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
};

export default Loading;
