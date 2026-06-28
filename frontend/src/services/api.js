import axios from "axios";
const api = axios.create({ baseURL: "/api" });

export const getAndares    = ()              => api.get("/andares");
export const buscarVaga    = (id)            => api.get(`/andares/${id}/buscar`);
export const ocuparVaga    = (id, row, col)  => api.post(`/andares/${id}/ocupar`,  { row, col });
export const liberarVaga   = (id, row, col)  => api.post(`/andares/${id}/liberar`, { row, col });
