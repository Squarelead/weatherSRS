import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import DataService from "../services/DataService.js";

const ds = new DataService();

export default function WeatherBlock(props) {
  const { data } = props;

  const imageCode = data.weather[0].icon;
  const imageUrl = `http://openweathermap.org/img/wn/${imageCode}@2x.png`;

  const city = data.name;
  const weatherDescription = data.weather[0].description;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;

  return (
    <View style={styles.container}>
      <Text>{city}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: imageUrl,
        }}
      />
      <Text>{weatherDescription}</Text>
      <Text>{temp}</Text>
      <Text>{feelsLike}</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 250,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    textAlign: "center",
    color: "#5E5E5E",
    fontSize: 16,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
