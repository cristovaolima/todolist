import React, { useState} from 'react';
import Atividades from '../../Componets/Atividades';
import Realizadas from '../../Componets/Realizadas';
import { Container, Input, Button, ButtonText, Titulo, ContainerAtividade,
         AtividadeViw, BemVindoText, UsuarioText, UsuarioViw, ListFazer, ListRealizadas} from './styles';

export default function Home() {
  const [tarefa, setTarefa] = useState('');
 return (
  <Container>
    <UsuarioViw>
      <BemVindoText>Bem vind@,</BemVindoText>
      <UsuarioText>Fulano</UsuarioText>
      <BemVindoText>!</BemVindoText>
    </UsuarioViw>    
    <AtividadeViw>
      <Input 
      placeholder="Nova Atividade"
      value={tarefa}
      onChangeText={(text) => setTarefa(text) }
      />
    <Button>
      <ButtonText>Sa</ButtonText>
    </Button>
    </AtividadeViw>
    
    <Titulo>A Fazer</Titulo>
    <ContainerAtividade>
      <ListFazer
      data={[
        { id: 1, tarefa: 'Uma tarefa'}, 
        { id: 2, tarefa: 'Uma tarefa'},
        { id: 1, tarefa: 'Uma tarefa'}
      ]}
      keyExtractor={ item => String(item.id) }
      renderItem={ ({ item }) => (<Atividades data={item}/> )}
      />
    </ContainerAtividade>
    <Titulo>Realizadas</Titulo>
    <ContainerAtividade>
    <ListRealizadas
      data={[
        { id: 1, tarefa: 'Uma tarefa'}, 
        { id: 2, tarefa: 'Uma tarefa'},
        { id: 1, tarefa: 'Uma tarefa'}
      ]}
      keyExtractor={ item => String(item.id) }
      renderItem={ ({ item }) => (<Realizadas data={item}/> )}
      />
    </ContainerAtividade>
  </Container>   
  );
} 