import React from 'react';
import { Container, Text, CenterViw, Botao, TextBotao, CenterViwBranco, TextBotaoChecck } from './styles'

export default function Realizadas({ data, excluir }) {
 return (
    <Container>
      {data.status === '1' ? (
        <CenterViw>            
        <Text>
        <TextBotaoChecck>✓ </TextBotaoChecck>
          {data.titulo}</Text>
        <Botao onPress={() => excluir(data)}>
            <TextBotao>✕</TextBotao>
        </Botao>
      </CenterViw>
      ) : (<CenterViwBranco></CenterViwBranco>)

      }
    </Container>   
  );
}