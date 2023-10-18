import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@styles/main.module.scss";
import AuthInput from "@authInput/AuthInput";
import MainBtn from "@mainBtn/MainBtn";
import { useAuth } from "@context/AuthContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleShowPwClick = () => {
    setShowPw(!showPw);
  };

  const handleLoginClick = async () => {
    if (!account || !password) {
      Swal.fire({
        position: "top",
        title: "請填寫所有欄位",
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

    // 登入中提示
    const loadingAlert = Swal.fire({
      title: "正在登入...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const success = await login({
      account,
      password,
    });

    loadingAlert.close();

    if (success) {
      Swal.fire({
        position: "top",
        title: "登入成功",
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: "top",
      title: "帳號或密碼錯誤",
      color: "#868faf",
      background: "#faf9f5",
      width: 394,
      timer: 1000,
      icon: "error",
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/search");
    }
  }, [navigate, isAuthenticated]);

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
          type={showPw ? "text" : "password"}
          showPw={showPw}
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(pwInput) => setPassword(pwInput)}
          onClick={handleShowPwClick}
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
