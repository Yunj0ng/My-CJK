import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@styles/main.module.scss";
import AuthInput from "@authInput/AuthInput";
import MainBtn from "@mainBtn/MainBtn";
import { signup } from "@api/auth";
import Swal from "sweetalert2";
import Alert from "@alert/Alert";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const [showErrAlert, setShowErrAlert] = useState(false);

  const handleShowPwClick = () => {
    setShowPw(!showPw);
  };

  const handleSignUpClick = async () => {
    if (username === 0 || email === 0 || account === 0 || password === 0) {
      return;
    }

    // 重置狀態
    setShowErrAlert(false);

    // 註冊中提示
    const loadingAlert = Swal.fire({
      title: "正在註冊...",
      color: "#868faf",
      background: "#faf9f5",
      width: 394,
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const res = await signup({
      username,
      email,
      account,
      password,
    });

    loadingAlert.close();

    const { success } = res;

    if (success) {
      Swal.fire({
        position: "top",
        title: "註冊成功",
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/login");
      return;
    } else {
      setShowErrAlert(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <span>my CJK</span>
      </div>
      <div className={styles.inputWrapper}>
        <AuthInput
          label="名稱"
          value={username}
          placeholder="請輸入名稱"
          onChange={(nameInput) => setUsername(nameInput)}
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
        {showErrAlert ? <Alert msg={showErrAlert} /> : ""}
      </div>
    </div>
  );
};

export default SignUpPage;
