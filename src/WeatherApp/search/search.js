import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import { WEATHER_API_KEY } from "../../api";
const Search = ({ onSearchChange }) => {

  const [search, setSearch] = useState(null);

  
  //this function is called if the input given is a zip Code i.e. a number
  let zipWeather = null;
  const searchBar = async (query) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}&units=metric&q=${query}`;
    const api = await fetch(url);
    const res = await api.json();
    zipWeather = res;
  };

  const loadOptions = (inputValue) => {
    // if the input given is a number then this condition is triggered
    if (!isNaN(parseInt(inputValue))) {
      searchBar(inputValue);
      return {
        options: [
          {
            value: `${zipWeather.coord.lat} ${zipWeather.coord.lon}`,
            label: `${zipWeather.name}, ${zipWeather.sys.country}`,
          },
        ],
      };
    }
    // if the input given is a string then the GEO_DB Cities api is called and an array of cities is received in response 
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  // after a change in searchinput the search variable is changed using use state;
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    // AsyncPaginate is the component of react-select-async-paginate library. 
    // It uses loadOptions function attribute to load the option into the select box and it expect return value as {options: [], hasMore: false}.
    <AsyncPaginate
      placeholder="Search for city"
      //typing speed can be very fast and there can be too many request; to avoid that this timeout is given;
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
