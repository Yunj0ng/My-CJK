import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchPage.module.scss";
import Layout from "@layout/Layout";
import WordInput from "@wordInput/WordInput";
import PageBtn from "@pageBtn/PageBtn";
import Noti from "@noti/Noti";
import { useAuth } from "@context/AuthContext";
import { getSearchVocabulary } from "@api/vocabulary";
import Swal from "sweetalert2";

const SearchPage = () => {
  const [korean, setKorean] = useState("");
  const [chinese, setChinese] = useState("");
  const [japanese, setJapanese] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();

  const handleSearchBtnClick = async () => {
    const id = currentUser.id;
    const searched = {};

    if (!korean && !chinese && !japanese) {
      Swal.fire({
        position: "top",
        title: "請輸入單字",
        timer: 1000,
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }

    if (korean.trim() !== "") {
      searched.word = korean;
    }
    if (chinese.trim() !== "") {
      searched.word = chinese;
    }
    if (japanese.trim() !== "") {
      searched.word = japanese;
    }
    const res = await getSearchVocabulary({ id: id, ...searched });
    if (res.length > 0) {
      const firstResult = res[0];
      navigate(`/${firstResult.id}`);
    } else {
      Swal.fire({
        position: "top",
        title: "查無單字",
        timer: 1000,
        color: "#868faf",
        background: "#faf9f5",
        width: 394,
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
        <Noti text="請擇一輸入要查找的單字" />
        <PageBtn text="查詢" onClick={handleSearchBtnClick} />
      </div>
    </Layout>
  );
};

export default SearchPage;
