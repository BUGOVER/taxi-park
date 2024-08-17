import React, { useEffect, useState } from 'react';
import MainTemplate from '../../features/main-template/main-template';
import carsData from '../../utils/getallmakes.json';
import { Autocomplete, Button, TextField } from '@mui/material';

import { UpdateAllData, years } from '../../utils/helpers';
import { CreateCarApi } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';

function CreateCar() {
  const dispatch = useDispatch();
  const [cars, setCars] = useState<{ label: string }[]>([]);
  const [carsMarkers, setCarsMarkers] = useState<{ label: string }[]>([]);
  const [carsYears, setCarsYears] = useState<{ label: string }[]>([]);
  const [statusNumberCar, setStatusNumberCar] = useState<boolean>(false);
  const [numberCar, setNumberCar] = useState<string>('');

  useEffect(() => {
    const data = carsData.map((car) => {
      return {
        label: car.brand
      };
    });

    setCars(data);
  }, []);

  function HandleChangeMark(value: { label: string } | null) {
    if (value) {
      const data = carsData
        .find((car) => car.brand === value?.label)
        ?.models.map((model) => {
          return {
            label: model
          };
        });
      setCarsMarkers(data || []);
    } else {
      setCarsMarkers([]);
    }
  }

  function HandleChangeModels(value: { label: string } | null) {
    if (value) {
      setCarsYears(years(30));
    } else {
      setCarsYears([]);
    }
  }
  function HandleChangeNumber(value: { label: string } | null) {
    if (value) {
      setStatusNumberCar(true);
    } else {
      setStatusNumberCar(false);
    }
  }

  function StartCreating(e: any) {
    e.preventDefault();
    const carMark = e.target.carMark.value;
    const carModel = e.target.carModel.value;
    const carOldYear = e.target.carOldYear.value;
    const carNumber = e.target.carNumber.value;

    CreateCarApi({
      carMark,
      carModel: `${carModel}--${carOldYear}`,
      carNumber
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(
          openAlert({
            status: AlertSiteTypes.success,
            go: true
          })
        );
        dispatch(setMessageAlert('Машина успешно добавлено '));
        dispatch(UpdateAllData());
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(carMark, carModel, carOldYear, carNumber);
  }

  return (
    <MainTemplate pageTitle="Создать машины">
      <form action="#" onSubmit={StartCreating}>
        <div className="row mt-4">
          <div className="col-12 col-sm-6 col-lg-3 mb-4">
            <Autocomplete
              disablePortal
              options={cars}
              renderInput={(params) => (
                <TextField {...params} name="carMark" label="Выбрать марка машины" />
              )}
              onChange={(e, value) => HandleChangeMark(value)}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mb-4">
            {carsMarkers.length ? (
              <Autocomplete
                disablePortal
                options={carsMarkers}
                renderInput={(params) => (
                  <TextField {...params} name="carModel" label="Выбрать модел машины" />
                )}
                onChange={(e, value) => HandleChangeModels(value)}
              />
            ) : (
              ''
            )}
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mb-4">
            {carsYears.length ? (
              <Autocomplete
                disablePortal
                options={carsYears}
                renderInput={(params) => (
                  <TextField {...params} name="carOldYear" label="Укажите возраст автомобиля" />
                )}
                onChange={(e, value) => HandleChangeNumber(value)}
              />
            ) : (
              ''
            )}
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mb-4">
            {statusNumberCar ? (
              <TextField
                label="Номер автомобиля"
                fullWidth
                name="carNumber"
                variant="outlined"
                onChange={(e) => setNumberCar(e.target.value)}
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-2">
          {numberCar ? (
            <Button variant="contained" type="submit">
              Создать{' '}
            </Button>
          ) : (
            ''
          )}
        </div>
      </form>
    </MainTemplate>
  );
}

export default CreateCar;
