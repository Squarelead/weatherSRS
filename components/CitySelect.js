import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import DataService from "../services/DataService.js";
import { LinearGradient } from "expo-linear-gradient";

const ds = new DataService();

export default function CitySelect(props) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const onSubmit = async (city) => {
    if (city) {
      setSpinner(true);
      const response = await ds.getCurrentByCity(city);
      if (response.cod !== "404") {
        props.showWeather(response);
      } else {
        setError(true);
      }
      setSpinner(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.main}>
        <Spinner visible={spinner} />
        <View style={styles.container}>
          <Text style={styles.text}>
            {error
              ? "Город не найден, попробуйте еще раз ;)"
              : "Выберите ваш город"}
          </Text>
          <TextInput
            placeholder="Название города"
            placeholderTextColor="#438491"
            style={styles.textInput}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSubmit(search);
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
            <Text style={styles.text}>ПОДТВЕРДИТЬ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("window").height,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  },
  container: {
    height: 250,
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
  textInput: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderColor: "#4ea7b8",
    color: "#000",
    borderWidth: 2,
    borderRadius: 5,
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
