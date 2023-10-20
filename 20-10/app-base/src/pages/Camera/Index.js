import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
/* Adicionar */
import { Platform, Text, View, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import { Camera, CameraType } from 'expo-camera';


export default function ExpoCamera({ navigation: { goBack } }) {
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState('off')

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {}
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.ViewInicial}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              paddingHorizontal: 5, paddingVertical:5, marginTop: 20 }}>
              <Text style={{ color: 'white' }}>Camera</Text>

              <TouchableHighlight underlayColor={"#3493e5"} onPress={() => goBack()}>
                  <View style={{ flexDirection: 'row', 'alignItems': 'center' }}>
                    <AntDesign name="back" size={18} color="#fff" />
                    <Text style={{ color: 'white' }}> Voltar</Text>
                  </View>
              </TouchableHighlight>
          </View>
        </View> 

        <View style={styles.container}>
          {startCamera ? (
            <View
              style={{
                flex: 1,
                width: '100%'
              }}
            >
              {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
              ) : (
                <Camera
                  type={cameraType}
                  flashMode={flashMode}
                  style={{flex: 1}}
                  ref={(r) => {
                    camera = r
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      backgroundColor: 'transparent',
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        left: '5%',
                        top: '10%',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__handleFlashMode}
                        style={{
                          backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                          borderRadius: '50%',
                          height: 25,
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
                          }}
                        >
                          ⚡️
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={__switchCamera}
                        style={{
                          marginTop: 20,
                          borderRadius: '50%',
                          height: 25,
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
                          }}
                        >
                          {cameraType === 'front' ? '🤳' : '📷'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                      }}
                    >
                      <View
                        style={{
                          alignSelf: 'center',
                          flex: 1,
                          alignItems: 'center'
                        }}
                      >
                        <TouchableOpacity
                          onPress={__takePicture}
                          style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Camera>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={__startCamera}
                style={{
                  width: 130,
                  borderRadius: 4,
                  backgroundColor: '#14274e',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Take picture
                </Text>
              </TouchableOpacity>
            </View>
          )}

        <StatusBar style="auto" />

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
      flex: 1,
      justifyContent: 'center',
    },
    ViewInicial: {
      paddingVertical: 10,
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
    camera: {
      flex: 1,
      height: 400
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
});