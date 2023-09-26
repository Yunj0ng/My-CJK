import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ShowPage.module.scss";
import Layout from "@layout/Layout";
import Noti from "@noti/Noti";
import ShowWordWrapper from "@showWordWrapper/ShowWordWrapper";
import { useAuth } from "@context/AuthContext";
import { getVocabulary } from "@api/vocabulary";;

// const dummyData = [
//   {
//     VocabularyID: 1,
//     OriginalText: {
//       Korean: "안녕",
//       Japanese: "こんにちは",
//       Chinese: "你好",
//     },
//     TranslatedText: {
//       Korean: "안녕",
//       Japanese: "こんにちは",
//       Chinese: "你好",
//     },
//     UserID: 101,
//     CreatedAt: "2023-09-13T10:00:00",
//   },
// ];

const ShowPage = () => {
  const [data, setData] = useState("");
  const [editingLanguage, setEditingLanguage] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // const { id } = useParams();
  const id = localStorage.getItem('vocabularyId')
  console.log("wordid:", id);

  useEffect(() => {
    console.log("ShowPage component is mounted.");
    const getVocabularyAsync = async () => {
      if(id){
        try {
          const vocabulary = await getVocabulary(id);
          console.log("vocabulary:", vocabulary);
          setData(vocabulary);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getVocabularyAsync();
  }, [id]);

  const handleChangeMode = ({ language, isEdit }) => {
    setEditingLanguage(isEdit ? language : null);
  };

  const handleSave = (language, newText) => {
    const formattedText = newText.replace(/<br>/g, "\n"); //將<br>轉換成'\n'
    setData((prevData) => ({
      ...prevData,
      TranslatedText: {
        ...prevData.TranslatedText,
        [language]: formattedText,
      },
    }));
    setEditingLanguage(null);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Layout>
      <div className={styles.container}>
        <ShowWordWrapper
          title="韓文"
          language="Korean"
          editingLanguage="Korean"
          text={data.TranslatedText_Korean}
          isEdit={editingLanguage === "Korean"}
          onChangeMode={handleChangeMode}
          onSave={handleSave}
        />
        <ShowWordWrapper
          title="中文"
          language="Chinese"
          editingLanguage="Chinese"
          text={data.TranslatedText_Chinese}
          isEdit={editingLanguage === "Chinese"}
          onChangeMode={handleChangeMode}
          onSave={handleSave}
        />
        <ShowWordWrapper
          title="日文"
          language="Japanese"
          editingLanguage="Japanese"
          text={data.TranslatedText_Japanese}
          isEdit={editingLanguage === "Japanese"}
          onChangeMode={handleChangeMode}
          onSave={handleSave}
        />
        <Noti text="在文字框(白底)點擊滑鼠兩下可編輯內容，編輯後按 enter 儲存 或按 esc 取消" />
      </div>
    </Layout>
  );
};

export default ShowPage;
