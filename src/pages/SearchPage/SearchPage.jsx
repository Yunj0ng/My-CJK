import { useState } from "react";
import styles from "./SearchPage.module.scss";
import Layout from "@layout/Layout";
import WordInput from "@wordInput/WordInput";
import PageBtn from "@pageBtn/PageBtn";
import Noti from '@noti/Noti';

const SearchPage = () => {
  const [korean, setKorean] = useState("");
  const [chinese, setChinese] = useState("");
  const [japanese, setJapanese] = useState("");

  const handleSearchBtnClick = () => {};

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
        <Noti text="可以按 shif + enter 換行" />
        <PageBtn text="查詢" onClick={handleSearchBtnClick} />
      </div>
    </Layout>
  );
};

export default SearchPage;
