import React, { useEffect, useState } from 'react';
import MainTemplate from '../../features/main-template/main-template';
import { Autocomplete, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { EditDriverApi } from '../../utils/api';
import { UpdateAllData } from '../../utils/helpers';

function ChangeDriver() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const AllData = useSelector((state: IStoreSite) => state.StoreSite);
  const [selectedDriver, setSelectedDriver] = useState<IDriver | null>(null);

  const [cars, setCars] = useState<{ label: string; id: number }[]>([]);
  const [selectedCar, setSelectedCar] = useState<{
    label: string | undefined;
    id: number | undefined;
  } | null>(null);

  useEffect(() => {
    if (id) {
      const driver = AllData.drivers.find((driver: IDriver) => driver.driverId === +id);
      if (driver) {
        setSelectedDriver(driver);
      }
      if (AllData.cars.length) {
        const data = AllData.cars.map((car: ICar) => {
          return { label: car.carMark, id: car.carId };
        });
        setCars(data);

        const car = AllData.cars.find((car: ICar) => car.carId === driver?.car.carId);
        if (car) {
          setSelectedCar({ label: car.carMark, id: car.carId });
        }
      }
    }
  }, [AllData]);

  function saveChanges(e: any) {
    e.preventDefault();
    const nameDrive = e.target.nameDrive.value;
    const birthdayDrive = e.target.birthdayDrive.value;

    if (nameDrive && birthdayDrive && selectedCar?.id && id) {
      EditDriverApi(id, {
        fullName: nameDrive,
        dateBirth: birthdayDrive,
        currentCarId: selectedCar.id
      }).then(({ data }) => {
        dispatch(
          openAlert({
            status: AlertSiteTypes.success,
            go: true
          })
        );
        dispatch(setMessageAlert('Информация водителя успешно сохранено '));
        dispatch(UpdateAllData());
      });
    } else {
      dispatch(
        openAlert({
          status: AlertSiteTypes.error,
          go: true
        })
      );
      dispatch(setMessageAlert('Необходимо заполнить все поля'));
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainTemplate
        pageTitle={
          <p>
            <span>Изменить водитель </span> <mark>{selectedDriver?.fullName}</mark>
          </p>
        }>
        <form action="#" className="row mt-4" onSubmit={saveChanges}>
          <div className="col-3">
            <div className="row">
              <div className="col-12 mb-4">
                {selectedDriver ? (
                  <TextField
                    sx={{ width: 350 }}
                    defaultValue={selectedDriver.fullName}
                    label="Ваше имя"
                    name="nameDrive"
                    variant="outlined"
                    required
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="col-12 mb-4">
                {selectedDriver ? (
                  <DatePicker
                    sx={{ width: 350 }}
                    format="DD-MM-YYYY"
                    name="birthdayDrive"
                    defaultValue={dayjs(selectedDriver.dateBirth)}
                    label="Выбрать дата рождения"
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="col-12 mb-4">
                <Autocomplete
                  disablePortal
                  sx={{ width: 350 }}
                  options={cars}
                  value={selectedCar}
                  renderInput={(params) => <TextField {...params} label="Выбрать машину" />}
                  onChange={(e, value) => setSelectedCar(value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center mt-2">
              <Button variant="contained" type="submit">
                Создать
              </Button>
            </div>
          </div>
        </form>
      </MainTemplate>
    </LocalizationProvider>
  );
}

export default ChangeDriver;
