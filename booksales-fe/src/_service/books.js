import { API } from "../_api";

export const getBooks = async () => {
  try {
    const response = await API.get("/books");
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createBook = async (data) => {
  try {
    const response = await API.post("/books", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showBook = async (id) => {
  try {
    const response = await API.get(`/books/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await API.post(`/books/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
