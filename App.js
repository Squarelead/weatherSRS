import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DataService from "./services/DataService.js";
import CitySelect from "./components/CitySelect.js";
import WeatherBlock from "./components/WeatherBlock.js";
import * as Location from "expo-location";

const ds = new DataService();

export default function App() {
  const [weather, setWeather] = useState(null);
  const [rejected, setRejected] = useState(false);

  const changeScreen = (weatherData) => {
    setRejected(false);
    setWeather(weatherData);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setRejected(true);
      }
      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const weatherData = await ds.getCurrentByCoordinates(lat, lon);
      setWeather(weatherData);
    })();
  }, []);

  let block = <Text>Немного терпения...</Text>;
  if (rejected) {
    block = <CitySelect change={changeScreen} />;
  } else if (weather) {
    block = <WeatherBlock data={weather} />;
  }

  return <View style={styles.container}>{block}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
