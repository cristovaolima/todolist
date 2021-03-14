import React from 'react';
import { Container, Text, CenterViw, Botao, TextBotao, CenterViwBranco, BotaoChecck, TextBotaoChecck } from './styles'

export default function Atividades({ data, editar, excluir, status }) {
 return (
    <Container>
      {data.status === '0' ? (
      <CenterViw>
        <Text>
        <BotaoChecck onPress={() => status(data)} >
          <TextBotaoChecck>❑ </TextBotaoChecck>
        </BotaoChecck>
          {data.titulo}
        </Text>            
        <Botao onPress={() => editar(data)}>
          <TextBotao>✎</TextBotao>
        </Botao>
        <Botao onPress={() => excluir(data)}>
          <TextBotao>✕</TextBotao>
        </Botao>
      </CenterViw>
      ): (<CenterViwBranco></CenterViwBranco>)}
    </Container>   
  );
}