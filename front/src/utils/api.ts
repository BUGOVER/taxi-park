import axios from 'axios';
import { API_URLS, APP_URL } from './const';

export const CreateCarApi = (data: { carMark: string; carModel: string; carNumber: string }) =>
  axios.post(`${APP_URL}${API_URLS.CREATE_CAR}`, data);

export const GetAllCars = () => axios.get(`${APP_URL}${API_URLS.CARS}`);

export const CarEdit = (
  id: number,
  data: {
    carMark: string;
    carModel: string;
    carNumber: string;
  }
) => axios.put(`${APP_URL}${API_URLS.EDIT_CAR(id)}`, data);

export const EditDriverApi = (
  id: number | string,
  data: {
    fullName: string;
    dateBirth: string;
    currentCarId: number;
  }
) => axios.put(`${APP_URL}${API_URLS.EDIT_DRIVER(+id)}`, data);

export const CreateDriverApi = (data: {
  fullName: string;
  dateBirth: string;
  currentCarId: number | '';
}) => axios.post(`${APP_URL}${API_URLS.CREATE_DRIVER}`, data);

export const GetDriversApi = () => axios.get(`${APP_URL}${API_URLS.DRIVER}`);
