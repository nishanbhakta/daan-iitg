import axios from "axios";

const API = axios.create({
  baseURL: "https://daan-iitg.onrender.com/api",
});
export const createCabShare = async (data) => {
  const response = await API.post("/cabshares", data);

  return response.data;
};

export const getCabShares = async () => {
  const response = await API.get("/cabshares");
  return response.data;
};

export const deleteCabShare = async (id) => {
  const response = await API.delete(`/cabshares/${id}`);
  return response.data;
};
