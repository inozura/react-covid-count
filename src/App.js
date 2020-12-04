import React from "react";

import { Cards, Chart, CountryPicker } from "./components";

import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    document.title = "COVID-19 Tracker";
    const fetchedData = await fetchData();

    this.setState({
      data: fetchedData,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <h1>COVID-19 Tracker</h1>
        <p>
          Code in React by <a href="https://github.com/inozura">inozura</a>,{" "}
          <span>API by mathdro.id</span>
        </p>

        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
