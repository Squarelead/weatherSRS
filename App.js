import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DataService from "./services/DataService.js";
import CitySelect from "./components/CitySelect.js";
import MainWeather from "./components/MainWeather.js";
import Spinner from "react-native-loading-spinner-overlay";
import * as Location from "expo-location";

const ds = new DataService();

export default function App() {
  const [weather, setWeather] = useState(null);
  const [screen, setScreen] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const showWeather = (weatherData) => {
    setWeather(weatherData);
    setScreen("main");
  };

  const selectCity = () => {
    setScreen("city");
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setScreen("city");
      } else {
        setSpinner(true);
        const location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const weatherData = await ds.getCurrentByCoordinates(lat, lon);
        setWeather(weatherData);
        setScreen("main");
        setSpinner(false);
      }
    })();
  }, []);

  let block;
  if (screen === "city") {
    block = <CitySelect showWeather={showWeather} />;
  } else if (screen === "main") {
    block = <MainWeather data={weather} selectCity={selectCity} />;
  }

  return (
    <View style={styles.container}>
      <Spinner visible={spinner} />
      {block}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
