import { API } from "../_api";

export const getAuthors = async () => {
  try {
    const response = await API.get("/authors");
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createAuthor = async (data) => {
  try {
    const response = await API.post("/authors", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAuthor = async (id, data) => {
  try {
    const response = await API.put(`/authors/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    await API.delete(`/authors/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
