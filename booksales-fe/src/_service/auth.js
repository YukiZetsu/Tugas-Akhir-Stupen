import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post("/logout", { token }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    localStorage.removeItem("accessToken");
    return data
  } catch (error) {
    console.log(error);
  }
}

export const register = async ({ name, email, username, password }) => {
  try {
    const { data } = await API.post("/register", {
      name,
      email,
      username,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export const userDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired){
      return {
        success: false,
        message: "Token Expired",
        data: null
      }
    }

    return {
      success: true,
      message: "Token Valid",
      data: decodedToken
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}