import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountires, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl className={styles.formControl} sx={{ width: 300 }}>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        defaultValue="global"
        onChange={(e) => handleCountryChange(e.target.value)}
        labelId="country-select-label"
      >
        <MenuItem value="global">Global</MenuItem>
        {fetchedCountires.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryPicker;
