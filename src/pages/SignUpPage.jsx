import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "@styles/main.module.scss";
import AuthInput from "@authInput/AuthInput";
import MainBtn from "@mainBtn/MainBtn";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleShowPwClick = () => {
    setShowPw(!showPw);
  };

  const handleSignUpClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <span>my CJK</span>
      </div>
      <div className={styles.inputWrapper}>
        <AuthInput
          label="名稱"
          value={name}
          placeholder="請輸入名稱"
          onChange={(nameInput) => setName(nameInput)}
        />
        <AuthInput
          type="email"
          label="Email"
          value={email}
          placeholder="請輸入Email"
          onChange={(emailInput) => setEmail(emailInput)}
        />
        <AuthInput
          label="帳號"
          value={account}
          placeholder="請輸入帳號"
          onChange={(accInput) => setAccount(accInput)}
        />
        <AuthInput
          type={showPw ? "text" : "password"}
          showPw={showPw}
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(pwInput) => setPassword(pwInput)}
          onClick={handleShowPwClick}
        />

        <MainBtn text="註冊" onClick={handleSignUpClick} />
        <Link to="/login">
          <div className={styles.linkto}>取消</div>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
