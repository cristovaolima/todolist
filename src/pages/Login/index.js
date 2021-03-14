import React, { useState, useEffect} from 'react';
import { Keyboard, Alert } from 'react-native';
import getRealm from '../../Conexao/realm';
import { useNavigation } from '@react-navigation/native'
import { Container, Input, Button, ButtonText, TextInf, AreaLogo, TodoText, ListText } from './styles';

export default function Login() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState([]);

  const nav = useNavigation();

  //Carrega o usuario assim que o app é aberto.
  useEffect(() => {
    carregarUsuario = async () => {
      const realm = await getRealm();
      const data = realm.objects('Usuario');
      setUsuario(data);
    }
    carregarUsuario();
    cadastrado();    
  }, []);  

  //Função que salva o usuario no banco de dados.
  salvarUsuario = async (data) =>{
    const realm = await getRealm();
    const id = realm.objects('Usuario').sorted('id', true).length > 0
    ? realm.objects('Usuario').sorted('id', true)[0].id + 1 : 1;

    const dadosUsuario = {
      id: id,
      nome: data.nome,
      email: data.email,
      senha: data.senha
    }

    realm.write(() => {
      realm.create('Usuario', dadosUsuario)
    });
  }

  //Função que monta um usuario e chama a função para salva-ló.
  novoUsuario = async() => {
    try{
      const data = {nome: nome, email: email, senha: senha};
      await salvarUsuario(data);
      cadastrado();
      Keyboard.dismiss();
    }catch(err){
      alert(err);
    }
  }

  //Função que verifica se o castrado já foi feito, se sim, abre a Home.
  function cadastrado(){
    if(usuario.length === 0){
      Alert.alert('Sem usuario!', 'Cadastre-se.')
    }else{
      nav.navigate('Home', {nome: usuario[0].nome});
    }
  }

  //Função que verifica se todos os campos foram preechidos, se sim, 
  //a função de salvar o cadastro no banco é chamada. 
  function entrar(){
    if(nome === '' || email === '' || senha === ''){
      alert("Preencha todos os campos!")
    }else{
      novoUsuario();
    }
  }

 return (
    <Container>
      <AreaLogo>
        <TodoText>To do</TodoText>
        <ListText>List</ListText>
      </AreaLogo>
      <TextInf>Campos obrigatórios (*)</TextInf>
      <Input 
      placeholder="Nome *"
      value={nome}
      onChangeText={(text) => setNome(text) }
      />
      <Input 
      placeholder="Email *"
      value={email}
      onChangeText={(text) => setEmail(text) }
      />
      <Input 
      placeholder="Senha *" 
      secureTextEntry={true}
      value={senha}
      onChangeText={(text) => setSenha(text) }
      />
      <Button onPress={() => entrar()}>
          <ButtonText>Enviar</ButtonText>
      </Button>
    </Container>  
  );
} 