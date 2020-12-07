import { Carga } from '../utils/interfaces';
import api from './api';

const getCargaRoute = '/carga/listagem';
const postCargaRoute = '/carga';

async function getCarga(id?: any, motorista?: any) {
  let url = getCargaRoute;

  if (id) {
    url = `${url}?id=${id}`;
  }

  if (motorista) {
    if (url.includes('?id=')) {
      url = `${url}&motorista=${motorista}`;
    } else {
      url = `${url}?motorista=${motorista}`;
    }
  }
  const response = await api.get(url);
  return response.data;
}

async function deleteCarga(id: any) {
  let url = postCargaRoute;
  url = `${url}/${id}`;

  const response = await api.delete(url);
  return response.data;
}

async function postCarga(carga: Carga) {
  const url = postCargaRoute;

  const response = await api.post(url, carga);
  return response.data;
}

export default {
  getCarga,
  deleteCarga,
  postCarga,
};
