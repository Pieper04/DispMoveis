import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Platform, TouchableHighlight } from 'react-native'
import {Camera, CameraType} from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';

let camera: Camera;

export default function ExpoCamera({ navigation, navigation: { goBack } }) {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState(CameraType.back)

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
    const photo: any = await camera.takePictureAsync()
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

  const __switchCamera = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front)
    } else {
      setCameraType(CameraType.back)
    }
  }
  return (
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
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: 100,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === CameraType.front ? '🤳' : '📷'}
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
    </View>
  )
}

const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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