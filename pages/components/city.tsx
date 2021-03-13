import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Wind from './wind';
import Stats from './stats';
import Clouds from './clouds';
import Summary from './summary';
import Loader from './loader';
import { CONTAINER_COLOR } from '../../constants';
import Blinker from './blinker';

const GET_CITY_BY_NAME = gql`
query city($cityName: String!, $config: ConfigInput) {
  getCityByName (name: $cityName, config: $config){
    id
    name
    country
    weather{
      summary {
        title
        description
        icon
      }
      temperature{
        actual
        feelsLike
        min
        max
      }
      wind {
        speed
        deg
      }
      clouds {
        all
        visibility
        humidity
      }
    }
  }
}`;

export enum Status {
    EXPANDED = 0,
    COLLAPSED = 1
}

interface CityHandlers {
    onLoadFail: Function
    onToggle: Function
    onDelete: Function
}

interface CityOtherProps {
    index: number
}

interface City {
    title: string
    status: Status.EXPANDED | Status.COLLAPSED
}

export interface CityProps extends City, CityHandlers, CityOtherProps { };

const City: React.FC<CityProps> = ({
    title = "",
    index = 0,
    onLoadFail = () => { },
    onToggle = () => { },
    status = Status.COLLAPSED,
    onDelete = () => { }
}) => {
    const { loading, error, data } = useQuery<GetCityByNameData, GetCityByNameVars>(GET_CITY_BY_NAME, {
        variables: {
            cityName: title, config: {
                units: "metric"
            },
        },
        pollInterval: 1000,
    });

    const [isfocused, setIsFocused] = useState(false);
    if (loading) {
        return <Loader />
    }

    if (error) {
        onLoadFail(index);
        return <div>Error loading data!</div>
    }

    if (!error && !loading && data.getCityByName == null) {
        onLoadFail(index);
        return <span />
    }

    const {
        getCityByName: {
            name: cityName = "",
            country = "",
            weather: {
                summary,
                temperature,
                wind,
                clouds,
            } = {},
        } = {},
    } = data;

    const bgClass = status === Status.EXPANDED ? 'bg-gradient-to-b from-white to-white text-blue-900'
        : `${CONTAINER_COLOR} text-white`;

    return (
        <div className={`shadow-2xl ${bgClass}
                    rounded-ro h-full 
                    cursor-pointer
                    hover:from-white hover:to-white hover:text-blue-900 city`}

            onClick={() => onToggle(index)}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
        >
            <span
                className={`float-right text-white mr-4 mt-3 ${isfocused ? 'delete-black' : 'delete-whtite'}`}
                onClick={(e) => { e.stopPropagation(); onDelete(index) }}
            >
                &#9932;
            </span>
            <div className="p-8 space-y-4 text-center">
                <div className="flex justify-center">
                    <span className="text-3xl">{cityName}</span>
                    <div className="relative">
                        <sup className="text-lg">{country}</sup>
                        <Blinker />
                    </div>
                </div>
                <div className="text-lg font-black">{temperature.actual}<sup>°C</sup></div>
                <Summary icon={summary.icon} title={summary.title} description={summary.description} />
            </div>
            {status === Status.EXPANDED && <div className="p-6 bg-gradient-to-t
                                     from-indigo-400 to blue-900">

                <Stats feelsLike={temperature.feelsLike} min={temperature.min} max={temperature.max} />

                <Wind speed={wind.speed} deg={wind.deg} />

                <Clouds visibility={clouds.visibility} humidity={clouds.humidity} />

            </div>}
        </div >
    );
}

export default City;