// import axios
import axios from 'axios';

// define action types
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const GET_TRIPS_START = 'GET_TRIPS_START';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAILED = 'GET_TRIPS_FAILED';
export const ADD_TRIPS_START = 'ADD_TRIPS_START';
export const ADD_TRIPS_SUCCESS = 'ADD_TRIPS_SUCCESS';
export const ADD_TRIPS_FAILED = 'ADD_TRIPS_FAILED';
export const GET_TRIP_EXPENSES_START = 'GET_TRIP_EXPENSES_START';
export const GET_TRIP_EXPENSES_SUCCESS = 'GET_TRIP_EXPENSES_SUCCESS';
export const GET_TRIP_EXPENSES_FAILED = 'GET_TRIP_EXPENSES_FAILED';
export const ADD_EXPENSE_START = 'ADD_EXPENSE_START';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const ADD_EXPENSE_FAILED = 'ADD_EXPENSE_FAILED';

const API_URL = "https://tripsplitr.herokuapp.com";

// action creators
export function register(payload) {
    return (dispatch) => {
        dispatch({ type: REGISTER_START })

        return axios.post(`${API_URL}/auth/register`, payload)
            .then((res) => {
                dispatch({ type: REGISTER_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                console.log('error seems to be', err.response.data)
                dispatch({ type: REGISTER_FAILED, payload: err.response.data })
            })
    }
}

export function login(payload) {
    return (dispatch) => {
        dispatch({ type: LOGIN_START })

        return axios.post(`${API_URL}/auth/login`, payload)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
				localStorage.setItem('userID', res.data.user.id)
                dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                console.log('error seems to be', err.response.data)
                dispatch({ type: LOGIN_FAILED, payload: err.response.data })
            })
    }
}

export function getTrips() {
    return (dispatch) => {
        dispatch({ type: GET_TRIPS_START })

        const headers = {
            Authorization: localStorage.getItem('token'),
        }

        axios.get(`${API_URL}/trips`, { headers })
            .then((res) => {
                dispatch({ type: GET_TRIPS_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                dispatch({ type: GET_TRIPS_FAILED, payload: err.response.data })
            })
    }
}

export function addTrip(payload) {
    return (dispatch) => {
        dispatch({ type: ADD_TRIPS_START })

        const headers = {
            Authorization: localStorage.getItem('token'),
        }

        return axios.post(`${API_URL}/trips`, payload, { headers })
            .then((res) => {
                dispatch({ type: ADD_TRIPS_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                console.log('error seems to be', err.response.data)
                dispatch({ type: ADD_TRIPS_FAILED, payload: err.response.data })
            })
    }
}

export function getTripExpenses(tripID) {
    return (dispatch) => {
        dispatch({ type: GET_TRIP_EXPENSES_START })

        const headers = {
            Authorization: localStorage.getItem('token'),
        }

        axios.get(`${API_URL}/trips/${tripID}`, { headers })
            .then((res) => {
                axios.get(`${API_URL}/expenses/`, { headers })
                .then((res2) => {
                    dispatch({ type: GET_TRIP_EXPENSES_SUCCESS, payload: [res.data, res2.data] })
                })
            })
            .catch((err) => {
                dispatch({ type: GET_TRIP_EXPENSES_FAILED, payload: err.response.data })
            })
    }
}

export function addExpense(payload) {
    return (dispatch) => {
        dispatch({ type: ADD_EXPENSE_START })

        const headers = {
            Authorization: localStorage.getItem('token'),
        }

        return axios.post(`${API_URL}/expenses`, payload, { headers })
            .then((res) => {
                dispatch({ type: ADD_EXPENSE_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                console.log('error seems to be', err.response.data)
                dispatch({ type: ADD_EXPENSE_FAILED, payload: err.response.data })
            })
    }
}

