import styles from "./MainBtn.module.scss";

const MainBtn = ({ text, onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default MainBtn;
