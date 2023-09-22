import React, { useRef, useEffect, useState } from 'react';
import {
  Keyboard, Text, StatusBar, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator,
  Platform, View, TextInput
} from 'react-native';
import { Container, BoxForm } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { Aviso } from '../../components';
import { AntDesign, Feather } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import axios from 'axios';

export default function Cadastro({ navigation }) {
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

  async function Cadastro () {
    if (FormValues.razao_social && FormValues.email && FormValues.cnpj && FormValues.senha ) {
      setLoading(true);
      FormValues.nome = FormValues.razao_social;
      console.log(FormValues)

      await axios.post('http://10.0.2.152:3333/auth/usuarios', FormValues, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
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

              setSev("success");
              setRetornoTitulo("Sucesso ao cadastrar!");
              setRetornoLogin("Tente logar.");

              setTimeout(() => { setLoading(false); setRetornoLogin(""); setRetornoTitulo(); navigation.navigate('Login'); }, 3000);
            }
          })();
        } catch (e) {
          setSev("error");
          setRetornoTitulo("Retorno cadastro:");
          setRetornoLogin(response.data);
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        setRetornoTitulo("Retorno cadastro:");
        setSev("error");
        setRetornoLogin("Erro ao cadastrar");

        setTimeout(() => { setRetornoLogin(""); }, 5000);
      })
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
              <Text style={styles.LabelPadrao}>Por favor, preencha todos os campos.</Text>
              <BoxForm style={{  marginBottom: 0 }} >
                <Form ref={formRef} onSubmit={(e) => {Cadastro() }}> 
                <View>
                  <Text style={styles.LabelPadrao}>Nome</Text>
                  <TextInput
                      placeholder=''
                      style={styles.InputPadrao}
                      onChangeText={(e) => handleInputChange({ name: "razao_social", value: e })}
                      value={FormValues.razao_social ? FormValues.razao_social : ""}
                      name="razao_social"
                      autoCorrect={true}
                      required 
                  />
                </View>

                <View>
                  <Text style={styles.LabelPadrao}>Email</Text>
                  <TextInput
                      placeholder=''
                      style={styles.InputPadrao}
                      onChangeText={(e) => handleInputChange({ name: "email", value: e })}
                      value={FormValues.email ? FormValues.email : ""}
                      name="email"
                      autoCorrect={true}
                      required 
                      type={"email"}
                  />
                </View>

                <View>
                  <Text style={styles.LabelPadrao}>CPF / CNPJ</Text>
                  <MaskInput
                    placeholder=''
                    style={styles.InputPadrao}
                    onChangeText={(e) => handleInputChange({ name: "cnpj", value: e })}
                    value={FormValues.cnpj ? FormValues.cnpj : ""}
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
                </View>

                <View>
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
                </View>

                <TouchableOpacity onPress={(e) => formRef.current.submitForm()}>
                    <View style={styles.BotaoPadrao}>
                    <Text style={styles.BotaoPadraoTexto}>Cadastrar</Text> 
                    </View>
                </TouchableOpacity>

                {  loading ?
                    <ActivityIndicator 
                        size="large"
                        color="#FFF"
                        style={{ marginBottom: 10, marginTop: 10 }}
                    />
                : null }

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