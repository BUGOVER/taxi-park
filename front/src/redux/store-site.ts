import { createSlice } from '@reduxjs/toolkit';

interface IStoreSite {
  cars: ICar[];
  drivers: any;
}

const initialState: IStoreSite = {
  cars: [],
  drivers: []
};

const StoreSite = createSlice({
  name: 'all-store-site',
  initialState,
  reducers: {
    setCars(state, action) {
      state.cars = action.payload;
    },
    serDrivers(state, action) {
      state.drivers = action.payload;
    }
  }
});

export const { setCars, serDrivers } = StoreSite.actions;

export default StoreSite.reducer;
