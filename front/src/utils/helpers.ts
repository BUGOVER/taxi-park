import { useDispatch } from 'react-redux';
import { GetAllCars, GetDriversApi } from './api';
import { serDrivers, setCars } from '../redux/store-site';

export const RandomKey = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const years = (back: number) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => {
    return {
      label: `${year - back + i + 1}`
    };
  }).reverse();
};

export const GetModelYear = (model: string, type: 'model' | 'year') => {
  switch (type) {
    case 'model':
      return model.split('--')[0];
    case 'year':
      return model.split('--')[1];
  }
};

export const UpdateAllData: any = () => (dispatch: any) => {
  GetAllCars().then(({ data }) => {
    dispatch(setCars(data.result));
  });

  GetDriversApi().then(({ data }) => {
    dispatch(serDrivers(data.result));
  });
};
