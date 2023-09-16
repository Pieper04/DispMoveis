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
import axios from 'axios';
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
    setLoading(false);
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

      await axios.post('http://10.0.2.152:3333/auth/usuarios/auth', FormValues, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        console.log(response)
        setLoading(false);
        setRetornoLogin("");

        try {
          (async () => {
            setRetornoTitulo("Retorno Login - CODE");
            if(response.status == 500){
              setSev("info");
              setRetornoLogin("Erro ao cadastrar! Tente novamente.");

              setTimeout(() => { setRetornoLogin(""); }, 5000);
            }else{
              setRetornoLogin("");
              AsyncStorage.setItem('@razaoSocial_', response.data.razao_social);
              AsyncStorage.setItem('@nome_', response.data.razao_social);
              AsyncStorage.setItem('@cnpj_', response.data.cnpj);
              AsyncStorage.setItem('@email_', FormValues.usuario);
              AsyncStorage.setItem('@pass_', FormValues.senha);
              AsyncStorage.setItem('@token_', response.data.token);

              setSev("success");
              setRetornoTitulo("Bem vindo ao nosso app!");
              setRetornoLogin("Aproveite.");

              setTimeout(() => { setLoading(false); setRetornoLogin(""); navigation.navigate('Home'); }, 3000);
            }
          })();
        } catch (e) {
          setSev("error");
          setRetornoTitulo("Login:");
          setRetornoLogin(response.data);
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        setRetornoTitulo("Login:");
        setSev("error");
        setRetornoLogin("Erro ao logar");

        setTimeout(() => { setRetornoLogin(""); }, 5000);
      })
    }else{
        setSev("error");
        setRetornoTitulo("Preencha todos os campos.");
    }
  }

  function Cadastro(){
    navigation.navigate('Cadastro');
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
                <View>
                  <Text style={styles.LabelPadrao}>Email</Text>
                  <TextInput
                      placeholder=''
                      style={styles.InputPadrao}
                      onChangeText={(e) => handleInputChange({ name: "usuario", value: e })}
                      value={FormValues.usuario ? FormValues.usuario : ""}
                      name="usuario"
                      autoCorrect={true}
                      required 
                      type={"usuario"}
                  />
                </View>

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

                <TouchableOpacity onPress={(e) => Cadastro()}>
                  <View style={styles.botaoLink}>
                    <Text>Novo aqui? Faça seu cadastro!</Text> 
                  </View>
                </TouchableOpacity>

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
  botaoLink: {
    color: "#0c7dbe",
    alignItems: 'center',
    margin: 5,
    fontSize: 16
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