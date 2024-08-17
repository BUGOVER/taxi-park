import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AlertSite from '../redux/alert-site';
import StoreSite from '../redux/store-site';

const reducers = combineReducers({
  AlertSite,
  StoreSite
});

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.config.transformRequest']
    }
  })
});
