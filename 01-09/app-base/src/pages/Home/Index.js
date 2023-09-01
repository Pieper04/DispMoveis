import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
/* Adicionar */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, StyleSheet, TouchableHighlight, SafeAreaView, TextInput
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export default function Home({ navigation, navigation: { goBack } }) {
  const [username, setUsername] = useState(null);
  const [CpfCnpj, setCpfCnpj] = useState(null);

  const [MeuCep, setMeuCep] = useState("78557730");
  const [MeuEnd, setMeuEnd] = useState([]);

  async function GetDadosUser () {
    let CpfCnpj = await AsyncStorage.getItem('@CPF').then((data) => {
      return data;
    }); 

    setCpfCnpj(CpfCnpj);

    AsyncStorage.getItem('@NameUser', (error, result) => {
      setUsername(result);
              
      if (error) {
          console.log(JSON.stringify(error))
      }else{
        if ((result == null) || (result == '')) {
          navigation.navigate('Login');
        }
      }
    });

    getCep();
  }

  async function Sobre () {
    navigation.navigate('Sobre');
  }

  useEffect(() => {
    GetDadosUser()
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

  function Logout() {
    LimpaCash();
  }

function LimpaCash() {
    let keys = ['@NameUser', '@CPF', '@Pass'];
    AsyncStorage.multiRemove(keys, (err) => {
      navigation.navigate('Login');
    });
}

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.ViewInicial}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7, paddingVertical:5 }}>
                <Text style={{ color: 'white' }}>Tela home</Text>

                <TouchableHighlight underlayColor={"#3493e5"} onPress={() => goBack()}>
                    <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                      <AntDesign name="back" size={18} color="#fff" />
                      <Text style={{ color: 'white' }}> Voltar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>

      <View style={{margin: 10, minHeight: 200, height: "auto" }}>
        <View style={{ flex: 1, paddingVertical: 5}}>
          <Text style={{ textAlign: "center", fontSize:21, color: "#3493e5" }}>Olá, {username}. Seja bem vindo!</Text>
        </View>

        <View style={{ flex: 1, paddingVertical: 5}}>
          <Text style={{ textAlign: "left", fontSize:18, color: "#3493e5" }}>Para onde vamos? </Text>
        </View>
      
        <View style={{ flex: 1, paddingVertical: 2, minHeight: 100 }}>
          <Text style={{ color: "#3493e5"}} >Digite seu cep:</Text>
          <TextInput
            style={styles.input}
            onChangeText={CEP => onChangeCEP(CEP)}
            value={MeuCep}
            placeholder="CEP"
            keyboardType="numeric"
          />
          <Text style={{ textAlign: "left", fontSize:21 , color: "#3493e5" }}>Nosso destino será: { MeuEnd.logradouro }, { MeuEnd.bairro }. { MeuEnd.localidade } / { MeuEnd.uf } Complemento: { MeuEnd.complemento }</Text>
        </View>
      </View>

      

        <View style={styles.footer}>
          <View style={{ marginTop: 20 }}> 
            <TouchableOpacity onPress={(e) => Sobre()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Sobre</Text> 
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Rodape}>
            <View style={styles.RodapeLine}><View></View></View>
              <View style={styles.rodapeMeio}><Text style={styles.txtRodape}>Disp. Móveis</Text></View>
              <View style={styles.RodapeLine}><View></View></View>
            </View>

            <View><Text style={styles.txtRodape2}>Vocês conseguem!</Text></View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ViewInicial: {
        paddingVertical: 10,
        backgroundColor: "#3493e5",
        height:60
    },
    Card: {
        backgroundColor: 'white',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,

        shadowColor: Platform.OS !== "ios" ? null : '#000000',
        shadowOffset: {
            width: Platform.OS !== "ios" ? null : 2,
            height: Platform.OS !== "ios" ? null : 3
        },
        shadowRadius: Platform.OS !== "ios" ? null : 5,
        shadowOpacity: Platform.OS !== "ios" ? null : 1.0,
        elevation: Platform.OS !== "ios" ? null : 5
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 1,
    },
    Select: {
        height: 30,
        width: 150
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: 55,
    },
    Rodape: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    RodapeLine: {
        borderBottomWidth: 2,
        borderColor: "#1574c2",
        width: '25%',
        height: 12
    },
    txtRodape: {
        color: "#1574c2",
        textAlign: "center",
        paddingHorizontal: 5,
        fontSize: 16
    },
    txtRodape2: {
        color: "#1574c2",
        textAlign: "center",
        fontSize: 12
    },
    txtRodape3: {
        color: "#1574c2",
        textAlign: "center",
        fontSize: 14
    },
    txtRodape4: {
        color: "#1574c2",
        textAlign: "center",
        fontSize: 18
    },
    RodapeMeio: {
        width: '25%'
    },
    input: {
      height: 40,
      width: "100%",
      textAlign: "center",
      fontSize: 18,
      margin: 1,
      marginTop:5,
      borderWidth: 1,
      borderColor: "#3493e5",
      padding: 10,
      color: "#3493e5"
    },
    Texto:{
      fontSize: 26
    },
    BotaoPadrao: {
      backgroundColor: "#fff",
      alignItems: 'center',
      padding: 10,
      margin: 5,
      borderRadius: 5
    },
    BotaoPadraoTexto: {
      color: "#0c7dbe",
      fontSize: 16
    },
});