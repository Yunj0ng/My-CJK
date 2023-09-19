import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "@styles/main.module.scss";
import AuthInput from "@authInput/AuthInput";
import MainBtn from "@mainBtn/MainBtn";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <span>my CJK</span>
      </div>
      <div className={styles.inputWrapper}>
        <AuthInput
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          onChange={(accInput) => setAccount(accInput)}
        />
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(pwInput) => setPassword(pwInput)}
        />
        <MainBtn text="登入" onClick={handleLoginClick} />
        <Link to="/signup">
          <div className={styles.linkto}>註冊</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
