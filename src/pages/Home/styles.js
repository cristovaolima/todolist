import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: #312FA5;
padding-top: 20px;
`
export const Input = styled.TextInput`
width: 90%;
background-color: white; 
padding: 10px;
margin: 10px 10px 10px 10px;
border-radius: 5px;
font-size: 17px;
border: 2px;
border-color: #41E3DF;
`
export const Button = styled.TouchableOpacity`
background-color: #41E3DF;
height: 50px;
padding: 10px;
border-radius: 7px;
`
export const ButtonText = styled.Text`
color: gray;
font-size: 20;
font-weight: bold;
`
export const Titulo = styled.Text`
color: #41E3DF;
font-size: 22;
margin: 3px 3px 3px 10px;
font-weight: bold;
`
export const ContainerAtividade = styled.View`
flex: 1;
padding: 10px 10px 10px 10px;
margin: 0px 10px 10px 10px;
border-radius: 5px;
`
export const AtividadeViw = styled.View`
width: 90%;
flex-direction: row;
margin-left: 10px;
justify-content: center;
align-items:center;
`
export const UsuarioViw = styled.View`
width: 90%;
flex-direction: row;
margin-left: 10px;
justify-content: center;
`

export const BemVindoText = styled.Text`
color: #fff;
font-size: 25;
margin-bottom: 20px;
text-align: center;
align-items: center;
`
export const UsuarioText = styled.Text`
color: #41E3DF;
font-size: 25;
margin-bottom: 20px;
margin-left: 10px;
text-align: center;
align-items: center;
`
export const TextSemTarefa = styled.Text`
color: white;
font-size: 17;
margin: 20px 0px 20px 0px;
text-align: center;
align-items: center;
`

export const ListFazer = styled.FlatList`

`
export const ListRealizadas = styled.FlatList`

`
