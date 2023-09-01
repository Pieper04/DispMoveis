import React, { useRef, useEffect, useState } from 'react';
import {
  Keyboard, Text, StatusBar, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator,
  Platform, View, TextInput
} from 'react-native';
import { Container, BoxForm } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import Topo from '../../components/Topo';
import { Aviso } from '../../components';
import { AntDesign, Feather } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const formRef = useRef(null);
  // ---------------------------------------- Controles de teclado, loading
  const [keyboard, setKeyboard] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [RetornoLogin, setRetornoLogin] = useState(""); 
  const [RetornoTitulo, setRetornoTitulo] = useState(""); 
  const [Sev, setSev] = useState("error"); 
  
  //---------------------------------------------------------------- INPUTS 
  const [FormValues, setFormValues] = useState([]);
    // ----------------------- Variaveis gerais 
    const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
    const CNPJ_MASK = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/];

  useEffect(() => {
    setLoading(true);
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  }, []);

  function keyboardDidHide() {
    setKeyboard(false);
  }

  function keyboardDidShow() {
    setKeyboard(true);
  }

  function handleInputChange(input) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [input.name]: input.value,
    }));
  }

  async function Login () {
    if (FormValues.usuario && FormValues.senha) {
      setLoading(true);

      let dados = FormValues;

      console.log(dados);

      AsyncStorage.setItem('@Pass', FormValues.senha);
      AsyncStorage.setItem('@CPF', FormValues.usuario);
      AsyncStorage.setItem('@NameUser', "Tia Leh");

      setTimeout(() => { setLoading(false); setRetornoLogin(""); navigation.navigate('Home'); }, 3000);
    }else{
        setSev("error");
        setRetornoTitulo("Preencha todos os campos.");
    }
  }

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1, backgroundColor: "#3493e5"}}
        scrollEnabled={true}
        enableAutomaticScroll={true}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <Container>
              <StatusBar color="white" backgroundColor={"#3493e5"}/>
              { keyboard ? null : 
                <Topo />
              }

              <BoxForm style={{  marginBottom: 0 }} >
                <Form ref={formRef} onSubmit={(e) => {Login() }}> 
                <Text style={styles.LabelPadrao}>CPF / CNPJ</Text>
                <MaskInput
                    placeholder=''
                    style={styles.InputPadrao}
                    onChangeText={(e) => handleInputChange({ name: "usuario", value: e })}
                    value={FormValues.usuario ? FormValues.usuario : ""}
                    name="cpf"
                    keyboardType="numeric"
                    autoCorrect={true}
                    required
                    size={11}
                    mask={(text) => {
                    if (text.replace(/\D+/g, "").length <= 11) {
                        return CPF_MASK
                    } else {
                        return CNPJ_MASK
                    }
                    }}
                />

                <Text style={styles.LabelPadrao}>Senha</Text>
                <TextInput
                    placeholder=''
                    style={styles.InputPadrao}
                    onChangeText={(e) => handleInputChange({ name: "senha", value: e })}
                    value={FormValues.senha ? FormValues.senha : ""}
                    name="senha"
                    secureTextEntry={true}
                    autoCorrect={true}
                    required 
                />

                <TouchableOpacity onPress={(e) => formRef.current.submitForm()}>
                    <View style={styles.BotaoPadrao}>
                    <Text style={styles.BotaoPadraoTexto}>Entrar</Text> 
                    </View>
                </TouchableOpacity>

                {
                    loading ?
                    <ActivityIndicator 
                        size="large"
                        color="#FFF"
                        style={{ marginBottom: 10, marginTop: 10 }}
                    />
                    :
                    null
                }

                { RetornoLogin !== "" ? 
                    <Aviso sev={ Sev }>
                    { Sev === "error" ? 
                        <Feather name="alert-circle" size={24} color={"#f8d7da"} />
                    : Sev === "success" ? 
                        <AntDesign name="checkcircleo" size={24} color={"#d4edda"} />
                    :
                        <AntDesign name="infocirlceo" size={24} color={"#d4edda"} />
                    }

                    { RetornoTitulo !== "" ?
                        <Text style={{ color: Sev === "error" ? "#f8d7da": Sev === "success" ? "#d4edda" : "#d4e5ed", margin: 5 }}>
                        { RetornoTitulo }
                        </Text>
                    : null }

                    <Text style={{ color: Sev === "error" ? "#f8d7da": Sev === "success" ? "#d4edda" : "#d4e5ed", margin: 5 }}>
                        { RetornoLogin }
                    </Text>
                    </Aviso>
                : null }
                </Form>
              </BoxForm>
              
                { keyboard ? null :  
                    <View style={styles.footer}>
                        <View style={styles.Rodape}>
                        <View style={styles.RodapeLine}><View></View></View>
                        <View style={styles.rodapeMeio}><Text style={styles.txtRodape}>Modelo de App</Text></View>
                        <View style={styles.RodapeLine}><View></View></View>
                        </View>

                        <View><Text style={styles.txtRodape2}>Powered by Letícia Pieper Jandt. a top dos top</Text></View>
                    </View>
                }        
            </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  LabelPadrao: {
    color: "#fff",
    alignItems: 'center',
    margin: 5,
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
  InputPadrao: {
    backgroundColor: "transparent",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    margin: 5,
    padding: 10
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 25,
  },
  Rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RodapeLine: {
    borderBottomWidth: 2,
    borderColor: "#3493e5",
    width: '25%',
    height: 12
  },
  txtRodape: {
    color: "#3493e5",
    textAlign: "center",
    paddingHorizontal: 5,
    fontSize: 16
  },
  txtRodape2: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12
  },
  RodapeMeio: {
    width: '25%'
  }
});