import { API } from "../_api";

export const getGenres = async () => {
  try {
    const response = await API.get("/genres");
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createGenre = async (data) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await API.post("/genres", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateGenre = async (id, data) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await API.put(`/genres/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  const token = localStorage.getItem("accessToken");

  try {
    await API.delete(`/genres/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
