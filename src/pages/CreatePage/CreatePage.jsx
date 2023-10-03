import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePage.module.scss";
import Layout from "@layout/Layout";
import WordInput from "@wordInput/WordInput";
import PageBtn from "@pageBtn/PageBtn";
import Noti from "@noti/Noti";
import { postVocabulary } from "@api/vocabulary";
import Swal from "sweetalert2";
import { useAuth } from "@context/AuthContext";

const CreatePage = () => {
  const [korean, setKorean] = useState("");
  const [chinese, setChinese] = useState("");
  const [japanese, setJapanese] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCreateBtnClick = async () => {
    const OriginalText_Korean = korean;
    const OriginalText_Chinese = chinese;
    const OriginalText_Japanese = japanese;
    const UserId = localStorage.getItem("userId");

    const res = await postVocabulary({
      OriginalText_Korean,
      OriginalText_Chinese,
      OriginalText_Japanese,
      UserId,
    });
    if (res) {
      Swal.fire({
        position: "top",
        title: "已新增單字",
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setKorean("");
      setChinese("");
      setJapanese("");
    } else {
      Swal.fire({
        position: "top",
        title: "新增失敗",
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.inputWapper}>
          <WordInput
            label="韓文"
            value={korean}
            placeholder="請輸入韓文單字"
            onChange={(koreanInput) => setKorean(koreanInput)}
          />
          <WordInput
            label="中文"
            value={chinese}
            placeholder="請輸入中文單字"
            onChange={(chineseInput) => setChinese(chineseInput)}
          />
          <WordInput
            label="日文"
            value={japanese}
            placeholder="請輸入日文單字"
            onChange={(japaneseInput) => setJapanese(japaneseInput)}
          />
        </div>
        <Noti text="可以按 shift + enter 換行" />
        <PageBtn text="建立" onClick={handleCreateBtnClick} />
      </div>
    </Layout>
  );
};

export default CreatePage;
