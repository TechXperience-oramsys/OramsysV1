import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { isLoadingReducer } from './redusers/loadingReducer';
import { isUserLoginReducer } from './redusers/loginReducer';
import { registerReducer } from './redusers/registerReducer';
import { countrieReducer } from './redusers/countrieReducer';
import { productReducer } from './redusers/productReducer';
import { userReducer } from './redusers/userReducer';
import { adminReducer } from './redusers/adminReducer';
import { ratingAgenciesReducer } from './redusers/ratingAgenciesReducer';
import { entityReducer } from './redusers/entityReducer';
import { entityRoleReducer } from './redusers/entitiesRoleReducer';
import { sectorReducer } from './redusers/sectorReducer';
import { companydataReducer } from './redusers/companydataReducer';
import { transactionDataReducer } from './redusers/transactionDataReducer';
import { riskAssessmentReducer } from './redusers/riskAssessmentReducer';
import { airPortsReducer, portsReducer } from './redusers/portsReducer';
import { termSheetReducer } from './redusers/termSheetReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  loading: isLoadingReducer,
  login: isUserLoginReducer,
  registerData: registerReducer,
  countryData: countrieReducer,
  product: productReducer,
  userData: userReducer,
  adminData: adminReducer,
  ratingAgenciesData: ratingAgenciesReducer,
  entityData: entityReducer,
  entityRoleData: entityRoleReducer,
  sectorData: sectorReducer,
  companydata: companydataReducer,
  transactionData: transactionDataReducer,
  riskAssessmentData: riskAssessmentReducer,
  ports: portsReducer,
  airPorts: airPortsReducer,
  termSheet:termSheetReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;