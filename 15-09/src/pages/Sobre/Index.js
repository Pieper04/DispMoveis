import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Sobre({ navigation }) {
  async function Home () {
    navigation.navigate('Home');
  }

  return (
      <SafeAreaView  style={styles.container}>
          <View style={styles.Corpo}>
            <Text style={styles.Texto}>Oi meu nome é Lele</Text>
          </View>

          <View>
            <TouchableOpacity onPress={(e) => Home()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Voltar</Text> 
              </View>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  Corpo: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
  },
  Texto:{
    fontSize: 26
  },
  BotaoPadrao: {
    backgroundColor: "#fff",
    alignItems: 'center',
    padding: 15,
    margin: 5,
    borderRadius: 5
  },
  BotaoPadraoTexto: {
    color: "#0c7dbe",
    fontSize: 16
  },
});