import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
/* Adicionar */
import { Platform, Text, View, StyleSheet, SafeAreaView, TouchableHighlight, Box } from 'react-native';
import * as SMS from 'expo-sms';

export default function ESMS({ navigation, navigation: { goBack } }) {

  useEffect(() => {
    Send();
  }, []);

  async function Send(){
    const { result } = await SMS.sendSMSAsync(
        ['5566999042067'],
        'My sample HelloWorld message'
      );
  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.ViewInicial}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                paddingHorizontal: 5, paddingVertical:5, marginTop: 20 }}>
                <Text style={{ color: 'white' }}>Tela home</Text>

                <TouchableHighlight underlayColor={"#3493e5"} onPress={() => goBack()}>
                    <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                      <AntDesign name="back" size={18} color="#fff" />
                      <Text style={{ color: 'white' }}> Voltar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View> 

        <View style={styles.container}>
          <View style={{ marginTop: 5 }}> 
            <TouchableOpacity onPress={(e) => Location()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Location</Text> 
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 5 }}> 
            <TouchableOpacity onPress={(e) => Camera()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Camera</Text> 
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 5 }}> 
            <TouchableOpacity onPress={(e) => Contatos()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Contatos</Text> 
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 5 }}> 
            <TouchableOpacity onPress={(e) => ManImages()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Manipulação de imagens</Text> 
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 5 }}> 
            <TouchableOpacity onPress={(e) => Notification()}>
              <View style={styles.BotaoPadrao}>
                <Text style={styles.BotaoPadraoTexto}>Notification</Text> 
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.Rodape}>
            <View style={styles.RodapeLine}><View></View></View>
              <View style={styles.rodapeMeio}><Text style={styles.txtRodape}>Disp. Móveis</Text></View>
              <View style={styles.RodapeLine}><View></View></View>
            </View>

            <View><Text style={styles.txtRodape2}>Vocês conseguem!</Text></View>
        </View>
      </SafeAreaView>
  );

  async function Location () {
    navigation.navigate('Location');
  }


  async function Camera () {
    navigation.navigate('Camera');
  }

  async function Contatos () {
    navigation.navigate('Contatos');
  }

  async function ManImages () {
    navigation.navigate('ManImages');
  }

  async function Notification () {
    navigation.navigate('Notification');
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ViewInicial: {
      paddingVertical: 0,
      backgroundColor: "#3493e5",
      height:70
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