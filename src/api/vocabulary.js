import axios from "axios";

const baseURL = "https://my-cjk-b.onrender.com/api";

const axiosInstance = axios.create({
  baseURL:baseURL
})

axiosInstance.interceptors.request.use((config)=>{
  const token =localStorage.getItem('token')
  if(token){
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
},
(error)=>{
  console.error(error)
})

export const getSearchVocabulary = async ({ id, word }) => {
  try {
    const res = await axiosInstance.get(
      `${baseURL}/users/${id}/vocabularies`,
      // 將word作為查詢參數傳給後端
      {
        params: {
          word: word,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const getVocabulary = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/vocabulary/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const postVocabulary = async (payload) => {
  const {
  OriginalText_Korean,
  OriginalText_Chinese,
  OriginalText_Japanese,
  UserId,
} = payload
  try {
    const res = await axiosInstance.post(`${baseURL}/vocabulary`, {
      OriginalText_Korean,
      OriginalText_Chinese,
      OriginalText_Japanese,
      UserId,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const putVocabulary = async(payload)=>{
  const {
    id,
    TranslatedText_Korean,
    TranslatedText_Chinese,
    TranslatedText_Japanese,
    UserId
  } = payload;
  try{
    const res = await axiosInstance.put(`${baseURL}/vocabulary/${id}`, {
      TranslatedText_Korean,
      TranslatedText_Chinese,
      TranslatedText_Japanese,
      UserId,
    });
    return res.data
  }catch(err){
    console.error(err)
  }
}