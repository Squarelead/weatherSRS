import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DataService from "./services/DataService.js";
import CitySelect from "./components/CitySelect.js";
import WeatherBlock from "./components/WeatherBlock.js";
import Spinner from "react-native-loading-spinner-overlay";
import * as Location from "expo-location";

const ds = new DataService();

export default function App() {
  const [weather, setWeather] = useState(null);
  const [rejected, setRejected] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const showWeather = (weatherData) => {
    setRejected(false);
    setWeather(weatherData);
  };

  const selectCity = () => {
    setRejected(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setRejected(true);
      } else {
        setSpinner(true);
        const location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const weatherData = await ds.getCurrentByCoordinates(lat, lon);
        setWeather(weatherData);
        setSpinner(false);
      }
    })();
  }, []);

  let block;
  if (rejected) {
    block = <CitySelect showWeather={showWeather} />;
  } else if (weather) {
    block = <WeatherBlock data={weather} selectCity={selectCity} />;
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
