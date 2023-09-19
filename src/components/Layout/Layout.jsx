import styles from "./Layout.module.scss";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate()

  const handleTabClick = (tab) => {
		if (tab === 'search'){
			navigate("/search");
		} else if (tab === 'logout'){
			navigate('/login')
		}else {
			navigate('/create')
		}
    
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>{children}</div>
      <div className={styles.right}>
        <button
          className={styles.searchBtn}
          onClick={() => handleTabClick("search")}
        >
          <span>查詢</span>
        </button>

        <button
          className={styles.createBtn}
          onClick={() => handleTabClick("create")}
        >
          <span>建立</span>
        </button>

        <button
          className={styles.logoutBtn}
          onClick={() => handleTabClick("logout")}
        >
          <span>登出</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
