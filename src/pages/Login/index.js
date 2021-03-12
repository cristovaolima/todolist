import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native'
import { Container, Input, Button, ButtonText, TextInf, AreaLogo, TodoText, ListText } from './styles';

export default function Login() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const nav = useNavigation();

  function entrar(){
    if(nome === '' || email === '' || senha === ''){
      alert("Preencha todos os campos!")
    }else{
      nav.navigate('Home');
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