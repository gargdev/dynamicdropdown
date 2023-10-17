import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setData(data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCities([]);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    const selectedStateData = data
      .find((d) => d.country === selectedCountry)
      ?.state.find((s) => s.state === state);
    if (selectedStateData) {
      setSelectedCities(selectedStateData.city.map((c) => c.name));
    } else {
      setSelectedCities([]);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Country:", selectedCountry);
    console.log("Selected State:", selectedState);
    console.log("Selected Cities:", selectedCities);
  };

  return (
    <div className="container text-center">
      <h1>Dynamic Dropdown</h1>
      <div className="form-group text-start">
        <label>Select Country</label>
        <select
          className="form-control"
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          <option value="">Select Country</option>
          {data.map((countryData) => (
            <option key={countryData.id} value={countryData.country}>
              {countryData.country}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div>
          <div className="form-group text-start">
            <label>Select State</label>
            <select
              className="form-control"
              onChange={handleStateChange}
              value={selectedState}
            >
              <option value="">Select State</option>
              {data
                .find((d) => d.country === selectedCountry)
                ?.state.map((stateData) => (
                  <option key={stateData.id} value={stateData.state}>
                    {stateData.state}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group text-start">
            <label>Select Cities</label>
            <div>
              {data
                .find((d) => d.country === selectedCountry)
                ?.state.filter((stateData) => stateData.state === selectedState)
                .map((stateData) =>
                  stateData.city.map((cityData) => (
                    <div key={cityData.id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={cityData.name}
                        checked={selectedCities.includes(cityData.name)}
                        onChange={handleCityChange}
                      />
                      <label className="form-check-label">
                        {cityData.name}
                      </label>
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
      )}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
