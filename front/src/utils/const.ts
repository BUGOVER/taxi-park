import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import HailIcon from '@mui/icons-material/Hail';
import GroupIcon from '@mui/icons-material/Group';
import NoCrashIcon from '@mui/icons-material/NoCrash';

export const SITE_URL = {
  HOME: '/',
  CARS: '/cars',
  CREATE_CAR: '/create-car',
  CHANGE_CAR: '/change-car',
  DRIVERS: '/drivers',
  CREATE_DRIVER: '/create-driver',
  CHANGE_DRIVER: '/change-driver'
};

export const APP_URL = 'https://taxi_test.loc';

export const API_URLS = {
  CREATE_CAR: '/car/create',
  CREATE_DRIVER: '/driver/create',
  DRIVER: '/drivers/?page=1',
  EDIT_CAR: (id: number) => `/car/edit/${id}`,
  EDIT_DRIVER: (id: number) => `/driver/edit/${id}`,
  CARS: '/cars'
};

export const menuSite = [
  {
    section: 1,
    name: 'Водители',
    url: SITE_URL.DRIVERS,
    icon: GroupIcon
  },
  {
    section: 1,
    name: 'Автомобили',
    url: SITE_URL.CARS,
    icon: NoCrashIcon
  },
  {
    section: 2,
    name: 'Водитель',
    url: SITE_URL.CREATE_DRIVER,
    icon: HailIcon
  },
  {
    section: 2,
    name: 'Машины',
    url: SITE_URL.CREATE_CAR,
    icon: LocalTaxiIcon
  }
];

export const LocalSTNames = {
  menuStatus: 'menuStatus'
};
