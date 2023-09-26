import axios from "axios";

const baseURL = "http://localhost:3001/api";

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
    console.log('getsearch-api:',res.data)
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
export const getVocabulary = async (id) => {
  console.log("getvo-api-id:",id)
  try {
    const res = await axiosInstance.get(`${baseURL}/vocabulary/${id}`);
    console.log("getvo-api:", res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
