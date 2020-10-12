import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import unixToNormal from "../services/TransformTs.js";

export default function WeatherBlock(props) {
  const { data } = props;

  const imageCode = data.weather[0].icon;
  const imageUrl = `http://openweathermap.org/img/wn/${imageCode}@2x.png`;

  const city = data.name;
  const weatherDescription = data.weather[0].description;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const date = unixToNormal(data.dt * 1000);
  const pressure = (data.main.pressure * 0.75).toFixed(2);
  const humidity = data.main.humidity;

  return (
    <View style={styles.infoBlock}>
      <Text style={styles.blackText}>{city}</Text>
      <Text style={styles.blueText}>{date}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: imageUrl,
        }}
      />
      <Text style={styles.blackText}>
        Погода: <Text style={styles.blueText}>{weatherDescription}</Text>
      </Text>
      <Text style={styles.blackText}>
        Температура: <Text style={styles.blueText}>{temp} °C</Text>
      </Text>
      <Text style={styles.blackText}>
        Ощущается как: <Text style={styles.blueText}>{feelsLike} °C</Text>
      </Text>
      <Text style={styles.blackText}>
        Давление: <Text style={styles.blueText}>{pressure} мм рт.ст.</Text>
      </Text>
      <Text style={styles.blackText}>
        Влажность: <Text style={styles.blueText}>{humidity} %</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBlock: {
    height: 460,
    width: 250,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  blackText: {
    textAlign: "center",
    color: "#5E5E5E",
    fontSize: 16,
  },
  blueText: {
    textAlign: "center",
    color: "#3F8695",
    fontSize: 16,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
