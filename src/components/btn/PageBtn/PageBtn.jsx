import styles from "./PageBtn.module.scss";

const PageBtn = ({ text, onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default PageBtn;
