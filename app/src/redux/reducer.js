// import action types
import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    GET_TRIPS_START,
    GET_TRIPS_SUCCESS,
    GET_TRIPS_FAILED,
    ADD_TRIPS_START,
    ADD_TRIPS_SUCCESS,
    ADD_TRIPS_FAILED,
    GET_TRIP_EXPENSES_START,
    GET_TRIP_EXPENSES_SUCCESS,
    GET_TRIP_EXPENSES_FAILED,
    ADD_EXPENSE_START,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_FAILED,
} from './actions'

// state initial values
const initialState = {
    userID: null,
	registerLoading: false,
    registerError: null,
    registerResponse: {},
	loginLoading: false,
    loginError: null,
    loginResponse: {},
	tripsLoading: false,
    tripsError: null,
    trips: [],
	addTripLoading: false,
    addTripError: null,
    addTripResponse: {},
    tripLoading: false,
    tripError: null,
    tripData: [],
    tripExpenses: [],
	addExpenseLoading: false,
    addExpenseError: null,
    addExpenseResponse: {},
}

export default function(state = initialState, action) {
	switch (action.type) {
        case REGISTER_START: {
			return {
                ...state,
                registerLoading: true,
			}
        }
        case REGISTER_SUCCESS: {
            const responseData = action.payload
			return {
                ...state,
                registerLoading: false,
                registerResponse: responseData,
			}
        }
        case REGISTER_FAILED: {
			return {
				...state,
                registerLoading: false,
                registerError: action.payload.message,
			}
        }
        case LOGIN_START: {
			return {
                ...state,
                loginLoading: true,
			}
        }
        case LOGIN_SUCCESS: {
            const responseData = action.payload
			return {
                ...state,
                loginLoading: false,
                loginError: null,
                loginResponse: responseData,
                userID: responseData.user.id,
			}
        }
        case LOGIN_FAILED: {
			return {
				...state,
                loginLoading: false,
                loginError: action.payload.message,
			}
        }
        case GET_TRIPS_START: {
			return {
                ...state,
                tripsLoading: true,
			}
        }
        case GET_TRIPS_SUCCESS: {
            const responseData = action.payload
			return {
                ...state,
                tripsLoading: false,
                trips: responseData,
			}
        }
        case GET_TRIPS_FAILED: {
			return {
				...state,
                tripsLoading: false,
                tripsError: action.payload.message,
			}
        }
        case ADD_TRIPS_START: {
			return {
                ...state,
                addTripLoading: true,
			}
        }
        case ADD_TRIPS_SUCCESS: {
            const responseData = action.payload
			return {
                ...state,
                addTripLoading: false,
                addTripResponse: responseData,
			}
        }
        case ADD_TRIPS_FAILED: {
			return {
				...state,
                addTripLoading: false,
                addTripError: action.payload.message,
			}
        }
        case GET_TRIP_EXPENSES_START: {
			return {
                ...state,
                tripLoading: true,
			}
        }
        case GET_TRIP_EXPENSES_SUCCESS: {
            const responseTrip = action.payload[0]
            const responseExpenses = action.payload[1]
			return {
                ...state,
                tripLoading: false,
                tripData: responseTrip,
                tripExpenses: responseExpenses,
			}
        }
        case GET_TRIP_EXPENSES_FAILED: {
			return {
				...state,
                tripLoading: false,
                tripError: action.payload.message,
			}
        }
        case ADD_EXPENSE_START: {
			return {
                ...state,
                addExpenseLoading: true,
			}
        }
        case ADD_EXPENSE_SUCCESS: {
            const responseData = action.payload
			return {
                ...state,
                addExpenseLoading: false,
                addExpenseResponse: responseData,
			}
        }
        case ADD_EXPENSE_FAILED: {
			return {
				...state,
                addExpenseLoading: false,
                addExpenseError: action.payload.message,
			}
        }
        default:
            return state
    }
}