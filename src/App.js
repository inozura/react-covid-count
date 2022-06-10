import React from "react";
import { Cards, Chart, LoadingPage } from "./components";
import { fetchData } from "./api";
import { Container, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./App.module.css";

const FlexContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "25px 10px",
}));

const App = () => {
  const [data, setData] = React.useState();
  const [country, setCountry] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchNewData();
  }, []);

  const fetchNewData = async () => {
    try {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(error);
      console.log("Error when fetching data");
    }
  };

  const handleCountryChange = async (country) => {
    setCountry(country);

    try {
      const fetchedData = await fetchData(country);
      setData(fetchedData);
    } catch (error) {
      console.log("Error when fetching data");
    }
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className={styles.container}>
      <FlexContainer>
        <Card
          style={{
            width: "100%",
            borderRadius: 10,
            boxShadow: "1px solid black",
          }}
        >
          <h1 style={{ textAlign: "center" }}>COVID-19 Tracker</h1>
          <p style={{ textAlign: "center" }}>
            Code in React by{" "}
            <a
              href="https://inozura.github.io/my"
              target="_blank"
              rel="noopener noreferrer"
            >
              inozura
            </a>
            , <span>API by mathdro.id</span>
          </p>
        </Card>
      </FlexContainer>

      <Cards data={data} />
      <Chart
        data={data}
        country={country}
        handleCountryChange={handleCountryChange}
      />
    </div>
  );
};

export default App;
