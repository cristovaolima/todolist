import React, { useState, useEffect} from 'react';
import { Keyboard, Text, ScrollView } from 'react-native';
import Atividades from '../../Componets/Atividades';
import Realizadas from '../../Componets/Realizadas';
import getRealm from '../../Conexao/realm';
import { Container, Input, Button, ButtonText, Titulo, AtividadeViw, BemVindoText, 
  UsuarioText, UsuarioViw, ListFazer, ListRealizadas, TextSemTarefa } from './styles';

export default function Home({route}) {
  const [tarefa, setTarefa] = useState('');
  const [editarIdTarefa, setEditarIdTarefa] = useState(null);
  const [editarStatus, setEditarStatus] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  //Carrega as tarefas assim que a home é aberta.
  useEffect(() => {
    carregarAtividades = async () => {
      const realm = await getRealm();
      const data = realm.objects('Atividade');
      setTarefas(data);
    }
    carregarAtividades();
  }, []);

  //Função que atualiza os dados na lista.
  atualizarLista = async () => {
    const dadosUp = await realm.objects('Atividade').sorted('id', false);
    setTarefas(dadosUp);
  }

  //Função que salva uma nova tarefa.
  salvarTarefa = async (data) => {
    const realm = await getRealm();
    const id = realm.objects('Atividade').sorted('id', true).length > 0
    ? realm.objects('Atividade').sorted('id', true)[0].id + 1 : 1;

    const novaAtividade = {
      id: id,
      titulo: data.tarefa,
      status: '0'
    }
    realm.write(() => {
      realm.create('Atividade', novaAtividade)
    });
    atualizarLista();
  }

  //Função que verifica se o campo de nova tarefa está preechido, se sim, 
  //chama a função de salva-lá no banco de dados.
  novaTarefa = async() => {
    if(tarefa === ''){
      alert('Preencha o campo da atividade!');
      return;
    }
    try{
      const data = {tarefa: tarefa};
      await salvarTarefa(data);
      setTarefa('');
      Keyboard.dismiss();
    }catch(err){
      alert(err);
    }    
  }

  //Função que carrega o campo de tarefa para atualiza-lá.
  function editarAtividade(data){
    setTarefa(data.titulo);
    setEditarIdTarefa(data.id);
    setEditarStatus(data.status);
  }

  //Função que alerar o satus da tarefa parea feita.
  ateraStatus = async (data) => {
    const realm = await getRealm();
    const edicaoAtividade = {
      id: data.id,
      titulo: data.titulo,
      status: '1'
    };
    await realm.write(() => {
      realm.create('Atividade', edicaoAtividade, 'modified')
    });
    const dadosAtualizados = await realm.objects('Atividade');
    setTarefas(dadosAtualizados);
  }

  //Função que faz a edição da tarefa no banco de dados.
  edicaoTarefa = async () => {
    const realm = await getRealm();
    const edicaoAtividade = {
      id: editarIdTarefa,
      titulo: tarefa,
      status: editarStatus
    };
    await realm.write(() => {
      realm.create('Atividade', edicaoAtividade, 'modified')
    });
    atualizarLista();
    setTarefa('');
    setEditarIdTarefa(null);
    Keyboard.dismiss();
  }

  ////Função que exclui a tarefa no banco de dados.
  excluirAtividade = async (data) => {
    atualizarLista();
    const realm = await getRealm();
    const ID = data.id;
    realm.write(() => {
      if(realm.objects('Atividade').filtered('id =' + ID).length > 0){
        realm.delete(
          realm.objects('Atividade').filtered('id =' + ID)
        )
      }
    });
    const dadosAtualizados = await realm.objects('Atividade');
    setTarefas(dadosAtualizados);
  }

 return (
  <Container>
    <UsuarioViw>
      <BemVindoText>Bem vind@,</BemVindoText>
      <UsuarioText>{route.params?.nome}</UsuarioText>
      <BemVindoText>!</BemVindoText>
    </UsuarioViw>    
    <AtividadeViw>
      <Input 
      placeholder="Nova Tarefa"
      value={tarefa}
      onChangeText={(text) => setTarefa(text) }
      />
    <Button onPress={ editarIdTarefa === null ? novaTarefa : edicaoTarefa }>
      <ButtonText>{ editarIdTarefa === null ? '✓' : '✎'}</ButtonText>
    </Button>
    </AtividadeViw>
      <ScrollView>
        <Titulo>A Fazer</Titulo>    
          {tarefas.length != 0 ? (
            <ListFazer
            showsVerticalScrollIndicator={false}
            keyboardShouldPersisTaps="handled"
          data={tarefas}
          keyExtractor={ item => String(item.id) }
          renderItem={ ({ item }) => (<Atividades data={item} editar={editarAtividade} excluir={ excluirAtividade } status={ ateraStatus }/> )}
          />
          ) : (
            <TextSemTarefa>Sem tarefas cadastradas!</TextSemTarefa>
          )}

        <Titulo>Realizadas</Titulo>
        <ListRealizadas
          showsVerticalScrollIndicator={false}
          keyboardShouldPersisTaps="handled"
        data={tarefas}
          keyExtractor={ item => String(item.id) }
          renderItem={ ({ item }) => (<Realizadas data={item} excluir={ excluirAtividade }/> )}
          /> 
      </ScrollView>
  </Container>   
  );
} 