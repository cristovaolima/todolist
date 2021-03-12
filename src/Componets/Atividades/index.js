import React from 'react';
import { Container, Text, CenterViw, Botao, TextBotao } from './styles'

export default function Atividades({ data }) {
 return (
    <Container>
      <CenterViw>            
        <Text>Atividades</Text>
        <Botao>
            <TextBotao>Editar</TextBotao>
        </Botao>
        <Botao>
            <TextBotao>Excluir</TextBotao>
        </Botao>
      </CenterViw>
    </Container>   
  );
}