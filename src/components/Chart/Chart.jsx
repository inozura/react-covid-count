import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardContent, Grid, Typography } from "@mui/material";

import styles from "./Chart.module.css";
import CountryPicker from "../CountryPicker/CountryPicker";

const Chart = ({ data, country, handleCountryChange }) => {
  const [dailyData, setDailyData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            backgroundColor: "rgba(0,255,0,0.5)",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <Card sx={{ borderRadius: 5, padding: 5, width: "100%" }}>
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          xs={12}
          md={6}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h4" sx={{ display: "inline-block" }}>
            Data
          </Typography>
          <CountryPicker handleCountryChange={handleCountryChange} />
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <div className={styles.container}>
            {country ? barChart : lineChart}
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Chart;
