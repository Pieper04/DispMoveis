import React, { Component } from "react";
import {
    View, Text, StyleSheet, Image
} from "react-native";

class Topo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../../assets/images/zoro.png")} />
                <View><Text style={styles.texto}>Meu app</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 2
  },
  texto: {
    textAlign: "center",
    fontSize: 20,
    color: 'white',
    marginBottom: 4
  }
});

export default Topo;

