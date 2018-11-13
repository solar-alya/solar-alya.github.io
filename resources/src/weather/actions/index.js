// import moment from "moment";
import axios from "axios";
import _ from "lodash";

import {SET_ADRESS, GET_WEATHER, HIDE_LOADER, ADD_CITY, SHOW_LOADER } from "../constants";


export function setAddress(address) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_ADRESS,
            payload: address,
        });
    }
}

export function getWeather(coords) {
    return (dispatch, getState) => {
        let weatherNew = [];
        let promises = [];
        if(!coords) {
            dispatch({
                type: HIDE_LOADER
            });
        }

        for (let i=0; i < coords.length; i++){
            let myUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=2b9c8af1f6c2c2f546ab34ad5ce996a9&units=metric&lat=" + coords[i].lat + "&lon=" + coords[i].lng;
            promises.push(axios.get(myUrl))
        }

        axios.all(promises).then(function(results) {
            results.forEach(function(response,index) {
                weatherNew[index] = response.data;
            })
            dispatch({
                type: GET_WEATHER,
                payload: weatherNew,
            });

            dispatch({
                type: HIDE_LOADER
            });
        });
    }
}


export function addCity(latLng) {
    return (dispatch, getState) => {
        axios
            .get("http://api.openweathermap.org/data/2.5/weather?APPID=2b9c8af1f6c2c2f546ab34ad5ce996a9&units=metric&lat=" + latLng.lat + "&lon=" + latLng.lng)
            .then(response => {
                const cities = getState().weather.currentWeather;
                const newCity1 = _.merge(response.data, latLng );
                const newCity = _.concat(cities, newCity1);
                dispatch({
                    type: ADD_CITY,
                    payload: newCity,
                });
            })
            .catch()
    }
}

export function loader(load) {
    return (dispatch, getState) => {
        !load ?
            dispatch({
                type: HIDE_LOADER
            }):
            dispatch({
                type: SHOW_LOADER
            })
    }



}
export function deleteCity(id,lng,lat) {
    return (dispatch, getState) => {
        const weather = getState().weather.currentWeather;
        const newWeather = _.filter(weather, function(o) { return o.id !== id; });
console.log(lng, lat)
        const oldCities = JSON.parse(localStorage.getItem('cities'));
        console.log(oldCities);
        const newLocal = _.filter(oldCities, function(o) { return o.lng !== lng && o.lat !== lat; });
        console.log(newLocal);
        // const newCities = _.concat(oldCities, cities);
        // localStorage.removeItem("cities");
        // localStorage.clear();
        // localStorage.setItem("cities", JSON.stringify(newCities));


        dispatch({
            type: ADD_CITY,
            payload: newWeather,
        });
    }

}



