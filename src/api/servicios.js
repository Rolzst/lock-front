import axios from "./axios.js";

export const verServicioRequest  = () => axios.get('/servicio');
export const createServicioRequest  = (servicio) => axios.post('/servicio', servicio);
export const deleteServicioRequest  = (id) => axios.delete('/servicio/' + id);
