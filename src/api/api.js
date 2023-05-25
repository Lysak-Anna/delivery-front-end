import axios from "axios";

axios.defaults.baseURL = `https://delivery-5pcr.onrender.com/api`;

export const getMcDon = async () => {
  const response = await axios.get("/restaurants/mc-don");
  return response.data;
};

export const getKFC = async () => {
  const response = await axios.get("/restaurants/kfc");
  return response.data;
};

export const getSushi = async () => {
  const response = await axios.get("/restaurants/sushi");
  return response.data;
};

export const getUkCuisine = async () => {
  const response = await axios.get("/restaurants/uk-cuisine");
  return response.data;
};

export const getPizza = async () => {
  const response = await axios.get("/restaurants/pizza");
  return response.data;
};

export const createOrder = async (data) => {
  const response = await axios.post("/orders", data);
  return response.data;
};
