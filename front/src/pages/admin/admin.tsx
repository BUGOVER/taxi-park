import React from 'react';
import MainTemplate from '../../features/main-template/main-template';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { GetModelYear, RandomKey } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import moment from 'moment';

function Admin() {
  const AllData = useSelector((state: IStoreSite) => state.StoreSite);
  return (
    <MainTemplate pageTitle="">
      <Typography variant="h5" gutterBottom className="mb-4">
        Водители
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="right">Дата рождения</TableCell>
              <TableCell align="right">Текущая машина закрепленная за водителем</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllData.drivers.slice(0, 5).map((driver) => (
              <TableRow
                key={RandomKey()}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {driver.fullName}
                </TableCell>
                <TableCell align="right">{moment(driver.dateBirth).format('DD-MM-YYYY')}</TableCell>
                <TableCell align="right">
                  {driver.car.carMark} {GetModelYear(driver.car.carModel, 'model')} /{' '}
                  {GetModelYear(driver.car.carModel, 'year')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <Link to={SITE_URL.DRIVERS}>
          <Typography variant="h6">
            Смотреть все <KeyboardArrowRightIcon />
          </Typography>
        </Link>
      </div>

      <Typography variant="h5" gutterBottom className="mb-4 mt-5">
        Автомобили
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Номер машины</TableCell>
              <TableCell align="right">Марка</TableCell>
              <TableCell align="right">Модель</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllData.cars.slice(0, 5).map((car: ICar) => (
              <TableRow
                hover
                key={RandomKey()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {car.carNumber}
                </TableCell>
                <TableCell align="right">{car.carMark}</TableCell>
                <TableCell align="right">
                  {GetModelYear(car.carModel, 'model')} / {GetModelYear(car.carModel, 'year')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <Link to={SITE_URL.CARS}>
          <Typography variant="h6">
            Смотреть все <KeyboardArrowRightIcon />
          </Typography>
        </Link>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!AllData.cars.length}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainTemplate>
  );
}

export default Admin;
