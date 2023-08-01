/* eslint-disable prettier/prettier */
import React, { useReducer, createContext } from 'react';
import { useContext } from 'react';

const initialState = {
  user: null,
  isAuthenticated: false
};

if(typeof window !== 'undefined') {
    if (window.sessionStorage.getItem('user')) {
        const state = window.sessionStorage.getItem('user')
        if (state.expected * 1000 < Date.now()) {
            window.sessionStorage.removeItem('user')
        } else {
            initialState.user = state
            initialState.isAuthenticated = true
        }
    }
}

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    // eslint-disable-next-line no-unused-vars
    login: (userData) => { },
    logout: () => {window.sessionStorage.removeItem('user')}
});

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        window.sessionStorage.setItem("user", userData)
        dispatch({
            type: 'LOGIN',
            payload: userData,
            isAuthenticated: false
        })
    }

    const logout = () => {
        window.sessionStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, isAuthenticated: state.isAuthenticated, login, logout }}
            {...props}
        />
    )
}

const AuthConsumer = AuthContext.Consumer;
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, AuthConsumer, useAuthContext };