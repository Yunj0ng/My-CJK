import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ShowPage.module.scss";
import Layout from "@layout/Layout";
import Noti from "@noti/Noti";
import ShowWordWrapper from "@showWordWrapper/ShowWordWrapper";
import { useAuth } from "@context/AuthContext";
import { getVocabulary, putVocabulary } from "@api/vocabulary";
import Swal from "sweetalert2";
import Loading from "@loading/Loading";

const ShowPage = () => {
  const [data, setData] = useState("");
  const [editingLanguage, setEditingLanguage] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVocabularyAsync = async () => {
      if (id) {
        try {
          const vocabulary = await getVocabulary(id);
          setData(vocabulary);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      }
    };
    getVocabularyAsync();
  }, [id, rerender]);

  const handleChangeMode = ({ language, isEdit }) => {
    setEditingLanguage(isEdit ? language : null);
  };

  const handleSave = async (language, newText) => {
    const formattedText = newText.replace(/<br>/g, "\n"); //將<br>轉換成'\n'
    try {
      const res = await putVocabulary({
        id: data.id,
        UserId: data.UserId,
        TranslatedText_Korean:
          language === "Korean" ? formattedText : data.TranslatedText_Korean,
        TranslatedText_Chinese:
          language === "Chinese" ? formattedText : data.TranslatedText_Chinese,
        TranslatedText_Japanese:
          language === "Japanese"
            ? formattedText
            : data.TranslatedText_Japanese,
      });
      if (res && res.success === true) {
        setData((prevData) => ({
          ...prevData,
          TranslatedText: {
            ...prevData.TranslatedText,
            [language]: formattedText,
          },
        }));

        // 強制觸發重新渲染
        setRerender((prevRerender) => !prevRerender);
        setEditingLanguage(null);
        Swal.fire({
          position: "top",
          title: "變更已儲存",
          color: "#868faf",
          background: "#faf9f5",
          width: 394,
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "top",
          title: "變更失敗",
          color: "#868faf",
          background: "#faf9f5",
          width: 394,
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); //當取得資料後變回false
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </Layout>
  );
};

export default ShowPage;
