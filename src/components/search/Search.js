import React from "react";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, ApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (data) => {
    setSearch(data);
    onSearchChange(data);
  };

  const loadOptions = (input) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${input}`,
      ApiOptions
    ) //to get better search I used minimum population as 10 lakh
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}`
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };


  return (
    <AsyncPaginate
      placeholder="Search City"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
