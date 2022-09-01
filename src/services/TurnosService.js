import axios from "axios"
/*
axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};
*/
export const getTurnos = (sucursal) => {
  return axios.get(`${process.env.REACT_APP_SUCURSALVIRTUAL_API}/turnos/sucursal/${sucursal}/tv`);
}