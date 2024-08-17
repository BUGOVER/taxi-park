import React, { useEffect, useState } from 'react';
import MainTemplate from '../../features/main-template/main-template';
import { Autocomplete, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { CreateDriverApi } from '../../utils/api';
import { UpdateAllData } from '../../utils/helpers';

function CreateDriver() {
  const dispatch = useDispatch();
  const AllData = useSelector((state: IStoreSite) => state.StoreSite);
  const [cars, setCars] = useState<{ label: string; id: number }[]>([]);
  const [selectedCar, setSelectedCar] = useState<{ label: string; id: number } | null>(null);

  useEffect(() => {
    if (AllData.cars.length) {
      const data = AllData.cars.map((car: ICar) => {
        return { label: car.carMark, id: car.carId };
      });
      setCars(data);
    }
  }, [AllData]);

  function saveNewDriver(e: any) {
    e.preventDefault();
    const nameDrive = e.target.nameDrive.value;
    const birthdayDrive = e.target.birthdayDrive.value;

    if (nameDrive && birthdayDrive && selectedCar) {
      CreateDriverApi({
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
        dispatch(setMessageAlert('Водитель успешно добавлен'));
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
      <MainTemplate pageTitle="Создать водитель ">
        <form action="" className="row mt-4" onSubmit={saveNewDriver}>
          <div className="col-3">
            <div className="row">
              <div className="col-12 mb-4">
                <TextField
                  sx={{ width: 350 }}
                  name="nameDrive"
                  label="Имя водителя"
                  variant="outlined"
                  required
                />
              </div>
              <div className="col-12 mb-4">
                <DatePicker
                  sx={{ width: 350 }}
                  format="DD-MM-YYYY"
                  name="birthdayDrive"
                  label="Выбрать дата рождения"
                />
              </div>
              <div className="col-12 mb-4">
                <Autocomplete
                  disablePortal
                  sx={{ width: 350 }}
                  options={cars}
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

export default CreateDriver;
