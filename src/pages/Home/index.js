import React, { useState, useEffect} from 'react';
import { Keyboard, Text } from 'react-native';
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
  const [tarefaFazer, setTarefaFazer] = useState([]);
  const [tarefaFeitas, setTarefaFeitas] = useState([]);

  useEffect(() => {
    carregarAtividades = async () => {
      const realm = await getRealm();
      const data = realm.objects('Atividade');
      setTarefas(data);
    }
    carregarAtividades();
  }, []);

  atualizarLista = async () => {
    const dadosUp = await realm.objects('Atividade').sorted('id', false);
    setTarefas(dadosUp);
  }

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

  function editarAtividade(data){
    setTarefa(data.titulo);
    setEditarIdTarefa(data.id);
    setEditarStatus(data.status);
  }

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
  </Container>   
  );
} 