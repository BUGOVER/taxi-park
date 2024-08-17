import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './App.scss';
import PageNotFound from './pages/404/404';
import AlertSite from './features/alert/alert';
import Admin from './pages/admin/admin';
import { SITE_URL } from './utils/const';
import Cars from './pages/cars/cars';
import CreateCar from './pages/create-car/create-car';
import ChangeCar from './pages/change-car/change-car';
import CreateDriver from './pages/create-driver/create-driver';
import ChangeDriver from './pages/change-driver/change-driver';
import { useDispatch } from 'react-redux';
import { UpdateAllData } from './utils/helpers';
import Drivers from './pages/drivers/drivers';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UpdateAllData());
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/">
          <Route index element={<Admin />} />
          <Route path={SITE_URL.CARS} element={<Cars />} />
          <Route path={SITE_URL.CREATE_CAR} element={<CreateCar />} />
          <Route path={`${SITE_URL.CHANGE_CAR}/:id`} element={<ChangeCar />} />
          <Route path={SITE_URL.DRIVERS} element={<Drivers />} />
          <Route path={SITE_URL.CREATE_DRIVER} element={<CreateDriver />} />
          <Route path={`${SITE_URL.CHANGE_DRIVER}/:id`} element={<ChangeDriver />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <AlertSite />
    </>
  );
};

export default App;
