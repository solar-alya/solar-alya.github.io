import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LocationSearchInput from './LocationSearchInput'
import { Grid } from 'semantic-ui-react'
import City from './City'
import { setAddress, getWeather, addCity, loader, deleteCity } from "../actions/index";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "../assets/App.scss";
import _ from "lodash";
import { ScaleLoader } from "react-spinners";


class App extends React.Component {
    static propTypes = {

    };


    componentWillMount() {
        if(localStorage.getItem('cities')) {
            console.log('componentDidMount',localStorage.getItem('cities'));
            const coords = JSON.parse(localStorage.getItem('cities'));
            this.props.getWeather(coords);
        }else {
            this.props.loader(false);
        }
    };

    handleChange = (address) => {
        this.props.setAddress(address);

    }

    handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                // this.props.setLatLng(latLng);
                const cities = [latLng]
                console.log(cities)
                if(!localStorage.getItem('cities')) {
                    localStorage.setItem("cities", JSON.stringify(cities))
                }else {
                    const oldCities = JSON.parse(localStorage.getItem('cities'));
                    const newCities = _.concat(oldCities, cities);
                    localStorage.removeItem("cities");
                    localStorage.clear();
                    localStorage.setItem("cities", JSON.stringify(newCities));
                }
                this.props.addCity(latLng)})
            .catch(error => console.error('Error', error))
    }

    handleDelete = (e) => {
        const id = _.toNumber(e.target.id);
        const lat = _.toNumber(e.target.lat);
        const lng = _.toNumber(e.target.lng);
        console.log(e.target.lat);
        console.log(e.target.lng);
        this.props.deleteCity(id,lng,lat)

    }

    render() {
        return(
            <div className='wrapper'>


                <p>always Solar weather</p>
                <ScaleLoader color="#4CAF50" loading={ this.props.loading } />
                <Grid divided='vertically' centered={true} style={{'display': (this.props.loading)?'none':'block'}}>
                    <Grid.Row columns={1}>
                        <Grid.Column width={12}>
                            <LocationSearchInput
                                value={this.props.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        {
                            this.props.currentWeather.map((item) =>
                                    <Grid.Column width={3}>
                                        <City id={item.id} data={item} lat={item.lat} lng={item.lng} onDelete={this.handleDelete}/>
                                    </Grid.Column>
                            )
                        }
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        cities: state.weather.cities,
        address: state.weather.address,
        loading: state.weather.loading,
        currentWeather: state.weather.currentWeather
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setAddress(address) {
            dispatch(setAddress(address));
        },
        getWeather(coords) {
            dispatch(getWeather(coords));
        },
        addCity(latLng) {
            dispatch(addCity(latLng));
        },
        loader(load) {
            dispatch(loader(load));
        },
        deleteCity(id,lng,lat) {
            dispatch(deleteCity(id,lng,lat));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);