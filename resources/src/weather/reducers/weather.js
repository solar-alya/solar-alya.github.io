import { SET_ADRESS, GET_WEATHER, SHOW_LOADER, HIDE_LOADER, ADD_CITY } from "../constants";

const initialState = {
    address:'',
    currentWeather:[],
    loading: true,
};

export default function numbers(state = initialState, action) {
    switch (action.type) {
        case SET_ADRESS:
            return {...state, address: action.payload}
        case GET_WEATHER:
            return {...state, currentWeather: action.payload}
        case ADD_CITY:
            return {...state, currentWeather: action.payload}
        case SHOW_LOADER:
            return{ ...state, loading: true };
        case HIDE_LOADER:
            return{ ...state, loading: false };
        default:
            return state;
    }
}