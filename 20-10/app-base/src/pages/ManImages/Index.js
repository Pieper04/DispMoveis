import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
/* Adicionar */
import { Platform, Text, View, StyleSheet, SafeAreaView, TouchableHighlight, Button, Image } from 'react-native';
import { Asset } from 'expo-asset';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


export default function ManImages({ navigation: { goBack } }) {
    const [ready, setReady] = useState(false);
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      (async () => {
        const image = Asset.fromModule(require('../../assets/images/zoro.png'));
        await image.downloadAsync();
        setImage(image);
        setReady(true);
      })();
    }, []);
  
    const _rotate90andFlip = async () => {
      const manipResult = await manipulateAsync(
        image.localUri || image.uri,
        [{ rotate: 90 }, { flip: FlipType.Vertical }],
        { compress: 1, format: SaveFormat.PNG }
      );
      setImage(manipResult);
    };
  
    const _renderImage = () => (
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.localUri || image.uri }} style={styles.image} />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.ViewInicial}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              paddingHorizontal: 5, paddingVertical:5, marginTop: 20 }}>
              <Text style={{ color: 'white' }}>Contatos</Text>

              <TouchableHighlight underlayColor={"#3493e5"} onPress={() => goBack()}>
                  <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                    <AntDesign name="back" size={18} color="#fff" />
                    <Text style={{ color: 'white' }}> Voltar</Text>
                  </View>
              </TouchableHighlight>
          </View>
        </View> 

        <View style={styles.container}>
            {ready && image && _renderImage()}
            <Button title="Rotate and Flip" onPress={_rotate90andFlip} />
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
    imageContainer: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
      },
});