import React, { useEffect, useState } from 'react';
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
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import { Backdrop, CircularProgress } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';

function Cars() {
  const cars = useSelector((state: IStoreSite) => state.StoreSite).cars;
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const [carsCrops, setCarsCrops] = useState<ICar[]>([]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    const data = cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setCarsCrops(data);
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (cars.length) {
      setPageLoading(false);
      const dataCars = cars.slice(0, rowsPerPage);
      setCarsCrops(dataCars);
    }
  }, [cars]);

  useEffect(() => {
    if (cars.length) {
      setPageLoading(false);
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MainTemplate pageTitle="Автомобили">
      <Box sx={{ width: '100%' }} className="mt-4">
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Номер машины</TableCell>
                  <TableCell align="right">Марка</TableCell>
                  <TableCell align="right">Модель</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {carsCrops.map((car) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={RandomKey()}>
                    <TableCell component="th" scope="row">
                      {car.carNumber}
                    </TableCell>
                    <TableCell align="right">{car.carMark}</TableCell>
                    <TableCell align="right">
                      {GetModelYear(car.carModel, 'model')} / {GetModelYear(car.carModel, 'year')}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`${SITE_URL.CHANGE_CAR}/${car.carId}`}>
                        <ModeEditIcon className="fs-5 cursor-pointer" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pageLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainTemplate>
  );
}

export default Cars;
