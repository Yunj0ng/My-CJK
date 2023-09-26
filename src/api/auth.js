import axios from "axios";

const baseURL = "http://localhost:3001/api";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/users/signin`, {
      account,
      password,
    });
    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
      console.error("[Login Failed]:", err);
  }
};

export const signup = async ({ username, email, account, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/users`, {
      username,
      email,
      account,
      password,
    });

    const { user } = data;

    if (user) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
		if(err.response?.data?.message){
			return 	err.response.data
		} else {
			console.error("[SignUp Failed]:", err);
		}
  }
};

// export const checkPermission = async (token) => {
//   try {
//     const res = await axios.get(`${baseURL}/auth/test-token`, {
//       heards: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     return res.data.success;
//   } catch (err) {
//     console.error(err);
//   }
// };
