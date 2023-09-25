import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import styles from "@styles/main.module.scss";
import AuthInput from "@authInput/AuthInput";
import MainBtn from "@mainBtn/MainBtn";
import { useAuth } from "@context/AuthContext";
import Swal from "sweetalert2";


const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  


  const handleLoginClick = async() => {
    if(account === 0 || password === 0){
      return
    }

    // 登入中提示
    const loadingAlert = Swal.fire({
      title: "正在登入...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const res = await login({
      account, password
    })

    loadingAlert.close();

    if(res.success){
      Swal.fire({
        position: "top",
        title: "登入成功",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      return
    }
    if(!res.success){
      Swal.fire({
        position: "top",
        title: "帳號或密碼錯誤",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }

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
