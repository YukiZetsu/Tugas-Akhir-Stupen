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
  try {
    const response = await API.post("/genres", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGenre = async (id, data) => {
  try {
    const response = await API.put(`/genres/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    await API.delete(`/genres/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
