import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import WeatherBlock from "../components/WeatherBlock.js";

export default function MainWeather(props) {
  const { data } = props;

  return (
    <View style={styles.main}>
      <WeatherBlock data={data} />
      <TouchableOpacity
        style={styles.cityButton}
        onPress={() => {
          props.selectCity();
        }}
      >
        <Text style={styles.blueText}>Выбрать город</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "88%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  blackText: {
    textAlign: "center",
    color: "#5E5E5E",
    fontSize: 16,
  },
  greyText: {
    textAlign: "center",
    color: "#7C7C7C",
    fontSize: 16,
  },
  blueText: {
    textAlign: "center",
    color: "#3F8695",
    fontSize: 16,
  },
  cityButton: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FAFFFF",
    borderWidth: 2,
    borderColor: "#4ea7b8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
