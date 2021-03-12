import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: #312FA5;
justify-content: center;
align-items: center;
`

export const AreaLogo = styled.View`
width: 90%;
flex-direction: row;
margin-left: 10px;
justify-content: center;
`

export const TodoText = styled.Text`
color: #fff;
font-size: 50;
margin-bottom: 20px;
text-align: center;
align-items: center;
font-weight: bold;
`
export const ListText = styled.Text`
color: #41E3DF;
font-size: 50;
margin-bottom: 20px;
text-align: center;
align-items: center;
font-style: italic;
`

export const Button = styled.TouchableOpacity`
width: 80%;
background-color: #41E3DF;
margin-top: 10px;
padding: 10px;
border-radius: 7px;
justify-content: center;
align-items: center;
`
export const Input = styled.TextInput`
width: 80%;
background-color: white; 
padding: 10px;
margin-top: 10px;
border-radius: 7px;
font-size: 17px;
border: 2px;
border-color: #41E3DF;
`

export const ButtonText = styled.Text`
color: #fff;
font-size: 20;
`

export const TextInf = styled.Text`
color: #fff;
font-size: 10;
color: red;
`