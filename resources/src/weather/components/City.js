import React from 'react'
import moment from "moment";
import Geo from "./svg/Geo";
import Icons from "./svg/weather/Icons";
import { Icon } from 'semantic-ui-react'
const City = ({ data, onDelete, id, lat, lng }) => (


    <div className='card'>
            <div className='card__top'>
                <Geo />
                <p>{data.name +', '} {data.sys.country}</p>
                <Icon id = {id} lat={lat} lng={lng} className='close-icon' onClick={onDelete} link name='close' />
            </div>
            <div className='card__center'>
                <p>{data.main.temp + ' °'}</p>
                <div className='icon_wrapper'>
                   <Icons id = {data.weather[0].id} icon={data.weather[0].icon}/>

                </div>
            </div>
            <div className='card__bottom'>
                <p>{'Sunrise: '+ moment.unix(data.sys.sunrise).format('HH-mm')}</p>
                <p>{'Sunset: '+ moment.unix(data.sys.sunset).format('HH-mm')}</p>
            </div>
    </div>
);



export default City;