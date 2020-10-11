import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DataService from "../services/DataService.js";
import unixToNormal from "../services/TransformTs.js";

const ds = new DataService();

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
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.infoBlock}>
          <Text style={styles.text}>{city}</Text>
          <Text style={styles.text}>{date}</Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: imageUrl,
            }}
          />
          <Text style={styles.text}>Погода: {weatherDescription}</Text>
          <Text style={styles.text}>Температура: {temp} °C</Text>
          <Text style={styles.text}> Ощущается как: {feelsLike} °C</Text>
          <Text style={styles.text}>Давление: {pressure} мм рт.ст.</Text>
          <Text style={styles.text}>Влажность: {humidity} %</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.selectCity();
          }}
        >
          <LinearGradient
            colors={["transparent", "#EBEBEB"]}
            style={{
              position: "absolute",
              borderRadius: 20,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
          <Text style={styles.text}>Выбрать город</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  container: {
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  infoBlock: {
    height: 470,
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
  text: {
    textAlign: "center",
    color: "#5E5E5E",
    fontSize: 16,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
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
});
