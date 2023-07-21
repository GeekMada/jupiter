import api from "./api";

// Action pour enregistrer l'utilisateur
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/auth/register', userData);
    const user = response.data;
    dispatch({ type: 'REGISTER_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};

// Action pour connecter l'utilisateur
export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/auth/login', userData);
    const { token, user } = response.data;
    // Enregistrer le token dans le localStorage
    localStorage.setItem('token', token);
    // Stocker l'utilisateur connecté dans le store
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};
