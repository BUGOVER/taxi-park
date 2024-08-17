import React, { useEffect, useState } from 'react';
import MainTemplate from '../../features/main-template/main-template';
import carsData from '../../utils/getallmakes.json';
import { Autocomplete, Backdrop, Button, CircularProgress, TextField } from '@mui/material';

import { GetModelYear, UpdateAllData, years } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CarEdit } from '../../utils/api';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';

function ChangeCar() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allCars = useSelector((state: IStoreSite) => state.StoreSite).cars;
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);

  const [cars, setCars] = useState<{ label: string }[]>([]);
  const [carsMarkers, setCarsMarkers] = useState<{ label: string }[]>([]);
  const [carsYears, setCarsYears] = useState<{ label: string }[]>([]);

  useEffect(() => {
    const data = carsData.map((car) => {
      return {
        label: car.brand
      };
    });

    setCars(data);
    setCarsYears(years(30));
  }, []);

  useEffect(() => {
    const findCat = allCars.find((car: ICar) => car.carId === Number(id));
    if (findCat) {
      setSelectedCar(findCat);
      const data = carsData
        .find((car) => car.brand === findCat.carMark)
        ?.models.map((model) => {
          return {
            label: model
          };
        });
      setCarsMarkers(data || []);
    }
  }, [allCars]);

  function HandleChangeMark(value: { label: string } | null) {
    if (value) {
      const oldData: any = { ...selectedCar };
      oldData.carMark = value.label;
      setSelectedCar(oldData);

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

  function SaveChanges(e: any) {
    e.preventDefault();
    const carMark = e.target.carMark.value;
    const carModel = e.target.carModel.value;
    const carOldYear = e.target.carOldYear.value;
    const carNumber = e.target.carNumber.value;

    if (carMark && carModel && carOldYear && carNumber && id) {
      CarEdit(+id, {
        carMark,
        carModel: `${carModel}--${carOldYear}`,
        carNumber
      }).then(({ data }) => {
        dispatch(
          openAlert({
            status: AlertSiteTypes.success,
            go: true
          })
        );
        dispatch(setMessageAlert(`Машина с ${carNumber} номером успешно сохранено`));
        dispatch(UpdateAllData());
      });
    }
  }

  function changeModelAuto(value: { label: string } | null) {
    if (value) {
      const oldData: any = { ...selectedCar };
      oldData.carModel = `${value.label}--${GetModelYear(oldData.carModel, 'year')}`;
      setSelectedCar(oldData);
    }
  }

  function changeYearAuto(value: { label: string } | null) {
    if (value) {
      const oldData: any = { ...selectedCar };
      oldData.carModel = `${GetModelYear(oldData.carModel, 'model')}--${value.label}`;
      setSelectedCar(oldData);
    }
  }

  return (
    <MainTemplate
      pageTitle={
        <span>
          Изменить машину <mark>{selectedCar?.carNumber}</mark>
        </span>
      }>
      <form action="#" onSubmit={SaveChanges}>
        <div className="row mt-4">
          <div className="col-3">
            <div className="row">
              <div className="col-12 mb-4">
                {selectedCar ? (
                  <Autocomplete
                    disablePortal
                    options={cars}
                    value={{ label: selectedCar.carMark }}
                    renderInput={(params) => (
                      <TextField {...params} name="carMark" label="Выбрать марка машины" />
                    )}
                    onChange={(e, value) => HandleChangeMark(value)}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="col-12 mb-4">
                {selectedCar ? (
                  <Autocomplete
                    disablePortal
                    options={carsMarkers}
                    value={{ label: GetModelYear(selectedCar.carModel, 'model') }}
                    renderInput={(params) => (
                      <TextField {...params} name="carModel" label="Выбрать модел машины" />
                    )}
                    onChange={(e, value) => changeModelAuto(value)}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="col-12 mb-4">
                {selectedCar ? (
                  <Autocomplete
                    disablePortal
                    options={carsYears}
                    value={{ label: GetModelYear(selectedCar.carModel, 'year') }}
                    renderInput={(params) => (
                      <TextField {...params} name="carOldYear" label="Укажите возраст автомобиля" />
                    )}
                    onChange={(e, value) => changeYearAuto(value)}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className="col-12 mb-4">
                {selectedCar ? (
                  <TextField
                    label="Номер автомобиля"
                    fullWidth
                    name="carNumber"
                    defaultValue={selectedCar.carNumber}
                    variant="outlined"
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center mt-2">
          <Button variant="contained" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!selectedCar}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainTemplate>
  );
}

export default ChangeCar;
