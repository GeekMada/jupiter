import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //
const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  customization: customizationReducer,
  authReducer: authReducer
});


export default reducer;
