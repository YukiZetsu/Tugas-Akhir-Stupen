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

export const createBook = async (formData) => {
  const token = localStorage.getItem("accessToken");

  const response = await API.post("/books", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
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
  const token = localStorage.getItem("accessToken");

  try {
    const response = await API.post(`/books/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  const token = localStorage.getItem("accessToken");

  try {
    await API.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
