import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {
  const [MeuCep, setMeuCep] = useState("78557730");
  const [MeuEnd, setMeuEnd] = useState([]);
  
  useEffect(() => {
    //Assim que carregado, tudo que está aqui é executado!
    getCep();
  }, [MeuCep]);

  async function getCep() { 
    try {
      await axios
        .get(`https://viacep.com.br/ws/${MeuCep}/json/`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          setMeuEnd(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (erro) {
      console.log(erro);
    }
  }

  const onChangeCEP = (cep) => {
    setMeuCep(cep);
    if(cep.length === 8) { getCep(cep);  }
  };

  return (
    <View style={styles.container}>
      <Text>Digite seu cep:</Text>
      <TextInput
        style={styles.input}
        onChangeText={CEP => onChangeCEP(CEP)}
        value={MeuCep}
        placeholder="CEP"
        keyboardType="numeric"
      />
      <Text>Meu endedeço é: {MeuEnd.logradouro}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 120,
    textAlign: "center",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
