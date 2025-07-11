import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectOptions from "../SelectOptions/SelectOptions";

const CountrySelector = ({ setSelectedCountry, selectedCountry }) => {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const data = await response.json();

      setCountries(data.map((item) => item.name.common));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://restcountries.com/v3.1/all?fields=name")
  //     .then((response) => {
  //       const options = response.data
  //         .map((country) => country.name.common)
  //         .sort((a, b) => a.localeCompare(b)); // Alphabetical sort
  //       setCountries(options);
  //     })
  //     .catch((error) => console.error("Error fetching countries:", error));
  // }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <>
      <SelectOptions
        id="country-select"
        label="Select a Country"
        options={countries}
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Choose a country"
        required={true}
        name="country"
        hideRequired={true}
      />
    </>
  );
};

export default CountrySelector;
